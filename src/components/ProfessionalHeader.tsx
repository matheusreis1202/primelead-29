
import { Target, Users, TrendingUp, Zap, User, Play } from 'lucide-react';
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
            <div className="flex flex-col items-center gap-1">
              {/* Logo Principal */}
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/c4340d13-b884-474c-ab17-5ee12d7278e8.png" 
                  alt="Prime Lead Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Logo YouTube menor */}
              <div className="bg-[#FF0000] p-1 rounded">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-inter">Prime Lead</h1>
              <p className="text-xs text-[#AAAAAA] font-medium">YouTube Pro</p>
            </div>
          </div>

          {/* Slogan Central */}
          <div className="hidden md:block">
            <h2 className="text-white text-3xl font-great-vibes text-center">
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
