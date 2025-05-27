
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
    if (score >= 85) return 'from-green-400 to-green-500';
    if (score >= 70) return 'from-blue-700 to-blue-800';
    if (score >= 55) return 'from-gray-400 to-gray-500';
    if (score >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
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
    if (score >= 85) return 'border-green-200';
    if (score >= 70) return 'border-blue-200';
    if (score >= 55) return 'border-gray-300';
    if (score >= 40) return 'border-yellow-200';
    return 'border-red-200';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-800';
    if (score >= 55) return 'text-gray-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Canais <span className="text-gradient bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Premium</span> Encontrados
          </h2>
          <p className="text-gray-600 text-lg">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-6 py-3 bg-blue-800 text-white border-0 shadow-md rounded-full"
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
              className={`bg-white border ${getScoreBorderColor(channel.score)} hover:border-green-400 transition-all duration-300 hover:shadow-lg group relative rounded-xl`}
            >
              <CardContent className="p-8">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-green-300">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      TOP #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-4 rounded-2xl text-white shadow-md`}>
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
                      className="w-20 h-20 rounded-full border-2 border-gray-300 group-hover:border-green-400 transition-colors shadow-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-xl leading-tight mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block border border-gray-200">
                      ID: {channel.id}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {channel.description && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-blue-800 p-2 rounded-lg">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Inscritos</span>
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-blue-800 p-2 rounded-lg">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Visualizações</span>
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className={`flex items-center justify-between text-sm p-4 rounded-xl border ${
                    engagementRate < 10 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        engagementRate < 10 ? 'bg-red-500' : 'bg-green-500'
                      }`}>
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <span className={`font-semibold ${
                        engagementRate < 10 ? 'text-red-600' : 'text-green-600'
                      }`}>Engajamento</span>
                    </div>
                    <span className={`font-bold text-lg ${
                      engagementRate < 10 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild 
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white border-0 shadow-md py-3 rounded-xl"
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
                    className="w-full border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:border-green-400 py-3 rounded-xl"
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
