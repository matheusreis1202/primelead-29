
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid2X2, List, ArrowUp, ArrowDown } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ResultsFiltersProps {
  channels: Channel[];
  onFiltersChange: (filteredChannels: Channel[]) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
}

export const ResultsFilters = React.memo(({ 
  channels, 
  onFiltersChange, 
  onViewModeChange, 
  viewMode 
}: ResultsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'subscribers' | 'views' | 'engagement'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'premium' | 'bom' | 'medio'>('all');

  // Apply filters and sorting (memoized for performance)
  const filteredChannels = useMemo(() => {
    let filtered = [...channels];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(channel => 
        channel.title.toLowerCase().includes(searchLower) ||
        (channel.description && channel.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply score filter - usando novo sistema
    switch (scoreFilter) {
      case 'premium':
        filtered = filtered.filter(channel => channel.score >= 80);
        break;
      case 'bom':
        filtered = filtered.filter(channel => channel.score >= 60 && channel.score < 80);
        break;
      case 'medio':
        filtered = filtered.filter(channel => channel.score < 60);
        break;
    }

    // Apply sorting
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
          aValue = (a.viewCount / a.subscriberCount) * 100;
          bValue = (b.viewCount / b.subscriberCount) * 100;
          break;
        default:
          return 0;
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [channels, searchTerm, sortBy, sortOrder, scoreFilter]);

  // Update filtered channels when filters change
  React.useEffect(() => {
    onFiltersChange(filteredChannels);
  }, [filteredChannels, onFiltersChange]);

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Card className="bg-[#1e1e1e] border-[#333] mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative min-w-0 flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#AAAAAA]" />
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] border border-[#333] rounded-lg text-white placeholder-[#AAAAAA] focus:border-[#FF0000] focus:outline-none transition-colors"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white">
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

          {/* Score Filter - Novo sistema */}
          <Select value={scoreFilter} onValueChange={(value: any) => setScoreFilter(value)}>
            <SelectTrigger className="w-32 bg-[#0D0D0D] border-[#333] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border-[#333]">
              <SelectItem value="all" className="text-white hover:bg-[#333]">Todos</SelectItem>
              <SelectItem value="premium" className="text-white hover:bg-[#333]">Premium</SelectItem>
              <SelectItem value="bom" className="text-white hover:bg-[#333]">Bom</SelectItem>
              <SelectItem value="medio" className="text-white hover:bg-[#333]">Médio</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[#333] rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`rounded-none border-0 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#FF0000] text-white' 
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
                  ? 'bg-[#FF0000] text-white' 
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#333]'
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || scoreFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && (
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                Busca: {searchTerm}
              </Badge>
            )}
            {scoreFilter !== 'all' && (
              <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                Nível: {scoreFilter === 'premium' ? 'Premium' : scoreFilter === 'bom' ? 'Bom' : 'Médio'}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

ResultsFilters.displayName = 'ResultsFilters';
