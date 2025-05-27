
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
    if (score >= 85) return 'from-emerald-600 to-emerald-700';
    if (score >= 70) return 'from-blue-600 to-blue-700';
    if (score >= 55) return 'from-amber-500 to-amber-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
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
    if (score >= 85) return 'border-emerald-200';
    if (score >= 70) return 'border-blue-200';
    if (score >= 55) return 'border-amber-200';
    if (score >= 40) return 'border-orange-200';
    return 'border-red-200';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return 'text-emerald-700';
    if (score >= 70) return 'text-blue-700';
    if (score >= 55) return 'text-amber-700';
    if (score >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Canais Premium Encontrados
          </h2>
          <p className="text-slate-600">Ordenados por score de performance</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-4 py-2 bg-slate-100 border-slate-200 text-slate-700"
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
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                    #{index + 1}
                  </div>
                )}

                {/* Score Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-3 rounded-xl text-white shadow-lg`}>
                    <ScoreIcon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreTextColor(channel.score)}`}>
                      {channel.score}/100
                    </div>
                    <div className={`text-xs font-medium ${getScoreTextColor(channel.score)}`}>
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
                    <p className="text-xs text-slate-500 mb-1">ID: {channel.id}</p>
                  </div>
                </div>

                {channel.description && (
                  <div className="mb-6">
                    <p className="text-sm text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {channel.description}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Inscritos</span>
                    </div>
                    <span className="font-bold text-blue-800">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">Visualizações</span>
                    </div>
                    <span className="font-bold text-purple-800">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement Rate */}
                  <div className="flex items-center justify-between text-sm bg-teal-50 p-3 rounded-lg border border-teal-100">
                    <div className="flex items-center gap-2 text-teal-700">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Engajamento</span>
                    </div>
                    <span className="font-bold text-teal-800">
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
                    className="w-full border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-800"
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
