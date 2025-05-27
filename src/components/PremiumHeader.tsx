
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-gray-200 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23374151' fill-opacity='0.02'%3E%3Cpath d='M20 20l10-10v20z'/%3E%3Cpath d='M20 20l-10-10v20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Premium Logo */}
            <div className="relative group">
              <div className="bg-gray-900 p-4 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 border border-gray-200">
                <div className="relative">
                  <Target className="h-10 w-10 text-white" />
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
                    <Play className="h-3 w-3 text-gray-900 fill-current" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gray-600 rounded-full p-1.5 border-2 border-white">
                <Zap className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                PrimeLead
              </h1>
              <p className="text-gray-600 text-sm font-bold tracking-widest uppercase">
                Channel Analytics Pro
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Descubra canais premium com análise avançada de performance e scoring inteligente
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 group-hover:bg-gray-200 transition-colors">
                  <Users className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Canais Analisados</p>
                  <p className="text-gray-900 text-2xl font-bold">10,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 group-hover:bg-gray-200 transition-colors">
                  <TrendingUp className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Score Médio</p>
                  <p className="text-gray-900 text-2xl font-bold">8.7/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 group-hover:bg-gray-200 transition-colors">
                  <Zap className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Análises Hoje</p>
                  <p className="text-gray-900 text-2xl font-bold">847</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
