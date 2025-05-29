
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle, Star, Crown, TrendingUp, Target, Play, Award, Zap } from 'lucide-react';
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

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-[#FF0000] via-red-500 to-red-600';
    if (score >= 70) return 'from-[#282828] via-gray-700 to-gray-800';
    if (score >= 55) return 'from-purple-500 via-purple-600 to-purple-700';
    if (score >= 40) return 'from-yellow-500 via-yellow-600 to-yellow-700';
    return 'from-orange-500 via-orange-600 to-orange-700';
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

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-4 rounded-2xl shadow-2xl">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-5xl font-black text-white">
            Canais <span className="bg-gradient-to-r from-[#FF0000] to-red-400 bg-clip-text text-transparent">Premium</span>
          </h2>
        </div>
        <p className="text-xl text-gray-300 mb-8 font-light">Ranqueados por algoritmo de IA avançado</p>
        <Badge className="text-lg px-8 py-3 bg-gradient-to-r from-[#FF0000] to-red-600 text-white border-0 shadow-2xl rounded-full font-bold">
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          
          return (
            <Card 
              key={channel.id} 
              className="bg-gradient-to-br from-white via-gray-50 to-white border-0 hover:shadow-2xl transition-all duration-700 group rounded-3xl overflow-hidden relative backdrop-blur-sm"
            >
              {/* Premium Ranking Badge */}
              {index < 3 && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF0000] to-red-600 text-white text-sm font-black px-6 py-3 rounded-2xl shadow-2xl border-2 border-white z-10">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    TOP #{index + 1}
                  </div>
                </div>
              )}

              {/* Futuristic background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-3xl opacity-50"></div>
              
              <CardContent className="p-10 relative z-10">
                {/* Score Section - Futuristic design */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`bg-gradient-to-br ${getScoreGradient(channel.score)} p-5 rounded-3xl text-white shadow-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <ScoreIcon className="h-8 w-8 relative z-10" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-[#282828] mb-1">
                      {channel.score}
                    </div>
                    <div className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                      {getScoreLabel(channel.score)}
                    </div>
                  </div>
                </div>

                {/* Channel Profile - Clean design */}
                <div className="flex items-start gap-6 mb-8">
                  {channel.thumbnail && (
                    <div className="relative">
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-20 h-20 rounded-2xl border-2 border-gray-200 group-hover:border-[#FF0000] transition-all duration-500 shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#FF0000] to-red-600 p-1.5 rounded-full shadow-lg">
                        <Play className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-[#282828] text-xl leading-tight mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-gray-400 bg-gray-100 px-4 py-2 rounded-full inline-block border border-gray-200 font-mono">
                      ID: {channel.id}
                    </p>
                  </div>
                </div>

                {/* Description - Minimalist */}
                {channel.description && (
                  <div className="mb-10">
                    <p className="text-sm text-gray-600 line-clamp-3 bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-inner">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Metrics - Futuristic grid */}
                <div className="grid grid-cols-1 gap-4 mb-10">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-3 rounded-xl shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-gray-700">Inscritos</span>
                    </div>
                    <span className="font-black text-[#282828] text-xl">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-[#282828] to-gray-700 p-3 rounded-xl shadow-lg">
                        <Eye className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-gray-700">Visualizações</span>
                    </div>
                    <span className="font-black text-[#282828] text-xl">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-emerald-700">Engajamento</span>
                    </div>
                    <span className="font-black text-emerald-700 text-xl">
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Futuristic design */}
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild 
                    className="w-full h-14 bg-gradient-to-r from-[#FF0000] to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-xl rounded-2xl group transition-all duration-500"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 font-bold"
                    >
                      <Play className="h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
                      Acessar Canal
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full h-14 border-2 border-gray-200 bg-white text-[#282828] hover:bg-gray-50 hover:border-[#FF0000] rounded-2xl group transition-all duration-500"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}/about`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 font-bold"
                    >
                      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
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
