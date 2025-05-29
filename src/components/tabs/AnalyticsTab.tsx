
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Eye, TrendingUp, Award, Crown, Star } from 'lucide-react';
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

  // Top 3 channels for detailed analysis
  const top3Channels = channels.slice(0, 3);
  
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getChannelIcon = (index: number) => {
    if (index === 0) return Crown;
    if (index === 1) return Award;
    return Star;
  };

  const getChannelColor = (index: number) => {
    if (index === 0) return 'from-yellow-500 to-yellow-600';
    if (index === 1) return 'from-gray-400 to-gray-500';
    return 'from-orange-500 to-orange-600';
  };

  return (
    <div className="space-y-8">
      {/* Top 3 Channels Analysis */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-youtube-white font-orbitron mb-6">
          Top 3 Canais - Análise Detalhada
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {top3Channels.map((channel, index) => {
            const ChannelIcon = getChannelIcon(index);
            const engagementRate = ((channel.viewCount / channel.subscriberCount) * 100);
            
            return (
              <Card key={channel.id} className="tech-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`bg-gradient-to-r ${getChannelColor(index)} p-3 rounded-lg futuristic-glow`}>
                      <ChannelIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs font-bold text-youtube-gray font-orbitron">
                      #{index + 1} CANAL
                    </div>
                  </div>
                  <CardTitle className="text-youtube-white text-lg font-orbitron line-clamp-2">
                    {channel.title}
                  </CardTitle>
                  {channel.thumbnail && (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title}
                      className="w-full h-24 object-cover rounded-lg border border-youtube-red/30"
                    />
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Score */}
                  <div className="bg-youtube-dark p-3 rounded-lg border border-youtube-red/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-youtube-red font-orbitron">
                        {channel.score}/100
                      </div>
                      <div className="text-xs text-youtube-gray font-inter">
                        Score de Performance
                      </div>
                    </div>
                  </div>

                  {/* Subscribers */}
                  <div className="flex items-center justify-between p-3 bg-youtube-dark rounded-lg border border-youtube-red/30">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-youtube-red" />
                      <span className="text-sm text-youtube-gray font-inter">Inscritos</span>
                    </div>
                    <span className="font-bold text-youtube-white font-orbitron">
                      {formatNumber(channel.subscriberCount)}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="flex items-center justify-between p-3 bg-youtube-dark rounded-lg border border-youtube-red/30">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-youtube-red" />
                      <span className="text-sm text-youtube-gray font-inter">Views</span>
                    </div>
                    <span className="font-bold text-youtube-white font-orbitron">
                      {formatNumber(channel.viewCount)}
                    </span>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between p-3 bg-youtube-dark rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 font-inter">Engajamento</span>
                    </div>
                    <span className="font-bold text-green-400 font-orbitron">
                      {engagementRate.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

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
