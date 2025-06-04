
import { SearchForm } from '@/components/SearchForm';
import { Target, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 fade-in px-3 sm:px-6">
      {/* Header modernizado com tipografia ajustada */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-youtube-red rounded-2xl blur-sm opacity-20"></div>
            <div className="relative bg-gradient-to-br from-youtube-red to-red-600 p-3 sm:p-4 rounded-2xl shadow-lg border border-youtube-red/20">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-youtube-white transition-transform duration-200 hover:scale-105" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold text-youtube-white font-inter tracking-tight mb-2">
              <span className="font-bold">Prospecção</span>
              <span className="bg-gradient-to-r from-youtube-red to-red-500 bg-clip-text text-transparent ml-2 font-extrabold">
                Premium
              </span>
            </h1>
            <p className="text-neutral-300 text-sm sm:text-lg font-inter font-medium px-4 sm:px-0">
              Configure seus filtros e descubra canais de alta qualidade
            </p>
          </div>
        </div>
      </div>

      {/* Form de Prospecção */}
      <div className="slide-up">
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </div>

      {/* Cards de Estatísticas modernizados - Layout responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12">
        <div className="modern-stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-youtube-red rounded-full animate-pulse flex-shrink-0"></div>
                <p className="text-neutral-400 text-xs sm:text-sm font-inter font-medium uppercase tracking-wider truncate">
                  Canais Analisados
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
                1,247
              </p>
              <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-youtube-red to-red-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: '75%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-2 font-inter">75% do objetivo mensal</p>
            </div>
            <div className="bg-neutral-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-neutral-700/50 transition-all duration-200 hover:border-youtube-red/30 hover:bg-neutral-700/80 flex-shrink-0">
              <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-youtube-red transition-transform duration-200 hover:scale-110" />
            </div>
          </div>
        </div>

        <div className="modern-stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                <p className="text-neutral-400 text-xs sm:text-sm font-inter font-medium uppercase tracking-wider truncate">
                  Taxa de Sucesso
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
                89.2%
              </p>
              <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: '89%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-2 font-inter">↗️ +2.1% vs mês anterior</p>
            </div>
            <div className="bg-neutral-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-neutral-700/50 transition-all duration-200 hover:border-emerald-500/30 hover:bg-neutral-700/80 flex-shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400 transition-transform duration-200 hover:scale-110" />
            </div>
          </div>
        </div>

        <div className="modern-stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                <p className="text-neutral-400 text-xs sm:text-sm font-inter font-medium uppercase tracking-wider truncate">
                  Análises Premium
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
                324
              </p>
              <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: '60%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-2 font-inter">60% do plano atual</p>
            </div>
            <div className="bg-neutral-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-neutral-700/50 transition-all duration-200 hover:border-blue-500/30 hover:bg-neutral-700/80 flex-shrink-0">
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400 transition-transform duration-200 hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
