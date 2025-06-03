
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

interface ChannelData {
  name: string;
  subscribers: number;
  avgViews: number;
  monthlyVideos: number;
  avgLikes: number;
  avgComments: number;
  subGrowth: number;
}

interface ModernAnalysisCardProps {
  channel: Channel;
  analysisData?: ChannelData;
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

  const calculateScore = (data: ChannelData) => {
    let score = 0;
    
    // Frequência (0-20 pontos)
    if (data.monthlyVideos > 20) score += 20;
    else if (data.monthlyVideos >= 10) score += 15;
    else if (data.monthlyVideos >= 5) score += 10;
    else score += 5;

    // Views médias (0-25 pontos)
    if (data.avgViews > 100000) score += 25;
    else if (data.avgViews >= 50000) score += 20;
    else if (data.avgViews >= 10000) score += 15;
    else if (data.avgViews >= 1000) score += 10;
    else score += 5;

    // Inscritos (0-25 pontos)
    if (data.subscribers > 1000000) score += 25;
    else if (data.subscribers >= 500000) score += 20;
    else if (data.subscribers >= 100000) score += 15;
    else if (data.subscribers >= 10000) score += 10;
    else score += 5;

    // Engajamento (0-20 pontos)
    const engagementRate = (data.avgLikes + data.avgComments) / data.avgViews;
    if (engagementRate > 0.10) score += 20;
    else if (engagementRate >= 0.05) score += 15;
    else if (engagementRate >= 0.02) score += 10;
    else score += 5;

    // Crescimento (0-10 pontos)
    if (data.subGrowth > 50) score += 10;
    else if (data.subGrowth >= 20) score += 8;
    else if (data.subGrowth >= 10) score += 6;
    else if (data.subGrowth >= 5) score += 4;
    else score += 2;

    return Math.min(score, 100);
  };

  const getClassification = (score: number) => {
    if (score >= 80) return { text: 'Altíssimo Potencial', color: 'bg-green-500' };
    if (score >= 65) return { text: 'Grande Potencial', color: 'bg-blue-500' };
    if (score >= 45) return { text: 'Médio Potencial', color: 'bg-yellow-500' };
    return { text: 'Baixo Potencial', color: 'bg-gray-500' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 65) return 'text-blue-400';
    if (score >= 45) return 'text-yellow-400';
    return 'text-red-400';
  };

  const score = analysisData ? calculateScore(analysisData) : 0;
  const classification = getClassification(score);
  const engagementRate = analysisData 
    ? ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews * 100)
    : 0;

  return (
    <Card 
      className={`bg-[#1e1e1e] border border-[#333] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#FF0000]/50 hover:shadow-lg hover:shadow-[#FF0000]/10 ${
        isHovered ? 'transform scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img 
                src={channel.thumbnail} 
                alt={channel.title}
                className="w-16 h-16 rounded-xl object-cover border border-[#333]"
              />
              {analysisData && (
                <div className="absolute -top-2 -right-2 bg-[#FF0000] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {score}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-lg truncate mb-1">
                {channel.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-[#AAAAAA]">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{formatNumber(channel.subscriberCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{formatNumber(channel.viewCount)}</span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-[#AAAAAA] hover:text-red-400 hover:bg-red-500/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {analysisData && (
            <div className="mb-4">
              <Badge className={`${classification.color} text-white`}>
                {classification.text}
              </Badge>
            </div>
          )}
        </div>

        {/* Analysis Content */}
        {!analysisData ? (
          <div className="px-6 pb-6">
            <div className="text-center py-8 border border-dashed border-[#333] rounded-lg">
              <Brain className="h-8 w-8 text-[#FF0000] mx-auto mb-3" />
              <p className="text-[#AAAAAA] mb-4">
                Canal pronto para análise detalhada
              </p>
              <Button 
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analisando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Iniciar Análise
                  </div>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            {/* Score Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Score de Parceria</span>
                <span className={`font-bold ${getScoreColor(score)}`}>{score}/100</span>
              </div>
              <Progress 
                value={score} 
                className="h-2 bg-[#333]"
                style={{
                  '--progress-foreground': score >= 80 ? '#10b981' : 
                                         score >= 65 ? '#3b82f6' : 
                                         score >= 45 ? '#f59e0b' : '#ef4444'
                } as React.CSSProperties}
              />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-[#FF0000]" />
                  <span className="text-white text-sm font-medium">Engajamento</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {engagementRate.toFixed(1)}%
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  {formatNumber(analysisData.avgLikes + analysisData.avgComments)} interações/vídeo
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-[#FF0000]" />
                  <span className="text-white text-sm font-medium">Frequência</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {analysisData.monthlyVideos}
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  vídeos por mês
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-[#FF0000]" />
                  <span className="text-white text-sm font-medium">Views Médias</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {formatNumber(analysisData.avgViews)}
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  por vídeo
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-[#FF0000]" />
                  <span className="text-white text-sm font-medium">Crescimento</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {analysisData.subGrowth}%
                </div>
                <div className="text-xs text-[#AAAAAA]">
                  últimos 90 dias
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={onSendToSpreadsheet}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              
              <Button 
                onClick={onViewContacts}
                className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-white"
              >
                <Contact className="h-4 w-4 mr-2" />
                Contato
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
