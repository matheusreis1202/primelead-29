
import React from 'react';
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
  // Calcular métricas
  const totalChannels = channels.length;
  const totalSubscribers = channels.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  const avgScore = totalChannels > 0 ? channels.reduce((sum, channel) => sum + (channel.score || 0), 0) / totalChannels : 0;
  const totalViews = channels.reduce((sum, channel) => sum + (channel.avgViews || 0), 0);
  
  // Canais com contato
  const channelsWithEmail = channels.filter(c => c.email && c.email.trim() !== '').length;
  const channelsWithPhone = channels.filter(c => c.phone && c.phone.trim() !== '').length;

  // Distribuição por classificação
  const classificationData = channels.reduce((acc, channel) => {
    const classification = channel.classification || 'Não Classificado';
    acc[classification] = (acc[classification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const classificationChartData = Object.entries(classificationData).map(([name, value]) => ({
    name,
    value,
    percentage: totalChannels > 0 ? ((value / totalChannels) * 100).toFixed(1) : '0'
  }));

  // Distribuição por score
  const scoreRanges = {
    'Alto (80+)': channels.filter(c => (c.score || 0) >= 80).length,
    'Médio (60-79)': channels.filter(c => (c.score || 0) >= 60 && (c.score || 0) < 80).length,
    'Baixo (<60)': channels.filter(c => (c.score || 0) < 60).length
  };

  const scoreChartData = Object.entries(scoreRanges).map(([name, value]) => ({
    name,
    value,
    percentage: totalChannels > 0 ? ((value / totalChannels) * 100).toFixed(1) : '0'
  }));

  // Distribuição por tamanho (inscritos)
  const sizeRanges = {
    '1M+': channels.filter(c => (c.subscribers || 0) >= 1000000).length,
    '100K-1M': channels.filter(c => (c.subscribers || 0) >= 100000 && (c.subscribers || 0) < 1000000).length,
    '10K-100K': channels.filter(c => (c.subscribers || 0) >= 10000 && (c.subscribers || 0) < 100000).length,
    '<10K': channels.filter(c => (c.subscribers || 0) < 10000).length
  };

  const sizeChartData = Object.entries(sizeRanges).map(([name, value]) => ({
    name,
    value,
    percentage: totalChannels > 0 ? ((value / totalChannels) * 100).toFixed(1) : '0'
  }));

  // Top performers
  const topChannels = [...channels]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 5);

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

  if (totalChannels === 0) {
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
                <p className="text-2xl font-bold text-white">{totalChannels}</p>
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
                <p className="text-2xl font-bold text-white">{formatNumber(totalSubscribers)}</p>
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
                <p className="text-2xl font-bold text-white">{avgScore.toFixed(1)}</p>
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
                <p className="text-2xl font-bold text-white">{formatNumber(totalViews)}</p>
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
                <p className="text-xl font-bold text-green-400">{channelsWithEmail}</p>
                <p className="text-xs text-[#AAAAAA]">
                  {totalChannels > 0 ? ((channelsWithEmail / totalChannels) * 100).toFixed(1) : 0}% do total
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
                <p className="text-xl font-bold text-blue-400">{channelsWithPhone}</p>
                <p className="text-xs text-[#AAAAAA]">
                  {totalChannels > 0 ? ((channelsWithPhone / totalChannels) * 100).toFixed(1) : 0}% do total
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
                <p className="text-xl font-bold text-[#FF0000]">
                  {channels.filter(c => c.email && c.phone).length}
                </p>
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
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Distribuição por Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={scoreChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#FF0000"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {scoreChartData.map((entry, index) => (
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

        {/* Distribuição por Tamanho */}
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Distribuição por Inscritos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sizeChartData}>
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
                      src={channel.photo} 
                      alt={channel.name}
                      className="w-10 h-10 rounded-full border border-[#525252]"
                    />
                    <div>
                      <p className="text-white font-medium">{channel.name}</p>
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
      {classificationChartData.length > 0 && (
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Distribuição por Classificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classificationChartData.map((item, index) => (
                <div key={item.name} className="p-4 bg-[#0D0D0D] rounded-lg border border-[#333]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{item.name}</p>
                    <Badge 
                      variant="secondary" 
                      style={{ backgroundColor: `${COLORS[index % COLORS.length]}20`, color: COLORS[index % COLORS.length] }}
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
