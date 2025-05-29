
import { SearchForm } from '@/components/SearchForm';
import { KeywordGenerator } from '@/components/KeywordGenerator';
import { Target } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {/* Filtros de Busca */}
      <div className="tech-card">
        <h2 className="text-2xl font-bold text-youtube-white mb-6 flex items-center gap-4 font-roboto">
          <div className="bg-youtube-red p-3 rounded-lg shadow-lg futuristic-glow">
            <Target className="h-6 w-6 text-youtube-white" />
          </div>
          Prospecção de Canais
        </h2>
        <p className="text-youtube-gray mb-6 text-base leading-relaxed font-roboto">
          Configure seus filtros de busca e descubra os melhores canais premium do YouTube para sua estratégia.
        </p>
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </div>

      {/* Gerador de Palavras-chave */}
      <div className="tech-card">
        <KeywordGenerator />
      </div>
    </div>
  );
};
