
import { Target, Users, TrendingUp, Zap, User, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ProfessionalHeader = () => {
  return (
    <div className="bg-[#121212] border-b border-neutral-800">
      {/* Header Principal */}
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Branding - Responsivo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Logo Principal - Tamanho adaptável */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src="/lovable-uploads/c4340d13-b884-474c-ab17-5ee12d7278e8.png" 
                alt="Prime Lead Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Texto com ícone do YouTube integrado - Responsivo */}
            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white font-inter truncate">Prime Lead</h1>
              <div className="flex items-center gap-1">
                <div className="bg-[#FF0000] p-0.5 rounded flex-shrink-0">
                  <Play className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white fill-white" />
                </div>
                <p className="text-xs sm:text-sm text-[#AAAAAA] font-medium truncate">YouTube Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Horizontais - Layout responsivo */}
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF0000]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[#AAAAAA] text-xs sm:text-sm font-medium truncate">Canais Analisados</p>
                  <p className="text-white text-lg sm:text-xl font-bold">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF0000]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[#AAAAAA] text-xs sm:text-sm font-medium truncate">Taxa de Sucesso</p>
                  <p className="text-white text-lg sm:text-xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF0000]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[#AAAAAA] text-xs sm:text-sm font-medium truncate">Análises Premium</p>
                  <p className="text-white text-lg sm:text-xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
