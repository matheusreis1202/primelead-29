
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Settings, Target, TrendingUp } from 'lucide-react';
import { AnalysisFilters } from '@/types/analysis';

interface AdvancedAnalysisFormProps {
  onAnalyze: (channelIds: string[], filters: AnalysisFilters) => void;
  isLoading: boolean;
}

export const AdvancedAnalysisForm = ({ onAnalyze, isLoading }: AdvancedAnalysisFormProps) => {
  const [channelIds, setChannelIds] = useState('');
  const [filters, setFilters] = useState<AnalysisFilters>({
    apiKey: '',
    minInscritos: 1000,
    minVisualizacoes: 50000,
    minEngajamento: 1.0,
    pais: 'BR',
    idioma: 'pt',
    minUploadsPerMonth: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.apiKey || !channelIds.trim()) return;
    
    const ids = channelIds.split(',').map(id => id.trim()).filter(id => id);
    onAnalyze(ids, filters);
  };

  const updateFilter = (key: keyof AnalysisFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="tech-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
            <BarChart3 className="h-6 w-6 text-youtube-white" />
          </div>
          <div>
            <CardTitle className="text-youtube-white font-roboto text-xl">
              Análise Avançada de Canais
            </CardTitle>
            <p className="text-youtube-gray text-sm font-roboto">
              Sistema inteligente de análise e filtros estratégicos
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
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
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
              className="tech-input min-h-[80px]"
              required
            />
            <p className="text-youtube-gray text-xs font-roboto">
              💡 Insira múltiplos IDs de canais separados por vírgula
            </p>
          </div>

          {/* Filtros Numéricos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-youtube-red" />
                Mínimo de Inscritos
              </Label>
              <Input
                type="number"
                placeholder="1000"
                value={filters.minInscritos}
                onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                className="tech-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto flex items-center gap-2">
                <Target className="h-4 w-4 text-youtube-red" />
                Mínimo de Visualizações
              </Label>
              <Input
                type="number"
                placeholder="50000"
                value={filters.minVisualizacoes}
                onChange={(e) => updateFilter('minVisualizacoes', parseInt(e.target.value) || 0)}
                className="tech-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto flex items-center gap-2">
                <Settings className="h-4 w-4 text-youtube-red" />
                Taxa Mínima de Engajamento (%)
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="1.0"
                value={filters.minEngajamento}
                onChange={(e) => updateFilter('minEngajamento', parseFloat(e.target.value) || 0)}
                className="tech-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto">
                Uploads Mínimos por Mês
              </Label>
              <Input
                type="number"
                placeholder="1"
                value={filters.minUploadsPerMonth}
                onChange={(e) => updateFilter('minUploadsPerMonth', parseInt(e.target.value) || 0)}
                className="tech-input"
              />
            </div>
          </div>

          {/* Filtros Geográficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto">
                País de Atuação
              </Label>
              <Select value={filters.pais || ''} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="tech-input">
                  <SelectValue placeholder="Selecione um país" />
                </SelectTrigger>
                <SelectContent className="bg-youtube-dark border-youtube-red text-youtube-white">
                  <SelectItem value="">Qualquer país</SelectItem>
                  <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                  <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                  <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                  <SelectItem value="ES">🇪🇸 Espanha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-youtube-white font-semibold font-roboto">
                Idioma Predominante
              </Label>
              <Select value={filters.idioma || ''} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="tech-input">
                  <SelectValue placeholder="Selecione um idioma" />
                </SelectTrigger>
                <SelectContent className="bg-youtube-dark border-youtube-red text-youtube-white">
                  <SelectItem value="">Qualquer idioma</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">Inglês</SelectItem>
                  <SelectItem value="es">Espanhol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Palavras-chave */}
          <div className="space-y-2">
            <Label className="text-youtube-white font-semibold font-roboto">
              🔍 Palavras-chave Associadas
            </Label>
            <Input
              placeholder="marketing, vendas, negócios (separadas por vírgula)"
              value={filters.palavrasChave || ''}
              onChange={(e) => updateFilter('palavrasChave', e.target.value)}
              className="tech-input"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !channelIds.trim()}
            className="w-full futuristic-button py-3"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-youtube-white/30 border-t-youtube-white rounded-full animate-spin"></div>
                Analisando canais...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Iniciar Análise Avançada
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
