
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle, Star, Crown, TrendingUp, Target } from 'lucide-react';
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
    if (score >= 85) return 'from-gray-900 to-black';
    if (score >= 70) return 'from-gray-700 to-gray-800';
    if (score >= 55) return 'from-gray-500 to-gray-600';
    if (score >= 40) return 'from-gray-400 to-gray-500';
    return 'from-gray-300 to-gray-400';
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
    if (score >= 85) return 'border-gray-900/50';
    if (score >= 70) return 'border-gray-700/30';
    if (score >= 55) return 'border-gray-500/30';
    if (score >= 40) return 'border-gray-400/30';
    return 'border-gray-300/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Canais Premium Encontrados
          </h2>
          <p className="text-gray-600">Ordenados por score de performance</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-4 py-2 bg-gray-100 border-gray-200 text-gray-700"
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
              className={`bg-white border ${getScoreBorderColor(channel.score)} hover:border-gray-400 transition-all duration-300 hover:shadow-lg group relative`}
            >
              <CardContent className="p-6">
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-gray-200">
                    #{index + 1}
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-3 rounded-xl text-white shadow-lg`}>
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
                      className="w-16 h-16 rounded-full border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">ID: {channel.id}</p>
                  </div>
                </div>

                {channel.description && (
                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {channel.description}
                  </p>
                )}

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Inscritos</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="h-4 w-4" />
                      <span>Visualizações</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>Engajamento</span>
                    </div>
                    <span className="font-bold text-gray-700">
                      {((channel.viewCount / channel.subscriberCount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button 
                    asChild 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-lg"
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
                    className="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
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
