import { useState } from 'react';
import { PremiumHeader } from '@/components/PremiumHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardTab } from '@/components/tabs/DashboardTab';
import { ResultsTab } from '@/components/tabs/ResultsTab';
import { AnalysisTab } from '@/components/tabs/AnalysisTab';
import { SavedTab } from '@/components/tabs/SavedTab';
import { useSavedChannels } from '@/hooks/useSavedChannels';

export interface SearchFilters {
  apiKey: string;
  nicho: string;
  pais: string;
  idioma: string;
  minInscritos: number;
  maxInscritos: number;
  minViews: number;
  freqMinima: number;
}

export interface Channel {
  id: string;
  title: string;
  subscriberCount: number;
  viewCount: number;
  thumbnail: string;
  description: string;
  score: number;
}

const Index = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelsForAnalysis, setChannelsForAnalysis] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const { savedChannels, saveChannel, removeChannel, isChannelSaved } = useSavedChannels();

  const handleSendToAnalysis = (channel: Channel) => {
    if (!channelsForAnalysis.find(c => c.id === channel.id)) {
      setChannelsForAnalysis(prev => [...prev, channel]);
      setActiveTab('analysis');
    }
  };

  const handleRemoveFromAnalysis = (channelId: string) => {
    setChannelsForAnalysis(prev => prev.filter(c => c.id !== channelId));
  };

  const calculateChannelScore = (channel: any): number => {
    const subscriberScore = Math.min((channel.subscriberCount / 100000) * 20, 40);
    const viewScore = Math.min((channel.viewCount / 1000000) * 30, 30);
    const engagementScore = Math.min((channel.viewCount / channel.subscriberCount) * 30, 30);
    
    return Math.round(subscriberScore + viewScore + engagementScore);
  };

  const searchChannels = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setChannels([]);

    try {
      const foundChannels: Channel[] = [];
      const canaisUnicos = new Set<string>();
      let nextPageToken = '';
      
      while (canaisUnicos.size < 100 && foundChannels.length < 50) {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(filters.nicho)}&regionCode=${filters.pais}&relevanceLanguage=${filters.idioma}&maxResults=50&pageToken=${nextPageToken}&key=${filters.apiKey}`;
        
        const searchResp = await fetch(searchUrl);
        if (!searchResp.ok) {
          throw new Error('Erro ao acessar a API do YouTube. Verifique sua chave de API.');
        }
        
        const searchData = await searchResp.json();
        if (!searchData.items) break;

        for (const item of searchData.items) {
          const channelId = item.snippet.channelId;
          if (canaisUnicos.has(channelId)) continue;
          canaisUnicos.add(channelId);

          const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${filters.apiKey}`;
          const channelResp = await fetch(channelUrl);
          const channelData = await channelResp.json();

          if (!channelData.items || channelData.items.length === 0) continue;

          const canal = channelData.items[0];
          const inscritoCount = parseInt(canal.statistics.subscriberCount || '0');
          const viewCount = parseInt(canal.statistics.viewCount || '0');

          if (inscritoCount >= filters.minInscritos && 
              inscritoCount <= filters.maxInscritos && 
              viewCount >= filters.minViews) {
            
            const uploadsPlaylistId = canal.contentDetails?.relatedPlaylists?.uploads;
            let atendeFrequencia = true;

            if (filters.freqMinima > 0 && uploadsPlaylistId) {
              const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${filters.apiKey}`;
              const playlistResp = await fetch(playlistUrl);
              const playlistData = await playlistResp.json();

              if (playlistData.items) {
                const datas = playlistData.items.map((p: any) => new Date(p.snippet.publishedAt));
                datas.sort((a: Date, b: Date) => b.getTime() - a.getTime());

                if (datas.length >= 2) {
                  const dias = (datas[0].getTime() - datas[datas.length - 1].getTime()) / (1000 * 60 * 60 * 24);
                  const freqAtual = datas.length / (dias / 7);
                  atendeFrequencia = freqAtual >= filters.freqMinima;
                }
              }
            }

            if (atendeFrequencia) {
              const channelWithScore = {
                id: canal.id,
                title: canal.snippet.title,
                subscriberCount: inscritoCount,
                viewCount: viewCount,
                thumbnail: canal.snippet.thumbnails?.default?.url || '',
                description: canal.snippet.description || '',
                score: calculateChannelScore({ subscriberCount: inscritoCount, viewCount: viewCount })
              };
              foundChannels.push(channelWithScore);
            }
          }

          if (foundChannels.length >= 50) break;
        }

        if (!searchData.nextPageToken) break;
        nextPageToken = searchData.nextPageToken;
      }

      foundChannels.sort((a, b) => b.score - a.score);
      setChannels(foundChannels);
      
      if (foundChannels.length === 0) {
        setError('Nenhum canal encontrado com os filtros selecionados.');
      } else {
        setActiveTab('results');
      }

    } catch (error) {
      console.error('Erro na busca:', error);
      setError(error instanceof Error ? error.message : 'Erro ao buscar canais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-youtube-black">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-youtube-red/10 via-transparent to-youtube-red/10"></div>
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.05'%3E%3Cpath d='M50 50l25-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <PremiumHeader />
          
          <div className="container mx-auto px-4 py-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="dashboard" className="font-roboto font-semibold">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="results" className="font-roboto font-semibold">
                  Resultados
                </TabsTrigger>
                <TabsTrigger value="analysis" className="font-roboto font-semibold">
                  Análises
                  {channelsForAnalysis.length > 0 && (
                    <span className="ml-2 bg-youtube-red text-white text-xs px-2 py-1 rounded-full">
                      {channelsForAnalysis.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="saved" className="font-roboto font-semibold">
                  Salvos
                  {savedChannels.length > 0 && (
                    <span className="ml-2 bg-youtube-red text-white text-xs px-2 py-1 rounded-full">
                      {savedChannels.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <DashboardTab onSearch={searchChannels} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="results">
                <ResultsTab 
                  channels={channels} 
                  isLoading={isLoading} 
                  error={error}
                  onSendToAnalysis={handleSendToAnalysis}
                />
              </TabsContent>

              <TabsContent value="analysis">
                <AnalysisTab 
                  channelsForAnalysis={channelsForAnalysis}
                  onRemoveFromAnalysis={handleRemoveFromAnalysis}
                  onSaveChannel={saveChannel}
                  isChannelSaved={isChannelSaved}
                />
              </TabsContent>

              <TabsContent value="saved">
                <SavedTab 
                  savedChannels={savedChannels}
                  onRemoveFromSaved={removeChannel}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
