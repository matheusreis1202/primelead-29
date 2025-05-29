
import { Target, Zap, Users, TrendingUp, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-youtube-red bg-youtube-black relative overflow-hidden">
      {/* Futuristic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.2'%3E%3Cpath d='M30 30l15-10v20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Top accent line with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-youtube-red shadow-[0_0_10px_rgba(255,0,0,0.6)]"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Futuristic YouTube Logo */}
            <div className="relative group">
              <div className="bg-youtube-red p-4 rounded-lg shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-youtube-red futuristic-glow">
                <div className="relative">
                  {/* YouTube Play Button Style Logo */}
                  <div className="w-10 h-10 bg-youtube-white rounded-md flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-youtube-red border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-youtube-black rounded-full p-1 border border-youtube-white shadow-lg">
                    <Target className="h-3 w-3 text-youtube-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-youtube-white rounded-full p-1 border border-youtube-red shadow-lg">
                <Zap className="h-3 w-3 text-youtube-red" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-4xl font-black tracking-tight font-orbitron">
                <span className="text-youtube-white">Prime</span>
                <span className="text-youtube-white bg-youtube-red px-2 py-1 rounded-md ml-2">Lead</span>
              </h1>
              <p className="text-youtube-gray text-xs font-bold tracking-widest uppercase mt-2 font-inter">
                YouTube Prospecting Pro
              </p>
            </div>
          </div>
          
          <p className="text-lg text-youtube-gray max-w-3xl mx-auto leading-relaxed font-light font-inter">
            Descubra canais premium com inteligência artificial avançada e métricas precisas para sua prospecção no YouTube
          </p>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="tech-card group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-youtube-red p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 futuristic-glow">
                  <Users className="h-6 w-6 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-sm font-medium mb-1 font-inter">Canais Analisados</p>
                  <p className="text-youtube-white text-2xl font-bold font-orbitron">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="tech-card group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-youtube-dark p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 border border-youtube-red">
                  <TrendingUp className="h-6 w-6 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-sm font-medium mb-1 font-inter">Taxa de Sucesso</p>
                  <p className="text-youtube-white text-2xl font-bold font-orbitron">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="tech-card group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-youtube-red p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 futuristic-glow">
                  <Zap className="h-6 w-6 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-sm font-medium mb-1 font-inter">Análises Premium</p>
                  <p className="text-youtube-white text-2xl font-bold font-orbitron">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-youtube-red shadow-[0_0_5px_rgba(255,0,0,0.5)]"></div>
    </div>
  );
};
