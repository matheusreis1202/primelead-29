import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ChannelResults } from '@/components/ChannelResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PremiumHeader } from '@/components/PremiumHeader';
import { Search, Target, Play, Zap, Crown, Award, Star, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#282828] to-black">
      <div className="relative">
        {/* Futuristic Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/5 via-transparent to-[#FF0000]/5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-px h-64 bg-gradient-to-b from-[#FF0000]/20 to-transparent transform rotate-45"></div>
            <div className="absolute top-1/3 right-1/4 w-px h-48 bg-gradient-to-b from-[#FF0000]/15 to-transparent transform -rotate-45"></div>
            <div className="absolute bottom-1/4 left-1/3 w-px h-32 bg-gradient-to-b from-[#FF0000]/10 to-transparent"></div>
          </div>
        </div>
        
        <div className="relative z-10">
          <PremiumHeader />
          
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[calc(100vh-400px)]">
              {/* Left Side - Search Controls */}
              <div className="lg:col-span-5 space-y-10">
                <SearchForm onSearch={searchChannels} isLoading={isLoading} />

                {/* Futuristic Score Legend */}
                <div className="bg-gradient-to-br from-white via-gray-50 to-white border-0 rounded-3xl p-10 shadow-2xl backdrop-blur-sm">
                  <h3 className="text-3xl font-black text-[#282828] mb-8 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-3 rounded-2xl shadow-lg">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    Classificação AI
                  </h3>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#FF0000] to-red-600 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <Crown className="h-5 w-5 text-white" />
                        <span className="text-white font-bold">85 - 100</span>
                      </div>
                      <span className="text-white font-black tracking-wider">PREMIUM</span>
                    </div>
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#282828] to-gray-700 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-white" />
                        <span className="text-white font-bold">70 - 84</span>
                      </div>
                      <span className="text-white font-black tracking-wider">ÓTIMO</span>
                    </div>
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-white" />
                        <span className="text-white font-bold">55 - 69</span>
                      </div>
                      <span className="text-white font-black tracking-wider">BOM</span>
                    </div>
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-white" />
                        <span className="text-white font-bold">40 - 54</span>
                      </div>
                      <span className="text-white font-black tracking-wider">RAZOÁVEL</span>
                    </div>
                    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-white" />
                        <span className="text-white font-bold">0 - 39</span>
                      </div>
                      <span className="text-white font-black tracking-wider">RUIM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="lg:col-span-7">
                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-32">
                    <LoadingSpinner />
                    <p className="text-white mt-8 text-2xl font-light">Analisando canais com IA...</p>
                    <p className="text-gray-400 mt-2 text-lg">Algoritmo premium em execução</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-[#FF0000]/30 rounded-3xl p-10 mb-10 backdrop-blur-sm">
                    <div className="flex items-center gap-6">
                      <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-4 rounded-2xl shadow-lg">
                        <Search className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[#FF0000] font-bold text-xl mb-2">Erro na Busca</h3>
                        <p className="text-red-400 text-lg">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {channels.length > 0 && (
                  <ChannelResults channels={channels} />
                )}

                {/* Empty State */}
                {!isLoading && !error && channels.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-12 rounded-3xl mb-10 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <Target className="h-20 w-20 text-white relative z-10" />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-6">Pronto para Descobrir</h3>
                    <p className="text-gray-300 max-w-2xl text-xl leading-relaxed font-light mb-8">
                      Configure seus filtros de busca e descubra os melhores canais premium do YouTube com nossa IA avançada.
                    </p>
                    <div className="flex items-center gap-3 text-[#FF0000] bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                      <Play className="h-5 w-5 fill-current" />
                      <span className="font-bold">Powered by YouTube Data API</span>
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
