
import { useState } from 'react';
import { ChannelAnalysisCard } from '@/components/ChannelAnalysisCard';
import { Bookmark, Heart } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface SavedTabProps {
  savedChannels: Channel[];
  onRemoveFromSaved: (channelId: string) => void;
}

export const SavedTab = ({ savedChannels, onRemoveFromSaved }: SavedTabProps) => {
  const [analyzedChannels, setAnalyzedChannels] = useState<any[]>([]);

  const handleAnalyzeIndividual = (channel: Channel) => {
    if (!analyzedChannels.find(a => a.id === channel.id)) {
      // Análise básica para canais salvos
      const analysis = {
        id: channel.id,
        audienciaSize: {
          inscritos: channel.subscriberCount,
          views: channel.viewCount,
          classificacao: channel.subscriberCount > 1000000 ? 'Mega' : 
                        channel.subscriberCount > 100000 ? 'Grande' :
                        channel.subscriberCount > 10000 ? 'Média' : 'Pequena'
        },
        engajamento: {
          mediaViews: channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 1000)),
          taxaEngajamento: (channel.viewCount / channel.subscriberCount) * 100,
          classificacao: 'Médio'
        },
        nicho: {
          categoria: 'Geral',
          publicoAlvo: 'Variado',
          relevancia: 'Alta'
        },
        qualidadeConteudo: {
          estilo: 'Profissional',
          consistencia: 'Alta',
          nota: 8
        },
        frequencia: {
          uploadsPerMes: 4,
          consistencia: 'Regular'
        },
        crescimento: {
          tendencia: 'Crescente',
          velocidade: 'Moderada'
        },
        tipoPublico: {
          genero: 'Misto',
          faixaEtaria: '18-34 anos',
          localizacao: 'Brasil'
        },
        partnershipScore: {
          overall: 75,
          audienceSize: 20,
          engagement: 15,
          consistency: 15,
          content: 12,
          reachability: 13
        },
        socialMedia: {
          email: 'contato@exemplo.com',
          instagram: undefined,
          tiktok: undefined,
          website: undefined
        }
      };
      setAnalyzedChannels(prev => [...prev, analysis]);
    }
  };

  if (savedChannels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
          <Heart className="h-16 w-16 text-youtube-white" />
        </div>
        <h3 className="text-3xl font-bold text-youtube-white mb-4 font-roboto">
          Nenhum Canal Salvo
        </h3>
        <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-roboto">
          Vá para a aba Análises e clique no ícone de coração para salvar canais interessantes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
          <Bookmark className="h-6 w-6 text-youtube-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-youtube-white font-roboto">
            Canais Salvos
          </h2>
          <p className="text-youtube-gray font-roboto">
            {savedChannels.length} canal(is) salvos para análise futura
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {savedChannels.map(channel => {
          const analysis = analyzedChannels.find(a => a.id === channel.id);
          return (
            <ChannelAnalysisCard
              key={channel.id}
              channel={channel}
              analysis={analysis}
              onRemove={() => onRemoveFromSaved(channel.id)}
              onAnalyze={() => handleAnalyzeIndividual(channel)}
              showSaveButton={false}
              isSaved={true}
            />
          );
        })}
      </div>
    </div>
  );
};
