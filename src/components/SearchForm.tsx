
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Users, Eye, Calendar, Zap, Target, Play } from 'lucide-react';
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
    <Card className="shadow-2xl border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
      <CardHeader className="pb-6 border-b border-gray-700 bg-gradient-to-r from-red-600/10 to-yellow-600/10">
        <CardTitle className="flex items-center gap-4 text-2xl text-white">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          Busca Inteligente
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-1.5 rounded-full border border-yellow-300">
            <div className="flex items-center gap-1">
              <Play className="h-3 w-3 text-black fill-current" />
              <span className="text-black font-bold text-xs">PRO</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* API Key */}
          <div className="space-y-3">
            <Label htmlFor="apiKey" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
              🔑 Chave da API do YouTube *
              <span className="text-red-400 text-xs bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">YouTube Data API</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Cole sua chave da API aqui..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="bg-gray-900 border-gray-600 focus:border-red-500 focus:ring-red-500/20 text-white placeholder:text-gray-400 h-12"
              required
            />
            <p className="text-xs text-gray-400 bg-gray-800 p-3 rounded-lg border border-gray-700">
              💡 Obtenha gratuitamente em: console.cloud.google.com → YouTube Data API v3
            </p>
          </div>

          {/* Nicho */}
          <div className="space-y-3">
            <Label htmlFor="nicho" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
              🎯 Nicho/Palavra-chave *
              <span className="text-blue-400 text-xs bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">IA Enhanced</span>
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: tecnologia, culinária, fitness, empreendedorismo..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="bg-gray-900 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 text-white placeholder:text-gray-400 h-12"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* País */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                País de Origem
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="bg-gray-900 border-gray-600 text-white focus:ring-green-500/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
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
              <Label className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                  <span className="text-white text-sm">🗣️</span>
                </div>
                Idioma Principal
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="bg-gray-900 border-gray-600 text-white focus:ring-purple-500/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
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
              <Label className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                Número de Inscritos
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-2 py-1 rounded text-xs font-bold text-black">PREMIUM</span>
              </Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="minInscritos" className="text-xs text-gray-400 mb-1 block">Mínimo</Label>
                  <Input
                    id="minInscritos"
                    type="number"
                    placeholder="1,000"
                    value={filters.minInscritos}
                    onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                    className="bg-gray-900 border-gray-600 focus:border-red-500 focus:ring-red-500/20 text-white h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="maxInscritos" className="text-xs text-gray-400 mb-1 block">Máximo</Label>
                  <Input
                    id="maxInscritos"
                    type="number"
                    placeholder="1,000,000"
                    value={filters.maxInscritos}
                    onChange={(e) => updateFilter('maxInscritos', parseInt(e.target.value) || Infinity)}
                    className="bg-gray-900 border-gray-600 focus:border-red-500 focus:ring-red-500/20 text-white h-11"
                  />
                </div>
              </div>
            </div>

            {/* Views e Frequência */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="minViews" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  Visualizações Mínimas
                </Label>
                <Input
                  id="minViews"
                  type="number"
                  placeholder="10,000"
                  value={filters.minViews}
                  onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                  className="bg-gray-900 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 text-white h-11"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="freqMinima" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Uploads por Semana
                </Label>
                <Input
                  id="freqMinima"
                  type="number"
                  placeholder="1"
                  value={filters.freqMinima}
                  onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                  className="bg-gray-900 border-gray-600 focus:border-green-500 focus:ring-green-500/20 text-white h-11"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !filters.nicho}
            className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white py-6 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-red-500/25 border-0 rounded-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando canais premium...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6" />
                Iniciar Prospecção Premium
                <Play className="h-5 w-5 fill-current" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
