
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchForm } from '@/components/SearchForm';
import { SearchFilters } from '@/pages/Index';

interface MinimalSidebarProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const MinimalSidebar = ({ onSearch, isLoading }: MinimalSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-[#1E1E1E] border-r border-neutral-800 transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-3 border-b border-neutral-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#AAAAAA] hover:text-white transition-colors p-1 rounded"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-white font-medium text-sm mb-1">Filtros de Prospecção</h3>
            <p className="text-[#AAAAAA] text-xs">Configure os parâmetros de busca</p>
          </div>
          <SearchForm onSearch={onSearch} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
