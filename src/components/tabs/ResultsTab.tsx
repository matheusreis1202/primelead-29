
import { ChannelResults } from '@/components/ChannelResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search, Target, Play } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ResultsTabProps {
  channels: Channel[];
  isLoading: boolean;
  error: string | null;
}

export const ResultsTab = ({ channels, isLoading, error }: ResultsTabProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <LoadingSpinner />
        <p className="text-youtube-white mt-6 text-xl font-inter">Analisando canais premium com IA...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-youtube-red/10 border border-youtube-red/30 rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-youtube-red p-3 rounded-full futuristic-glow">
            <Search className="h-6 w-6 text-youtube-white" />
          </div>
          <p className="text-youtube-red font-semibold text-lg font-inter">{error}</p>
        </div>
      </div>
    );
  }

  if (channels.length > 0) {
    return <ChannelResults channels={channels} />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
        <Target className="h-16 w-16 text-youtube-white" />
      </div>
      <h3 className="text-3xl font-bold text-youtube-white mb-4 font-orbitron">Nenhum Resultado Ainda</h3>
      <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-inter">
        Use a aba Dashboard para configurar seus filtros de busca e encontrar canais premium do YouTube.
      </p>
      <div className="mt-6 flex items-center gap-2 text-youtube-red">
        <Play className="h-5 w-5 fill-current" />
        <span className="font-semibold font-orbitron">Powered by YouTube Data API</span>
      </div>
    </div>
  );
};
