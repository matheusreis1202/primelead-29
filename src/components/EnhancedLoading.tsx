
import { Target, Zap, TrendingUp } from 'lucide-react';

interface EnhancedLoadingProps {
  message?: string;
}

export const EnhancedLoading = ({ message = "Analisando canais premium com IA..." }: EnhancedLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#FF0000] rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-[#FF0000] to-[#CC0000] p-6 rounded-full shadow-2xl">
          <Target className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 animate-bounce">
          <div className="bg-green-500 p-2 rounded-full">
            <TrendingUp className="h-3 w-3 text-white" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 animate-pulse">
          <div className="bg-blue-500 p-2 rounded-full">
            <Zap className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="text-center max-w-md">
        <h3 className="text-white text-xl font-semibold mb-2 animate-fade-in">
          {message}
        </h3>
        <p className="text-[#AAAAAA] text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Isso pode levar alguns segundos...
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-[#333] rounded-full overflow-hidden mt-6">
        <div className="h-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] rounded-full animate-pulse"></div>
      </div>

      {/* Stats during loading */}
      <div className="grid grid-cols-3 gap-4 mt-8 text-center">
        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <p className="text-[#FF0000] text-lg font-bold">AI</p>
          <p className="text-[#AAAAAA] text-xs">Análise</p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <p className="text-green-400 text-lg font-bold">100%</p>
          <p className="text-[#AAAAAA] text-xs">Precisão</p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <p className="text-blue-400 text-lg font-bold">Premium</p>
          <p className="text-[#AAAAAA] text-xs">Qualidade</p>
        </div>
      </div>
    </div>
  );
};
