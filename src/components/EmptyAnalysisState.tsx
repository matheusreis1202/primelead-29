
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyAnalysisStateProps {
  onNavigateToResults: () => void;
}

export const EmptyAnalysisState = ({ onNavigateToResults }: EmptyAnalysisStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#FF0000] rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-[#FF0000] to-[#CC0000] p-8 rounded-2xl shadow-2xl">
          <Brain className="h-16 w-16 text-white" />
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 bg-blue-500 p-2 rounded-full animate-bounce">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 bg-green-500 p-2 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-3xl font-bold text-white mb-4">
          Análise Inteligente de Canais
        </h3>
        <p className="text-[#AAAAAA] text-lg leading-relaxed">
          Utilize nossa IA avançada para analisar canais em profundidade e descobrir oportunidades de parceria.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 gap-3 mt-8 text-left">
          <div className="flex items-center gap-3 p-3 bg-[#1e1e1e] border border-[#333] rounded-lg">
            <div className="w-2 h-2 bg-[#FF0000] rounded-full"></div>
            <span className="text-white text-sm">Score de parceria automático</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#1e1e1e] border border-[#333] rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-white text-sm">Métricas de engajamento detalhadas</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#1e1e1e] border border-[#333] rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-white text-sm">Análise de crescimento e tendências</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button 
        onClick={onNavigateToResults}
        className="mt-8 bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#AA0000] text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF0000]/25"
      >
        <span>Buscar Canais para Analisar</span>
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>

      {/* Bottom hint */}
      <p className="text-[#666] text-sm mt-6">
        Encontre canais na aba <strong className="text-[#FF0000]">Resultados</strong> e envie para análise
      </p>
    </div>
  );
};
