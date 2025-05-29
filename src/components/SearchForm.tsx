
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Users, Eye, Calendar, Zap, Target, Play, Key, Hash } from 'lucide-react';
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
    <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="pb-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <CardTitle className="flex items-center gap-4 text-3xl text-[#282828] font-black">
          <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-3 rounded-2xl shadow-lg">
            <Target className="h-7 w-7 text-white" />
          </div>
          Busca Inteligente
          <div className="bg-[#282828] px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <Play className="h-3 w-3 text-white fill-current" />
              <span className="text-white font-bold text-xs tracking-wider">AI</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-10 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* API Key - Clean design */}
          <div className="space-y-4">
            <Label htmlFor="apiKey" className="text-lg font-bold text-[#282828] flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-2 rounded-xl">
                <Key className="h-4 w-4 text-white" />
              </div>
              Chave da API do YouTube
              <span className="text-[#FF0000] text-xs">*</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Insira sua chave da API..."
              value={filters.apiKey}
              onChange={(e) => updateFilter('apiKey', e.target.value)}
              className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20 transition-all duration-300"
              required
            />
            <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl border-l-4 border-[#FF0000]">
              💡 Obtenha gratuitamente em: console.cloud.google.com
            </p>
          </div>

          {/* Nicho - Futuristic input */}
          <div className="space-y-4">
            <Label htmlFor="nicho" className="text-lg font-bold text-[#282828] flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#282828] to-gray-700 p-2 rounded-xl">
                <Hash className="h-4 w-4 text-white" />
              </div>
              Nicho/Palavra-chave
              <span className="text-[#FF0000] text-xs">*</span>
            </Label>
            <Input
              id="nicho"
              placeholder="Ex: tecnologia, culinária, fitness..."
              value={filters.nicho}
              onChange={(e) => updateFilter('nicho', e.target.value)}
              className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20 transition-all duration-300"
              required
            />
          </div>

          {/* País e Idioma - Side by side clean design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#282828] flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-2 rounded-xl">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                País
              </Label>
              <Select value={filters.pais} onValueChange={(value) => updateFilter('pais', value)}>
                <SelectTrigger className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 shadow-2xl rounded-2xl">
                  <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                  <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                  <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                  <SelectItem value="ES">🇪🇸 Espanha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#282828] flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#282828] to-gray-700 p-2 rounded-xl">
                  <span className="text-white text-sm">🗣️</span>
                </div>
                Idioma
              </Label>
              <Select value={filters.idioma} onValueChange={(value) => updateFilter('idioma', value)}>
                <SelectTrigger className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 shadow-2xl rounded-2xl">
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">Inglês</SelectItem>
                  <SelectItem value="es">Espanhol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Métricas - Grid clean */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#282828] flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-2 rounded-xl">
                  <Users className="h-4 w-4 text-white" />
                </div>
                Min. Inscritos
              </Label>
              <Input
                type="number"
                placeholder="1,000"
                value={filters.minInscritos}
                onChange={(e) => updateFilter('minInscritos', parseInt(e.target.value) || 0)}
                className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#282828] flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#282828] to-gray-700 p-2 rounded-xl">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                Min. Views
              </Label>
              <Input
                type="number"
                placeholder="10,000"
                value={filters.minViews}
                onChange={(e) => updateFilter('minViews', parseInt(e.target.value) || 0)}
                className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#282828] flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-2 rounded-xl">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                Uploads/Semana
              </Label>
              <Input
                type="number"
                placeholder="1"
                value={filters.freqMinima}
                onChange={(e) => updateFilter('freqMinima', parseInt(e.target.value) || 0)}
                className="h-14 text-lg border-0 bg-white shadow-lg rounded-2xl focus:ring-2 focus:ring-[#FF0000]/20"
              />
            </div>
          </div>

          {/* Futuristic CTA Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !filters.apiKey || !filters.nicho}
            className="w-full h-16 bg-gradient-to-r from-[#FF0000] to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xl font-black transition-all duration-500 shadow-2xl hover:shadow-[#FF0000]/25 border-0 rounded-2xl group"
          >
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando com IA...
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Target className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                Iniciar Prospecção AI
                <Zap className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
