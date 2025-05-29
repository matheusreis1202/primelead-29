
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
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* Futuristic YouTube Logo - Aumentado */}
            <div className="relative group">
              <div className="bg-youtube-red p-6 rounded-lg shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-youtube-red futuristic-glow">
                <div className="relative">
                  {/* YouTube Play Button Style Logo - Maior */}
                  <div className="w-16 h-16 bg-youtube-white rounded-md flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-youtube-red border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-2"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-youtube-black rounded-full p-2 border border-youtube-white shadow-lg">
                    <Target className="h-4 w-4 text-youtube-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-youtube-white rounded-full p-2 border border-youtube-red shadow-lg">
                <Zap className="h-4 w-4 text-youtube-red" />
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-4xl font-black tracking-tight font-roboto">
                <span className="text-youtube-white">Prime</span>
                <span className="text-youtube-white bg-youtube-red px-3 py-2 rounded-md ml-3">Lead</span>
              </h1>
              <p className="text-youtube-gray text-sm font-bold tracking-widest uppercase mt-3 font-roboto">
                YouTube Prospecting Pro
              </p>
            </div>
          </div>
          
          <p className="text-base text-youtube-gray max-w-3xl mx-auto leading-relaxed font-light font-roboto">
            Descubra canais premium com inteligência artificial avançada e métricas precisas para sua prospecção no YouTube
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-youtube-red shadow-[0_0_5px_rgba(255,0,0,0.5)]"></div>
    </div>
  );
};
