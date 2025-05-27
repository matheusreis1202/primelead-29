
import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ChannelResults } from '@/components/ChannelResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PremiumHeader } from '@/components/PremiumHeader';
import { Search, Target, Play } from 'lucide-react';

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
    // Advanced scoring algorithm for YouTube channels
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 via-transparent to-gray-100/30"></div>
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.02'%3E%3Cpath d='M50 50l25-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <PremiumHeader />
          
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[calc(100vh-400px)]">
              {/* Left Side - Search Controls */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                    <div className="bg-blue-900 p-3 rounded-xl">
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    Prospecção
                  </h2>
                  <SearchForm onSearch={searchChannels} isLoading={isLoading} />
                </div>

                {/* Score Legend */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Classificação de Scores</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-400 to-green-500 rounded-xl shadow-md">
                      <span className="text-white font-bold">85 - 100</span>
                      <span className="text-white font-black">PREMIUM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl shadow-md">
                      <span className="text-white font-bold">70 - 84</span>
                      <span className="text-white font-black">ÓTIMO</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl shadow-md">
                      <span className="text-white font-bold">55 - 69</span>
                      <span className="text-white font-black">BOM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-md">
                      <span className="text-white font-bold">40 - 54</span>
                      <span className="text-white font-black">RAZOÁVEL</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-400 to-red-500 rounded-xl shadow-md">
                      <span className="text-white font-bold">0 - 39</span>
                      <span className="text-white font-black">RUIM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="lg:col-span-8">
                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-24">
                    <LoadingSpinner />
                    <p className="text-gray-600 mt-6 text-xl">Analisando canais premium com IA...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-500 p-3 rounded-full">
                        <Search className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-red-700 font-semibold text-lg">{error}</p>
                    </div>
                  </div>
                )}

                {/* Results */}
                {channels.length > 0 && (
                  <ChannelResults channels={channels} />
                )}

                {/* Empty State */}
                {!isLoading && !error && channels.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="bg-blue-800 p-8 rounded-full mb-8 shadow-lg">
                      <Target className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Pronto para Prospectar</h3>
                    <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                      Configure seus filtros de busca e descubra os melhores canais premium do YouTube para sua estratégia.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-green-500">
                      <Play className="h-5 w-5 fill-current" />
                      <span className="font-semibold">Powered by YouTube Data API</span>
                    </div>
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
