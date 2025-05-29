
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-gray-600 bg-[#282828] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-10v20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF0000]"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-8 mb-10">
            {/* Premium Logo */}
            <div className="relative group">
              <div className="bg-[#FF0000] p-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-red-600">
                <div className="relative">
                  <Target className="h-14 w-14 text-white" />
                  <div className="absolute -top-2 -right-2 bg-[#282828] rounded-full p-2 border-2 border-white shadow-lg">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 border-2 border-[#FF0000] shadow-lg">
                <Zap className="h-4 w-4 text-[#FF0000]" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-6xl font-black tracking-tight">
                <span className="text-white">Prime</span>
                <span className="text-white bg-[#FF0000] px-2 py-1 rounded-lg ml-2">Lead</span>
              </h1>
              <p className="text-gray-300 text-sm font-bold tracking-widest uppercase mt-3">
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
          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-[#FF0000] p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Canais Analisados</p>
                  <p className="text-[#282828] text-3xl font-bold">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-[#282828] p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Taxa de Sucesso</p>
                  <p className="text-[#282828] text-3xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="bg-[#FF0000] p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Análises Premium</p>
                  <p className="text-[#282828] text-3xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-600"></div>
    </div>
  );
};
