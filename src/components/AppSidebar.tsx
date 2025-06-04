
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SearchForm } from '@/components/SearchForm';
import { Target } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface AppSidebarProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const AppSidebar = ({ onSearch, isLoading }: AppSidebarProps) => {
  return (
    <Sidebar className="border-r border-neutral-700/40">
      <SidebarHeader className="border-b border-neutral-700/40 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-youtube-red rounded-xl blur-sm opacity-20"></div>
              <div className="relative bg-gradient-to-br from-youtube-red to-red-600 p-2 sm:p-3 rounded-xl shadow-lg border border-youtube-red/20">
                <Target className="h-4 w-4 sm:h-6 sm:w-6 text-youtube-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-lg font-bold text-youtube-white font-inter tracking-tight truncate">
                <span className="font-bold">Prospecção</span>
                <span className="bg-gradient-to-r from-youtube-red to-red-500 bg-clip-text text-transparent ml-1 font-extrabold">
                  Premium
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-neutral-400 font-inter truncate">
                Filtros de busca
              </p>
            </div>
          </div>
          <SidebarTrigger className="text-neutral-400 hover:text-youtube-white flex-shrink-0" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-3 sm:p-4">
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </SidebarContent>
    </Sidebar>
  );
};
