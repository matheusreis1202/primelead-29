
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle, Star, Crown, TrendingUp, Target, Play, Award } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ChannelResultsProps {
  channels: Channel[];
}

export const ChannelResults = ({ channels }: ChannelResultsProps) => {
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
    if (score >= 40) return 'from-yellow-500 to-yellow-600';
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
    if (score >= 55) return Star;
    return TrendingUp;
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 85) return 'border-youtube-red';
    if (score >= 70) return 'border-youtube-gray';
    if (score >= 55) return 'border-gray-300';
    if (score >= 40) return 'border-yellow-400';
    return 'border-orange-400';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-youtube-red';
    if (score >= 70) return 'text-youtube-white';
    if (score >= 55) return 'text-gray-300';
    if (score >= 40) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-youtube-white mb-3 font-orbitron">
            Canais <span className="text-gradient bg-gradient-to-r from-youtube-red to-red-600 bg-clip-text text-transparent">Premium</span> Encontrados
          </h2>
          <p className="text-youtube-gray text-lg font-inter">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-6 py-3 bg-youtube-red text-youtube-white border-0 shadow-xl rounded-md futuristic-glow font-orbitron"
        >
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          return (
            <Card 
              key={channel.id} 
              className={`tech-card ${getScoreBorderColor(channel.score)} group relative`}
            >
              <CardContent className="p-8">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 bg-youtube-red text-youtube-white text-sm font-bold px-4 py-2 rounded-md shadow-xl border-2 border-youtube-black futuristic-glow font-orbitron">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      TOP #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-4 rounded-lg text-youtube-white shadow-md futuristic-glow`}>
                    <ScoreIcon className="h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreTextColor(channel.score)} font-orbitron`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-sm font-bold ${getScoreTextColor(channel.score)} opacity-80 font-inter`}>
                      {getScoreLabel(channel.score)}
                    </div>
                  </div>
                </div>

                {/* Channel Profile */}
                <div className="flex items-start gap-5 mb-6">
                  {channel.thumbnail && (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title}
                      className="w-20 h-20 rounded-lg border-2 border-youtube-gray group-hover:border-youtube-red transition-colors shadow-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-youtube-white text-xl leading-tight mb-3 line-clamp-2 group-hover:text-youtube-gray transition-colors font-orbitron">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-youtube-gray bg-youtube-dark px-3 py-1 rounded-md inline-block border border-youtube-red font-inter">
                      ID: {channel.id}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {channel.description && (
                  <div className="mb-8">
                    <p className="text-sm text-youtube-gray line-clamp-3 bg-youtube-dark p-4 rounded-lg border border-youtube-red font-inter">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm bg-youtube-dark p-4 rounded-lg border border-youtube-red">
                    <div className="flex items-center gap-3 text-youtube-gray">
                      <div className="bg-youtube-red p-2 rounded-md futuristic-glow">
                        <Users className="h-4 w-4 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-inter">Inscritos</span>
                    </div>
                    <span className="font-bold text-youtube-white text-lg font-orbitron">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-youtube-dark p-4 rounded-lg border border-youtube-red">
                    <div className="flex items-center gap-3 text-youtube-gray">
                      <div className="bg-youtube-red p-2 rounded-md futuristic-glow">
                        <Eye className="h-4 w-4 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-inter">Visualizações</span>
                    </div>
                    <span className="font-bold text-youtube-white text-lg font-orbitron">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-sm p-4 rounded-lg border bg-youtube-dark border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-md futuristic-glow">
                        <TrendingUp className="h-4 w-4 text-youtube-white" />
                      </div>
                      <span className="font-semibold text-green-400 font-inter">Engajamento</span>
                    </div>
                    <span className="font-bold text-green-400 text-lg font-orbitron">
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild 
                    className="w-full futuristic-button py-3 rounded-md font-orbitron"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Acessar Canal
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-youtube-red bg-youtube-dark text-youtube-white hover:bg-youtube-red hover:border-youtube-red py-3 rounded-md transition-all duration-300 font-inter"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}/about`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Ver Contatos
                    </a>
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
