
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, Grid2X2, List, ArrowUp, ArrowDown } from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ResultsFiltersProps {
  channels: Channel[];
  onFiltersChange: (filteredChannels: Channel[]) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
}

export const ResultsFilters = ({ 
  channels, 
  onFiltersChange, 
  onViewModeChange, 
  viewMode 
}: ResultsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'subscribers' | 'views' | 'engagement'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'premium' | 'good' | 'average'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories from channels
  const categories = Array.from(new Set(channels.map(c => c.category).filter(Boolean)));

  const applyFilters = () => {
    let filtered = [...channels];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(channel => 
        channel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply score filter
    switch (scoreFilter) {
      case 'premium':
        filtered = filtered.filter(channel => channel.score >= 85);
        break;
      case 'good':
        filtered = filtered.filter(channel => channel.score >= 70 && channel.score < 85);
        break;
      case 'average':
        filtered = filtered.filter(channel => channel.score >= 55 && channel.score < 70);
        break;
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(channel => channel.category === categoryFilter);
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

    onFiltersChange(filtered);
  };

  // Apply filters whenever any filter changes
  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, sortBy, sortOrder, scoreFilter, categoryFilter, channels]);

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Card className="bg-[#1e1e1e] border-[#333] mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#AAAAAA]" />
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] border border-[#333] rounded-lg text-white placeholder-[#AAAAAA] focus:border-[#FF0000] focus:outline-none"
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
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
            >
              {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
            </Button>
          </div>

          {/* Score Filter */}
          <Select value={scoreFilter} onValueChange={(value: any) => setScoreFilter(value)}>
            <SelectTrigger className="w-32 bg-[#0D0D0D] border-[#333] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border-[#333]">
              <SelectItem value="all" className="text-white hover:bg-[#333]">Todos</SelectItem>
              <SelectItem value="premium" className="text-white hover:bg-[#333]">Premium (85+)</SelectItem>
              <SelectItem value="good" className="text-white hover:bg-[#333]">Bom (70-84)</SelectItem>
              <SelectItem value="average" className="text-white hover:bg-[#333]">Médio (55-69)</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          {categories.length > 0 && (
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e1e] border-[#333]">
                <SelectItem value="all" className="text-white hover:bg-[#333]">Todas Categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-[#333]">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[#333] rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`rounded-none border-0 ${
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
              className={`rounded-none border-0 ${
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
        <div className="flex flex-wrap gap-2 mt-3">
          {searchTerm && (
            <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
              Busca: {searchTerm}
            </Badge>
          )}
          {scoreFilter !== 'all' && (
            <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
              Score: {scoreFilter === 'premium' ? 'Premium' : scoreFilter === 'good' ? 'Bom' : 'Médio'}
            </Badge>
          )}
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
              Categoria: {categoryFilter}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
