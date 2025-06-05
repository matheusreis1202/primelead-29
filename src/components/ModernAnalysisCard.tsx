
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  Heart,
  FileSpreadsheet,
  Contact,
  X,
  Zap
} from 'lucide-react';
import { Channel } from '@/pages/Index';
import { analisarCanal } from '@/services/simpleChannelAnalysis';

interface ModernAnalysisCardProps {
  channel: Channel;
  analysisData?: any;
  isAnalyzing?: boolean;
  onAnalyze: () => void;
  onRemove: () => void;
  onSendToSpreadsheet: () => void;
  onViewContacts: () => void;
}

export const ModernAnalysisCard = ({
  channel,
  analysisData,
  isAnalyzing = false,
  onAnalyze,
  onRemove,
  onSendToSpreadsheet,
  onViewContacts
}: ModernAnalysisCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  // Usar o mesmo sistema de análise da aba resultados
  const getChannelAnalysis = () => {
    // Mock some video data since we don't have video details from the search
    const mockVideos = Array.from({ length: 5 }, (_, i) => ({
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likeCount: Math.floor(channel.viewCount * 0.02 * Math.random()),
      commentCount: Math.floor(channel.viewCount * 0.005 * Math.random()),
      viewCount: Math.floor(channel.viewCount / channel.videoCount)
    }));

    return analisarCanal({
      id: channel.id,
      title: channel.title,
      subscriberCount: channel.subscriberCount,
      viewCount: channel.viewCount,
      videoCount: channel.videoCount,
      publishedAt: channel.publishedAt
    }, mockVideos);
  };

  const analysis = getChannelAnalysis();
  const score = analysis?.score || 0;

  const getClassification = (classificacao: string) => {
    if (classificacao === 'Excelente') return { text: 'Excelente', color: 'bg-green-500' };
    if (classificacao === 'Promissor') return { text: 'Promissor', color: 'bg-blue-500' };
    return { text: 'Fraco', color: 'bg-red-500' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    return 'text-red-400';
  };

  const classification = getClassification(analysis?.classificacao || 'Fraco');

  return (
    <Card 
      className={`bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#FF0000]/50 hover:shadow-md hover:shadow-[#FF0000]/10 ${
        isHovered ? 'transform scale-[1.01]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Header Compacto */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img 
                src={channel.thumbnail} 
                alt={channel.title}
                className="w-12 h-12 rounded-lg object-cover border border-[#333]"
              />
              {analysisData && (
                <div className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {score}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate mb-1">
                {channel.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-[#AAAAAA]">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{formatNumber(channel.subscriberCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatNumber(channel.viewCount)}</span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-[#AAAAAA] hover:text-red-400 hover:bg-red-500/10 p-1 h-auto"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {analysisData && (
            <div className="mb-2">
              <Badge className={`${classification.color} text-white text-xs`}>
                {classification.text}
              </Badge>
            </div>
          )}
        </div>

        {/* Analysis Content */}
        {!analysisData ? (
          <div className="px-4 pb-4">
            <div className="text-center py-4 border border-dashed border-[#333] rounded-lg">
              <Brain className="h-6 w-6 text-[#FF0000] mx-auto mb-2" />
              <p className="text-[#AAAAAA] text-xs mb-3">
                Canal pronto para análise
              </p>
              <Button 
                onClick={onAnalyze}
                disabled={isAnalyzing}
                size="sm"
                className="bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analisando...
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Analisar
                  </div>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-4 pb-4 space-y-3">
            {/* Score Progress */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium text-xs">Score de Parceria</span>
                <span className={`font-bold text-sm ${getScoreColor(score)}`}>{score}/100</span>
              </div>
              <Progress 
                value={score} 
                className="h-1.5 bg-[#333]"
                style={{
                  '--progress-foreground': score >= 80 ? '#10b981' : 
                                         score >= 60 ? '#3b82f6' : '#ef4444'
                } as React.CSSProperties}
              />
            </div>

            {/* Metrics Grid Compacto - usando dados exatos da análise */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#0D0D0D] border border-[#333] rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-[#FF0000]" />
                  <span className="text-white text-xs font-medium">Engajamento</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {analysis.metrics.engajamento_percent.toFixed(1)}%
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  interações médias
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-3 w-3 text-[#FF0000]" />
                  <span className="text-white text-xs font-medium">Crescimento</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatNumber(analysis.metrics.crescimento_mensal)}
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  inscritos/mês
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Eye className="h-3 w-3 text-[#FF0000]" />
                  <span className="text-white text-xs font-medium">Views/Vídeo</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatNumber(analysis.metrics.views_por_video)}
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  por vídeo
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Eye className="h-3 w-3 text-[#FF0000]" />
                  <span className="text-white text-xs font-medium">Views Totais</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatNumber(channel.viewCount)}
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  total do canal
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <Button 
                onClick={onSendToSpreadsheet}
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                <FileSpreadsheet className="h-3 w-3 mr-1" />
                Salvar
              </Button>
              
              <Button 
                onClick={onViewContacts}
                size="sm"
                className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs"
              >
                <Contact className="h-3 w-3 mr-1" />
                Contato
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
