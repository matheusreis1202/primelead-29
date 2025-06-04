
import React, { useState } from 'react';
import { ChannelResults } from '@/components/ChannelResults';
import { ResultsFilters } from '@/components/ResultsFilters';
import { ChannelCardSkeleton } from '@/components/ChannelCardSkeleton';
import { Search, Target, Play } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ResultsTabProps {
  channels: Channel[];
  isLoading: boolean;
  error: string | null;
  onSendToAnalysis: (channel: Channel) => void;
}

export const ResultsTab = ({ channels, isLoading, error, onSendToAnalysis }: ResultsTabProps) => {
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(channels);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Update filtered channels when original channels change
  React.useEffect(() => {
    setFilteredChannels(channels);
  }, [channels]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-white mb-1">
            Carregando Canais <span className="text-[#FF0000]">Premium</span>
          </h2>
          <p className="text-[#AAAAAA] text-xs mb-4">Analisando canais com IA avançada...</p>
        </div>
        
        <div className={`grid gap-4 ${
          viewMode === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        }`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ChannelCardSkeleton key={index} viewMode={viewMode} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-youtube-red/10 border border-youtube-red/30 rounded-lg p-8 mb-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="bg-youtube-red p-3 rounded-full futuristic-glow">
            <Search className="h-6 w-6 text-youtube-white" />
          </div>
          <p className="text-youtube-red font-semibold text-lg font-roboto">{error}</p>
        </div>
      </div>
    );
  }

  if (channels.length > 0) {
    return (
      <div className="space-y-4 animate-fade-in">
        <ResultsFilters
          channels={channels}
          onFiltersChange={setFilteredChannels}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
        />
        <ChannelResults 
          channels={filteredChannels} 
          onSendToAnalysis={onSendToAnalysis}
          viewMode={viewMode}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
        <Target className="h-16 w-16 text-youtube-white" />
      </div>
      <h3 className="text-3xl font-bold text-youtube-white mb-4 font-roboto">Nenhum Resultado Ainda</h3>
      <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-roboto">
        Use a aba Dashboard para configurar seus filtros de busca e encontrar canais premium do YouTube.
      </p>
      <div className="mt-6 flex items-center gap-2 text-youtube-red">
        <Play className="h-5 w-5 fill-current" />
        <span className="font-semibold font-roboto">Powered by YouTube Data API</span>
      </div>
    </div>
  );
};
