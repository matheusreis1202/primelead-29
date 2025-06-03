import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModernHeader } from '@/components/ModernHeader';
import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { EnhancedSidebar } from '@/components/EnhancedSidebar';
import { ResultsTab } from '@/components/tabs/ResultsTab';
import { AnalysisTab } from '@/components/tabs/AnalysisTab';
import { NewPlanilhaTab } from '@/components/tabs/NewPlanilhaTab';
import { PartnersTab, usePartnersData } from '@/components/tabs/PartnersTab';
import { EnhancedLoading } from '@/components/EnhancedLoading';

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
  description: string;
  thumbnail: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  publishedAt: string;
  country: string;
  language: string;
  score: number;
  category: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channelsForAnalysis, setChannelsForAnalysis] = useState<Channel[]>([]);
  const [savedChannels, setSavedChannels] = useState<Channel[]>([]);
  const { partnerships, addPartnership } = usePartnersData();

  console.log('Index component render:', {
    channels: (channels || []).length,
    channelsForAnalysis: (channelsForAnalysis || []).length,
    savedChannels: (savedChannels || []).length,
    partnerships: (partnerships || []).length,
    activeTab
  });

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setChannels([]);
    
    try {
      console.log('Searching with filters:', filters);
      
      const canaisUnicos = new Set();
      let nextPageToken = '';
      const foundChannels: Channel[] = [];
      
      while (canaisUnicos.size < 100) {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(filters.nicho)}&regionCode=${filters.pais}&relevanceLanguage=${filters.idioma}&maxResults=50&pageToken=${nextPageToken}&key=${filters.apiKey}`;
        
        const searchResp = await fetch(searchUrl);
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
          const videoCount = parseInt(canal.statistics.videoCount || '0');

          if (inscritoCount >= filters.minInscritos && inscritoCount <= filters.maxInscritos && viewCount >= filters.minViews) {
            const uploadsPlaylistId = canal.contentDetails?.relatedPlaylists?.uploads;
            let atendeFrequencia = true;

            if (filters.freqMinima > 0 && uploadsPlaylistId) {
              const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${filters.apiKey}`;
              const playlistResp = await fetch(playlistUrl);
              const playlistData = await playlistResp.json();

              if (playlistData.items && playlistData.items.length > 0) {
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
              // Calcular score baseado no engajamento
              const engagementRate = videoCount > 0 ? (viewCount / videoCount / inscritoCount) * 100 : 0;
              const score = Math.min(100, Math.max(60, 70 + engagementRate * 5));

              const channel: Channel = {
                id: canal.id,
                title: canal.snippet.title,
                description: canal.snippet.description || '',
                thumbnail: canal.snippet.thumbnails?.high?.url || canal.snippet.thumbnails?.default?.url || '',
                subscriberCount: inscritoCount,
                viewCount: viewCount,
                videoCount: videoCount,
                publishedAt: canal.snippet.publishedAt,
                country: canal.snippet.country || filters.pais,
                language: canal.snippet.defaultLanguage || filters.idioma,
                score: Math.round(score),
                category: filters.nicho
              };

              foundChannels.push(channel);
              console.log('Canal encontrado:', channel);
            }
          }

          if (canaisUnicos.size >= 100) break;
        }

        if (!searchData.nextPageToken) break;
        nextPageToken = searchData.nextPageToken;
      }

      // Ordenar por score e número de inscritos
      foundChannels.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return b.subscriberCount - a.subscriberCount;
      });

      console.log('Canais encontrados:', foundChannels);
      setChannels(foundChannels);

      if (foundChannels.length === 0) {
        setError('Nenhum canal encontrado com os filtros selecionados.');
      }
      
    } catch (err: any) {
      console.error('Search error:', err);
      if (err.message?.includes('403') || err.message?.includes('API key')) {
        setError('Chave da API inválida ou sem permissões. Verifique sua chave da API do YouTube.');
      } else if (err.message?.includes('quota')) {
        setError('Cota da API excedida. Tente novamente mais tarde.');
      } else {
        setError('Erro ao buscar canais. Verifique sua conexão e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToAnalysis = (channel: Channel) => {
    setChannelsForAnalysis(prev => [...(prev || []), channel]);
    setActiveTab('analysis');
  };

  const handleSaveToSpreadsheet = (channel: Channel) => {
    setSavedChannels(prev => [...(prev || []), channel]);
  };

  const handleSendToPartners = (channelData: any) => {
    addPartnership(channelData);
    setActiveTab('partners');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'results':
        return (
          <ResultsTab
            channels={channels || []}
            isLoading={isLoading}
            error={error}
            onSendToAnalysis={handleSendToAnalysis}
          />
        );
      case 'analysis':
        return (
          <AnalysisTab
            channels={channelsForAnalysis || []}
            onRemoveChannel={(id) => setChannelsForAnalysis(prev => (prev || []).filter(c => c.id !== id))}
            onSendToPartners={handleSendToPartners}
            onSaveToSpreadsheet={handleSaveToSpreadsheet}
          />
        );
      case 'planilha':
        return (
          <NewPlanilhaTab
            savedChannels={savedChannels || []}
            onSendToPartners={handleSendToPartners}
          />
        );
      case 'partners':
        return <PartnersTab partnershipsData={partnerships || []} />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0D0D0D]">
        <EnhancedSidebar onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="flex-1 flex flex-col">
          <ModernHeader />
          <EnhancedNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            analysisCount={(channelsForAnalysis || []).length}
            planilhaCount={(savedChannels || []).length}
            partnersCount={(partnerships || []).length}
          />
          
          <main className="flex-1 p-6 overflow-auto">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
