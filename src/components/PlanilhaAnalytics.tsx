
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Star, Target, Phone, Mail } from 'lucide-react';

interface ChannelData {
  id?: string;
  photo: string;
  name: string;
  link: string;
  phone: string;
  email: string;
  subscribers: number;
  avgViews: number;
  monthlyVideos: number;
  engagement: string;
  subGrowth: string;
  score: number;
  classification: string;
}

interface PlanilhaAnalyticsProps {
  channels: ChannelData[];
}

export const PlanilhaAnalytics = ({ channels = [] }: PlanilhaAnalyticsProps) => {
  // Memoizar cálculos para melhor performance
  const analytics = useMemo(() => {
    const totalChannels = channels.length;
    const totalSubscribers = channels.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
    const avgScore = totalChannels > 0 ? channels.reduce((sum, channel) => sum + (channel.score || 0), 0) / totalChannels : 0;
    const totalViews = channels.reduce((sum, channel) => sum + (channel.avgViews || 0), 0);
    
    // Canais com contato
    const channelsWithEmail = channels.filter(c => c.email && c.email.trim() !== '' && c.email !== 'Não informado').length;
    const channelsWithPhone = channels.filter(c => c.phone && c.phone.trim() !== '' && c.phone !== 'Não informado').length;
    const channelsWithBoth = channels.filter(c => 
      c.email && c.email.trim() !== '' && c.email !== 'Não informado' &&
      c.phone && c.phone.trim() !== '' && c.phone !== 'Não informado'
    ).length;

    return {
      totalChannels,
      totalSubscribers,
      avgScore,
      totalViews,
      channelsWithEmail,
      channelsWithPhone,
      channelsWithBoth
    };
  }, [channels]);

  // Memoizar distribuição por classificação
  const classificationData = useMemo(() => {
    const classificationCount = channels.reduce((acc, channel) => {
      const classification = channel.classification || 'Não Classificado';
      acc[classification] = (acc[classification] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(classificationCount).map(([name, value]) => ({
      name,
      value,
      percentage: analytics.totalChannels > 0 ? ((value / analytics.totalChannels) * 100).toFixed(1) : '0'
    }));
  }, [channels, analytics.totalChannels]);

  // Memoizar distribuição por score
  const scoreData = useMemo(() => {
    const scoreRanges = {
      'Alto (80+)': channels.filter(c => (c.score || 0) >= 80).length,
      'Médio (60-79)': channels.filter(c => (c.score || 0) >= 60 && (c.score || 0) < 80).length,
      'Baixo (<60)': channels.filter(c => (c.score || 0) < 60).length
    };

    return Object.entries(scoreRanges).map(([name, value]) => ({
      name,
      value,
      percentage: analytics.totalChannels > 0 ? ((value / analytics.totalChannels) * 100).toFixed(1) : '0'
    }));
  }, [channels, analytics.totalChannels]);

  // Memoizar distribuição por tamanho
  const sizeData = useMemo(() => {
    const sizeRanges = {
      '1M+': channels.filter(c => (c.subscribers || 0) >= 1000000).length,
      '100K-1M': channels.filter(c => (c.subscribers || 0) >= 100000 && (c.subscribers || 0) < 1000000).length,
      '10K-100K': channels.filter(c => (c.subscribers || 0) >= 10000 && (c.subscribers || 0) < 100000).length,
      '<10K': channels.filter(c => (c.subscribers || 0) < 10000).length
    };

    return Object.entries(sizeRanges).map(([name, value]) => ({
      name,
      value,
      percentage: analytics.totalChannels > 0 ? ((value / analytics.totalChannels) * 100).toFixed(1) : '0'
    }));
  }, [channels, analytics.totalChannels]);

  // Memoizar top performers
  const topChannels = useMemo(() => {
    return [...channels]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5);
  }, [channels]);

  const COLORS = ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getClassificationColor = (classification: string): string => {
    switch (classification) {
      case 'Alto Potencial': return '#22c55e';
      case 'Médio Potencial': return '#eab308';
      case 'Baixo Potencial': return '#f97316';
      case 'Micro Influencer': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (analytics.totalChannels === 0) {
    return (
      <div className="text-center py-12 text-[#AAAAAA]">
        <div className="text-lg mb-2">Nenhum canal encontrado</div>
        <div className="text-sm">Adicione canais através da aba de Análise para ver os analytics</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Total de Canais</p>
                <p className="text-2xl font-bold text-white">{analytics.totalChannels}</p>
              </div>
              <Users className="h-8 w-8 text-[#FF0000]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Total Inscritos</p>
                <p className="text-2xl font-bold text-white">{formatNumber(analytics.totalSubscribers)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Score Médio</p>
                <p className="text-2xl font-bold text-white">{analytics.avgScore.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{formatNumber(analytics.totalViews)}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações de Contato */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Com Email</p>
                <p className="text-xl font-bold text-green-400">{analytics.channelsWithEmail}</p>
                <p className="text-xs text-[#AAAAAA]">
                  {analytics.totalChannels > 0 ? ((analytics.channelsWithEmail / analytics.totalChannels) * 100).toFixed(1) : 0}% do total
                </p>
              </div>
              <Mail className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Com Telefone</p>
                <p className="text-xl font-bold text-blue-400">{analytics.channelsWithPhone}</p>
                <p className="text-xs text-[#AAAAAA]">
                  {analytics.totalChannels > 0 ? ((analytics.channelsWithPhone / analytics.totalChannels) * 100).toFixed(1) : 0}% do total
                </p>
              </div>
              <Phone className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAAAAA] text-sm">Completos</p>
                <p className="text-xl font-bold text-[#FF0000]">{analytics.channelsWithBoth}</p>
                <p className="text-xs text-[#AAAAAA]">Email + Telefone</p>
              </div>
              <Target className="h-6 w-6 text-[#FF0000]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Score */}
        {scoreData.length > 0 && (
          <Card className="bg-[#1E1E1E] border-[#525252]">
            <CardHeader>
              <CardTitle className="text-white">Distribuição por Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#FF0000"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E1E', 
                      border: '1px solid #525252',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Distribuição por Tamanho */}
        {sizeData.length > 0 && (
          <Card className="bg-[#1E1E1E] border-[#525252]">
            <CardHeader>
              <CardTitle className="text-white">Distribuição por Inscritos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sizeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#AAAAAA" />
                  <YAxis stroke="#AAAAAA" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E1E', 
                      border: '1px solid #525252',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="value" fill="#FF0000" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Top Performers */}
      {topChannels.length > 0 && (
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Top 5 Canais por Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topChannels.map((channel, index) => (
                <div key={channel.id || channel.name} className="flex items-center justify-between p-3 bg-[#0D0D0D] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <img 
                      src={channel.photo || 'https://via.placeholder.com/40'} 
                      alt={channel.name}
                      className="w-10 h-10 rounded-full border border-[#525252]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                    <div>
                      <p className="text-white font-medium">{channel.name || 'Nome não informado'}</p>
                      <p className="text-[#AAAAAA] text-sm">{formatNumber(channel.subscribers)} inscritos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold text-lg">{channel.score}</p>
                    <Badge 
                      variant="secondary" 
                      style={{ 
                        backgroundColor: `${getClassificationColor(channel.classification)}20`,
                        color: getClassificationColor(channel.classification)
                      }}
                    >
                      {channel.classification}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribuição por Classificação */}
      {classificationData.length > 0 && (
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Distribuição por Classificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classificationData.map((item, index) => (
                <div key={item.name} className="p-4 bg-[#0D0D0D] rounded-lg border border-[#333]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{item.name}</p>
                    <Badge 
                      variant="secondary" 
                      style={{ 
                        backgroundColor: `${COLORS[index % COLORS.length]}20`, 
                        color: COLORS[index % COLORS.length] 
                      }}
                    >
                      {item.percentage}%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-[#FF0000]">{item.value}</p>
                  <p className="text-[#AAAAAA] text-sm">canais</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
