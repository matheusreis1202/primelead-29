
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-slate-800/30 bg-slate-900/95 backdrop-blur-md relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M20 20l10-10v20z'/%3E%3Cpath d='M20 20l-10-10v20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Nova Logo Criativa */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 p-4 rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border border-amber-400/30">
                <div className="relative">
                  <Target className="h-10 w-10 text-slate-900" />
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
                    <Play className="h-3 w-3 text-amber-600 fill-current" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 border-2 border-slate-900">
                <Zap className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent tracking-tight">
                PrimeLead
              </h1>
              <p className="text-amber-400 text-sm font-bold tracking-widest uppercase">
                Channel Analytics Pro
              </p>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Descubra canais premium com análise avançada de performance e scoring inteligente
          </p>
        </div>

        {/* Stats Cards Redesenhados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 border-slate-700/30 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-400/30 group-hover:bg-amber-500/30 transition-colors">
                  <Users className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Canais Analisados</p>
                  <p className="text-white text-2xl font-bold">10,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 border-slate-700/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Score Médio</p>
                  <p className="text-white text-2xl font-bold">8.7/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 border-slate-700/30 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-400/30 group-hover:bg-amber-500/30 transition-colors">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Análises Hoje</p>
                  <p className="text-white text-2xl font-bold">847</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
