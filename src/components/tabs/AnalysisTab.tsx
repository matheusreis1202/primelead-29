
import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Channel } from '@/pages/Index';
import { ModernAnalysisCard } from '@/components/ModernAnalysisCard';
import { AnalysisSkeleton } from '@/components/AnalysisSkeleton';
import { EmptyAnalysisState } from '@/components/EmptyAnalysisState';

interface ChannelData {
  name: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  avgLikes: number
  avgComments: number
  subGrowth: number
}

interface AnalysisTabProps {
  channels: Channel[];
  onRemoveChannel: (channelId: string) => void;
  onSendToPartners?: (channel: Channel) => void;
  onSaveToSpreadsheet?: (channel: any) => void;
}

export const AnalysisTab = ({ 
  channels, 
  onRemoveChannel, 
  onSendToPartners,
  onSaveToSpreadsheet
}: AnalysisTabProps) => {
  const [analyzedChannels, setAnalyzedChannels] = useState<Map<string, ChannelData>>(new Map());
  const [analyzingChannels, setAnalyzingChannels] = useState<Set<string>>(new Set());

  // Ensure channels is always an array
  const safeChannels = channels || [];

  // Função para gerar dados consistentes baseados no ID do canal
  const generateConsistentData = (channelId: string, baseValue: number): number => {
    let hash = 0;
    const str = channelId + baseValue.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const convertChannelToAnalysisData = (channel: Channel): ChannelData => {
    const hashBase = generateConsistentData(channel.id, channel.subscriberCount);
    
    const avgViews = Math.max(
      Math.floor(channel.viewCount / Math.max(1, Math.floor(channel.subscriberCount / 100))),
      Math.floor(channel.subscriberCount * 0.1)
    );
    
    const monthlyVideos = channel.subscriberCount > 1000000 ? 
      Math.floor((hashBase % 10) + 15) :
      channel.subscriberCount > 100000 ? 
      Math.floor((hashBase % 8) + 8) :
      Math.floor((hashBase % 6) + 4);
    
    const engagementMultiplier = channel.subscriberCount > 1000000 ? 0.02 : 
                                channel.subscriberCount > 100000 ? 0.035 : 0.05;
    
    const avgLikes = Math.floor(avgViews * engagementMultiplier);
    const avgComments = Math.floor(avgLikes * 0.1);
    
    const activityRatio = avgViews / channel.subscriberCount;
    const subGrowth = activityRatio > 0.5 ? 
      Math.floor((hashBase % 30) + 20) :
      activityRatio > 0.2 ? 
      Math.floor((hashBase % 20) + 10) :
      Math.floor((hashBase % 15) + 5);
    
    return {
      name: channel.title,
      subscribers: channel.subscriberCount,
      avgViews: avgViews,
      monthlyVideos: monthlyVideos,
      avgLikes: avgLikes,
      avgComments: avgComments,
      subGrowth: subGrowth
    };
  };

  const handleAnalyzeChannel = async (channel: Channel) => {
    if (analyzedChannels.has(channel.id)) return;
    
    setAnalyzingChannels(prev => new Set(prev).add(channel.id));
    
    // Simular análise com delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisData = convertChannelToAnalysisData(channel);
    setAnalyzedChannels(prev => new Map(prev).set(channel.id, analysisData));
    setAnalyzingChannels(prev => {
      const newSet = new Set(prev);
      newSet.delete(channel.id);
      return newSet;
    });
  };

  const handleAnalyzeAll = async () => {
    const unanalyzedChannels = safeChannels.filter(channel => 
      !analyzedChannels.has(channel.id) && !analyzingChannels.has(channel.id)
    );
    
    if (unanalyzedChannels.length === 0) return;
    
    // Adicionar todos à lista de análise
    setAnalyzingChannels(prev => {
      const newSet = new Set(prev);
      unanalyzedChannels.forEach(channel => newSet.add(channel.id));
      return newSet;
    });
    
    // Analisar todos sequencialmente com delay
    for (const channel of unanalyzedChannels) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analysisData = convertChannelToAnalysisData(channel);
      setAnalyzedChannels(prev => new Map(prev).set(channel.id, analysisData));
      setAnalyzingChannels(prev => {
        const newSet = new Set(prev);
        newSet.delete(channel.id);
        return newSet;
      });
    }
  };

  const handleSendToSpreadsheet = (channel: Channel) => {
    const analysisData = analyzedChannels.get(channel.id);
    
    if (analysisData) {
      const engagementRate = ((analysisData.avgLikes + analysisData.avgComments) / analysisData.avgViews * 100).toFixed(1);
      
      const calculateScore = (data: ChannelData) => {
        let score = 0;
        
        if (data.subscribers > 1000000) score += 25;
        else if (data.subscribers > 500000) score += 20;
        else if (data.subscribers > 100000) score += 15;
        else if (data.subscribers > 50000) score += 10;
        else if (data.subscribers > 10000) score += 5;
        
        if (data.avgViews > 500000) score += 25;
        else if (data.avgViews > 100000) score += 20;
        else if (data.avgViews > 50000) score += 15;
        else if (data.avgViews > 10000) score += 10;
        else if (data.avgViews > 1000) score += 5;
        
        if (data.monthlyVideos > 20) score += 20;
        else if (data.monthlyVideos > 15) score += 15;
        else if (data.monthlyVideos > 10) score += 10;
        else if (data.monthlyVideos > 5) score += 5;
        
        const engagement = (data.avgLikes + data.avgComments) / data.avgViews * 100;
        if (engagement > 8) score += 20;
        else if (engagement > 5) score += 15;
        else if (engagement > 3) score += 10;
        else if (engagement > 1) score += 5;
        
        if (data.subGrowth > 40) score += 10;
        else if (data.subGrowth > 25) score += 8;
        else if (data.subGrowth > 15) score += 6;
        else if (data.subGrowth > 10) score += 4;
        else if (data.subGrowth > 5) score += 2;
        
        return Math.min(score, 100);
      };
      
      const score = calculateScore(analysisData);
      
      let classification = 'Baixo Potencial';
      if (score >= 80) classification = 'Altíssimo Potencial';
      else if (score >= 65) classification = 'Grande Potencial';
      else if (score >= 45) classification = 'Médio Potencial';
      
      const channelForPlanilha = {
        id: channel.id,
        photo: channel.thumbnail,
        name: analysisData.name,
        link: `https://youtube.com/channel/${channel.id}`,
        phone: '+55 11 00000-0000',
        subscribers: analysisData.subscribers,
        avgViews: analysisData.avgViews,
        monthlyVideos: analysisData.monthlyVideos,
        engagement: engagementRate,
        subGrowth: analysisData.subGrowth.toString(),
        score: score,
        classification: classification
      };
      
      onSaveToSpreadsheet?.(channelForPlanilha);
    } else {
      onSaveToSpreadsheet?.(channel);
    }
  };

  const handleSendToPartners = (channel: Channel) => {
    onSendToPartners?.(channel);
  };

  const handleViewContacts = (channel: Channel) => {
    const channelSearchUrl = `https://www.youtube.com/@${channel.title.replace(/\s+/g, '')}/about`;
    window.open(channelSearchUrl, '_blank');
  };

  const handleNavigateToResults = () => {
    // Esta função deveria navegar para a aba de resultados
    // Por agora, vamos apenas mostrar no console
    console.log('Navigating to results tab...');
  };

  if (safeChannels.length === 0) {
    return <EmptyAnalysisState onNavigateToResults={handleNavigateToResults} />;
  }

  const unanalyzedCount = safeChannels.filter(channel => 
    !analyzedChannels.has(channel.id) && !analyzingChannels.has(channel.id)
  ).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] p-3 rounded-xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Análise Inteligente
            </h2>
            <p className="text-[#AAAAAA]">
              {safeChannels.length} canal(is) • {analyzedChannels.size} analisado(s) • {analyzingChannels.size} analisando
            </p>
          </div>
        </div>

        {unanalyzedCount > 0 && (
          <Button 
            onClick={handleAnalyzeAll}
            disabled={analyzingChannels.size > 0}
            className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#AA0000] text-white transition-all duration-300 hover:scale-105"
          >
            {analyzingChannels.size > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando ({analyzingChannels.size})
              </div>
            ) : (
              `Analisar Todos (${unanalyzedCount})`
            )}
          </Button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {safeChannels.map(channel => {
          const analysisData = analyzedChannels.get(channel.id);
          const isAnalyzing = analyzingChannels.has(channel.id);
          
          if (isAnalyzing) {
            return <AnalysisSkeleton key={`skeleton-${channel.id}`} />;
          }
          
          return (
            <div key={channel.id} className="animate-fade-in">
              <ModernAnalysisCard
                channel={channel}
                analysisData={analysisData}
                onAnalyze={() => handleAnalyzeChannel(channel)}
                onRemove={() => onRemoveChannel(channel.id)}
                onSendToSpreadsheet={() => handleSendToSpreadsheet(channel)}
                onViewContacts={() => handleViewContacts(channel)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
