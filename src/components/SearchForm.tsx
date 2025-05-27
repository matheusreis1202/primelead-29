
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Users, Eye, Calendar, Zap, Target } from 'lucide-react';
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
    <Card className="shadow-lg border-gray-200 bg-white">
      <CardHeader className="pb-6 border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          Busca Premium
          <div className="bg-amber-100 px-2 py-1 rounded-full border border-amber-200">
            <Zap className="h-3 w-3 text-amber-600 inline" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-sm font-medium text-gray-900 flex items-center gap-2">
              🔑 Chave da API do YouTube *
              <span className="text-slate-500 text-xs bg-slate-100 px-2 py-1 rounded-full border border-slate-200">(Premium Access)</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 text-gray-900 placeholder:text-gray-400"
              required
            />
            <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
              Obtenha sua chave em: Google Cloud Console → YouTube Data API v3
            </p>
          </div>

          {/* Nicho */}
          <div className="space-y-2">
            <Label htmlFor="nicho" className="text-sm font-medium text-gray-900 flex items-center gap-2">
              🎯 Nicho/Palavra-chave *
              <span className="text-purple-600 text-xs bg-purple-50 px-2 py-1 rounded-full border border-purple-200">(IA Enhanced)</span>
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: culinária, tecnologia, fitness..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="bg-white border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* País */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
                País
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="bg-white border-gray-200 text-gray-900 focus:ring-blue-400/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 text-gray-900">
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
              <Label className="text-sm font-medium text-gray-900">
                🗣️ Idioma
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="bg-white border-gray-200 text-gray-900 focus:ring-green-400/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 text-gray-900">
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
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                Número de Inscritos
                <span className="bg-indigo-50 px-2 py-1 rounded text-xs border border-indigo-200 text-indigo-700">Premium</span>
              </Label>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-slate-500">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-slate-500">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1000000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="minViews" className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <div className="bg-purple-100 p-1 rounded">
                    <Eye className="h-4 w-4 text-purple-600" />
                  </div>
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="bg-white border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freqMinima" className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <div className="bg-teal-100 p-1 rounded">
                    <Calendar className="h-4 w-4 text-teal-600" />
                  </div>
                  Uploads por Semana (mín.)
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="bg-white border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 text-gray-900"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !filters.nicho}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-0"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando canais premium...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Iniciar Análise Premium
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
