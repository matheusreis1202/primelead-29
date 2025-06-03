
import { useState } from 'react';
import { X, BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Channel } from '@/pages/Index';

interface ChannelData {
  name: string;
  subscribers: number;
  avgViews: number;
  monthlyVideos: number;
  avgLikes: number;
  avgComments: number;
  subGrowth: number;
}

interface ChannelComparisonProps {
  channels: Array<{
    channel: Channel;
    analysisData?: ChannelData;
  }>;
  onClose: () => void;
}

export const ChannelComparison = ({ channels, onClose }: ChannelComparisonProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'subscribers' | 'avgViews' | 'engagement' | 'growth'>('subscribers');

  const calculateEngagement = (data: ChannelData) => {
    return ((data.avgLikes + data.avgComments) / data.avgViews * 100);
  };

  const calculateScore = (data: ChannelData) => {
    let score = 0;
    
    // Score baseado em inscritos (25 pontos)
    if (data.subscribers > 1000000) score += 25;
    else if (data.subscribers > 500000) score += 20;
    else if (data.subscribers > 100000) score += 15;
    else if (data.subscribers > 50000) score += 10;
    else if (data.subscribers > 10000) score += 5;
    
    // Score baseado em views (25 pontos)
    if (data.avgViews > 500000) score += 25;
    else if (data.avgViews > 100000) score += 20;
    else if (data.avgViews > 50000) score += 15;
    else if (data.avgViews > 10000) score += 10;
    else if (data.avgViews > 1000) score += 5;
    
    // Score baseado em frequência (20 pontos)
    if (data.monthlyVideos > 20) score += 20;
    else if (data.monthlyVideos > 15) score += 15;
    else if (data.monthlyVideos > 10) score += 10;
    else if (data.monthlyVideos > 5) score += 5;
    
    // Score baseado em engajamento (20 pontos)
    const engagement = calculateEngagement(data);
    if (engagement > 8) score += 20;
    else if (engagement > 5) score += 15;
    else if (engagement > 3) score += 10;
    else if (engagement > 1) score += 5;
    
    // Score baseado em crescimento (10 pontos)
    if (data.subGrowth > 40) score += 10;
    else if (data.subGrowth > 25) score += 8;
    else if (data.subGrowth > 15) score += 6;
    else if (data.subGrowth > 10) score += 4;
    else if (data.subGrowth > 5) score += 2;
    
    return Math.min(score, 100);
  };

  const getMetricValue = (data: ChannelData, metric: string) => {
    switch (metric) {
      case 'subscribers':
        return data.subscribers;
      case 'avgViews':
        return data.avgViews;
      case 'engagement':
        return calculateEngagement(data);
      case 'growth':
        return data.subGrowth;
      default:
        return 0;
    }
  };

  const getMaxValue = (metric: string) => {
    const values = channels
      .filter(ch => ch.analysisData)
      .map(ch => getMetricValue(ch.analysisData!, metric));
    return Math.max(...values, 1);
  };

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'subscribers':
      case 'avgViews':
        return value.toLocaleString();
      case 'engagement':
        return `${value.toFixed(1)}%`;
      case 'growth':
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  if (channels.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#1e1e1e] border-[#333] max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-[#333]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF0000] rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Comparação de Canais</CardTitle>
                <p className="text-[#AAAAAA] text-sm mt-1">
                  Comparando {channels.length} canais lado a lado
                </p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-[#AAAAAA] hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Seletor de Métrica */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { key: 'subscribers', label: 'Inscritos', icon: Users },
              { key: 'avgViews', label: 'Visualizações', icon: Eye },
              { key: 'engagement', label: 'Engajamento', icon: Heart },
              { key: 'growth', label: 'Crescimento', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={selectedMetric === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric(key as any)}
                className={selectedMetric === key ? 
                  'bg-[#FF0000] text-white' : 
                  'border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]'
                }
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>

          {/* Comparação Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map(({ channel, analysisData }, index) => {
              if (!analysisData) {
                return (
                  <Card key={channel.id} className="bg-[#0D0D0D] border-[#333]">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={channel.thumbnail} 
                          alt={channel.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{channel.title}</h3>
                          <p className="text-[#AAAAAA] text-sm">
                            {channel.subscriberCount.toLocaleString()} inscritos
                          </p>
                        </div>
                      </div>
                      <div className="text-center py-8">
                        <p className="text-[#AAAAAA]">Não analisado</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              const score = calculateScore(analysisData);
              const metricValue = getMetricValue(analysisData, selectedMetric);
              const maxValue = getMaxValue(selectedMetric);
              const percentage = (metricValue / maxValue) * 100;

              return (
                <Card key={channel.id} className="bg-[#0D0D0D] border-[#333]">
                  <CardContent className="p-4">
                    {/* Header do Canal */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{channel.title}</h3>
                        <p className="text-[#AAAAAA] text-sm">
                          {analysisData.subscribers.toLocaleString()} inscritos
                        </p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={`${
                          score >= 80 ? 'bg-green-600' :
                          score >= 60 ? 'bg-blue-600' :
                          score >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                        } text-white`}
                      >
                        {score}
                      </Badge>
                    </div>

                    {/* Métrica Principal */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#AAAAAA] text-sm">
                          {selectedMetric === 'subscribers' && 'Inscritos'}
                          {selectedMetric === 'avgViews' && 'Visualizações Médias'}
                          {selectedMetric === 'engagement' && 'Taxa de Engajamento'}
                          {selectedMetric === 'growth' && 'Crescimento Mensal'}
                        </span>
                        <span className="text-white font-bold">
                          {formatValue(metricValue, selectedMetric)}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>

                    {/* Métricas Secundárias */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-[#AAAAAA]" />
                        <span className="text-[#AAAAAA]">
                          {analysisData.avgViews.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-[#AAAAAA]" />
                        <span className="text-[#AAAAAA]">
                          {calculateEngagement(analysisData).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-[#AAAAAA]" />
                        <span className="text-[#AAAAAA]">
                          {analysisData.monthlyVideos}/mês
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#AAAAAA]" />
                        <span className="text-[#AAAAAA]">
                          +{analysisData.subGrowth}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Estatísticas da Comparação */}
          <div className="mt-6 p-4 bg-[#0D0D0D] border border-[#333] rounded-lg">
            <h4 className="text-white font-medium mb-3">Resumo da Comparação</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#AAAAAA]">Maior {selectedMetric}</p>
                <p className="text-white font-bold">
                  {formatValue(getMaxValue(selectedMetric), selectedMetric)}
                </p>
              </div>
              <div>
                <p className="text-[#AAAAAA]">Canais Analisados</p>
                <p className="text-white font-bold">
                  {channels.filter(ch => ch.analysisData).length}/{channels.length}
                </p>
              </div>
              <div>
                <p className="text-[#AAAAAA]">Melhor Score</p>
                <p className="text-white font-bold">
                  {Math.max(...channels
                    .filter(ch => ch.analysisData)
                    .map(ch => calculateScore(ch.analysisData!))
                  )}
                </p>
              </div>
              <div>
                <p className="text-[#AAAAAA]">Engajamento Médio</p>
                <p className="text-white font-bold">
                  {(channels
                    .filter(ch => ch.analysisData)
                    .reduce((acc, ch) => acc + calculateEngagement(ch.analysisData!), 0) / 
                    channels.filter(ch => ch.analysisData).length
                  ).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
