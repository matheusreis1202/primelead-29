
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Users, Eye, Calendar, Key } from 'lucide-react';
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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Key */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-4 w-4 text-[#FF0000]" />
            <h4 className="text-white text-sm font-medium">Autenticação</h4>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-[#AAAAAA] text-xs">
              Chave da API do YouTube *
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white placeholder:text-[#666666] h-10"
              required
            />
          </div>
        </div>

        {/* Busca */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-4 w-4 text-[#FF0000]" />
            <h4 className="text-white text-sm font-medium">Parâmetros</h4>
          </div>

          <div className="space-y-4">
            {/* Nicho */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs">Nicho/Palavra-chave *</Label>
              <Input
                placeholder="Ex: tecnologia, culinária..."
                value={filters.nicho}
                onChange={(e) => updateFilter('nicho', e.target.value)}
                className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white placeholder:text-[#666666] h-10"
                required
              />
            </div>

            {/* País */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs flex items-center gap-1">
                <Globe className="h-3 w-3" />
                País
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-neutral-700 text-white">
                  <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                  <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                  <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                  <SelectItem value="ES">🇪🇸 Espanha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Idioma */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs">Idioma</Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-neutral-700 text-white">
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">Inglês</SelectItem>
                  <SelectItem value="es">Espanhol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-[#FF0000]" />
            <h4 className="text-white text-sm font-medium">Filtros</h4>
          </div>

          <div className="space-y-4">
            {/* Inscritos */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs">Inscritos (min - max)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minInscritos}
                  onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                  className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white text-sm h-9"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxInscritos}
                  onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                  className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white text-sm h-9"
                />
              </div>
            </div>

            {/* Views */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs flex items-center gap-1">
                <Eye className="h-3 w-3" />
                Views Mínimas
              </Label>
              <Input
                type="number"
                placeholder="10,000"
                value={filters.minViews}
                onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white text-sm h-9"
              />
            </div>

            {/* Frequência */}
            <div className="space-y-2">
              <Label className="text-[#AAAAAA] text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Uploads/Semana
              </Label>
              <Input
                type="number"
                placeholder="1"
                value={filters.freqMinima}
                onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                className="bg-[#0D0D0D] border-0 border-b border-neutral-600 rounded-none focus:border-[#FF0000] text-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !filters.apiKey || !filters.nicho}
          className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white border-none font-medium h-11 rounded-lg transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Buscando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Buscar Canais
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};
