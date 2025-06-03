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

interface ChannelData {
  name: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  avgLikes: number
  avgComments: number
  subGrowth: number
}

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
  const [analyzedChannels, setAnalyzedChannels] = useState<Map<string, ChannelData>>(new Map());
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
        const analysisData = analyzedChannels.get(channel.id);
        if (!analysisData) return true;
        const engagement = ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews) * 100;
        return engagement >= filters.minEngagement;
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
          const dataA = analyzedChannels.get(a.id);
          const dataB = analyzedChannels.get(b.id);
          valueA = dataA?.avgViews || 0;
          valueB = dataB?.avgViews || 0;
          break;
        case 'engagement':
          const engA = analyzedChannels.get(a.id);
          const engB = analyzedChannels.get(b.id);
          valueA = engA ? ((engA.avgLikes + engA.avgComments) / engA.avgViews) * 100 : 0;
          valueB = engB ? ((engB.avgLikes + engB.avgComments) / engB.avgViews) * 100 : 0;
          break;
        case 'growth':
          const growthA = analyzedChannels.get(a.id);
          const growthB = analyzedChannels.get(b.id);
          valueA = growthA?.subGrowth || 0;
          valueB = growthB?.subGrowth || 0;
          break;
        default:
          valueA = a.subscriberCount;
          valueB = b.subscriberCount;
      }

      return filters.sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });

    return filtered;
  }, [safeChannels, analyzedChannels, filters]);

  // Função para gerar dados consistentes baseados no ID do canal
  const generateConsistentData = (channelId: string, baseValue: number): number => {
    let hash = 0;
    const str = channelId + baseValue.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const convertChannelToAnalysisData = (channel: Channel): ChannelData => {
    const hashBase = generateConsistentData(channel.id, channel.subscriberCount);
    
    const avgViews = Math.max(
      Math.floor(channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 100))),
      Math.floor(channel.subscriberCount * 0.1)
    );
    
    const monthlyVideos = channel.subscriberCount > 1000000 ? 
      Math.floor((hashBase % 10) + 15) :
      channel.subscriberCount > 100000 ? 
      Math.floor((hashBase % 8) + 8) :
      Math.floor((hashBase % 6) + 4);
    
    const engagementMultiplier = channel.subscriberCount > 1000000 ? 0.02 : 
                                channel.subscriberCount > 100000 ? 0.035 : 0.05;
    
    const avgLikes = Math.floor(avgViews * engagementMultiplier);
    const avgComments = Math.floor(avgLikes * 0.1);
    
    const activityRatio = avgViews / channel.subscriberCount;
    const subGrowth = activityRatio > 0.5 ? 
      Math.floor((hashBase % 30) + 20) :
      activityRatio > 0.2 ? 
      Math.floor((hashBase % 20) + 10) :
      Math.floor((hashBase % 15) + 5);
    
    return {
      name: channel.title,
      subscribers: channel.subscriberCount,
      avgViews: avgViews,
      monthlyVideos: monthlyVideos,
      avgLikes: avgLikes,
      avgComments: avgComments,
      subGrowth: subGrowth
    };
  };

  const handleAnalyzeChannel = async (channel: Channel) => {
    if (analyzedChannels.has(channel.id)) return;
    
    // Verificar cache primeiro
    const cachedData = getCachedAnalysis(channel.id);
    if (cachedData) {
      setAnalyzedChannels(prev => new Map(prev).set(channel.id, cachedData));
      return;
    }
    
    setAnalyzingChannels(prev => new Set(prev).add(channel.id));
    
    // Simular análise com delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisData = convertChannelToAnalysisData(channel);
    setAnalyzedChannels(prev => new Map(prev).set(channel.id, analysisData));
    setCachedAnalysis(channel.id, analysisData);
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
      // Verificar cache primeiro
      const cachedData = getCachedAnalysis(channel.id);
      if (cachedData) {
        setAnalyzedChannels(prev => new Map(prev).set(channel.id, cachedData));
        setAnalyzingChannels(prev => {
          const newSet = new Set(prev);
          newSet.delete(channel.id);
          return newSet;
        });
        continue;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analysisData = convertChannelToAnalysisData(channel);
      setAnalyzedChannels(prev => new Map(prev).set(channel.id, analysisData));
      setCachedAnalysis(channel.id, analysisData);
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
    selectedChannels.forEach(channel => {
      const analysisData = analyzedChannels.get(channel.id);
      
      if (analysisData) {
        const engagementRate = ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews * 100).toFixed(1);
        
        const calculateScore = (data: ChannelData) => {
          let score = 0;
          
          if (data.subscribers > 1000000) score += 25;
          else if (data.subscribers > 500000) score += 20;
          else if (data.subscribers > 100000) score += 15;
          else if (data.subscribers > 50000) score += 10;
          else if (data.subscribers > 10000) score += 5;
          
          if (data.avgViews > 500000) score += 25;
          else if (data.avgViews > 100000) score += 20;
          else if (data.avgViews > 50000) score += 15;
          else if (data.avgViews > 10000) score += 10;
          else if (data.avgViews > 1000) score += 5;
          
          if (data.monthlyVideos > 20) score += 20;
          else if (data.monthlyVideos > 15) score += 15;
          else if (data.monthlyVideos > 10) score += 10;
          else if (data.monthlyVideos > 5) score += 5;
          
          const engagement = (data.avgLikes + data.avgComments) / data.avgViews * 100;
          if (engagement > 8) score += 20;
          else if (engagement > 5) score += 15;
          else if (engagement > 3) score += 10;
          else if (engagement > 1) score += 5;
          
          if (data.subGrowth > 40) score += 10;
          else if (data.subGrowth > 25) score += 8;
          else if (data.subGrowth > 15) score += 6;
          else if (data.subGrowth > 10) score += 4;
          else if (data.subGrowth > 5) score += 2;
          
          return Math.min(score, 100);
        };
        
        const score = calculateScore(analysisData);
        
        let classification = 'Baixo Potencial';
        if (score >= 80) classification = 'Altíssimo Potencial';
        else if (score >= 65) classification = 'Grande Potencial';
        else if (score >= 45) classification = 'Médio Potencial';
        
        const channelForPlanilha = {
          id: channel.id,
          photo: channel.thumbnail,
          name: analysisData.name,
          link: `https://youtube.com/channel/${channel.id}`,
          phone: '+55 11 00000-0000',
          subscribers: analysisData.subscribers,
          avgViews: analysisData.avgViews,
          monthlyVideos: analysisData.monthlyVideos,
          engagement: engagementRate,
          subGrowth: analysisData.subGrowth.toString(),
          score: score,
          classification: classification
        };
        
        onSaveToSpreadsheet?.(channelForPlanilha);
      } else {
        onSaveToSpreadsheet?.(channel);
      }
    });
    multiSelection.clearSelection();
  };

  const handleCompareSelected = () => {
    setShowComparison(true);
  };

  const handleSendToSpreadsheet = (channel: Channel) => {
    const analysisData = analyzedChannels.get(channel.id);
    
    if (analysisData) {
      const engagementRate = ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews * 100).toFixed(1);
      
      const calculateScore = (data: ChannelData) => {
        let score = 0;
        
        if (data.subscribers > 1000000) score += 25;
        else if (data.subscribers > 500000) score += 20;
        else if (data.subscribers > 100000) score += 15;
        else if (data.subscribers > 50000) score += 10;
        else if (data.subscribers > 10000) score += 5;
        
        if (data.avgViews > 500000) score += 25;
        else if (data.avgViews > 100000) score += 20;
        else if (data.avgViews > 50000) score += 15;
        else if (data.avgViews > 10000) score += 10;
        else if (data.avgViews > 1000) score += 5;
        
        if (data.monthlyVideos > 20) score += 20;
        else if (data.monthlyVideos > 15) score += 15;
        else if (data.monthlyVideos > 10) score += 10;
        else if (data.monthlyVideos > 5) score += 5;
        
        const engagement = (data.avgLikes + data.avgComments) / data.avgViews * 100;
        if (engagement > 8) score += 20;
        else if (engagement > 5) score += 15;
        else if (engagement > 3) score += 10;
        else if (engagement > 1) score += 5;
        
        if (data.subGrowth > 40) score += 10;
        else if (data.subGrowth > 25) score += 8;
        else if (data.subGrowth > 15) score += 6;
        else if (data.subGrowth > 10) score += 4;
        else if (data.subGrowth > 5) score += 2;
        
        return Math.min(score, 100);
      };
      
      const score = calculateScore(analysisData);
      
      let classification = 'Baixo Potencial';
      if (score >= 80) classification = 'Altíssimo Potencial';
      else if (score >= 65) classification = 'Grande Potencial';
      else if (score >= 45) classification = 'Médio Potencial';
      
      const channelForPlanilha = {
        id: channel.id,
        photo: channel.thumbnail,
        name: analysisData.name,
        link: `https://youtube.com/channel/${channel.id}`,
        phone: '+55 11 00000-0000',
        subscribers: analysisData.subscribers,
        avgViews: analysisData.avgViews,
        monthlyVideos: analysisData.monthlyVideos,
        engagement: engagementRate,
        subGrowth: analysisData.subGrowth.toString(),
        score: score,
        classification: classification
      };
      
      onSaveToSpreadsheet?.(channelForPlanilha);
    } else {
      onSaveToSpreadsheet?.(channel);
    }
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
    analysisData: analyzedChannels.get(channel.id)
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
              onClick={handleAnalyzeSelected}
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
        onAnalyzeSelected={handleAnalyzeSelected}
        onRemoveSelected={handleRemoveSelected}
        onSendToSpreadsheet={handleSendSelectedToSpreadsheet}
        onCompareSelected={handleCompareSelected}
        onClearSelection={multiSelection.clearSelection}
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedChannels.map(channel => {
          const analysisData = analyzedChannels.get(channel.id);
          const isAnalyzing = analyzingChannels.has(channel.id);
          const isSelected = multiSelection.isSelected(channel.id);
          
          if (isAnalyzing) {
            return <AnalysisSkeleton key={`skeleton-${channel.id}`} />;
          }
          
          return (
            <div key={channel.id} className="animate-fade-in relative">
              <div className="absolute top-4 left-4 z-10">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => multiSelection.toggleSelection(channel.id)}
                  className="border-white bg-black/50 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
                />
              </div>
              <ModernAnalysisCard
                channel={channel}
                analysisData={analysisData}
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
