
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
    
    try {
      console.log('Searching with filters:', filters);
      
      // Simulate API call with real YouTube API structure
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock channels based on search criteria
      const mockChannels: Channel[] = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, index) => {
        const baseId = Math.random().toString(36).substring(7);
        const subscriberCount = Math.floor(Math.random() * (filters.maxInscritos - filters.minInscritos)) + filters.minInscritos;
        const viewCount = subscriberCount * (Math.floor(Math.random() * 100) + 50);
        
        return {
          id: `channel_${baseId}_${index}`,
          title: `Canal ${filters.nicho} ${index + 1}`,
          description: `Canal especializado em ${filters.nicho} com conteúdo de qualidade para o público ${filters.pais}.`,
          thumbnail: `https://via.placeholder.com/88x88?text=${filters.nicho[0]?.toUpperCase() || 'C'}${index + 1}`,
          subscriberCount,
          viewCount,
          videoCount: Math.floor(Math.random() * 200) + 50,
          publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          country: filters.pais,
          language: filters.idioma,
          score: Math.floor(Math.random() * 40) + 60, // 60-100
          category: filters.nicho
        };
      });
      
      console.log('Generated channels:', mockChannels);
      setChannels(mockChannels);
    } catch (err) {
      console.error('Search error:', err);
      setError('Erro ao buscar canais. Verifique sua chave da API e tente novamente.');
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
