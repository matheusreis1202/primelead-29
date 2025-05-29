
import { SearchForm } from '@/components/SearchForm';
import { Target } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="tech-card">
        <h2 className="text-3xl font-bold text-youtube-white mb-8 flex items-center gap-4 font-orbitron">
          <div className="bg-youtube-red p-3 rounded-lg shadow-lg futuristic-glow">
            <Target className="h-7 w-7 text-youtube-white" />
          </div>
          Prospecção de Canais
        </h2>
        <p className="text-youtube-gray mb-8 text-lg leading-relaxed font-inter">
          Configure seus filtros de busca e descubra os melhores canais premium do YouTube para sua estratégia.
        </p>
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </div>
    </div>
  );
};
