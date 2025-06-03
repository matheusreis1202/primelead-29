
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, TrendingUp, Target, Play, Award, BarChart3, Crown, User, Contact } from 'lucide-react';
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
    if (score >= 85) return 'text-[#FF0000]';
    if (score >= 70) return 'text-white';
    if (score >= 55) return 'text-[#AAAAAA]';
    if (score >= 40) return 'text-blue-400';
    return 'text-orange-400';
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Canais <span className="text-[#FF0000]">Premium</span> Encontrados
          </h2>
          <p className="text-[#AAAAAA] text-xs">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-xs px-3 py-1 bg-[#FF0000] text-white border-0 rounded-lg"
        >
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          
          return (
            <Card 
              key={channel.id} 
              className="bg-[#1E1E1E] border border-[#525252] hover:border-[#FF0000] transition-all duration-300 group relative overflow-hidden"
            >
              <CardContent className="p-4 h-full flex flex-col">
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute top-2 right-2 bg-[#FF0000] text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="h-2.5 w-2.5" />
                    #{index + 1}
                  </div>
                )}

                {/* Channel Photo */}
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    {channel.thumbnail ? (
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-12 h-12 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors bg-[#0D0D0D] flex items-center justify-center">
                        <User className="h-6 w-6 text-[#AAAAAA]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Channel Name and Premium Badge */}
                <div className="text-center mb-3">
                  <h3 className="font-bold text-white text-sm leading-tight mb-1 line-clamp-2">
                    {channel.title}
                  </h3>
                  
                  {/* Bio do canal - menor */}
                  {channel.description && (
                    <p className="text-[#AAAAAA] text-xs leading-relaxed mb-2 line-clamp-2">
                      {channel.description.slice(0, 80)}...
                    </p>
                  )}
                  
                  <div className="flex items-center justify-center gap-1">
                    <div className={`flex items-center gap-1 ${getScoreColor(channel.score)}`}>
                      <ScoreIcon className="h-3 w-3" />
                      <span className="text-xs font-bold">
                        {channel.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="text-center mt-1">
                    <span className={`text-xs font-semibold ${getScoreColor(channel.score)}`}>
                      {getScoreLabel(channel.score)}
                    </span>
                  </div>
                </div>

                {/* Metrics - Compactas */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <Users className="h-3 w-3 text-[#FF0000] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] text-xs block">Inscritos</span>
                      <p className="font-bold text-white text-sm truncate">
                        {formatNumber(channel.subscriberCount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <Eye className="h-3 w-3 text-[#FF0000] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] text-xs block">Views</span>
                      <p className="font-bold text-white text-sm truncate">
                        {formatNumber(channel.viewCount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
                    <TrendingUp className="h-3 w-3 text-[#4CAF50] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#AAAAAA] text-xs block">Engajamento</span>
                      <p className="font-bold text-[#4CAF50] text-sm">
                        {engagementRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Menores */}
                <div className="space-y-2 mt-auto">
                  <Button 
                    onClick={() => onSendToAnalysis(channel)}
                    className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all text-xs py-2 border-0"
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Enviar para Análise
                  </Button>

                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all text-xs py-1.5"
                  >
                    <a 
                      href={`https://www.youtube.com/channel/${channel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Ver Canal
                      <ExternalLink className="h-2.5 w-2.5" />
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
