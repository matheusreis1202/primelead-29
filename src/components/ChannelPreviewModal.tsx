
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, TrendingUp, Calendar, Video, Heart, MessageSquare, Crown, Award, BarChart3, Play, User } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ChannelPreviewModalProps {
  channel: Channel | null;
  isOpen: boolean;
  onClose: () => void;
  onSendToAnalysis: (channel: Channel) => void;
}

export const ChannelPreviewModal = React.memo(({ 
  channel, 
  isOpen, 
  onClose, 
  onSendToAnalysis 
}: ChannelPreviewModalProps) => {
  if (!channel) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'PREMIUM';
    if (score >= 60) return 'BOM';
    return 'MÉDIO';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return Crown;
    if (score >= 60) return Award;
    return TrendingUp;
  };

  const ScoreIcon = getScoreIcon(channel.score);
  const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] border-[#333] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Preview do Canal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header do Canal */}
          <div className="flex items-start gap-4 p-4 bg-[#0D0D0D] rounded-lg">
            <div className="flex-shrink-0">
              {channel.thumbnail ? (
                <img 
                  src={channel.thumbnail} 
                  alt={channel.title}
                  className="w-20 h-20 rounded-full border-2 border-[#525252] object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-[#525252] bg-[#333] flex items-center justify-center">
                  <User className="h-10 w-10 text-[#AAAAAA]" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-2">{channel.title}</h3>
              
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex items-center gap-2 ${getScoreColor(channel.score)}`}>
                  <ScoreIcon className="h-5 w-5" />
                  <span className="text-lg font-bold">{channel.score}/100</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getScoreColor(channel.score)} bg-transparent border border-current`}
                >
                  {getScoreLabel(channel.score)}
                </Badge>
              </div>

              {channel.description && (
                <p className="text-[#AAAAAA] text-sm leading-relaxed line-clamp-3">
                  {channel.description}
                </p>
              )}
            </div>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
              <Users className="h-6 w-6 text-[#FF0000] mx-auto mb-2" />
              <p className="text-[#AAAAAA] text-sm">Inscritos</p>
              <p className="text-white font-bold text-lg">{formatNumber(channel.subscriberCount)}</p>
            </div>

            <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
              <Eye className="h-6 w-6 text-[#FF0000] mx-auto mb-2" />
              <p className="text-[#AAAAAA] text-sm">Views Totais</p>
              <p className="text-white font-bold text-lg">{formatNumber(channel.viewCount)}</p>
            </div>

            <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
              <TrendingUp className="h-6 w-6 text-[#4CAF50] mx-auto mb-2" />
              <p className="text-[#AAAAAA] text-sm">Engajamento</p>
              <p className="text-[#4CAF50] font-bold text-lg">{engagementRate.toFixed(1)}%</p>
            </div>
          </div>

          {/* Categoria */}
          {channel.category && (
            <div className="p-4 bg-[#0D0D0D] rounded-lg">
              <h4 className="text-white font-semibold mb-2">Categoria</h4>
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                {channel.category}
              </Badge>
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t border-[#333]">
            <Button 
              onClick={() => {
                onSendToAnalysis(channel);
                onClose();
              }}
              className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Enviar para Análise Completa
            </Button>

            <Button 
              asChild 
              variant="outline"
              className="border-[#525252] bg-transparent text-[#AAAAAA] hover:bg-[#525252] hover:text-white"
            >
              <a 
                href={`https://www.youtube.com/channel/${channel.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Ver no YouTube
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ChannelPreviewModal.displayName = 'ChannelPreviewModal';
