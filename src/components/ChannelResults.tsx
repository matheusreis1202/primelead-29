
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Eye, MessageCircle } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ChannelResultsProps {
  channels: Channel[];
}

export const ChannelResults = ({ channels }: ChannelResultsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Resultados Encontrados
        </h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {channels.length} canais
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <Card key={channel.id} className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                {channel.thumbnail && (
                  <img 
                    src={channel.thumbnail} 
                    alt={channel.title}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">ID: {channel.id}</p>
                </div>
              </div>

              {channel.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {channel.description}
                </p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Inscritos</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(channel.subscriberCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="h-4 w-4" />
                    <span>Visualizações</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(channel.viewCount)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  asChild 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <a 
                    href={`https://www.youtube.com/channel/${channel.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Canal
                  </a>
                </Button>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-gray-300 hover:bg-gray-50"
                >
                  <a 
                    href={`https://www.youtube.com/channel/${channel.id}/about`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contato
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
