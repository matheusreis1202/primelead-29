
import { SearchForm } from '@/components/SearchForm';
import { Target, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { SearchFilters } from '@/pages/Index';

interface DashboardTabProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const DashboardTab = ({ onSearch, isLoading }: DashboardTabProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 fade-in">
      {/* Header modernizado com cores YouTube fosco */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-youtube-red rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
            <div className="relative bg-gradient-to-br from-youtube-red to-brand-600 p-4 rounded-2xl shadow-brand">
              <Target className="h-8 w-8 text-youtube-white icon-hover" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold text-youtube-white font-inter tracking-tight mb-2">
              Prospecção
              <span className="bg-gradient-to-r from-youtube-red to-brand-600 bg-clip-text text-transparent ml-2">
                Premium
              </span>
            </h1>
            <p className="text-neutral-400 text-lg font-inter font-medium">
              Configure seus filtros e descubra canais de alta qualidade
            </p>
          </div>
        </div>
      </div>

      {/* Form de Prospecção com design moderno */}
      <div className="slide-up">
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </div>

      {/* Cards de Estatísticas modernizados com cores YouTube */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-youtube-red rounded-full animate-pulse"></div>
                <p className="text-neutral-400 text-sm font-inter font-medium uppercase tracking-wider">
                  Canais Analisados
                </p>
              </div>
              <p className="text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
                1,247
              </p>
              <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-youtube-red to-brand-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: '75%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-2 font-inter">75% do objetivo mensal</p>
            </div>
            <div className="bg-gradient-to-br from-youtube-red/20 to-brand-600/10 p-3 rounded-xl border border-youtube-red/20">
              <BarChart3 className="h-6 w-6 text-youtube-red icon-hover" />
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-neutral-400 text-sm font-inter font-medium uppercase tracking-wider">
                  Taxa de Sucesso
                </p>
              </div>
              <p className="text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
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
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-3 rounded-xl border border-emerald-500/20">
              <TrendingUp className="h-6 w-6 text-emerald-400 icon-hover" />
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-neutral-400 text-sm font-inter font-medium uppercase tracking-wider">
                  Análises Premium
                </p>
              </div>
              <p className="text-3xl font-bold text-youtube-white font-inter tracking-tight mb-3">
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
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 icon-hover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
