
import { useState } from 'react';
import { SimpleAnalysisForm } from '@/components/SimpleAnalysisForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { BarChart3, Lightbulb } from 'lucide-react';
import { AnalysisFilters, AnalysisResult } from '@/types/analysis';
import { channelAnalysisService } from '@/services/channelAnalysisService';
import { Channel } from '@/pages/Index';

interface AnalyticsTabProps {
  channels: Channel[];
  channelsForAnalysis: Channel[];
  onRemoveFromAnalysis: (channelId: string) => void;
}

export const AnalyticsTab = ({ channels, channelsForAnalysis, onRemoveFromAnalysis }: AnalyticsTabProps) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (channelIds: string[], filters: AnalysisFilters) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      console.log('Iniciando análise inteligente de canais:', channelIds);
      const result = await channelAnalysisService.analyzeChannels(channelIds, filters);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Erro na análise:', error);
      setError(error instanceof Error ? error.message : 'Erro ao analisar canais.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <LoadingSpinner />
        <p className="text-youtube-white mt-6 text-xl font-roboto">
          Executando análise inteligente dos canais...
        </p>
        <p className="text-youtube-gray mt-2 text-sm font-roboto">
          Aplicando critérios automáticos e coletando métricas
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-youtube-red/10 border border-youtube-red/30 rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-youtube-red p-3 rounded-full futuristic-glow">
            <BarChart3 className="h-6 w-6 text-youtube-white" />
          </div>
          <p className="text-youtube-red font-semibold text-lg font-roboto">{error}</p>
        </div>
      </div>
    );
  }

  if (analysisResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
              <BarChart3 className="h-6 w-6 text-youtube-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-youtube-white font-roboto">
                Resultados da Análise Inteligente
              </h2>
              <p className="text-youtube-gray font-roboto">
                Análise completa com critérios automáticos aplicados
              </p>
            </div>
          </div>
          <button
            onClick={() => setAnalysisResult(null)}
            className="text-youtube-gray hover:text-youtube-white font-roboto"
          >
            Nova Análise
          </button>
        </div>
        
        <AnalysisResults result={analysisResult} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-youtube-red p-4 rounded-full futuristic-glow">
            <BarChart3 className="h-8 w-8 text-youtube-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-youtube-white mb-2 font-roboto">
          Sistema de Análise Inteligente
        </h2>
        <p className="text-youtube-gray max-w-2xl mx-auto text-lg font-roboto">
          Analise canais automaticamente com critérios otimizados para encontrar as melhores parcerias comerciais
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SimpleAnalysisForm onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
        
        {/* Informações sobre o sistema */}
        <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-5 w-5 text-youtube-red" />
            <h3 className="text-youtube-white font-semibold font-roboto">
              Como funciona a análise inteligente
            </h3>
          </div>
          <ul className="text-youtube-gray space-y-2 text-sm font-roboto">
            <li>• <strong>Análise Automática:</strong> Aplica critérios pré-definidos para parcerias comerciais</li>
            <li>• <strong>Dados Demográficos:</strong> Estima faixa etária e gênero predominante do público</li>
            <li>• <strong>Busca de Contato:</strong> Procura automaticamente emails de contato na descrição</li>
            <li>• <strong>Avaliação de Parceria:</strong> Classifica cada canal como EXCELENTE, BOM, REGULAR ou RUIM</li>
            <li>• <strong>Métricas Completas:</strong> Analisa engajamento, frequência de uploads e relevância</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
