
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* YouTube-inspired Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-10v20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Premium Logo with YouTube colors */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-5 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-2 border-red-500/20">
                <div className="relative">
                  <Target className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 border-2 border-white">
                    <Play className="h-4 w-4 text-black fill-current" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2 border-3 border-white shadow-lg">
                <Zap className="h-4 w-4 text-black" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-6xl font-black text-white tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text">
                Prime<span className="text-red-500">Lead</span>
              </h1>
              <p className="text-yellow-400 text-sm font-bold tracking-widest uppercase mt-2">
                YouTube Prospecting Pro
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Descubra canais premium com inteligência artificial avançada e métricas precisas para sua prospecção no YouTube
          </p>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-red-500/50 transition-all duration-300 group shadow-xl hover:shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Canais Analisados</p>
                  <p className="text-white text-3xl font-bold">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group shadow-xl hover:shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Taxa de Sucesso</p>
                  <p className="text-white text-3xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group shadow-xl hover:shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Análises Premium</p>
                  <p className="text-white text-3xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
    </div>
  );
};
