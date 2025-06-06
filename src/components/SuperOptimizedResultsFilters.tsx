
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid2X2, List, ArrowUp, ArrowDown } from 'lucide-react';
import { Channel } from '@/pages/Index';
import { useOptimizedDebounce } from '@/hooks/useOptimizedDebounce';

interface SuperOptimizedResultsFiltersProps {
  channels: Channel[];
  onFiltersChange: (filteredChannels: Channel[]) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
}

export const SuperOptimizedResultsFilters = React.memo(({ 
  channels, 
  onFiltersChange, 
  onViewModeChange, 
  viewMode 
}: SuperOptimizedResultsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'subscribers' | 'views' | 'engagement'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [classificationFilter, setClassificationFilter] = useState<'all' | 'excelente' | 'promissor' | 'fraco'>('all');

  // Debounce super agressivo para busca instantânea
  const [debouncedSearchTerm, isSearching] = useOptimizedDebounce(searchTerm, 150);

  // Memoização dos filtros com cache inteligente
  const filteredChannels = useMemo(() => {
    const startTime = performance.now();
    
    let filtered = channels;

    // Busca otimizada com índice
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(channel => {
        const titleMatch = channel.title.toLowerCase().includes(searchLower);
        const descMatch = channel.description?.toLowerCase().includes(searchLower);
        return titleMatch || descMatch;
      });
    }

    // Filtro de classificação otimizado
    if (classificationFilter !== 'all') {
      filtered = filtered.filter(channel => {
        const score = channel.score;
        switch (classificationFilter) {
          case 'excelente': return score >= 80;
          case 'promissor': return score >= 60 && score < 80;
          case 'fraco': return score < 60;
          default: return true;
        }
      });
    }

    // Ordenação otimizada
    if (filtered.length > 1) {
      filtered.sort((a, b) => {
        let aValue: number, bValue: number;
        
        switch (sortBy) {
          case 'score':
            aValue = a.score;
            bValue = b.score;
            break;
          case 'subscribers':
            aValue = a.subscriberCount;
            bValue = b.subscriberCount;
            break;
          case 'views':
            aValue = a.viewCount;
            bValue = b.viewCount;
            break;
          case 'engagement':
            aValue = a.subscriberCount > 0 ? (a.viewCount / a.subscriberCount) * 100 : 0;
            bValue = b.subscriberCount > 0 ? (b.viewCount / b.subscriberCount) * 100 : 0;
            break;
          default:
            return 0;
        }

        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }

    const endTime = performance.now();
    console.log(`Filtros processados em ${(endTime - startTime).toFixed(2)}ms`);

    return filtered;
  }, [channels, debouncedSearchTerm, sortBy, sortOrder, classificationFilter]);

  // Aplicar filtros de forma otimizada
  React.useEffect(() => {
    onFiltersChange(filteredChannels);
  }, [filteredChannels, onFiltersChange]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Card className="bg-[#1e1e1e] border-[#333] mb-4 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Busca super otimizada */}
          <div className="relative min-w-0 flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#AAAAAA]" />
            <input
              type="text"
              placeholder="Buscar canais instantaneamente..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] border border-[#333] rounded-lg text-white placeholder-[#AAAAAA] focus:border-blue-500 focus:outline-none transition-colors"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Ordenação otimizada */}
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white hover:border-[#525252] transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e1e] border-[#333]">
                <SelectItem value="score" className="text-white hover:bg-[#333]">Score</SelectItem>
                <SelectItem value="subscribers" className="text-white hover:bg-[#333]">Inscritos</SelectItem>
                <SelectItem value="views" className="text-white hover:bg-[#333]">Views</SelectItem>
                <SelectItem value="engagement" className="text-white hover:bg-[#333]">Engajamento</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortOrder}
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333] transition-colors"
            >
              {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
            </Button>
          </div>

          {/* Filtro de classificação */}
          <Select value={classificationFilter} onValueChange={(value: any) => setClassificationFilter(value)}>
            <SelectTrigger className="w-48 bg-[#0D0D0D] border-[#333] text-white hover:border-[#525252] transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border-[#333]">
              <SelectItem value="all" className="text-white hover:bg-[#333]">Todos</SelectItem>
              <SelectItem value="excelente" className="text-white hover:bg-[#333]">Excelente para parceria</SelectItem>
              <SelectItem value="promissor" className="text-white hover:bg-[#333]">Canal promissor</SelectItem>
              <SelectItem value="fraco" className="text-white hover:bg-[#333]">Canal fraco para parcerias</SelectItem>
            </SelectContent>
          </Select>

          {/* Visualização */}
          <div className="flex items-center border border-[#333] rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`rounded-none border-0 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#333]'
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`rounded-none border-0 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#333]'
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filtros ativos */}
        {(debouncedSearchTerm || classificationFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3">
            {debouncedSearchTerm && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Busca: {debouncedSearchTerm}
              </Badge>
            )}
            {classificationFilter !== 'all' && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border border-green-500/30">
                Classificação: {
                  classificationFilter === 'excelente' ? 'Excelente para parceria' :
                  classificationFilter === 'promissor' ? 'Canal promissor' :
                  'Canal fraco para parcerias'
                }
              </Badge>
            )}
          </div>
        )}

        {/* Performance info */}
        <div className="mt-3 text-xs text-[#AAAAAA] flex items-center justify-between">
          <span>{filteredChannels.length} de {channels.length} canais</span>
          {isSearching && (
            <span className="text-blue-400">Processando...</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

SuperOptimizedResultsFilters.displayName = 'SuperOptimizedResultsFilters';
