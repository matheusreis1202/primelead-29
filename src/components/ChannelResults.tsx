
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
    if (score >= 85) return 'from-emerald-400 to-emerald-500';
    if (score >= 70) return 'from-emerald-300 to-emerald-400';
    if (score >= 55) return 'from-gray-400 to-gray-500';
    if (score >= 40) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'PREMIUM';
    if (score >= 70) return 'EXCELENTE';
    if (score >= 55) return 'BOM';
    if (score >= 40) return 'MÉDIO';
    return 'PÉSSIMO';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return Crown;
    if (score >= 70) return Award;
    if (score >= 55) return Star;
    return TrendingUp;
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 85) return 'border-emerald-200';
    if (score >= 70) return 'border-emerald-100';
    if (score >= 55) return 'border-gray-200';
    if (score >= 40) return 'border-red-200';
    return 'border-red-300';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-emerald-500';
    if (score >= 55) return 'text-gray-600';
    if (score >= 40) return 'text-red-500';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-black mb-3">
            Canais <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Premium</span> Encontrados
          </h2>
          <p className="text-gray-600 text-lg">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-6 py-3 bg-black text-white border-0 shadow-lg"
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
              className={`bg-white border ${getScoreBorderColor(channel.score)} hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group relative`}
            >
              <CardContent className="p-8">
                {/* Premium Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-emerald-300">
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      TOP #{index + 1}
                    </div>
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-4 rounded-2xl text-white shadow-lg`}>
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
                      className="w-20 h-20 rounded-full border-2 border-gray-200 group-hover:border-emerald-300 transition-colors shadow-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black text-xl leading-tight mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
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
                    <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-black p-2 rounded-lg">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Inscritos</span>
                    </div>
                    <span className="font-bold text-black text-lg">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-black p-2 rounded-lg">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Visualizações</span>
                    </div>
                    <span className="font-bold text-black text-lg">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className={`flex items-center justify-between text-sm p-4 rounded-xl border ${
                    engagementRate < 10 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        engagementRate < 10 ? 'bg-red-500' : 'bg-emerald-400'
                      }`}>
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <span className={`font-semibold ${
                        engagementRate < 10 ? 'text-red-600' : 'text-emerald-600'
                      }`}>Engajamento</span>
                    </div>
                    <span className={`font-bold text-lg ${
                      engagementRate < 10 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild 
                    className="w-full bg-black hover:bg-gray-800 text-white border-0 shadow-lg py-3"
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
                    className="w-full border-gray-300 bg-white text-black hover:bg-gray-50 hover:border-emerald-400 py-3"
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
