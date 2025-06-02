
import { Target, Users, TrendingUp, Zap, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ProfessionalHeader = () => {
  return (
    <div className="bg-[#121212] border-b border-neutral-800">
      {/* Header Principal */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-[#FF0000] p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <div className="w-0 h-0 border-l-[4px] border-l-[#FF0000] border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-inter">Prime Lead</h1>
              <p className="text-xs text-[#AAAAAA] font-medium">YouTube Pro</p>
            </div>
          </div>

          {/* Slogan Central */}
          <div className="hidden md:block">
            <h2 className="text-white text-xl font-medium font-optima">
              Sua ponte para parcerias exclusivas
            </h2>
          </div>

          {/* Botão Login */}
          <Button 
            variant="outline" 
            className="bg-transparent border-[#FF0000] text-white hover:bg-[#FF0000] hover:text-white transition-colors"
          >
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>
      </div>

      {/* KPI Cards Horizontais */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Users className="h-5 w-5 text-[#FF0000]" />
                </div>
                <div>
                  <p className="text-[#AAAAAA] text-sm font-medium">Canais Analisados</p>
                  <p className="text-white text-xl font-bold">50,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-[#FF0000]" />
                </div>
                <div>
                  <p className="text-[#AAAAAA] text-sm font-medium">Taxa de Sucesso</p>
                  <p className="text-white text-xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-[#FF0000]" />
                </div>
                <div>
                  <p className="text-[#AAAAAA] text-sm font-medium">Análises Premium</p>
                  <p className="text-white text-xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
