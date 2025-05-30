
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Users, Eye, Calendar, Target, Play } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    apiKey: '',
    nicho: '',
    pais: 'BR',
    idioma: 'pt',
    minInscritos: 1000,
    maxInscritos: 1000000,
    minViews: 10000,
    freqMinima: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.apiKey || !filters.nicho) return;
    onSearch(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="tech-card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Key */}
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="text-sm font-semibold text-youtube-white flex items-center gap-2">
            🔑 Chave da API do YouTube *
            <span className="text-youtube-gray text-xs bg-youtube-dark px-2 py-1 rounded border border-youtube-red/30">YouTube Data API</span>
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Cole sua chave da API aqui..."
            value={filters.apiKey}
            onChange={(e) => updateFilter('apiKey', e.target.value)}
            className="tech-input h-10"
            required
          />
          <p className="text-xs text-youtube-gray bg-youtube-dark p-2 rounded border border-youtube-red/30">
            💡 Obtenha gratuitamente em: console.cloud.google.com → YouTube Data API v3
          </p>
        </div>

        {/* Nicho */}
        <div className="space-y-2">
          <Label htmlFor="nicho" className="text-sm font-semibold text-youtube-white flex items-center gap-2">
            🎯 Nicho/Palavra-chave *
            <span className="text-youtube-white text-xs bg-youtube-red px-2 py-1 rounded">IA Enhanced</span>
          </Label>
          <Input
            id="nicho"
            placeholder="Ex: tecnologia, culinária, fitness, empreendedorismo..."
            value={filters.nicho}
            onChange={(e) => updateFilter('nicho', e.target.value)}
            className="tech-input h-10"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* País */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-youtube-white flex items-center gap-2">
              <div className="bg-youtube-red p-1 rounded">
                <Globe className="h-3 w-3 text-youtube-white" />
              </div>
              País de Origem
            </Label>
            <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
              <SelectTrigger className="tech-input h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-youtube-dark border-youtube-red text-youtube-white">
                <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                <SelectItem value="ES">🇪🇸 Espanha</SelectItem>
                <SelectItem value="FR">🇫🇷 França</SelectItem>
                <SelectItem value="DE">🇩🇪 Alemanha</SelectItem>
                <SelectItem value="IT">🇮🇹 Itália</SelectItem>
                <SelectItem value="GB">🇬🇧 Reino Unido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Idioma */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-youtube-white flex items-center gap-2">
              <div className="bg-youtube-red p-1 rounded">
                <span className="text-youtube-white text-xs">🗣️</span>
              </div>
              Idioma Principal
            </Label>
            <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
              <SelectTrigger className="tech-input h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-youtube-dark border-youtube-red text-youtube-white">
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">Inglês</SelectItem>
                <SelectItem value="es">Espanhol</SelectItem>
                <SelectItem value="fr">Francês</SelectItem>
                <SelectItem value="de">Alemão</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inscritos */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-youtube-white flex items-center gap-2">
              <div className="bg-youtube-red p-1 rounded">
                <Users className="h-3 w-3 text-youtube-white" />
              </div>
              Número de Inscritos
            </Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="minInscritos" className="text-xs text-youtube-gray mb-1 block">Mínimo</Label>
                <Input
                  id="minInscritos"
                  type="number"
                  placeholder="1,000"
                  value={filters.minInscritos}
                  onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                  className="tech-input h-9"
                />
              </div>
              <div>
                <Label htmlFor="maxInscritos" className="text-xs text-youtube-gray mb-1 block">Máximo</Label>
                <Input
                  id="maxInscritos"
                  type="number"
                  placeholder="1,000,000"
                  value={filters.maxInscritos}
                  onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                  className="tech-input h-9"
                />
              </div>
            </div>
          </div>

          {/* Views e Frequência */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="minViews" className="text-sm font-semibold text-youtube-white flex items-center gap-2">
                <div className="bg-youtube-red p-1 rounded">
                  <Eye className="h-3 w-3 text-youtube-white" />
                </div>
                Visualizações Mínimas
              </Label>
              <Input
                id="minViews"
                type="number"
                placeholder="10,000"
                value={filters.minViews}
                onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                className="tech-input h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freqMinima" className="text-sm font-semibold text-youtube-white flex items-center gap-2">
                <div className="bg-youtube-red p-1 rounded">
                  <Calendar className="h-3 w-3 text-youtube-white" />
                </div>
                Uploads por Semana
              </Label>
              <Input
                id="freqMinima"
                type="number"
                placeholder="1"
                value={filters.freqMinima}
                onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                className="tech-input h-9"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !filters.apiKey || !filters.nicho}
          className="w-full futuristic-button py-3 text-base font-bold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-youtube-white/30 border-t-youtube-white rounded-full animate-spin"></div>
              Analisando canais...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Iniciar Prospecção
              <Play className="h-4 w-4 fill-current" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};
