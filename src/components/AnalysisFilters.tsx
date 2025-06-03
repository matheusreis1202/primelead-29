
import { useState } from 'react';
import { Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface AnalysisFiltersState {
  sortBy: 'subscribers' | 'avgViews' | 'engagement' | 'growth' | 'score';
  sortOrder: 'asc' | 'desc';
  minSubscribers: number;
  maxSubscribers: number;
  minEngagement: number;
  showAnalyzedOnly: boolean;
  showUnanalyzedOnly: boolean;
}

interface AnalysisFiltersProps {
  filters: AnalysisFiltersState;
  onFiltersChange: (filters: AnalysisFiltersState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const AnalysisFilters = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle 
}: AnalysisFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleResetFilters = () => {
    const defaultFilters: AnalysisFiltersState = {
      sortBy: 'subscribers',
      sortOrder: 'desc',
      minSubscribers: 0,
      maxSubscribers: 10000000,
      minEngagement: 0,
      showAnalyzedOnly: false,
      showUnanalyzedOnly: false
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#333]"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtros
      </Button>
    );
  }

  return (
    <Card className="bg-[#1e1e1e] border-[#333] mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#FF0000]" />
            <h3 className="text-white font-semibold">Filtros e Ordenação</h3>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="text-[#AAAAAA] hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ordenação */}
          <div className="space-y-3">
            <Label className="text-white">Ordenar por</Label>
            <Select
              value={localFilters.sortBy}
              onValueChange={(value: any) => setLocalFilters(prev => ({ ...prev, sortBy: value }))}
            >
              <SelectTrigger className="bg-[#0D0D0D] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e1e] border-[#333]">
                <SelectItem value="subscribers">Inscritos</SelectItem>
                <SelectItem value="avgViews">Visualizações Médias</SelectItem>
                <SelectItem value="engagement">Engajamento</SelectItem>
                <SelectItem value="growth">Crescimento</SelectItem>
                <SelectItem value="score">Score de Parceria</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Button
                variant={localFilters.sortOrder === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, sortOrder: 'desc' }))}
                className="flex-1"
              >
                <SortDesc className="h-4 w-4 mr-1" />
                Desc
              </Button>
              <Button
                variant={localFilters.sortOrder === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, sortOrder: 'asc' }))}
                className="flex-1"
              >
                <SortAsc className="h-4 w-4 mr-1" />
                Asc
              </Button>
            </div>
          </div>

          {/* Faixa de Inscritos */}
          <div className="space-y-3">
            <Label className="text-white">Faixa de Inscritos</Label>
            <div className="space-y-2">
              <Slider
                value={[localFilters.minSubscribers]}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, minSubscribers: value[0] }))}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <p className="text-[#AAAAAA] text-sm">
                Mínimo: {localFilters.minSubscribers.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <Slider
                value={[localFilters.maxSubscribers]}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, maxSubscribers: value[0] }))}
                min={100000}
                max={10000000}
                step={100000}
                className="w-full"
              />
              <p className="text-[#AAAAAA] text-sm">
                Máximo: {localFilters.maxSubscribers.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Engajamento e Status */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Engajamento Mínimo (%)</Label>
              <Slider
                value={[localFilters.minEngagement]}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, minEngagement: value[0] }))}
                max={10}
                step={0.1}
                className="w-full"
              />
              <p className="text-[#AAAAAA] text-sm">
                {localFilters.minEngagement.toFixed(1)}%
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Apenas Analisados</Label>
                <Switch
                  checked={localFilters.showAnalyzedOnly}
                  onCheckedChange={(checked) => setLocalFilters(prev => ({ 
                    ...prev, 
                    showAnalyzedOnly: checked,
                    showUnanalyzedOnly: checked ? false : prev.showUnanalyzedOnly
                  }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-white">Apenas Não Analisados</Label>
                <Switch
                  checked={localFilters.showUnanalyzedOnly}
                  onCheckedChange={(checked) => setLocalFilters(prev => ({ 
                    ...prev, 
                    showUnanalyzedOnly: checked,
                    showAnalyzedOnly: checked ? false : prev.showAnalyzedOnly
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#AA0000] text-white flex-1"
          >
            Aplicar Filtros
          </Button>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
          >
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
