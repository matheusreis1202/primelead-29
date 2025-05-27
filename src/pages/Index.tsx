
import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ChannelResults } from '@/components/ChannelResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PremiumHeader } from '@/components/PremiumHeader';
import { Search, Target } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateChannelScore = (channel: any): number => {
    // Premium scoring algorithm
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

      // Sort by score (highest first)
      foundChannels.sort((a, b) => b.score - a.score);
      setChannels(foundChannels);
      
      if (foundChannels.length === 0) {
        setError('Nenhum canal encontrado com os filtros selecionados.');
      }

    } catch (error) {
      console.error('Erro na busca:', error);
      setError(error instanceof Error ? error.message : 'Erro ao buscar canais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"></div>
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.02'%3E%3Cpath d='M40 40l20-20v40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <PremiumHeader />
          
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-300px)]">
              {/* Left Side - Interface Controls */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    Buscar Canais
                  </h2>
                  <SearchForm onSearch={searchChannels} isLoading={isLoading} />
                </div>

                {/* Score Legend */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tabela de Scores</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg border border-emerald-200">
                      <span className="text-white font-medium">85 - 100</span>
                      <span className="text-white font-bold">Premium</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg border border-blue-200">
                      <span className="text-white font-medium">70 - 84</span>
                      <span className="text-white font-bold">Ótimo</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg border border-amber-200">
                      <span className="text-white font-medium">55 - 69</span>
                      <span className="text-white font-bold">Bom</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg border border-orange-200">
                      <span className="text-white font-medium">40 - 54</span>
                      <span className="text-white font-bold">Razoável</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg border border-red-200">
                      <span className="text-white font-medium">0 - 39</span>
                      <span className="text-white font-bold">Ruim</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Channel Results */}
              <div className="lg:col-span-8">
                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <LoadingSpinner />
                    <p className="text-slate-600 mt-4 text-lg">Analisando canais premium...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Search className="h-5 w-5 text-red-600" />
                      </div>
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Results */}
                {channels.length > 0 && (
                  <ChannelResults channels={channels} />
                )}

                {/* Empty State */}
                {!isLoading && !error && channels.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-slate-100 p-6 rounded-full mb-6 border border-slate-200">
                      <Target className="h-12 w-12 text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pronto para buscar</h3>
                    <p className="text-slate-600 max-w-md">
                      Configure os filtros à esquerda e clique em "Buscar Canais" para encontrar os melhores canais premium.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
