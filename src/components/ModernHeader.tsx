
import { Target, Users, TrendingUp, Zap, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ModernHeader = () => {
  return (
    <div className="bg-gradient-to-r from-[#0D0D0D] to-[#1A1A1A] border-b border-neutral-800">
      {/* Compact Header */}
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/c4340d13-b884-474c-ab17-5ee12d7278e8.png" 
                alt="Prime Lead Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white font-inter">Prime Lead</h1>
              <div className="flex items-center gap-1">
                <div className="bg-[#FF0000] p-0.5 rounded">
                  <Play className="w-2 h-2 text-white fill-white" />
                </div>
                <p className="text-xs text-[#AAAAAA] font-medium">YouTube Pro</p>
              </div>
            </div>
          </div>

          {/* Quick Stats - Compact */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-lg border border-[#333]">
              <Users className="h-4 w-4 text-[#FF0000]" />
              <div className="text-right">
                <p className="text-white text-sm font-bold">50K+</p>
                <p className="text-[#AAAAAA] text-xs">Canais</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-lg border border-[#333]">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <div className="text-right">
                <p className="text-white text-sm font-bold">94.7%</p>
                <p className="text-[#AAAAAA] text-xs">Sucesso</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-lg border border-[#333]">
              <Zap className="h-4 w-4 text-[#FF0000]" />
              <div className="text-right">
                <p className="text-white text-sm font-bold">1.2K</p>
                <p className="text-[#AAAAAA] text-xs">Análises</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
