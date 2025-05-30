
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Users, Eye, Calendar, Target, Play, Key, Sparkles } from 'lucide-react';
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
    <div className="glass-card p-8 space-y-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-brand-500/20 to-brand-600/10 p-2 rounded-lg border border-brand-500/20">
            <Search className="h-5 w-5 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-50 font-inter">
            Configuração da Prospecção
          </h2>
        </div>
        <p className="text-neutral-400 font-inter">
          Defina os parâmetros para encontrar os canais ideais para seu nicho
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Key Section */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-2 rounded-lg border border-amber-500/20">
              <Key className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-50 font-inter">Autenticação</h3>
              <p className="text-sm text-neutral-400">Conecte-se à API do YouTube</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="apiKey" className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              Chave da API do YouTube *
              <span className="text-xs bg-brand-500/10 text-brand-400 px-2 py-1 rounded-full border border-brand-500/20">
                YouTube Data API v3
              </span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="modern-input h-12 text-base"
              required
            />
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
              <p className="text-xs text-amber-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Obtenha gratuitamente em: console.cloud.google.com → YouTube Data API v3
              </p>
            </div>
          </div>
        </div>

        {/* Search Parameters */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-brand-500/20 to-brand-600/10 p-2 rounded-lg border border-brand-500/20">
              <Target className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-50 font-inter">Parâmetros de Busca</h3>
              <p className="text-sm text-neutral-400">Defina seu público-alvo</p>
            </div>
          </div>

          {/* Nicho */}
          <div className="space-y-3">
            <Label htmlFor="nicho" className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              Nicho/Palavra-chave *
              <span className="text-xs bg-gradient-to-r from-brand-500 to-brand-600 text-white px-2 py-1 rounded-full">
                IA Enhanced
              </span>
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: tecnologia, culinária, fitness, empreendedorismo..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="modern-input h-12 text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* País */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand-400" />
                País de Origem
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="modern-input h-12">
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
            <div className="space-y-3">
              <Label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                <span className="text-brand-400">🗣️</span>
                Idioma Principal
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="modern-input h-12">
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
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-2 rounded-lg border border-blue-500/20">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-50 font-inter">Filtros Avançados</h3>
              <p className="text-sm text-neutral-400">Refine sua busca com critérios específicos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inscritos */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Número de Inscritos
              </Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-neutral-400 mb-2 block">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1,000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="modern-input h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-neutral-400 mb-2 block">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1,000,000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="modern-input h-10"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="minViews" className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-400" />
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10,000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="modern-input h-10"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="freqMinima" className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  Uploads por Semana
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="modern-input h-10"
                />
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !filters.apiKey || !filters.nicho}
          className="w-full premium-button h-14 text-lg font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="modern-spinner"></div>
              Analisando canais...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5" />
              Iniciar Prospecção
              <Play className="h-4 w-4" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};
