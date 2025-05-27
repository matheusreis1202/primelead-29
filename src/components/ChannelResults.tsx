
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle, Star, Crown, TrendingUp } from 'lucide-react';
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
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    if (score >= 55) return 'from-yellow-500 to-orange-500';
    if (score >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Premium';
    if (score >= 70) return 'Ótimo';
    if (score >= 55) return 'Bom';
    if (score >= 40) return 'Razoável';
    return 'Ruim';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return Crown;
    if (score >= 70) return Star;
    return TrendingUp;
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 85) return 'border-green-500/30';
    if (score >= 70) return 'border-blue-500/30';
    if (score >= 55) return 'border-yellow-500/30';
    if (score >= 40) return 'border-orange-500/30';
    return 'border-red-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Canais Premium Encontrados
          </h2>
          <p className="text-white/60">Ordenados por score de performance</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-4 py-2 bg-purple-500/20 border-purple-500/30 text-purple-300"
        >
          {channels.length} canais
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          return (
            <Card 
              key={channel.id} 
              className={`bg-white/5 backdrop-blur-sm border ${getScoreBorderColor(channel.score)} hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group relative`}
            >
              <CardContent className="p-6">
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-3 rounded-xl text-white`}>
                    <ScoreIcon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(channel.score)} bg-clip-text text-transparent`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-xs font-medium bg-gradient-to-r ${getScoreColor(channel.score)} bg-clip-text text-transparent`}>
                      {getScoreLabel(channel.score)}
                    </div>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex items-start gap-4 mb-4">
                  {channel.thumbnail && (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title}
                      className="w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-purple-400/50 transition-colors"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-white/40 mb-1">ID: {channel.id}</p>
                  </div>
                </div>

                {channel.description && (
                  <p className="text-sm text-white/60 mb-6 line-clamp-3">
                    {channel.description}
                  </p>
                )}

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Users className="h-4 w-4" />
                      <span>Inscritos</span>
                    </div>
                    <span className="font-bold text-white">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Eye className="h-4 w-4" />
                      <span>Visualizações</span>
                    </div>
                    <span className="font-bold text-white">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <TrendingUp className="h-4 w-4" />
                      <span>Engajamento</span>
                    </div>
                    <span className="font-bold text-purple-400">
                      {((channel.viewCount / channel.subscriberCount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver Canal
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-purple-500/50"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}/about`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contato
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
