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
  onSendToPlanilha?: (channel: any) => void;
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
    // Calculando dados mais realistas baseados no canal
    const avgViews = Math.floor(channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 50)));
    const engagementRate = (avgViews / channel.subscriberCount) * 100;
    
    return {
      name: channel.title,
      subscribers: channel.subscriberCount,
      avgViews: avgViews,
      monthlyVideos: Math.floor(Math.random() * 20) + 5, // Entre 5-25 vídeos por mês
      avgLikes: Math.floor(avgViews * 0.05), // 5% de likes em relação às views
      avgComments: Math.floor(avgViews * 0.01), // 1% de comentários em relação às views
      subGrowth: Math.floor(Math.random() * 50) + 10 // Entre 10-60% de crescimento
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
    const analysisData = analyzedChannels.get(channel.id);
    
    if (analysisData) {
      // Calculando engajamento real
      const engagementRate = ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews * 100).toFixed(1);
      
      // Calculando score baseado nos dados analisados
      const calculateScore = (data: ChannelData) => {
        let score = 0;
        
        // Pontuação baseada em inscritos
        if (data.subscribers > 1000000) score += 20;
        else if (data.subscribers > 500000) score += 15;
        else if (data.subscribers > 100000) score += 10;
        else if (data.subscribers > 10000) score += 5;
        
        // Pontuação baseada em views médias
        if (data.avgViews > 100000) score += 20;
        else if (data.avgViews > 50000) score += 15;
        else if (data.avgViews > 10000) score += 10;
        else if (data.avgViews > 1000) score += 5;
        
        // Pontuação baseada em frequência
        if (data.monthlyVideos > 20) score += 15;
        else if (data.monthlyVideos > 10) score += 10;
        else if (data.monthlyVideos > 5) score += 5;
        
        // Pontuação baseada em engajamento
        const engagement = (data.avgLikes + data.avgComments) / data.avgViews * 100;
        if (engagement > 10) score += 15;
        else if (engagement > 5) score += 10;
        else if (engagement > 2) score += 5;
        
        // Pontuação baseada em crescimento
        if (data.subGrowth > 50) score += 10;
        else if (data.subGrowth > 20) score += 7;
        else if (data.subGrowth > 10) score += 5;
        
        return Math.min(score, 100); // Máximo 100
      };
      
      const score = calculateScore(analysisData);
      
      // Classificação baseada no score
      let classification = 'Baixo Potencial';
      if (score >= 80) classification = 'Altíssimo Potencial';
      else if (score >= 60) classification = 'Grande Potencial';
      else if (score >= 40) classification = 'Médio Potencial';
      
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
      
      onSendToPlanilha?.(channelForPlanilha);
    } else {
      // Se não foi analisado ainda, enviar dados básicos
      onSendToPlanilha?.(channel);
    }
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
