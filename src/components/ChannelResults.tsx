
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, TrendingUp, Target, Play, Award, BarChart3, Crown, User } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Canais <span className="text-[#FF0000]">Premium</span> Encontrados
          </h2>
          <p className="text-[#AAAAAA] text-sm">Ranqueados por algoritmo de performance avançado</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-sm px-4 py-2 bg-[#FF0000] text-white border-0 rounded-lg"
        >
          {channels.length} canais descobertos
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {channels.map((channel, index) => {
          const ScoreIcon = getScoreIcon(channel.score);
          const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
          
          return (
            <Card 
              key={channel.id} 
              className="bg-[#1E1E1E] border border-[#525252] hover:border-[#FF0000] transition-all duration-300 h-[450px] w-[300px] group relative overflow-hidden"
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute top-3 right-3 bg-[#FF0000] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    #{index + 1}
                  </div>
                )}

                {/* Channel Photo */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {channel.thumbnail ? (
                      <img 
                        src={channel.thumbnail} 
                        alt={channel.title}
                        className="w-20 h-20 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-2 border-[#525252] group-hover:border-[#FF0000] transition-colors bg-[#0D0D0D] flex items-center justify-center">
                        <User className="h-10 w-10 text-[#AAAAAA]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Channel Name and Premium Badge */}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2">
                    {channel.title}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className={`flex items-center gap-1 ${getScoreColor(channel.score)}`}>
                      <ScoreIcon className="h-4 w-4" />
                      <span className="text-sm font-bold">
                        {channel.score}/100 {getScoreLabel(channel.score)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg">
                    <Users className="h-5 w-5 text-[#FF0000]" />
                    <div className="flex-1">
                      <span className="text-[#AAAAAA] text-sm">Inscritos</span>
                      <p className="font-bold text-white text-lg">
                        {formatNumber(channel.subscriberCount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg">
                    <Eye className="h-5 w-5 text-[#FF0000]" />
                    <div className="flex-1">
                      <span className="text-[#AAAAAA] text-sm">Views</span>
                      <p className="font-bold text-white text-lg">
                        {formatNumber(channel.viewCount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-lg">
                    <TrendingUp className="h-5 w-5 text-[#4CAF50]" />
                    <div className="flex-1">
                      <span className="text-[#AAAAAA] text-sm">Engajamento</span>
                      <p className="font-bold text-[#4CAF50] text-lg">
                        {engagementRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      asChild 
                      variant="outline"
                      className="border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all text-sm py-2"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Canal
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>

                    <Button 
                      asChild 
                      variant="outline"
                      className="border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white transition-all text-sm py-2"
                    >
                      <a 
                        href={`https://www.youtube.com/channel/${channel.id}/about`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Target className="h-4 w-4" />
                        Contato
                      </a>
                    </Button>
                  </div>

                  <Button 
                    onClick={() => onSendToAnalysis(channel)}
                    className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all text-sm py-3 border-0"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Enviar para Análise
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
