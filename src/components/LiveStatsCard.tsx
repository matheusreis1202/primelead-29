
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, Eye, Star, Target } from 'lucide-react';

interface ChannelData {
  id?: string;
  name: string;
  subscribers: number;
  avgViews: number;
  engagement: string;
  score: number;
  classification: string;
  email: string;
  phone: string;
}

interface LiveStatsCardProps {
  channels: ChannelData[];
}

export const LiveStatsCard = ({ channels }: LiveStatsCardProps) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalChannels: 0,
    avgScore: 0,
    completionRate: 0,
    qualityChannels: 0
  });

  const totalChannels = channels.length;
  const avgScore = totalChannels > 0 ? channels.reduce((sum, c) => sum + c.score, 0) / totalChannels : 0;
  const channelsWithContact = channels.filter(c => c.email && c.phone).length;
  const completionRate = totalChannels > 0 ? (channelsWithContact / totalChannels) * 100 : 0;
  const qualityChannels = channels.filter(c => c.score >= 70).length;

  // Animação dos números
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Easing function

      setAnimatedStats({
        totalChannels: Math.round(totalChannels * easeProgress),
        avgScore: Math.round(avgScore * easeProgress * 10) / 10,
        completionRate: Math.round(completionRate * easeProgress * 10) / 10,
        qualityChannels: Math.round(qualityChannels * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats({
          totalChannels,
          avgScore: Math.round(avgScore * 10) / 10,
          completionRate: Math.round(completionRate * 10) / 10,
          qualityChannels
        });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [totalChannels, avgScore, completionRate, qualityChannels]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] border-[#525252] overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#AAAAAA] text-sm font-medium">Total de Canais</p>
              <p className="text-2xl font-bold text-white">
                {animatedStats.totalChannels}
              </p>
              <Badge variant="secondary" className="mt-1 bg-[#FF0000]/20 text-[#FF0000]">
                Ativos
              </Badge>
            </div>
            <div className="p-3 bg-[#FF0000]/20 rounded-full">
              <Users className="h-6 w-6 text-[#FF0000]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] border-[#525252] overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#AAAAAA] text-sm font-medium">Score Médio</p>
              <p className={`text-2xl font-bold ${getScoreColor(animatedStats.avgScore)}`}>
                {animatedStats.avgScore}
              </p>
              <div className="flex items-center mt-1">
                {animatedStats.avgScore >= 70 ? (
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                )}
                <span className="text-xs text-[#AAAAAA]">
                  {animatedStats.avgScore >= 70 ? 'Excelente' : 'Precisa melhorar'}
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] border-[#525252] overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[#AAAAAA] text-sm font-medium">Dados Completos</p>
              <p className="text-2xl font-bold text-white">
                {animatedStats.completionRate}%
              </p>
              <Progress 
                value={animatedStats.completionRate} 
                className={`mt-2 h-2 ${getCompletionColor(animatedStats.completionRate)}`}
              />
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] border-[#525252] overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#AAAAAA] text-sm font-medium">Alta Qualidade</p>
              <p className="text-2xl font-bold text-green-400">
                {animatedStats.qualityChannels}
              </p>
              <p className="text-xs text-[#AAAAAA] mt-1">
                {totalChannels > 0 ? Math.round((qualityChannels / totalChannels) * 100) : 0}% do total
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Eye className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
