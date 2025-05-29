
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
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Futuristic YouTube Logo */}
            <div className="relative group">
              <div className="bg-youtube-red p-3 rounded-lg shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-youtube-red futuristic-glow">
                <div className="relative">
                  {/* YouTube Play Button Style Logo */}
                  <div className="w-8 h-8 bg-youtube-white rounded-md flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-youtube-red border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-youtube-black rounded-full p-1 border border-youtube-white shadow-lg">
                    <Target className="h-2 w-2 text-youtube-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-youtube-white rounded-full p-1 border border-youtube-red shadow-lg">
                <Zap className="h-2 w-2 text-youtube-red" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-3xl font-black tracking-tight font-roboto">
                <span className="text-youtube-white">Prime</span>
                <span className="text-youtube-white bg-youtube-red px-2 py-1 rounded-md ml-2">Lead</span>
              </h1>
              <p className="text-youtube-gray text-xs font-bold tracking-widest uppercase mt-2 font-roboto">
                YouTube Prospecting Pro
              </p>
            </div>
          </div>
          
          <p className="text-base text-youtube-gray max-w-3xl mx-auto leading-relaxed font-light font-roboto">
            Descubra canais premium com inteligência artificial avançada e métricas precisas para sua prospecção no YouTube
          </p>
        </div>

        {/* Premium Stats Cards - Diminuídos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="tech-card group">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="bg-youtube-red p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 futuristic-glow">
                  <Users className="h-4 w-4 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-xs font-medium mb-1 font-roboto">Canais Analisados</p>
                  <p className="text-youtube-white text-lg font-bold font-roboto">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="tech-card group">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="bg-youtube-dark p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 border border-youtube-red">
                  <TrendingUp className="h-4 w-4 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-xs font-medium mb-1 font-roboto">Taxa de Sucesso</p>
                  <p className="text-youtube-white text-lg font-bold font-roboto">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="tech-card group">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="bg-youtube-red p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 futuristic-glow">
                  <Zap className="h-4 w-4 text-youtube-white" />
                </div>
                <div>
                  <p className="text-youtube-gray text-xs font-medium mb-1 font-roboto">Análises Premium</p>
                  <p className="text-youtube-white text-lg font-bold font-roboto">1,247</p>
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
