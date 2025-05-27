
import { Crown, Zap, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PremiumHeader = () => {
  return (
    <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-2xl">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                <Zap className="h-4 w-4 text-yellow-900" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                PrimeLead
              </h1>
              <p className="text-purple-300 text-sm font-medium">Premium Channel Analytics</p>
            </div>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Descubra canais premium com análise avançada de performance e scoring inteligente
          </p>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Canais Analisados</p>
                  <p className="text-white text-2xl font-bold">10,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Score Médio</p>
                  <p className="text-white text-2xl font-bold">8.7/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500/20 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Análises Hoje</p>
                  <p className="text-white text-2xl font-bold">847</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
