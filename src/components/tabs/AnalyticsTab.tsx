
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Eye, TrendingUp, Award, Crown, Star, Download, CheckCircle, Instagram, Mail, MessageCircle, Video, Calendar, ThumbsUp } from 'lucide-react';
import { Channel } from '@/pages/Index';
import { useState, useEffect } from 'react';

interface ChannelAnalysis {
  channel: Channel;
  videosPerWeek: number;
  engagementRate: number;
  growthRate: string;
  lastUpload: string;
  avgViews: number;
  socialMedia: {
    instagram?: string;
    email?: string;
    tiktok?: string;
  };
  recommendation: 'Excelente' | 'Bom' | 'Regular' | 'Não Recomendado';
  analysis: string;
  isAnalyzing: boolean;
  isComplete: boolean;
}

interface AnalyticsTabProps {
  channels: Channel[];
  channelsForAnalysis: Channel[];
  onRemoveFromAnalysis: (channelId: string) => void;
}

export const AnalyticsTab = ({ channels, channelsForAnalysis, onRemoveFromAnalysis }: AnalyticsTabProps) => {
  const [analyses, setAnalyses] = useState<ChannelAnalysis[]>([]);

  useEffect(() => {
    // Quando novos canais chegam para análise
    channelsForAnalysis.forEach(channel => {
      if (!analyses.find(a => a.channel.id === channel.id)) {
        startAnalysis(channel);
      }
    });
  }, [channelsForAnalysis]);

  const startAnalysis = (channel: Channel) => {
    const newAnalysis: ChannelAnalysis = {
      channel,
      videosPerWeek: 0,
      engagementRate: 0,
      growthRate: '',
      lastUpload: '',
      avgViews: 0,
      socialMedia: {},
      recommendation: 'Regular',
      analysis: '',
      isAnalyzing: true,
      isComplete: false
    };

    setAnalyses(prev => [...prev, newAnalysis]);

    // Simular análise (em produção, isso seria uma call para API)
    setTimeout(() => {
      const analysisResult = performAnalysis(channel);
      
      setAnalyses(prev => prev.map(analysis => 
        analysis.channel.id === channel.id 
          ? { ...analysis, ...analysisResult, isAnalyzing: false, isComplete: true }
          : analysis
      ));
    }, 3000);
  };

  const performAnalysis = (channel: Channel): Partial<ChannelAnalysis> => {
    const engagementRate = (channel.viewCount / channel.subscriberCount) * 100;
    const videosPerWeek = Math.floor(Math.random() * 7) + 1;
    const avgViews = Math.floor(channel.viewCount / (Math.random() * 100 + 50));
    
    // Simulação de dados de redes sociais (em produção, viria da API)
    const socialMedia = {
      instagram: Math.random() > 0.5 ? `@${channel.title.toLowerCase().replace(/\s+/g, '')}` : undefined,
      email: Math.random() > 0.7 ? `contato@${channel.title.toLowerCase().replace(/\s+/g, '')}.com` : undefined,
      tiktok: Math.random() > 0.6 ? `@${channel.title.toLowerCase().replace(/\s+/g, '')}` : undefined,
    };

    let recommendation: 'Excelente' | 'Bom' | 'Regular' | 'Não Recomendado' = 'Regular';
    let analysis = '';

    if (engagementRate > 5 && channel.subscriberCount > 100000) {
      recommendation = 'Excelente';
      analysis = 'Canal com excelente engajamento e boa base de inscritos. Ideal para parcerias estratégicas.';
    } else if (engagementRate > 3 && channel.subscriberCount > 50000) {
      recommendation = 'Bom';
      analysis = 'Canal com bom potencial de parceria. Engajamento adequado e crescimento consistente.';
    } else if (engagementRate > 1) {
      recommendation = 'Regular';
      analysis = 'Canal com potencial moderado. Recomenda-se análise mais detalhada antes de parcerias.';
    } else {
      recommendation = 'Não Recomendado';
      analysis = 'Canal com baixo engajamento. Não recomendado para parcerias no momento.';
    }

    return {
      videosPerWeek,
      engagementRate,
      growthRate: `+${Math.floor(Math.random() * 20 + 5)}%`,
      lastUpload: `${Math.floor(Math.random() * 7 + 1)} dias atrás`,
      avgViews,
      socialMedia,
      recommendation,
      analysis
    };
  };

  const exportToGoogleSheets = (analysis: ChannelAnalysis) => {
    // Em produção, isso seria uma integração real com Google Sheets API
    const data = {
      'Nome do Canal': analysis.channel.title,
      'ID do Canal': analysis.channel.id,
      'Inscritos': analysis.channel.subscriberCount,
      'Views Totais': analysis.channel.viewCount,
      'Score': analysis.channel.score,
      'Vídeos por Semana': analysis.videosPerWeek,
      'Taxa de Engajamento': `${analysis.engagementRate.toFixed(2)}%`,
      'Taxa de Crescimento': analysis.growthRate,
      'Último Upload': analysis.lastUpload,
      'Média de Views': analysis.avgViews,
      'Instagram': analysis.socialMedia.instagram || 'Não encontrado',
      'Email': analysis.socialMedia.email || 'Não encontrado',
      'TikTok': analysis.socialMedia.tiktok || 'Não encontrado',
      'Recomendação': analysis.recommendation,
      'Análise': analysis.analysis
    };

    // Simular download
    console.log('Exportando para Google Sheets:', data);
    alert('Dados exportados com sucesso para o Google Sheets!');
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Excelente': return 'bg-green-500';
      case 'Bom': return 'bg-blue-500';
      case 'Regular': return 'bg-yellow-500';
      case 'Não Recomendado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
          <TrendingUp className="h-16 w-16 text-youtube-white" />
        </div>
        <h3 className="text-3xl font-bold text-youtube-white mb-4 font-orbitron">Nenhuma Análise Iniciada</h3>
        <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-inter">
          Vá para a aba "Resultados" e clique em "Enviar para Análise" em qualquer canal para começar uma análise detalhada.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-youtube-white font-orbitron mb-2">
            Análises Detalhadas
          </h2>
          <p className="text-youtube-gray font-inter">
            Análise completa dos canais selecionados para parceria
          </p>
        </div>
        <Badge className="bg-youtube-red text-youtube-white font-orbitron">
          {analyses.length} em análise
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {analyses.map((analysis) => (
          <Card key={analysis.channel.id} className="tech-card relative">
            {/* Notificação de Análise Completa */}
            {analysis.isComplete && (
              <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xl futuristic-glow font-orbitron flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Análise Feita
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                {analysis.channel.thumbnail && (
                  <img 
                    src={analysis.channel.thumbnail} 
                    alt={analysis.channel.title}
                    className="w-12 h-12 rounded-lg border border-youtube-red"
                  />
                )}
                <div className="flex-1">
                  <CardTitle className="text-youtube-white text-lg font-orbitron line-clamp-1">
                    {analysis.channel.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${getRecommendationColor(analysis.recommendation)} text-white text-xs`}>
                      {analysis.recommendation}
                    </Badge>
                    {analysis.isAnalyzing && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                        Analisando...
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {analysis.isAnalyzing ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-youtube-red"></div>
                  <span className="ml-3 text-youtube-gray font-inter">Analisando canal...</span>
                </div>
              ) : (
                <>
                  {/* Métricas Principais */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Video className="h-4 w-4 text-youtube-red" />
                        <span className="text-xs text-youtube-gray font-inter">Vídeos/Semana</span>
                      </div>
                      <div className="text-lg font-bold text-youtube-white font-orbitron">
                        {analysis.videosPerWeek}
                      </div>
                    </div>

                    <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-xs text-youtube-gray font-inter">Engajamento</span>
                      </div>
                      <div className="text-lg font-bold text-green-400 font-orbitron">
                        {analysis.engagementRate.toFixed(1)}%
                      </div>
                    </div>

                    <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-youtube-red" />
                        <span className="text-xs text-youtube-gray font-inter">Crescimento</span>
                      </div>
                      <div className="text-lg font-bold text-youtube-white font-orbitron">
                        {analysis.growthRate}
                      </div>
                    </div>

                    <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-youtube-red" />
                        <span className="text-xs text-youtube-gray font-inter">Último Upload</span>
                      </div>
                      <div className="text-lg font-bold text-youtube-white font-orbitron">
                        {analysis.lastUpload}
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociais */}
                  <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                    <h4 className="text-sm font-semibold text-youtube-white mb-2 font-orbitron">Redes Sociais</h4>
                    <div className="space-y-2">
                      {analysis.socialMedia.instagram && (
                        <div className="flex items-center gap-2 text-xs">
                          <Instagram className="h-3 w-3 text-pink-400" />
                          <span className="text-youtube-gray">Instagram:</span>
                          <span className="text-youtube-white">{analysis.socialMedia.instagram}</span>
                        </div>
                      )}
                      {analysis.socialMedia.email && (
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="h-3 w-3 text-blue-400" />
                          <span className="text-youtube-gray">Email:</span>
                          <span className="text-youtube-white">{analysis.socialMedia.email}</span>
                        </div>
                      )}
                      {analysis.socialMedia.tiktok && (
                        <div className="flex items-center gap-2 text-xs">
                          <MessageCircle className="h-3 w-3 text-purple-400" />
                          <span className="text-youtube-gray">TikTok:</span>
                          <span className="text-youtube-white">{analysis.socialMedia.tiktok}</span>
                        </div>
                      )}
                      {!analysis.socialMedia.instagram && !analysis.socialMedia.email && !analysis.socialMedia.tiktok && (
                        <span className="text-xs text-youtube-gray">Nenhuma rede social encontrada</span>
                      )}
                    </div>
                  </div>

                  {/* Análise */}
                  <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                    <h4 className="text-sm font-semibold text-youtube-white mb-2 font-orbitron">Análise de Parceria</h4>
                    <p className="text-xs text-youtube-gray font-inter leading-relaxed">
                      {analysis.analysis}
                    </p>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => exportToGoogleSheets(analysis)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 text-xs font-inter"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Exportar
                    </Button>
                    <Button 
                      onClick={() => onRemoveFromAnalysis(analysis.channel.id)}
                      variant="outline" 
                      className="border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white py-2 text-xs font-inter"
                    >
                      Remover
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
