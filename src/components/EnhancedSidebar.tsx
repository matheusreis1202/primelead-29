
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Filter, Settings } from 'lucide-react';
import { SearchForm } from '@/components/SearchForm';
import { SearchFilters } from '@/pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface EnhancedSidebarProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const EnhancedSidebar = ({ onSearch, isLoading }: EnhancedSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className={`bg-gradient-to-b from-[#1E1E1E] to-[#1A1A1A] border-r border-neutral-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-96'
    }`}>
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FF0000] rounded-lg">
              <Filter className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Filtros de Busca</h3>
              <p className="text-[#AAAAAA] text-xs">Configure os parâmetros</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#AAAAAA] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#333]"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Quick Stats */}
          <Card className="bg-[#0D0D0D] border-[#333]">
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-[#FF0000] text-lg font-bold">50K+</p>
                  <p className="text-[#AAAAAA] text-xs">Canais</p>
                </div>
                <div>
                  <p className="text-green-400 text-lg font-bold">94.7%</p>
                  <p className="text-[#AAAAAA] text-xs">Precisão</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Filters - Collapsible */}
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-[#0D0D0D] border border-[#333] rounded-lg hover:bg-[#1A1A1A] transition-colors">
              <span className="text-white font-medium text-sm">Filtros Principais</span>
              {isFiltersOpen ? (
                <ChevronUp className="h-4 w-4 text-[#AAAAAA]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#AAAAAA]" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <SearchForm onSearch={onSearch} isLoading={isLoading} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Advanced Options - Collapsible */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-[#0D0D0D] border border-[#333] rounded-lg hover:bg-[#1A1A1A] transition-colors">
              <span className="text-white font-medium text-sm">Opções Avançadas</span>
              {isAdvancedOpen ? (
                <ChevronUp className="h-4 w-4 text-[#AAAAAA]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#AAAAAA]" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-[#0D0D0D] border border-[#333] rounded-lg p-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-[#AAAAAA]" />
                    <span className="text-[#AAAAAA] text-sm">Configurações adicionais em breve</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Tips Section */}
          <Card className="bg-gradient-to-r from-[#FF0000]/10 to-[#CC0000]/10 border-[#FF0000]/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#FF0000] text-sm">💡 Dica</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-[#AAAAAA] text-xs leading-relaxed">
                Use filtros mais específicos para encontrar canais com maior potencial de conversão.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
