
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Users, Eye, Calendar } from 'lucide-react';
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
    <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
          <Search className="h-6 w-6 text-red-600" />
          Parâmetros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
              Chave da API do YouTube *
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
              required
            />
            <p className="text-xs text-gray-500">
              Obtenha sua chave em: Google Cloud Console → YouTube Data API v3
            </p>
          </div>

          {/* Nicho */}
          <div className="space-y-2">
            <Label htmlFor="nicho" className="text-sm font-medium text-gray-700">
              Nicho/Palavra-chave *
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: culinária, tecnologia, fitness..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* País */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                País
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg">
                  <SelectItem value="BR">Brasil</SelectItem>
                  <SelectItem value="US">Estados Unidos</SelectItem>
                  <SelectItem value="PT">Portugal</SelectItem>
                  <SelectItem value="ES">Espanha</SelectItem>
                  <SelectItem value="FR">França</SelectItem>
                  <SelectItem value="DE">Alemanha</SelectItem>
                  <SelectItem value="IT">Itália</SelectItem>
                  <SelectItem value="GB">Reino Unido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Idioma */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Idioma
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inscritos */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Número de Inscritos
              </Label>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-gray-500">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-gray-500">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1000000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minViews" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freqMinima" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Uploads por Semana (mín.)
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !filters.nicho}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium transition-colors duration-200"
          >
            {isLoading ? 'Buscando...' : 'Buscar Canais'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
