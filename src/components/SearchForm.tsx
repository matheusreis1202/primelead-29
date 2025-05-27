
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Users, Eye, Calendar, Zap } from 'lucide-react';
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
    <Card className="max-w-5xl mx-auto shadow-2xl border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md">
      <CardHeader className="pb-6 border-b border-slate-700/50">
        <CardTitle className="flex items-center gap-3 text-2xl text-white">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
            <Search className="h-6 w-6 text-white" />
          </div>
          Configuração Premium de Busca
          <div className="bg-yellow-500/20 px-2 py-1 rounded-full">
            <Zap className="h-4 w-4 text-yellow-400 inline" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* API Key */}
          <div className="space-y-3">
            <Label htmlFor="apiKey" className="text-sm font-medium text-white flex items-center gap-2">
              🔑 Chave da API do YouTube *
              <span className="text-purple-400 text-xs">(Premium Access)</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="bg-slate-800/50 border-slate-600 focus:border-purple-400 focus:ring-purple-400 text-white placeholder:text-slate-400"
              required
            />
            <p className="text-xs text-slate-400">
              Obtenha sua chave em: Google Cloud Console → YouTube Data API v3
            </p>
          </div>

          {/* Nicho */}
          <div className="space-y-3">
            <Label htmlFor="nicho" className="text-sm font-medium text-white flex items-center gap-2">
              🎯 Nicho/Palavra-chave *
              <span className="text-blue-400 text-xs">(IA Enhanced)</span>
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: culinária, tecnologia, fitness..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="bg-slate-800/50 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-white placeholder:text-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* País */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                País
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
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
              <Label className="text-sm font-medium text-white">
                🗣️ Idioma
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inscritos */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                Número de Inscritos
                <span className="bg-purple-500/20 px-2 py-1 rounded text-xs">Premium Filter</span>
              </Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-slate-400">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="bg-slate-800/50 border-slate-600 focus:border-purple-400 focus:ring-purple-400 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-slate-400">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1000000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="bg-slate-800/50 border-slate-600 focus:border-purple-400 focus:ring-purple-400 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="minViews" className="text-sm font-medium text-white flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-slate-600 focus:border-blue-400 focus:ring-blue-400 text-white"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="freqMinima" className="text-sm font-medium text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  Uploads por Semana (mín.)
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 focus:ring-cyan-400 text-white"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !filters.nicho}
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando canais premium...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Iniciar Análise Premium
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
