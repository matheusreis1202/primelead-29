
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Users, Eye, TrendingUp, Target, Play, Award, BarChart3, Crown, User, Contact, Maximize2 } from 'lucide-react';
import { Channel } from '@/pages/Index';
import { useMultiSelection } from '@/hooks/useMultiSelection';
import { useAnalysisCache } from '@/hooks/useAnalysisCache';
import { BatchOperations } from '@/components/BatchOperations';
import { ChannelPreviewModal } from '@/components/ChannelPreviewModal';

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

  // Initialize cache hook
  const { getCachedAnalysis, setCachedAnalysis } = useAnalysisCache();

  const formatNumber = React.useCallback((num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  }, []);

  const getScoreColor = React.useCallback((score: number) => {
    if (score >= 85) return 'text-[#FF0000]';
    if (score >= 70) return 'text-white';
    if (score >= 55) return 'text-[#AAAAAA]';
    if (score >= 40) return 'text-blue-400';
    return 'text-orange-400';
  }, []);

  const getScoreLabel = React.useCallback((score: number) => {
    if (score >= 85) return 'PREMIUM';
    if (score >= 70) return 'ÓTIMO';
    if (score >= 55) return 'BOM';
    if (score >= 40) return 'RAZOÁVEL';
    return 'RUIM';
  }, []);

  const getScoreIcon = React.useCallback((score: number) => {
    if (score >= 85) return Crown;
    if (score >= 70) return Award;
    return TrendingUp;
  }, []);

  // Batch operations handlers
  const handleAnalyzeSelected = React.useCallback(() => {
    const selectedChannels = getSelectedItems();
    selectedChannels.forEach(channel => {
      onSendToAnalysis(channel);
      // Cache the analysis
      setCachedAnalysis(channel.id, {
        name: channel.title,
        subscribers: channel.subscriberCount,
        avgViews: channel.viewCount,
        monthlyVideos: 10, // Placeholder
        avgLikes: Math.floor(channel.viewCount * 0.03),
        avgComments: Math.floor(channel.viewCount * 0.005),
        subGrowth: 5 // Placeholder
      });
    });
    clearSelection();
  }, [getSelectedItems, onSendToAnalysis, setCachedAnalysis, clearSelection]);

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
            Canais <span className="text-[#FF0000]">Premium</span> Encontrados
          </h2>
          <p className="text-[#AAAAAA] text-xs">Ranqueados por algoritmo de performance avançado</p>
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
            {safeChannels.length} canais descobertos
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

      <div className={`grid gap-4 animate-fade-in ${
        viewMode === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {safeChannels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          const selected = isSelected(channel.id);
          
          return (
            <Card 
              key={channel.id} 
              className={`bg-[#1E1E1E] border transition-all duration-300 group relative overflow-hidden hover:scale-105 ${
                selected 
                  ? 'border-[#FF0000] ring-2 ring-[#FF0000]/20 shadow-lg shadow-[#FF0000]/20' 
                  : 'border-[#525252] hover:border-[#FF0000] hover:shadow-lg'
              } ${viewMode === 'list' ? 'flex' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className={`p-4 h-full flex ${viewMode === 'list' ? 'flex-row items-center gap-4' : 'flex-col'}`}>
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

                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute top-2 right-10 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Crown className="h-2.5 w-2.5" />
                    #{index + 1}
                  </div>
                )}

                {/* Channel Content */}
                <div className={`${viewMode === 'list' ? 'flex items-center gap-4 flex-1' : 'flex flex-col'}`}>
                  {/* Channel Photo */}
                  <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'flex justify-center mb-3 mt-2'}`}>
                    <div className="relative">
                      {channel.thumbnail ? (
                        <img 
                          src={channel.thumbnail} 
                          alt={channel.title}
                          className={`rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors object-cover ${
                            viewMode === 'list' ? 'w-16 h-16' : 'w-12 h-12'
                          }`}
                        />
                      ) : (
                        <div className={`rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors bg-[#0D0D0D] flex items-center justify-center ${
                          viewMode === 'list' ? 'w-16 h-16' : 'w-12 h-12'
                        }`}>
                          <User className={`text-[#AAAAAA] ${viewMode === 'list' ? 'h-8 w-8' : 'h-6 w-6'}`} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Channel Info */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'text-center mb-3'}`}>
                    <h3 className={`font-bold text-white leading-tight mb-1 line-clamp-2 ${
                      viewMode === 'list' ? 'text-base' : 'text-sm'
                    }`}>
                      {channel.title}
                    </h3>
                    
                    {channel.description && (
                      <p className={`text-[#AAAAAA] leading-relaxed mb-2 line-clamp-2 ${
                        viewMode === 'list' ? 'text-sm' : 'text-xs'
                      }`}>
                        {channel.description.slice(0, viewMode === 'list' ? 120 : 80)}...
                      </p>
                    )}
                    
                    <div className={`flex items-center gap-1 ${viewMode === 'list' ? 'justify-start' : 'justify-center'}`}>
                      <div className={`flex items-center gap-1 ${getScoreColor(channel.score)}`}>
                        <ScoreIcon className="h-3 w-3" />
                        <span className={`font-bold ${viewMode === 'list' ? 'text-sm' : 'text-xs'}`}>
                          {channel.score}/100
                        </span>
                      </div>
                    </div>
                    <div className={`${viewMode === 'list' ? 'text-left' : 'text-center'} mt-1`}>
                      <span className={`font-semibold ${getScoreColor(channel.score)} ${
                        viewMode === 'list' ? 'text-sm' : 'text-xs'
                      }`}>
                        {getScoreLabel(channel.score)}
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className={`${
                    viewMode === 'list' 
                      ? 'grid grid-cols-3 gap-3 flex-shrink-0 w-64' 
                      : 'space-y-2 mb-4 flex-1'
                  }`}>
                    <div className={`flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg ${
                      viewMode === 'list' ? 'flex-col text-center' : ''
                    }`}>
                      <Users className={`text-[#FF0000] flex-shrink-0 ${viewMode === 'list' ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-[#AAAAAA] block ${viewMode === 'list' ? 'text-xs' : 'text-xs'}`}>
                          Inscritos
                        </span>
                        <p className={`font-bold text-white truncate ${viewMode === 'list' ? 'text-sm' : 'text-sm'}`}>
                          {formatNumber(channel.subscriberCount)}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg ${
                      viewMode === 'list' ? 'flex-col text-center' : ''
                    }`}>
                      <Eye className={`text-[#FF0000] flex-shrink-0 ${viewMode === 'list' ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-[#AAAAAA] block ${viewMode === 'list' ? 'text-xs' : 'text-xs'}`}>
                          Views
                        </span>
                        <p className={`font-bold text-white truncate ${viewMode === 'list' ? 'text-sm' : 'text-sm'}`}>
                          {formatNumber(channel.viewCount)}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg ${
                      viewMode === 'list' ? 'flex-col text-center' : ''
                    }`}>
                      <TrendingUp className={`text-[#4CAF50] flex-shrink-0 ${viewMode === 'list' ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-[#AAAAAA] block ${viewMode === 'list' ? 'text-xs' : 'text-xs'}`}>
                          Engagement
                        </span>
                        <p className={`font-bold text-[#4CAF50] ${viewMode === 'list' ? 'text-sm' : 'text-sm'}`}>
                          {engagementRate.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`${
                    viewMode === 'list' 
                      ? 'flex gap-2 flex-shrink-0' 
                      : 'space-y-2 mt-auto'
                  }`}>
                    <Button 
                      onClick={() => onSendToAnalysis(channel)}
                      className={`bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all border-0 ${
                        viewMode === 'list' 
                          ? 'px-4 py-2 text-sm' 
                          : 'w-full text-xs py-2'
                      }`}
                    >
                      <BarChart3 className={`mr-1 ${viewMode === 'list' ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      {viewMode === 'list' ? 'Analisar' : 'Enviar para Análise'}
                    </Button>

                    <Button 
                      asChild 
                      variant="outline"
                      className={`border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all ${
                        viewMode === 'list' 
                          ? 'px-4 py-2 text-sm' 
                          : 'w-full text-xs py-1.5'
                      }`}
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        <Play className={`${viewMode === 'list' ? 'h-4 w-4' : 'h-3 w-3'}`} />
                        Ver Canal
                        <ExternalLink className={`${viewMode === 'list' ? 'h-3 w-3' : 'h-2.5 w-2.5'}`} />
                      </a>
                    </Button>
                  </div>
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
