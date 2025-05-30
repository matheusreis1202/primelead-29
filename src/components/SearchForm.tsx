
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Users, Eye, Calendar, Target, Play, Key } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-youtube-red/10 p-2 rounded-lg border border-youtube-red/20">
            <Search className="h-5 w-5 text-youtube-red" />
          </div>
          <h2 className="text-xl font-semibold text-youtube-white font-inter">
            Configuração da Prospecção
          </h2>
        </div>
        <p className="text-neutral-400 text-sm font-inter">
          Defina os parâmetros para encontrar os canais ideais para seu nicho
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Key Section */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-medium text-youtube-white font-inter">Autenticação</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-xs font-medium text-neutral-300">
              Chave da API do YouTube *
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="modern-input h-10"
              required
            />
            <p className="text-xs text-neutral-500">
              Obtenha gratuitamente em: console.cloud.google.com → YouTube Data API v3
            </p>
          </div>
        </div>

        {/* Search Parameters */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-medium text-youtube-white font-inter">Parâmetros de Busca</h3>
          </div>

          {/* Nicho */}
          <div className="space-y-2">
            <Label htmlFor="nicho" className="text-xs font-medium text-neutral-300">
              Nicho/Palavra-chave *
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: tecnologia, culinária, fitness, empreendedorismo..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="modern-input h-10"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* País */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-neutral-300 flex items-center gap-1">
                <Globe className="h-3 w-3" />
                País de Origem
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="modern-input h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-neutral-700 text-neutral-100">
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
              <Label className="text-xs font-medium text-neutral-300">
                Idioma Principal
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="modern-input h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-neutral-700 text-neutral-100">
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
        </div>

        {/* Filters */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-medium text-youtube-white font-inter">Filtros Avançados</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inscritos */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-neutral-300">
                Número de Inscritos
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-neutral-500 mb-1 block">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1,000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="modern-input h-9 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-neutral-500 mb-1 block">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1,000,000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="modern-input h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="minViews" className="text-xs font-medium text-neutral-300 flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10,000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="modern-input h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freqMinima" className="text-xs font-medium text-neutral-300 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Uploads por Semana
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="modern-input h-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !filters.apiKey || !filters.nicho}
          className="w-full premium-button h-12 text-base font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="modern-spinner"></div>
              Analisando canais...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Iniciar Prospecção
              <Play className="h-3 w-3" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};
