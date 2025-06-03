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
  keyword: string;
  minSubscribers: number;
  maxSubscribers: number;
  minViews: number;
  maxViews: number;
  category: string;
  language: string;
  location: string;
  uploadFrequency: string;
  channelAge: string;
  verifiedOnly: boolean;
  monetizedOnly: boolean;
  sortBy: string;
  sortOrder: string;
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

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockChannels: Channel[] = [
        {
          id: '1',
          title: 'Canal Premium Tech',
          description: 'Canal especializado em tecnologia e inovação com conteúdo premium para profissionais.',
          thumbnail: 'https://via.placeholder.com/88x88',
          subscriberCount: 250000,
          viewCount: 5000000,
          videoCount: 150,
          publishedAt: '2020-01-15',
          country: 'BR',
          language: 'pt',
          score: 92,
          category: 'Technology'
        }
      ];
      
      setChannels(mockChannels);
    } catch (err) {
      setError('Erro ao buscar canais. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToAnalysis = (channel: Channel) => {
    setChannelsForAnalysis(prev => [...prev, channel]);
    setActiveTab('analysis');
  };

  const handleSaveToSpreadsheet = (channel: Channel) => {
    setSavedChannels(prev => [...prev, channel]);
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
            channels={channels}
            isLoading={isLoading}
            error={error}
            onSendToAnalysis={handleSendToAnalysis}
          />
        );
      case 'analysis':
        return (
          <AnalysisTab
            channels={channelsForAnalysis}
            onRemoveChannel={(id) => setChannelsForAnalysis(prev => prev.filter(c => c.id !== id))}
            onSendToPartners={handleSendToPartners}
            onSaveToSpreadsheet={handleSaveToSpreadsheet}
          />
        );
      case 'planilha':
        return (
          <NewPlanilhaTab
            savedChannels={savedChannels}
            onSendToPartners={handleSendToPartners}
          />
        );
      case 'partners':
        return <PartnersTab partnershipsData={partnerships} />;
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
            analysisCount={channelsForAnalysis.length}
            planilhaCount={savedChannels.length}
            partnersCount={partnerships.length}
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
