
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Users, Eye, TrendingUp, Target, Play, Award, BarChart3, Crown, User, Maximize2, Calendar, Clock } from 'lucide-react';
import { Channel } from '@/pages/Index';
import { useMultiSelection } from '@/hooks/useMultiSelection';
import { BatchOperations } from '@/components/BatchOperations';
import { ChannelPreviewModal } from '@/components/ChannelPreviewModal';
import { analisarCanal } from '@/services/simpleChannelAnalysis';

interface ChannelResultsProps {
  channels: Channel[];
  onSendToAnalysis: (channel: Channel) => void;
  viewMode?: 'grid' | 'list';
}

export const ChannelResults = React.memo(({ channels, onSendToAnalysis, viewMode = 'grid' }: ChannelResultsProps) => {
  console.log('ChannelResults render:', { channelsLength: channels?.length || 0 });

  // State for preview modal
  const [previewChannel, setPreviewChannel] = React.useState<Channel | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // Ensure channels is always an array
  const safeChannels = channels || [];

  // Initialize multi-selection hook
  const {
    selectedIds,
    isSelected,
    toggleSelection,
    selectAll,
    clearSelection,
    getSelectedItems,
    selectedCount,
    isAllSelected,
    isPartiallySelected
  } = useMultiSelection(safeChannels);

  const formatNumber = React.useCallback((num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  }, []);

  const getScoreColor = React.useCallback((score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  }, []);

  const getClassificationColor = React.useCallback((classificacao: string) => {
    if (classificacao === 'Excelente para parceria') return 'bg-green-500';
    if (classificacao === 'Canal promissor') return 'bg-blue-500';
    if (classificacao === 'Canal regular') return 'bg-yellow-500';
    return 'bg-red-500';
  }, []);

  const getScoreIcon = React.useCallback((score: number) => {
    if (score >= 80) return Crown;
    if (score >= 60) return Award;
    return TrendingUp;
  }, []);

  // Analyze channel using the new system
  const analyzeChannel = React.useCallback((channel: Channel) => {
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
      publishedAt: channel.publishedAt
    }, mockVideos);
  }, []);

  // Batch operations handlers
  const handleAnalyzeSelected = React.useCallback(() => {
    const selectedChannels = getSelectedItems();
    selectedChannels.forEach(channel => {
      onSendToAnalysis(channel);
    });
    clearSelection();
  }, [getSelectedItems, onSendToAnalysis, clearSelection]);

  const handleRemoveSelected = React.useCallback(() => {
    console.log('Remove selected channels:', getSelectedItems());
    clearSelection();
  }, [getSelectedItems, clearSelection]);

  const handleSendToSpreadsheet = React.useCallback(() => {
    console.log('Send to spreadsheet:', getSelectedItems());
    clearSelection();
  }, [getSelectedItems, clearSelection]);

  const handleCompareSelected = React.useCallback(() => {
    console.log('Compare selected channels:', getSelectedItems());
  }, [getSelectedItems]);

  const handlePreviewChannel = React.useCallback((channel: Channel) => {
    setPreviewChannel(channel);
    setIsPreviewOpen(true);
  }, []);

  const handleClosePreview = React.useCallback(() => {
    setIsPreviewOpen(false);
    setPreviewChannel(null);
  }, []);

  if (safeChannels.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-[#AAAAAA]">Nenhum canal encontrado com os filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Canais Analisados <span className="text-[#FF0000]">Automaticamente</span>
          </h2>
          <p className="text-[#AAAAAA] text-xs">Análise baseada em dados reais da API do YouTube</p>
        </div>
        <div className="flex items-center gap-3">
          {safeChannels.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => checked ? selectAll() : clearSelection()}
                className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
              />
              <span className="text-[#AAAAAA] text-sm">
                {isAllSelected ? 'Desmarcar todos' : 'Selecionar todos'}
              </span>
            </div>
          )}
          <Badge 
            variant="secondary" 
            className="text-xs px-3 py-1 bg-[#FF0000] text-white border-0 rounded-lg animate-pulse"
          >
            {safeChannels.length} canais analisados
          </Badge>
        </div>
      </div>

      {/* Batch Operations */}
      <BatchOperations
        selectedChannels={getSelectedItems()}
        onAnalyzeSelected={handleAnalyzeSelected}
        onRemoveSelected={handleRemoveSelected}
        onSendToSpreadsheet={handleSendToSpreadsheet}
        onCompareSelected={handleCompareSelected}
        onClearSelection={clearSelection}
      />

      <div className={`animate-fade-in ${
        viewMode === 'list' 
          ? 'space-y-3' 
          : 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {safeChannels.map((channel, index) => {
          const analysis = analyzeChannel(channel);
          const ScoreIcon = getScoreIcon(analysis.score);
          const selected = isSelected(channel.id);
          
          if (viewMode === 'list') {
            return (
              <Card 
                key={channel.id} 
                className={`bg-[#1E1E1E] border transition-all duration-300 group relative overflow-hidden hover:scale-[1.02] ${
                  selected 
                    ? 'border-[#FF0000] ring-2 ring-[#FF0000]/20 shadow-lg shadow-[#FF0000]/20' 
                    : 'border-[#525252] hover:border-[#FF0000] hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 25}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Selection Checkbox */}
                    <div className="flex-shrink-0">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleSelection(channel.id)}
                        className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000] bg-[#1E1E1E] shadow-lg"
                      />
                    </div>

                    {/* Channel Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {channel.thumbnail ? (
                          <img 
                            src={channel.thumbnail} 
                            alt={channel.title}
                            className="w-16 h-16 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors bg-[#0D0D0D] flex items-center justify-center">
                            <User className="text-[#AAAAAA] h-8 w-8" />
                          </div>
                        )}
                        {/* Score Badge */}
                        <div className={`absolute -top-2 -right-2 ${getClassificationColor(analysis.classificacao)} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                          <ScoreIcon className="h-2.5 w-2.5" />
                          {analysis.score}
                        </div>
                      </div>
                    </div>

                    {/* Channel Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-white leading-tight text-base line-clamp-1">
                          {channel.title}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePreviewChannel(channel)}
                          className="text-[#AAAAAA] hover:text-white hover:bg-[#333] p-1 h-auto ml-2 flex-shrink-0"
                        >
                          <Maximize2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="mb-2">
                        <Badge className={`${getClassificationColor(analysis.classificacao)} text-white text-xs`}>
                          {analysis.classificacao}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#AAAAAA]">
                        <div>Views totais: {formatNumber(analysis.metrics.views_totais)}</div>
                        <div>Engajamento: {analysis.metrics.engajamento_percent}%</div>
                        <div>Crescimento/mês: {formatNumber(analysis.metrics.crescimento_subs_mes)}</div>
                        <div>Ativo há: {analysis.metrics.canal_ativo_ha_meses} meses</div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 flex-shrink-0 w-72">
                      <div className="text-center">
                        <Users className="h-4 w-4 text-[#FF0000] mx-auto mb-1" />
                        <span className="text-[#AAAAAA] text-xs block">Inscritos</span>
                        <p className="font-bold text-white text-sm">{formatNumber(channel.subscriberCount)}</p>
                      </div>

                      <div className="text-center">
                        <Eye className="h-4 w-4 text-[#FF0000] mx-auto mb-1" />
                        <span className="text-[#AAAAAA] text-xs block">Views</span>
                        <p className="font-bold text-white text-sm">{formatNumber(channel.viewCount)}</p>
                      </div>

                      <div className="text-center">
                        <TrendingUp className="h-4 w-4 text-[#4CAF50] mx-auto mb-1" />
                        <span className="text-[#AAAAAA] text-xs block">Score</span>
                        <p className={`font-bold text-sm ${getScoreColor(analysis.score)}`}>{analysis.score}/100</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button 
                        onClick={() => onSendToAnalysis(channel)}
                        className="bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all border-0 px-4 py-2 text-sm"
                      >
                        <BarChart3 className="mr-1 h-4 w-4" />
                        Detalhes
                      </Button>

                      <Button 
                        asChild 
                        variant="outline"
                        className="border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all px-4 py-2 text-sm"
                      >
                        <a 
                          href={`https://www.youtube.com/channel/${channel.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Play className="h-4 w-4" />
                          Ver Canal
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }

          // Grid view
          return (
            <Card 
              key={channel.id} 
              className={`bg-[#1E1E1E] border transition-all duration-300 group relative overflow-hidden hover:scale-105 ${
                selected 
                  ? 'border-[#FF0000] ring-2 ring-[#FF0000]/20 shadow-lg shadow-[#FF0000]/20' 
                  : 'border-[#525252] hover:border-[#FF0000] hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4 h-full flex flex-col">
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() => toggleSelection(channel.id)}
                    className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000] bg-[#1E1E1E] shadow-lg"
                  />
                </div>

                {/* Preview Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handlePreviewChannel(channel)}
                  className="absolute top-2 right-2 z-10 text-[#AAAAAA] hover:text-white hover:bg-[#333] p-1 h-auto"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>

                {/* Channel Photo */}
                <div className="flex justify-center mb-3 mt-2">
                  <div className="relative">
                    {channel.thumbnail ? (
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-12 h-12 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors bg-[#0D0D0D] flex items-center justify-center">
                        <User className="text-[#AAAAAA] h-6 w-6" />
                      </div>
                    )}
                    {/* Score Badge */}
                    <div className={`absolute -top-1 -right-1 ${getClassificationColor(analysis.classificacao)} text-white text-xs font-bold px-1.5 py-0.5 rounded-full`}>
                      {analysis.score}
                    </div>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="text-center mb-3">
                  <h3 className="font-bold text-white leading-tight text-sm line-clamp-2 mb-1">
                    {channel.title}
                  </h3>
                  
                  <div className="mb-2">
                    <Badge className={`${getClassificationColor(analysis.classificacao)} text-white text-xs`}>
                      {analysis.classificacao}
                    </Badge>
                  </div>
                  
                  <div className={`flex items-center gap-1 justify-center ${getScoreColor(analysis.score)}`}>
                    <ScoreIcon className="h-3 w-3" />
                    <span className="font-bold text-xs">{analysis.score}/100</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <Users className="text-[#FF0000] flex-shrink-0 h-3 w-3" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] block text-xs">Inscritos</span>
                      <p className="font-bold text-white truncate text-sm">{formatNumber(channel.subscriberCount)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <Eye className="text-blue-400 flex-shrink-0 h-3 w-3" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] block text-xs">Views totais</span>
                      <p className="font-bold text-blue-400 text-sm">{formatNumber(analysis.metrics.views_totais)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <TrendingUp className="text-[#4CAF50] flex-shrink-0 h-3 w-3" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] block text-xs">Crescimento/mês</span>
                      <p className="font-bold text-[#4CAF50] text-sm">{formatNumber(analysis.metrics.crescimento_subs_mes)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <Button 
                    onClick={() => onSendToAnalysis(channel)}
                    className="bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all border-0 w-full text-xs py-2"
                  >
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Ver Detalhes
                  </Button>

                  <Button 
                    asChild 
                    variant="outline"
                    className="border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all w-full text-xs py-1.5"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Ver Canal
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview Modal */}
      <ChannelPreviewModal
        channel={previewChannel}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onSendToAnalysis={onSendToAnalysis}
      />
    </div>
  );
});

ChannelResults.displayName = 'ChannelResults';
