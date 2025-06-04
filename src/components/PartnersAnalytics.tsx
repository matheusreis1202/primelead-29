
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Target, Calendar, CheckCircle } from 'lucide-react';

interface PartnerData {
  id: string;
  name: string;
  status: 'Interesse' | 'Negociando' | 'Fechado' | 'Rejeitado';
  investment?: string;
  score: number;
  classification: string;
}

interface PartnersAnalyticsProps {
  partners: PartnerData[];
}

export const PartnersAnalytics = ({ partners }: PartnersAnalyticsProps) => {
  const totalPartners = partners.length;
  const closedDeals = partners.filter(p => p.status === 'Fechado').length;
  const negotiating = partners.filter(p => p.status === 'Negociando').length;
  const conversionRate = totalPartners > 0 ? ((closedDeals / totalPartners) * 100).toFixed(1) : '0';
  
  const totalInvestment = partners
    .filter(p => p.status === 'Fechado' && p.investment)
    .reduce((sum, p) => {
      const value = parseFloat(p.investment?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
      return sum + value;
    }, 0);

  const avgScore = totalPartners > 0 
    ? (partners.reduce((sum, p) => sum + p.score, 0) / totalPartners).toFixed(1)
    : '0';

  const highPotential = partners.filter(p => 
    p.classification === 'Altíssimo Potencial' || p.classification === 'Grande Potencial'
  ).length;

  const metrics = [
    {
      title: 'Total de Parceiros',
      value: totalPartners,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Taxa de Conversão',
      value: `${conversionRate}%`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Em Negociação',
      value: negotiating,
      icon: Calendar,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Fechados',
      value: closedDeals,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Score Médio',
      value: avgScore,
      icon: TrendingUp,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Alto Potencial',
      value: highPotential,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6 px-3 sm:px-0">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-[#1E1E1E] border-[#333]">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${metric.bgColor} self-start sm:self-auto flex-shrink-0`}>
                <metric.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${metric.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-base sm:text-lg font-bold ${metric.color} truncate`}>
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#AAAAAA] leading-tight">
                  {metric.title}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
