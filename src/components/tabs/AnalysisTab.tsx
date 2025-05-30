
import { useState } from 'react';
import { ChannelAnalysisCard } from '@/components/ChannelAnalysisCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { BarChart3, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Channel } from '@/pages/Index';

interface ChannelAnalysis {
  id: string;
  audienciaSize: {
    inscritos: number;
    views: number;
    classificacao: 'Pequena' | 'Média' | 'Grande' | 'Mega';
  };
  engajamento: {
    mediaViews: number;
    taxaEngajamento: number;
    classificacao: 'Baixo' | 'Médio' | 'Alto' | 'Excelente';
  };
  nicho: {
    categoria: string;
    publicoAlvo: string;
    relevancia: 'Baixa' | 'Média' | 'Alta';
  };
  qualidadeConteudo: {
    estilo: string;
    consistencia: 'Baixa' | 'Média' | 'Alta';
    nota: number;
  };
  frequencia: {
    uploadsPerMes: number;
    consistencia: 'Irregular' | 'Regular' | 'Muito Regular';
  };
  crescimento: {
    tendencia: 'Decrescente' | 'Estável' | 'Crescente' | 'Em Alta';
    velocidade: 'Lenta' | 'Moderada' | 'Rápida';
  };
  tipoPublico: {
    genero: 'Masculino' | 'Feminino' | 'Misto';
    faixaEtaria: string;
    localizacao: string;
  };
  partnershipScore: {
    overall: number;
    audienceSize: number;
    engagement: number;
    consistency: number;
    content: number;
    reachability: number;
  };
  socialMedia: {
    email?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}

interface AnalysisTabProps {
  channelsForAnalysis: Channel[];
  onRemoveFromAnalysis: (channelId: string) => void;
  onSaveChannel: (channel: Channel) => void;
  isChannelSaved: (channelId: string) => boolean;
}

export const AnalysisTab = ({ 
  channelsForAnalysis, 
  onRemoveFromAnalysis, 
  onSaveChannel,
  isChannelSaved 
}: AnalysisTabProps) => {
  const [analyzedChannels, setAnalyzedChannels] = useState<ChannelAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeChannel = (channel: Channel): ChannelAnalysis => {
    const engagementRate = (channel.viewCount / channel.subscriberCount) * 100;
    const avgViews = channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 1000));

    // Simular score de parceria mais realista
    const audienceScore = channel.subscriberCount > 100000 ? 20 : channel.subscriberCount > 10000 ? 15 : 10;
    const engagementScore = engagementRate > 5 ? 20 : engagementRate > 2 ? 15 : 10;
    const consistencyScore = 15;
    const contentScore = 12;
    const reachabilityScore = Math.floor(Math.random() * 10) + 5;
    
    const overallScore = audienceScore + engagementScore + consistencyScore + contentScore + reachabilityScore;

    return {
      id: channel.id,
      audienciaSize: {
        inscritos: channel.subscriberCount,
        views: channel.viewCount,
        classificacao: channel.subscriberCount > 1000000 ? 'Mega' : 
                      channel.subscriberCount > 100000 ? 'Grande' :
                      channel.subscriberCount > 10000 ? 'Média' : 'Pequena'
      },
      engajamento: {
        mediaViews: avgViews,
        taxaEngajamento: engagementRate,
        classificacao: engagementRate > 10 ? 'Excelente' :
                      engagementRate > 5 ? 'Alto' :
                      engagementRate > 2 ? 'Médio' : 'Baixo'
      },
      nicho: {
        categoria: 'Entretenimento',
        publicoAlvo: 'Jovens adultos',
        relevancia: 'Alta'
      },
      qualidadeConteudo: {
        estilo: 'Profissional',
        consistencia: 'Alta',
        nota: Math.floor(Math.random() * 3) + 8
      },
      frequencia: {
        uploadsPerMes: Math.floor(Math.random() * 8) + 2,
        consistencia: 'Regular'
      },
      crescimento: {
        tendencia: 'Crescente',
        velocidade: 'Moderada'
      },
      tipoPublico: {
        genero: ['Masculino', 'Feminino', 'Misto'][Math.floor(Math.random() * 3)] as any,
        faixaEtaria: '18-34 anos',
        localizacao: 'Brasil'
      },
      partnershipScore: {
        overall: overallScore,
        audienceSize: audienceScore,
        engagement: engagementScore,
        consistency: consistencyScore,
        content: contentScore,
        reachability: reachabilityScore
      },
      socialMedia: {
        email: Math.random() > 0.7 ? 'contato@exemplo.com' : undefined,
        instagram: Math.random() > 0.6 ? 'https://instagram.com/canal' : undefined,
        tiktok: Math.random() > 0.8 ? 'https://tiktok.com/@canal' : undefined,
        website: Math.random() > 0.9 ? 'https://website.com' : undefined
      }
    };
  };

  const handleAnalyzeAll = async () => {
    setIsAnalyzing(true);
    
    // Análise instantânea de todos os canais
    const analyses = channelsForAnalysis
      .filter(channel => !analyzedChannels.find(a => a.id === channel.id))
      .map(channel => analyzeChannel(channel));
    
    setAnalyzedChannels(prev => [...prev, ...analyses]);
    setIsAnalyzing(false);
  };

  const handleAnalyzeIndividual = (channel: Channel) => {
    if (!analyzedChannels.find(a => a.id === channel.id)) {
      const analysis = analyzeChannel(channel);
      setAnalyzedChannels(prev => [...prev, analysis]);
    }
  };

  if (channelsForAnalysis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
          <Brain className="h-16 w-16 text-youtube-white" />
        </div>
        <h3 className="text-3xl font-bold text-youtube-white mb-4 font-roboto">
          Nenhum Canal para Análise
        </h3>
        <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-roboto">
          Vá para a aba Resultados e clique em "Enviar para Análise" nos canais que deseja analisar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
            <BarChart3 className="h-6 w-6 text-youtube-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-youtube-white font-roboto">
              Análise Detalhada de Canais
            </h2>
            <p className="text-youtube-gray font-roboto">
              {channelsForAnalysis.length} canal(is) na fila para análise
            </p>
          </div>
        </div>

        {channelsForAnalysis.length > analyzedChannels.length && (
          <Button 
            onClick={handleAnalyzeAll}
            disabled={isAnalyzing}
            className="futuristic-button"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-youtube-white/30 border-t-youtube-white rounded-full animate-spin"></div>
                Analisando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Analisar Todos
              </div>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {channelsForAnalysis.map(channel => {
          const analysis = analyzedChannels.find(a => a.id === channel.id);
          return (
            <ChannelAnalysisCard
              key={channel.id}
              channel={channel}
              analysis={analysis}
              onRemove={() => onRemoveFromAnalysis(channel.id)}
              onAnalyze={() => handleAnalyzeIndividual(channel)}
              onSave={() => onSaveChannel(channel)}
              showSaveButton={true}
              isSaved={isChannelSaved(channel.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
