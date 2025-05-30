
import { SearchForm } from '@/components/SearchForm';
import { Target } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header integrado */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-youtube-red to-red-600 p-3 rounded-xl shadow-2xl animate-pulse">
            <Target className="h-6 w-6 text-youtube-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-youtube-white font-roboto bg-gradient-to-r from-youtube-white to-gray-300 bg-clip-text text-transparent">
              Prospecção Premium
            </h1>
            <p className="text-youtube-gray text-base font-roboto mt-1">
              Configure seus filtros e descubra canais de alta qualidade
            </p>
          </div>
        </div>
      </div>

      {/* Form de Prospecção Integrado */}
      <SearchForm onSearch={onSearch} isLoading={isLoading} />

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="modern-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Canais Analisados</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">1,247</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-youtube-red to-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-youtube-red to-red-600 p-2.5 rounded-xl shadow-lg">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>

        <div className="modern-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">89.2%</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1.5 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2.5 rounded-xl shadow-lg">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>

        <div className="modern-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-youtube-gray text-sm font-roboto">Análises Premium</p>
              <p className="text-2xl font-bold text-youtube-white font-roboto">324</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-xl shadow-lg">
              <Target className="h-5 w-5 text-youtube-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
