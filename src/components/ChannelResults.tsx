
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, TrendingUp, Target, Play, Award, BarChart3, Crown } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ChannelResultsProps {
  channels: Channel[];
  onSendToAnalysis: (channel: Channel) => void;
}

export const ChannelResults = ({ channels, onSendToAnalysis }: ChannelResultsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-youtube-red to-red-600';
    if (score >= 70) return 'from-youtube-dark to-gray-700';
    if (score >= 55) return 'from-gray-500 to-gray-600';
    if (score >= 40) return 'from-youtube-blue to-blue-700';
    return 'from-orange-500 to-orange-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'PREMIUM';
    if (score >= 70) return 'ÓTIMO';
    if (score >= 55) return 'BOM';
    if (score >= 40) return 'RAZOÁVEL';
    return 'RUIM';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return Crown;
    if (score >= 70) return Award;
    return TrendingUp;
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 85) return 'border-youtube-red';
    if (score >= 70) return 'border-youtube-gray';
    if (score >= 55) return 'border-gray-300';
    if (score >= 40) return 'border-youtube-blue';
    return 'border-orange-400';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-youtube-red';
    if (score >= 70) return 'text-youtube-white';
    if (score >= 55) return 'text-gray-300';
    if (score >= 40) return 'text-blue-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-youtube-white mb-1 font-roboto">
            Canais <span className="text-youtube-red">Premium</span> Encontrados
          </h2>
          <p className="text-youtube-gray text-xs font-roboto">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-xs px-3 py-1 bg-youtube-red text-youtube-white border-0 shadow-lg rounded futuristic-glow font-roboto"
        >
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          return (
            <Card 
              key={channel.id} 
              className={`tech-card ${getScoreBorderColor(channel.score)} group relative`}
            >
              <CardContent className="p-3">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 bg-youtube-red text-youtube-white text-xs font-bold px-1 py-0.5 rounded shadow-lg border border-youtube-black futuristic-glow font-roboto">
                    <div className="flex items-center gap-0.5">
                      <Crown className="h-2 w-2" />
                      #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-1 rounded shadow futuristic-glow`}>
                    <ScoreIcon className="h-3 w-3 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${getScoreTextColor(channel.score)} font-roboto`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-xs font-bold ${getScoreTextColor(channel.score)} opacity-80 font-roboto`}>
                      {getScoreLabel(channel.score)}
                    </div>
                  </div>
                </div>

                {/* Channel Profile */}
                <div className="flex items-start gap-2 mb-2">
                  {channel.thumbnail && (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title}
                      className="w-6 h-6 rounded border border-youtube-gray group-hover:border-youtube-red transition-colors"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-youtube-white text-xs leading-tight mb-1 line-clamp-2 group-hover:text-youtube-gray transition-colors font-roboto">
                      {channel.title}
                    </h3>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs bg-youtube-dark p-1.5 rounded border border-youtube-red/30">
                    <div className="flex items-center gap-1 text-youtube-gray">
                      <div className="bg-youtube-red p-0.5 rounded futuristic-glow">
                        <Users className="h-2 w-2 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-roboto text-xs">Inscritos</span>
                    </div>
                    <span className="font-bold text-youtube-white text-xs font-roboto">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-youtube-dark p-1.5 rounded border border-youtube-red/30">
                    <div className="flex items-center gap-1 text-youtube-gray">
                      <div className="bg-youtube-red p-0.5 rounded futuristic-glow">
                        <Eye className="h-2 w-2 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-roboto text-xs">Views</span>
                    </div>
                    <span className="font-bold text-youtube-white text-xs font-roboto">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-xs p-1.5 rounded border bg-youtube-dark border-green-500/30">
                    <div className="flex items-center gap-1">
                      <div className="bg-green-500 p-0.5 rounded futuristic-glow">
                        <TrendingUp className="h-2 w-2 text-youtube-white" />
                      </div>
                      <span className="font-semibold text-green-400 font-roboto text-xs">Engaj.</span>
                    </div>
                    <span className="font-bold text-green-400 text-xs font-roboto">
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-1">
                    <Button 
                      asChild 
                      className="w-full futuristic-button py-1 rounded text-xs"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Play className="h-2 w-2 fill-current" />
                        Canal
                        <ExternalLink className="h-2 w-2" />
                      </a>
                    </Button>

                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-youtube-red bg-youtube-dark text-youtube-white hover:bg-youtube-red hover:border-youtube-red py-1 rounded transition-all duration-300 text-xs"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}/about`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Target className="h-2 w-2" />
                        Contato
                      </a>
                    </Button>
                  </div>

                  {/* Enviar para Análise Button */}
                  <Button 
                    onClick={() => onSendToAnalysis(channel)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded transition-all duration-300 text-xs border-0"
                  >
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-2 w-2" />
                      Enviar para Análise
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
