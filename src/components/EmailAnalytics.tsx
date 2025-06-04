
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Mail, Eye, MousePointer, UserMinus, AlertCircle } from 'lucide-react';
import { EmailCampaign } from './tabs/EmailMarketingTab';

interface EmailAnalyticsProps {
  campaigns: EmailCampaign[];
}

export const EmailAnalytics = ({ campaigns }: EmailAnalyticsProps) => {
  const totalStats = campaigns.reduce(
    (acc, campaign) => ({
      sent: acc.sent + campaign.stats.sent,
      delivered: acc.delivered + campaign.stats.delivered,
      opened: acc.opened + campaign.stats.opened,
      clicked: acc.clicked + campaign.stats.clicked,
      bounced: acc.bounced + campaign.stats.bounced,
      unsubscribed: acc.unsubscribed + campaign.stats.unsubscribed
    }),
    { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 }
  );

  const deliveryRate = totalStats.sent > 0 ? (totalStats.delivered / totalStats.sent) * 100 : 0;
  const openRate = totalStats.delivered > 0 ? (totalStats.opened / totalStats.delivered) * 100 : 0;
  const clickRate = totalStats.delivered > 0 ? (totalStats.clicked / totalStats.delivered) * 100 : 0;
  const bounceRate = totalStats.sent > 0 ? (totalStats.bounced / totalStats.sent) * 100 : 0;

  // Dados para gráfico de barras (campanhas individuais)
  const campaignData = campaigns.map(campaign => ({
    name: campaign.name.substring(0, 15) + (campaign.name.length > 15 ? '...' : ''),
    enviados: campaign.stats.sent,
    abertos: campaign.stats.opened,
    cliques: campaign.stats.clicked,
    openRate: campaign.stats.delivered > 0 ? (campaign.stats.opened / campaign.stats.delivered) * 100 : 0
  }));

  // Dados para gráfico de pizza (distribuição de engajamento)
  const engagementData = [
    { name: 'Abertos', value: totalStats.opened, color: '#4ADE80' },
    { name: 'Cliques', value: totalStats.clicked, color: '#3B82F6' },
    { name: 'Não Abertos', value: totalStats.delivered - totalStats.opened, color: '#64748B' }
  ];

  // Dados de tendência temporal (simulado)
  const trendData = campaigns.map((campaign, index) => ({
    name: `Campanha ${index + 1}`,
    openRate: campaign.stats.delivered > 0 ? (campaign.stats.opened / campaign.stats.delivered) * 100 : 0,
    clickRate: campaign.stats.delivered > 0 ? (campaign.stats.clicked / campaign.stats.delivered) * 100 : 0
  }));

  const getPerformanceBadge = (rate: number, type: 'open' | 'click' | 'bounce') => {
    let thresholds;
    switch (type) {
      case 'open':
        thresholds = { good: 25, medium: 15 };
        break;
      case 'click':
        thresholds = { good: 5, medium: 2 };
        break;
      case 'bounce':
        thresholds = { good: 2, medium: 5 };
        break;
    }

    if (type === 'bounce') {
      if (rate <= thresholds.good) return { color: 'bg-green-500', text: 'Excelente' };
      if (rate <= thresholds.medium) return { color: 'bg-yellow-500', text: 'Bom' };
      return { color: 'bg-red-500', text: 'Ruim' };
    } else {
      if (rate >= thresholds.good) return { color: 'bg-green-500', text: 'Excelente' };
      if (rate >= thresholds.medium) return { color: 'bg-yellow-500', text: 'Bom' };
      return { color: 'bg-red-500', text: 'Ruim' };
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-[#AAAAAA]">
        <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <div className="text-lg mb-2">Nenhuma campanha para analisar</div>
        <div className="text-sm">Crie campanhas de email para ver as estatísticas aqui</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics de Email Marketing</h2>
        <p className="text-[#AAAAAA]">Acompanhe o desempenho das suas campanhas</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-[#AAAAAA]">Taxa de Entrega</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {deliveryRate.toFixed(1)}%
            </div>
            <Badge className={`${getPerformanceBadge(deliveryRate, 'open').color} text-white text-xs`}>
              {getPerformanceBadge(deliveryRate, 'open').text}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-green-400" />
              <span className="text-sm text-[#AAAAAA]">Taxa de Abertura</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {openRate.toFixed(1)}%
            </div>
            <Badge className={`${getPerformanceBadge(openRate, 'open').color} text-white text-xs`}>
              {getPerformanceBadge(openRate, 'open').text}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MousePointer className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-[#AAAAAA]">Taxa de Clique</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {clickRate.toFixed(1)}%
            </div>
            <Badge className={`${getPerformanceBadge(clickRate, 'click').color} text-white text-xs`}>
              {getPerformanceBadge(clickRate, 'click').text}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-[#AAAAAA]">Taxa de Rejeição</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {bounceRate.toFixed(1)}%
            </div>
            <Badge className={`${getPerformanceBadge(bounceRate, 'bounce').color} text-white text-xs`}>
              {getPerformanceBadge(bounceRate, 'bounce').text}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Performance por Campanha */}
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Performance por Campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#525252" />
                <XAxis 
                  dataKey="name" 
                  stroke="#AAAAAA"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#AAAAAA" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2A2A2A', 
                    border: '1px solid #525252',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Bar dataKey="enviados" fill="#3B82F6" name="Enviados" />
                <Bar dataKey="abertos" fill="#4ADE80" name="Abertos" />
                <Bar dataKey="cliques" fill="#8B5CF6" name="Cliques" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Distribuição de Engajamento */}
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2A2A2A', 
                    border: '1px solid #525252',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tendência de Performance */}
      <Card className="bg-[#1E1E1E] border-[#525252]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tendência de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#525252" />
              <XAxis dataKey="name" stroke="#AAAAAA" fontSize={12} />
              <YAxis stroke="#AAAAAA" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2A2A2A', 
                  border: '1px solid #525252',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="openRate" 
                stroke="#4ADE80" 
                strokeWidth={2}
                name="Taxa de Abertura (%)"
              />
              <Line 
                type="monotone" 
                dataKey="clickRate" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Taxa de Clique (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <Card className="bg-[#1E1E1E] border-[#525252]">
        <CardHeader>
          <CardTitle className="text-white">Resumo Estatístico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{totalStats.sent}</div>
              <div className="text-sm text-[#AAAAAA]">Enviados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{totalStats.delivered}</div>
              <div className="text-sm text-[#AAAAAA]">Entregues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{totalStats.opened}</div>
              <div className="text-sm text-[#AAAAAA]">Abertos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{totalStats.clicked}</div>
              <div className="text-sm text-[#AAAAAA]">Cliques</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{totalStats.bounced}</div>
              <div className="text-sm text-[#AAAAAA]">Rejeitados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{totalStats.unsubscribed}</div>
              <div className="text-sm text-[#AAAAAA]">Descadastros</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
