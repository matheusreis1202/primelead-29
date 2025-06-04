
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';

interface FilterState {
  search: string;
  scoreRange: 'all' | 'high' | 'medium' | 'low';
  subscribersRange: 'all' | 'mega' | 'large' | 'medium' | 'small';
  engagementRange: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'score' | 'subscribers' | 'avgViews' | 'engagement';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedTableFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  totalItems: number;
  filteredItems: number;
}

export const AdvancedTableFilters = ({ onFiltersChange, totalItems, filteredItems }: AdvancedTableFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    scoreRange: 'all',
    subscribersRange: 'all',
    engagementRange: 'all',
    sortBy: 'score',
    sortOrder: 'desc'
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      scoreRange: 'all',
      subscribersRange: 'all',
      engagementRange: 'all',
      sortBy: 'score',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return value.trim() !== '';
    if (key === 'sortBy' || key === 'sortOrder') return false;
    return value !== 'all';
  }).length;

  return (
    <Card className="bg-[#1E1E1E] border-[#525252] mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Busca */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#AAAAAA]" />
            <Input
              placeholder="Buscar por nome, email ou link..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 bg-[#0D0D0D] border-[#333] text-white placeholder-[#AAAAAA] focus:border-[#FF0000]"
            />
          </div>

          {/* Filtro Score */}
          <Select value={filters.scoreRange} onValueChange={(value) => updateFilter('scoreRange', value)}>
            <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white">
              <SelectValue placeholder="Score" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-[#333]">
              <SelectItem value="all" className="text-white hover:bg-[#333]">Todos Scores</SelectItem>
              <SelectItem value="high" className="text-white hover:bg-[#333]">Alto (80+)</SelectItem>
              <SelectItem value="medium" className="text-white hover:bg-[#333]">Médio (60-79)</SelectItem>
              <SelectItem value="low" className="text-white hover:bg-[#333]">Baixo (&lt;60)</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtro Inscritos */}
          <Select value={filters.subscribersRange} onValueChange={(value) => updateFilter('subscribersRange', value)}>
            <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white">
              <SelectValue placeholder="Inscritos" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-[#333]">
              <SelectItem value="all" className="text-white hover:bg-[#333]">Todos</SelectItem>
              <SelectItem value="mega" className="text-white hover:bg-[#333]">1M+</SelectItem>
              <SelectItem value="large" className="text-white hover:bg-[#333]">100K-1M</SelectItem>
              <SelectItem value="medium" className="text-white hover:bg-[#333]">10K-100K</SelectItem>
              <SelectItem value="small" className="text-white hover:bg-[#333]">&lt;10K</SelectItem>
            </SelectContent>
          </Select>

          {/* Ordenação */}
          <div className="flex items-center gap-2">
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="w-36 bg-[#0D0D0D] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-[#333]">
                <SelectItem value="score" className="text-white hover:bg-[#333]">Score</SelectItem>
                <SelectItem value="subscribers" className="text-white hover:bg-[#333]">Inscritos</SelectItem>
                <SelectItem value="avgViews" className="text-white hover:bg-[#333]">Views</SelectItem>
                <SelectItem value="engagement" className="text-white hover:bg-[#333]">Engajamento</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc')}
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Limpar Filtros */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Filtros Ativos */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {filters.search && (
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                Busca: "{filters.search}"
              </Badge>
            )}
            {filters.scoreRange !== 'all' && (
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                Score: {filters.scoreRange === 'high' ? 'Alto' : filters.scoreRange === 'medium' ? 'Médio' : 'Baixo'}
              </Badge>
            )}
            {filters.subscribersRange !== 'all' && (
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                Inscritos: {
                  filters.subscribersRange === 'mega' ? '1M+' :
                  filters.subscribersRange === 'large' ? '100K-1M' :
                  filters.subscribersRange === 'medium' ? '10K-100K' : '<10K'
                }
              </Badge>
            )}
          </div>
        )}

        {/* Contador de Resultados */}
        <div className="text-sm text-[#AAAAAA]">
          Mostrando {filteredItems} de {totalItems} canais
        </div>
      </CardContent>
    </Card>
  );
};
