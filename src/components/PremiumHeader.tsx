
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
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Creative YouTube Logo */}
            <div className="relative group">
              <div className="bg-[#FF0000] p-4 rounded-xl shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-red-600">
                <div className="relative">
                  {/* YouTube Play Button Style Logo */}
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-[#FF0000] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#282828] rounded-full p-1 border border-white shadow-lg">
                    <Target className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-[#FF0000] shadow-lg">
                <Zap className="h-3 w-3 text-[#FF0000]" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-white">Prime</span>
                <span className="text-white bg-[#FF0000] px-2 py-1 rounded-lg ml-2">Lead</span>
              </h1>
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mt-2">
                YouTube Prospecting Pro
              </p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Descubra canais premium com inteligência artificial avançada e métricas precisas para sua prospecção no YouTube
          </p>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#FF0000] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Canais Analisados</p>
                  <p className="text-[#282828] text-2xl font-bold">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#282828] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Taxa de Sucesso</p>
                  <p className="text-[#282828] text-2xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-600 hover:border-[#FF0000] transition-all duration-300 group shadow-xl hover:shadow-2xl rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#FF0000] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Análises Premium</p>
                  <p className="text-[#282828] text-2xl font-bold">1,247</p>
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
