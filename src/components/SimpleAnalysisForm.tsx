
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Target } from 'lucide-react';
import { AnalysisFilters } from '@/types/analysis';

interface SimpleAnalysisFormProps {
  onAnalyze: (channelIds: string[], filters: AnalysisFilters) => void;
  isLoading: boolean;
}

export const SimpleAnalysisForm = ({ onAnalyze, isLoading }: SimpleAnalysisFormProps) => {
  const [channelIds, setChannelIds] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !channelIds.trim()) return;
    
    // Filtros padrão automáticos conforme suas especificações
    const defaultFilters: AnalysisFilters = {
      apiKey,
      minInscritos: 1000,
      minVisualizacoes: 10000,
      minEngajamento: 1.0,
      minUploadsPerMonth: 1,
      // Deixar outros filtros opcionais para análise ampla
    };
    
    const ids = channelIds.split(',').map(id => id.trim()).filter(id => id);
    onAnalyze(ids, defaultFilters);
  };

  return (
    <Card className="tech-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
            <Target className="h-6 w-6 text-youtube-white" />
          </div>
          <div>
            <CardTitle className="text-youtube-white font-roboto text-xl">
              Análise Inteligente de Canais
            </CardTitle>
            <p className="text-youtube-gray text-sm font-roboto">
              Sistema automático com critérios otimizados para parcerias
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-youtube-white font-semibold font-roboto">
              🔑 Chave da API do YouTube *
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="tech-input"
              required
            />
          </div>

          {/* Channel IDs */}
          <div className="space-y-2">
            <Label htmlFor="channelIds" className="text-youtube-white font-semibold font-roboto">
              🎯 IDs dos Canais para Análise *
            </Label>
            <Textarea
              id="channelIds"
              placeholder="UCxxxxx, UCyyyyy, UCzzzzz (separados por vírgula)"
              value={channelIds}
              onChange={(e) => setChannelIds(e.target.value)}
              className="tech-input min-h-[100px]"
              required
            />
            <p className="text-youtube-gray text-xs font-roboto">
              💡 Insira múltiplos IDs de canais separados por vírgula
            </p>
          </div>

          {/* Critérios automáticos */}
          <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
            <h3 className="text-youtube-white font-semibold font-roboto mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-youtube-red" />
              Critérios de Análise Automática
            </h3>
            <div className="text-youtube-gray text-sm space-y-1 font-roboto">
              <p>✅ Mínimo de 1.000 inscritos</p>
              <p>✅ Mínimo de 10.000 visualizações totais</p>
              <p>✅ Taxa mínima de engajamento: 1%</p>
              <p>✅ Análise de categoria e nicho</p>
              <p>✅ Verificação de país e idioma</p>
              <p>✅ Busca de palavras-chave relevantes</p>
              <p>✅ Frequência mínima de 1 upload/mês</p>
              <p>✅ Análise demográfica do público</p>
              <p>✅ Busca automática de email de contato</p>
              <p>✅ Avaliação para parcerias comerciais</p>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !apiKey || !channelIds.trim()}
            className="w-full futuristic-button py-3"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-youtube-white/30 border-t-youtube-white rounded-full animate-spin"></div>
                Analisando canais...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Iniciar Análise Inteligente
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
