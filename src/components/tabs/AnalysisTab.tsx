import { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { BarChart3, Target, Brain, FileSpreadsheet, Contact } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Channel } from '@/pages/Index';
import YouTubeChannelAnalysis from '@/components/YouTubeChannelAnalysis';

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
  channelsForAnalysis: Channel[];
  onRemoveFromAnalysis: (channelId: string) => void;
  onSendToPlanilha?: (channel: Channel) => void;
  onSendToPartners?: (channel: Channel) => void;
}

export const AnalysisTab = ({ 
  channelsForAnalysis, 
  onRemoveFromAnalysis, 
  onSendToPlanilha,
  onSendToPartners
}: AnalysisTabProps) => {
  const [analyzedChannels, setAnalyzedChannels] = useState<Map<string, ChannelData>>(new Map());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const convertChannelToAnalysisData = (channel: Channel): ChannelData => {
    // Simulando dados para demonstração - em um cenário real, estes dados viriam da API
    return {
      name: channel.title,
      subscribers: channel.subscriberCount,
      avgViews: Math.floor(channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 100))),
      monthlyVideos: Math.floor(Math.random() * 30) + 1,
      avgLikes: Math.floor(Math.random() * 5000) + 100,
      avgComments: Math.floor(Math.random() * 500) + 10,
      subGrowth: Math.floor(Math.random() * 100) + 1
    };
  };

  const handleAnalyzeAll = async () => {
    setIsAnalyzing(true);
    
    // Simula análise de todos os canais
    const newAnalyzedChannels = new Map(analyzedChannels);
    
    for (const channel of channelsForAnalysis) {
      if (!newAnalyzedChannels.has(channel.id)) {
        const analysisData = convertChannelToAnalysisData(channel);
        newAnalyzedChannels.set(channel.id, analysisData);
      }
    }
    
    setAnalyzedChannels(newAnalyzedChannels);
    setIsAnalyzing(false);
  };

  const handleAnalyzeIndividual = (channel: Channel) => {
    if (!analyzedChannels.has(channel.id)) {
      const analysisData = convertChannelToAnalysisData(channel);
      setAnalyzedChannels(prev => new Map(prev).set(channel.id, analysisData));
    }
  };

  const handleSendToPlanilha = (channel: Channel) => {
    onSendToPlanilha?.(channel);
  };

  const handleSendToPartners = (channel: Channel) => {
    onSendToPartners?.(channel);
  };

  const handleVerContatos = (channel: Channel) => {
    const channelSearchUrl = `https://www.youtube.com/@${channel.title.replace(/\s+/g, '')}/about`;
    window.open(channelSearchUrl, '_blank');
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

        {channelsForAnalysis.length > analyzedChannels.size && (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {channelsForAnalysis.map(channel => {
          const analysisData = analyzedChannels.get(channel.id);
          
          return (
            <div key={channel.id} className="space-y-4">
              {!analysisData ? (
                <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {channel.thumbnail && (
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-16 h-16 rounded-lg border border-[#525252]"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{channel.title}</h3>
                      <p className="text-[#AAAAAA] text-sm">{channel.subscriberCount.toLocaleString()} inscritos</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAnalyzeIndividual(channel)}
                      className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Analisar Canal
                    </Button>
                    <Button 
                      onClick={() => onRemoveFromAnalysis(channel.id)}
                      variant="outline"
                      className="border-[#333] bg-[#1f1f1f] text-[#AAAAAA] hover:bg-[#444] hover:border-[#444]"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#1E1E1E] border border-[#333] rounded-lg overflow-hidden">
                  <YouTubeChannelAnalysis channelData={analysisData} />
                  <div className="p-4 border-t border-[#333] flex gap-2">
                    <Button 
                      onClick={() => handleSendToPlanilha(channel)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Enviar para Planilha
                    </Button>
                    
                    <Button 
                      onClick={() => handleVerContatos(channel)}
                      className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white"
                    >
                      <Contact className="h-4 w-4 mr-2" />
                      Contato
                    </Button>
                    
                    <Button 
                      onClick={() => onRemoveFromAnalysis(channel.id)}
                      variant="outline"
                      className="border-[#333] bg-[#1f1f1f] text-[#AAAAAA] hover:bg-[#444] hover:border-[#444]"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
