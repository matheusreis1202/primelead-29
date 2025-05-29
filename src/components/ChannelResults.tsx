
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle, Star, Crown, TrendingUp, Target, Play, Award, BarChart3 } from 'lucide-react';
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          return (
            <Card 
              key={channel.id} 
              className={`tech-card ${getScoreBorderColor(channel.score)} group relative`}
            >
              <CardContent className="p-4">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 bg-youtube-red text-youtube-white text-xs font-bold px-2 py-1 rounded-md shadow-xl border-2 border-youtube-black futuristic-glow font-orbitron">
                    <div className="flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      TOP #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-2 rounded-lg text-youtube-white shadow-md futuristic-glow`}>
                    <ScoreIcon className="h-4 w-4" />
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreTextColor(channel.score)} font-orbitron`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-xs font-bold ${getScoreTextColor(channel.score)} opacity-80 font-inter`}>
                      {getScoreLabel(channel.score)}
                    </div>
                  </div>
                </div>

                {/* Channel Profile */}
                <div className="flex items-start gap-2 mb-3">
                  {channel.thumbnail && (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title}
                      className="w-12 h-12 rounded-lg border-2 border-youtube-gray group-hover:border-youtube-red transition-colors shadow-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-youtube-white text-sm leading-tight mb-1 line-clamp-2 group-hover:text-youtube-gray transition-colors font-orbitron">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-youtube-gray bg-youtube-dark px-2 py-1 rounded-md inline-block border border-youtube-red font-inter">
                      ID: {channel.id}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {channel.description && (
                  <div className="mb-4">
                    <p className="text-xs text-youtube-gray line-clamp-2 bg-youtube-dark p-2 rounded-lg border border-youtube-red font-inter">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs bg-youtube-dark p-2 rounded-lg border border-youtube-red">
                    <div className="flex items-center gap-2 text-youtube-gray">
                      <div className="bg-youtube-red p-1 rounded-md futuristic-glow">
                        <Users className="h-3 w-3 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-inter">Inscritos</span>
                    </div>
                    <span className="font-bold text-youtube-white text-sm font-orbitron">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-youtube-dark p-2 rounded-lg border border-youtube-red">
                    <div className="flex items-center gap-2 text-youtube-gray">
                      <div className="bg-youtube-red p-1 rounded-md futuristic-glow">
                        <Eye className="h-3 w-3 text-youtube-white" />
                      </div>
                      <span className="font-semibold font-inter">Views</span>
                    </div>
                    <span className="font-bold text-youtube-white text-sm font-orbitron">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg border bg-youtube-dark border-green-500">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 p-1 rounded-md futuristic-glow">
                        <TrendingUp className="h-3 w-3 text-youtube-white" />
                      </div>
                      <span className="font-semibold text-green-400 font-inter">Engajamento</span>
                    </div>
                    <span className="font-bold text-green-400 text-sm font-orbitron">
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      asChild 
                      className="w-full futuristic-button py-1 rounded-md font-orbitron text-xs"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        Canal
                        <ExternalLink className="h-2 w-2" />
                      </a>
                    </Button>

                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-youtube-red bg-youtube-dark text-youtube-white hover:bg-youtube-red hover:border-youtube-red py-1 rounded-md transition-all duration-300 font-inter text-xs"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}/about`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Contatos
                      </a>
                    </Button>
                  </div>

                  {/* Enviar para Análise Button */}
                  <Button 
                    onClick={() => onSendToAnalysis(channel)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-all duration-300 font-inter text-sm border-0"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
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
