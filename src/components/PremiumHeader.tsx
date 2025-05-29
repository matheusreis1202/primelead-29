
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="relative bg-gradient-to-b from-black via-[#282828] to-[#282828] border-b border-gray-800">
      {/* Futuristic background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/5 via-transparent to-[#FF0000]/5"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#FF0000]/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#FF0000]/20 to-transparent"></div>
      </div>

      {/* Top accent line with gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Minimalist Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Clean, futuristic logo */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-[#FF0000] to-red-700 p-3 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-red-500/30">
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
                    <div className="w-0 h-0 border-l-[6px] border-l-[#FF0000] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#282828] rounded-full p-1 border border-white/20 shadow-lg">
                    <Target className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-5xl font-black tracking-tight">
                <span className="text-white">Prime</span>
                <span className="text-white bg-gradient-to-r from-[#FF0000] to-red-600 bg-clip-text text-transparent ml-1">Lead</span>
              </h1>
              <p className="text-gray-400 text-xs font-medium tracking-[0.2em] uppercase mt-1 opacity-80">
                AI-Powered YouTube Prospecting
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light opacity-90">
            Descubra canais premium com inteligência artificial avançada
          </p>
        </div>

        {/* Minimalist Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 hover:shadow-2xl transition-all duration-500 group rounded-3xl overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FF0000]/10 to-transparent rounded-bl-3xl"></div>
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">Canais Analisados</p>
                  <p className="text-[#282828] text-3xl font-black">50K+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 hover:shadow-2xl transition-all duration-500 group rounded-3xl overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#282828]/10 to-transparent rounded-bl-3xl"></div>
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-[#282828] to-gray-800 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">Taxa de Sucesso</p>
                  <p className="text-[#282828] text-3xl font-black">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50 border-0 hover:shadow-2xl transition-all duration-500 group rounded-3xl overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FF0000]/10 to-transparent rounded-bl-3xl"></div>
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-[#FF0000] to-red-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">Análises Premium</p>
                  <p className="text-[#282828] text-3xl font-black">1.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
    </div>
  );
};
