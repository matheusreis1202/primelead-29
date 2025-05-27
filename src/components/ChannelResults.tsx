
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
    if (score >= 85) return 'from-yellow-500 to-yellow-600';
    if (score >= 70) return 'from-green-500 to-green-600';
    if (score >= 55) return 'from-blue-500 to-blue-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'PREMIUM';
    if (score >= 70) return 'EXCELENTE';
    if (score >= 55) return 'BOM';
    if (score >= 40) return 'MÉDIO';
    return 'BAIXO';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return Crown;
    if (score >= 70) return Award;
    if (score >= 55) return Star;
    return TrendingUp;
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 85) return 'border-yellow-500/30';
    if (score >= 70) return 'border-green-500/30';
    if (score >= 55) return 'border-blue-500/30';
    if (score >= 40) return 'border-orange-500/30';
    return 'border-red-500/30';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-yellow-400';
    if (score >= 70) return 'text-green-400';
    if (score >= 55) return 'text-blue-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Canais <span className="text-red-500">Premium</span> Encontrados
          </h2>
          <p className="text-gray-300 text-lg">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-lg"
        >
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          return (
            <Card 
              key={channel.id} 
              className={`bg-gradient-to-br from-gray-800 to-gray-900 border ${getScoreBorderColor(channel.score)} hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 group relative`}
            >
              <CardContent className="p-8">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl border-2 border-yellow-400">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      TOP #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-4 rounded-2xl text-white shadow-xl`}>
                    <ScoreIcon className="h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreTextColor(channel.score)}`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-sm font-bold ${getScoreTextColor(channel.score)} opacity-80`}>
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
                      className="w-20 h-20 rounded-full border-3 border-red-500/30 group-hover:border-red-500 transition-colors shadow-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-xl leading-tight mb-3 line-clamp-2 group-hover:text-red-100 transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full inline-block">
                      ID: {channel.id}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {channel.description && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-300 line-clamp-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm bg-gradient-to-r from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-500/30">
                    <div className="flex items-center gap-3 text-red-300">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold">Inscritos</span>
                    </div>
                    <span className="font-bold text-white text-lg">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                    <div className="flex items-center gap-3 text-blue-300">
                      <Eye className="h-5 w-5" />
                      <span className="font-semibold">Visualizações</span>
                    </div>
                    <span className="font-bold text-white text-lg">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-sm bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
                    <div className="flex items-center gap-3 text-green-300">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold">Engajamento</span>
                    </div>
                    <span className="font-bold text-white text-lg">
                      {((channel.viewCount / channel.subscriberCount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-xl py-3"
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
                    className="w-full border-yellow-500/50 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-300 py-3"
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
