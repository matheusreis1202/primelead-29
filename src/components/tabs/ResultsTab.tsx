
import React, { useState } from 'react';
import { ChannelResults } from '@/components/ChannelResults';
import { UltraFastResultsFilters } from '@/components/UltraFastResultsFilters';
import { MinimalChannelSkeleton } from '@/components/MinimalChannelSkeleton';
import { Search, Target, Play, Database, Filter } from 'lucide-react';
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
            Processando Canais <span className="text-[#AAAAAA]">Premium</span>
          </h2>
          <p className="text-[#AAAAAA] text-xs mb-4">Analisando canais com alta performance...</p>
        </div>
        
        <div className={`grid gap-4 ${
          viewMode === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        }`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <MinimalChannelSkeleton key={index} viewMode={viewMode} index={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-8 mb-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="bg-[#333] p-3 rounded-full">
            <Search className="h-6 w-6 text-[#AAAAAA]" />
          </div>
          <p className="text-[#AAAAAA] font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (channels.length > 0) {
    return (
      <div className="space-y-4 animate-fade-in">
        <UltraFastResultsFilters
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
      {/* Animated Icon with floating elements */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#333] rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-[#333] to-[#1E1E1E] p-8 rounded-full shadow-2xl">
          <Target className="h-16 w-16 text-[#AAAAAA] animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        
        {/* Orbiting elements - apenas cores neutras */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 animate-bounce">
          <div className="bg-[#333] p-2 rounded-full">
            <Database className="h-3 w-3 text-[#AAAAAA]" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 animate-pulse">
          <div className="bg-[#525252] p-2 rounded-full">
            <Filter className="h-3 w-3 text-white" />
          </div>
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-[#404040] p-2 rounded-full">
            <Search className="h-3 w-3 text-[#CCCCCC]" />
          </div>
        </div>
      </div>

      {/* Main message */}
      <h3 className="text-3xl font-bold text-white mb-4 animate-fade-in">Nenhum Resultado Ainda</h3>
      <p className="text-[#AAAAAA] max-w-lg text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
        Use a aba Dashboard para configurar seus filtros de busca e encontrar canais premium do YouTube.
      </p>

      {/* Stats during empty state */}
      <div className="grid grid-cols-3 gap-6 mt-8 text-center">
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-4">
            <Target className="h-6 w-6 text-[#AAAAAA] mx-auto mb-2" />
            <p className="text-[#AAAAAA] text-sm font-medium">Busca</p>
            <p className="text-white text-xs">Inteligente</p>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-4">
            <Database className="h-6 w-6 text-[#AAAAAA] mx-auto mb-2" />
            <p className="text-[#AAAAAA] text-sm font-medium">Dados</p>
            <p className="text-white text-xs">Premium</p>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-4">
            <Filter className="h-6 w-6 text-[#AAAAAA] mx-auto mb-2" />
            <p className="text-[#AAAAAA] text-sm font-medium">Filtros</p>
            <p className="text-white text-xs">Avançados</p>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-8 flex items-center gap-2 text-[#AAAAAA] animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <Play className="h-5 w-5 fill-current" />
        <span className="font-semibold">Powered by YouTube Data API</span>
      </div>
    </div>
  );
};
