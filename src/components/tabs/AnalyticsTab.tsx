
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Eye, TrendingUp, Award } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface AnalyticsTabProps {
  channels: Channel[];
}

export const AnalyticsTab = ({ channels }: AnalyticsTabProps) => {
  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
          <TrendingUp className="h-16 w-16 text-youtube-white" />
        </div>
        <h3 className="text-3xl font-bold text-youtube-white mb-4 font-orbitron">Análises Não Disponíveis</h3>
        <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-inter">
          Execute uma busca primeiro para ver análises detalhadas dos canais encontrados.
        </p>
      </div>
    );
  }

  // Prepare data for charts
  const totalSubscribers = channels.reduce((sum, channel) => sum + channel.subscriberCount, 0);
  const totalViews = channels.reduce((sum, channel) => sum + channel.viewCount, 0);
  const averageScore = channels.reduce((sum, channel) => sum + channel.score, 0) / channels.length;

  // Top 10 channels for bar chart
  const topChannels = channels.slice(0, 10).map(channel => ({
    name: channel.title.slice(0, 20) + (channel.title.length > 20 ? '...' : ''),
    subscribers: channel.subscriberCount,
    views: channel.viewCount,
  }));

  // Distribution data for pie chart
  const distributionData = [
    { name: 'Pequeno (< 100K)', value: channels.filter(c => c.subscriberCount < 100000).length, color: '#FF4C4C' },
    { name: 'Médio (100K - 1M)', value: channels.filter(c => c.subscriberCount >= 100000 && c.subscriberCount < 1000000).length, color: '#FF0000' },
    { name: 'Grande (> 1M)', value: channels.filter(c => c.subscriberCount >= 1000000).length, color: '#CC0000' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="tech-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-youtube-gray">Total de Canais</CardTitle>
            <Award className="h-4 w-4 text-youtube-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-youtube-white font-orbitron">{channels.length}</div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-youtube-gray">Total Inscritos</CardTitle>
            <Users className="h-4 w-4 text-youtube-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-youtube-white font-orbitron">
              {(totalSubscribers / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-youtube-gray">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-youtube-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-youtube-white font-orbitron">
              {(totalViews / 1000000000).toFixed(1)}B
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-youtube-gray">Score Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-youtube-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-youtube-white font-orbitron">
              {averageScore.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="text-youtube-white font-orbitron">Top 10 Canais por Inscritos</CardTitle>
            <CardDescription className="text-youtube-gray">
              Ranking dos canais com maior número de inscritos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topChannels}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  stroke="#AAAAAA"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#AAAAAA" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#212121', 
                    border: '1px solid #FF0000',
                    borderRadius: '6px',
                    color: '#F9F9F9'
                  }}
                />
                <Bar dataKey="subscribers" fill="#FF0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="text-youtube-white font-orbitron">Distribuição por Tamanho</CardTitle>
            <CardDescription className="text-youtube-gray">
              Categorização dos canais por número de inscritos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#212121', 
                    border: '1px solid #FF0000',
                    borderRadius: '6px',
                    color: '#F9F9F9'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-youtube-gray text-sm">
                    {item.name}: {item.value} canais
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
