import { useState, useMemo } from 'react';
import { BarChart3, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Channel } from '@/pages/Index';
import { ModernAnalysisCard } from '@/components/ModernAnalysisCard';
import { AnalysisSkeleton } from '@/components/AnalysisSkeleton';
import { EmptyAnalysisState } from '@/components/EmptyAnalysisState';
import { AnalysisFilters, AnalysisFiltersState } from '@/components/AnalysisFilters';
import { ChannelComparison } from '@/components/ChannelComparison';
import { BatchOperations } from '@/components/BatchOperations';
import { useAnalysisCache } from '@/hooks/useAnalysisCache';
import { useMultiSelection } from '@/hooks/useMultiSelection';
import { analisarCanal } from '@/services/simpleChannelAnalysis';

interface AnalysisTabProps {
  channels: Channel[];
  onRemoveChannel: (channelId: string) => void;
  onSendToPartners?: (channel: Channel) => void;
  onSaveToSpreadsheet?: (channel: any) => void;
}

export const AnalysisTab = ({ 
  channels, 
  onRemoveChannel, 
  onSendToPartners,
  onSaveToSpreadsheet
}: AnalysisTabProps) => {
  const [analyzedChannels, setAnalyzedChannels] = useState<Map<string, boolean>>(new Map());
  const [analyzingChannels, setAnalyzingChannels] = useState<Set<string>>(new Set());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Hooks para funcionalidades avançadas
  const { getCachedAnalysis, setCachedAnalysis } = useAnalysisCache();
  const multiSelection = useMultiSelection(channels || []);

  // Estado dos filtros
  const [filters, setFilters] = useState<AnalysisFiltersState>({
    sortBy: 'subscribers',
    sortOrder: 'desc',
    minSubscribers: 0,
    maxSubscribers: 10000000,
    minEngagement: 0,
    showAnalyzedOnly: false,
    showUnanalyzedOnly: false
  });

  // Ensure channels is always an array
  const safeChannels = channels || [];

  // Função para analisar canal usando o sistema unificado
  const analyzeChannelData = (channel: Channel) => {
    // Mock some video data since we don't have video details from the search
    const mockVideos = Array.from({ length: 5 }, (_, i) => ({
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likeCount: Math.floor(channel.viewCount * 0.02 * Math.random()),
      commentCount: Math.floor(channel.viewCount * 0.005 * Math.random()),
      viewCount: Math.floor(channel.viewCount / channel.videoCount)
    }));

    return analisarCanal({
      id: channel.id,
      title: channel.title,
      subscriberCount: channel.subscriberCount,
      viewCount: channel.viewCount,
      videoCount: channel.videoCount,
      publishedAt: channel.publishedAt
    }, mockVideos);
  };

  // Aplicar filtros e ordenação
  const filteredAndSortedChannels = useMemo(() => {
    let filtered = [...safeChannels];

    // Aplicar filtros de status
    if (filters.showAnalyzedOnly) {
      filtered = filtered.filter(channel => analyzedChannels.has(channel.id));
    } else if (filters.showUnanalyzedOnly) {
      filtered = filtered.filter(channel => !analyzedChannels.has(channel.id));
    }

    // Aplicar filtro de inscritos
    filtered = filtered.filter(channel => 
      channel.subscriberCount >= filters.minSubscribers && 
      channel.subscriberCount <= filters.maxSubscribers
    );

    // Aplicar filtro de engajamento (apenas para canais analisados)
    if (filters.minEngagement > 0) {
      filtered = filtered.filter(channel => {
        const analysis = analyzeChannelData(channel);
        return analysis.metrics.engajamento_percent >= filters.minEngagement;
      });
    }

    // Ordenar
    filtered.sort((a, b) => {
      let valueA: number, valueB: number;

      switch (filters.sortBy) {
        case 'subscribers':
          valueA = a.subscriberCount;
          valueB = b.subscriberCount;
          break;
        case 'avgViews':
          const analysisA = analyzeChannelData(a);
          const analysisB = analyzeChannelData(b);
          valueA = analysisA.metrics.views_por_video;
          valueB = analysisB.metrics.views_por_video;
          break;
        case 'engagement':
          const engA = analyzeChannelData(a);
          const engB = analyzeChannelData(b);
          valueA = engA.metrics.engajamento_percent;
          valueB = engB.metrics.engajamento_percent;
          break;
        case 'growth':
          const growthA = analyzeChannelData(a);
          const growthB = analyzeChannelData(b);
          valueA = growthA.metrics.crescimento_mensal;
          valueB = growthB.metrics.crescimento_mensal;
          break;
        default:
          valueA = a.subscriberCount;
          valueB = b.subscriberCount;
      }

      return filters.sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });

    return filtered;
  }, [safeChannels, analyzedChannels, filters]);

  const handleAnalyzeChannel = async (channel: Channel) => {
    if (analyzedChannels.has(channel.id)) return;
    
    setAnalyzingChannels(prev => new Set(prev).add(channel.id));
    
    // Simular análise com delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalyzedChannels(prev => new Map(prev).set(channel.id, true));
    setAnalyzingChannels(prev => {
      const newSet = new Set(prev);
      newSet.delete(channel.id);
      return newSet;
    });
  };

  const handleAnalyzeSelected = async () => {
    const selectedChannels = multiSelection.getSelectedItems();
    const unanalyzedSelected = selectedChannels.filter(channel => 
      !analyzedChannels.has(channel.id) && !analyzingChannels.has(channel.id)
    );
    
    if (unanalyzedSelected.length === 0) return;
    
    // Adicionar todos à lista de análise
    setAnalyzingChannels(prev => {
      const newSet = new Set(prev);
      unanalyzedSelected.forEach(channel => newSet.add(channel.id));
      return newSet;
    });
    
    // Analisar todos sequencialmente
    for (const channel of unanalyzedSelected) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyzedChannels(prev => new Map(prev).set(channel.id, true));
      setAnalyzingChannels(prev => {
        const newSet = new Set(prev);
        newSet.delete(channel.id);
        return newSet;
      });
    }
  };

  const handleRemoveSelected = () => {
    const selectedChannels = multiSelection.getSelectedItems();
    selectedChannels.forEach(channel => onRemoveChannel(channel.id));
    multiSelection.clearSelection();
  };

  const handleSendSelectedToSpreadsheet = () => {
    const selectedChannels = multiSelection.getSelectedItems();
    selectedChannels.forEach(channel => handleSendToSpreadsheet(channel));
    multiSelection.clearSelection();
  };

  const handleCompareSelected = () => {
    setShowComparison(true);
  };

  const handleSendToSpreadsheet = (channel: Channel) => {
    const analysis = analyzeChannelData(channel);
    
    const channelForPlanilha = {
      id: channel.id,
      photo: channel.thumbnail,
      name: channel.title,
      link: `https://youtube.com/channel/${channel.id}`,
      phone: '+55 11 00000-0000',
      subscribers: channel.subscriberCount,
      avgViews: analysis.metrics.views_por_video,
      monthlyVideos: analysis.metrics.frequencia_mensal,
      engagement: analysis.metrics.engajamento_percent.toFixed(1),
      subGrowth: analysis.metrics.crescimento_mensal.toString(),
      score: analysis.score,
      classification: analysis.classificacao
    };
    
    onSaveToSpreadsheet?.(channelForPlanilha);
  };

  const handleSendToPartners = (channel: Channel) => {
    onSendToPartners?.(channel);
  };

  const handleViewContacts = (channel: Channel) => {
    const channelSearchUrl = `https://www.youtube.com/@${channel.title.replace(/\s+/g, '')}/about`;
    window.open(channelSearchUrl, '_blank');
  };

  const handleNavigateToResults = () => {
    console.log('Navigating to results tab...');
  };

  if (safeChannels.length === 0) {
    return <EmptyAnalysisState onNavigateToResults={handleNavigateToResults} />;
  }

  const unanalyzedCount = filteredAndSortedChannels.filter(channel => 
    !analyzedChannels.has(channel.id) && !analyzingChannels.has(channel.id)
  ).length;

  const selectedChannelsForComparison = multiSelection.getSelectedItems().map(channel => ({
    channel,
    analysisData: analyzedChannels.has(channel.id) ? analyzeChannelData(channel) : undefined
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] p-3 rounded-xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Análise Inteligente
            </h2>
            <p className="text-[#AAAAAA]">
              {filteredAndSortedChannels.length} canal(is) • {analyzedChannels.size} analisado(s) • {analyzingChannels.size} analisando
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={multiSelection.isAllSelected}
              onCheckedChange={(checked) => {
                if (checked) {
                  multiSelection.selectAll();
                } else {
                  multiSelection.clearSelection();
                }
              }}
              className="border-[#333]"
            />
            <span className="text-[#AAAAAA] text-sm">Selecionar todos</span>
          </div>

          <AnalysisFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />

          {unanalyzedCount > 0 && (
            <Button 
              onClick={() => {
                const unanalyzedSelected = multiSelection.getSelectedItems().filter(channel => 
                  !analyzedChannels.has(channel.id) && !analyzingChannels.has(channel.id)
                );
                unanalyzedSelected.forEach(channel => handleAnalyzeChannel(channel));
              }}
              disabled={analyzingChannels.size > 0}
              className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#AA0000] text-white transition-all duration-300 hover:scale-105"
            >
              {analyzingChannels.size > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analisando ({analyzingChannels.size})
                </div>
              ) : (
                `Analisar Todos (${unanalyzedCount})`
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Operações em Lote */}
      <BatchOperations
        selectedChannels={multiSelection.getSelectedItems()}
        onAnalyzeSelected={() => {
          const selectedChannels = multiSelection.getSelectedItems();
          selectedChannels.forEach(channel => handleAnalyzeChannel(channel));
        }}
        onRemoveSelected={() => {
          const selectedChannels = multiSelection.getSelectedItems();
          selectedChannels.forEach(channel => onRemoveChannel(channel.id));
          multiSelection.clearSelection();
        }}
        onSendToSpreadsheet={() => {
          const selectedChannels = multiSelection.getSelectedItems();
          selectedChannels.forEach(channel => handleSendToSpreadsheet(channel));
          multiSelection.clearSelection();
        }}
        onCompareSelected={() => setShowComparison(true)}
        onClearSelection={multiSelection.clearSelection}
      />

      {/* Cards Grid - Grid com 3 colunas para cards menores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAndSortedChannels.map(channel => {
          const isAnalyzed = analyzedChannels.has(channel.id);
          const isAnalyzing = analyzingChannels.has(channel.id);
          const isSelected = multiSelection.isSelected(channel.id);
          
          if (isAnalyzing) {
            return <AnalysisSkeleton key={`skeleton-${channel.id}`} />;
          }
          
          return (
            <div key={channel.id} className="animate-fade-in relative">
              <div className="absolute top-3 left-3 z-10">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => multiSelection.toggleSelection(channel.id)}
                  className="border-white bg-black/50 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
                />
              </div>
              <ModernAnalysisCard
                channel={channel}
                analysisData={isAnalyzed ? true : undefined}
                onAnalyze={() => handleAnalyzeChannel(channel)}
                onRemove={() => onRemoveChannel(channel.id)}
                onSendToSpreadsheet={() => handleSendToSpreadsheet(channel)}
                onViewContacts={() => handleViewContacts(channel)}
              />
            </div>
          );
        })}
      </div>

      {/* Modal de Comparação */}
      {showComparison && (
        <ChannelComparison
          channels={selectedChannelsForComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};
