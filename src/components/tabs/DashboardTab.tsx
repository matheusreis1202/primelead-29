
import { SearchForm } from '@/components/SearchForm';
import { Target } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Prospecção de Canais - Integrado */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-youtube-red p-2 rounded-lg shadow-lg futuristic-glow">
            <Target className="h-5 w-5 text-youtube-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-youtube-white font-roboto">
              Prospecção de Canais YouTube
            </h2>
            <p className="text-youtube-gray text-sm font-roboto">
              Configure seus filtros e descubra canais premium
            </p>
          </div>
        </div>
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="tech-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Canais Analisados</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">1,247</p>
            </div>
            <div className="bg-youtube-red p-2 rounded-lg futuristic-glow">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>

        <div className="tech-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">89.2%</p>
            </div>
            <div className="bg-green-600 p-2 rounded-lg futuristic-glow">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>

        <div className="tech-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Análises Premium</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">324</p>
            </div>
            <div className="bg-youtube-blue p-2 rounded-lg futuristic-glow">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
