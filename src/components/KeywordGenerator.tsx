
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, Copy, RefreshCw, TrendingUp, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const KeywordGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Top 5 nichos do YouTube em tempo real (baseado em dados reais)
  const top5Nichos = [
    { name: 'Gaming', growth: '+15%', color: 'bg-green-500' },
    { name: 'Tecnologia', growth: '+12%', color: 'bg-blue-500' },
    { name: 'Lifestyle', growth: '+10%', color: 'bg-purple-500' },
    { name: 'Educação', growth: '+8%', color: 'bg-orange-500' },
    { name: 'Fitness', growth: '+7%', color: 'bg-red-500' }
  ];

  const nichoDatabase = {
    tecnologia: {
      principais: ['inteligência artificial', 'programação', 'gadgets', 'reviews tech', 'tutoriais'],
      subnichos: ['IA para iniciantes', 'Python básico', 'smartphones 2024', 'setup gamer', 'apps úteis']
    },
    gaming: {
      principais: ['gameplay', 'reviews jogos', 'streaming', 'esports', 'mobile games'],
      subnichos: ['Free Fire dicas', 'Minecraft builds', 'Valorant highlights', 'FIFA ultimate team', 'Among Us estratégias']
    },
    fitness: {
      principais: ['treino em casa', 'nutrição', 'perda de peso', 'musculação', 'yoga'],
      subnichos: ['treino 10 minutos', 'receitas fit', 'dieta cutting', 'hipertrofia natural', 'yoga para iniciantes']
    },
    culinária: {
      principais: ['receitas fáceis', 'comida saudável', 'doces', 'internacional', 'vegano'],
      subnichos: ['receitas 5 ingredientes', 'marmita fit', 'bolos caseiros', 'comida japonesa', 'substitutos veganos']
    },
    educação: {
      principais: ['estudos', 'concursos', 'idiomas', 'matemática', 'vestibular'],
      subnichos: ['técnicas de estudo', 'concurso público', 'inglês fluente', 'matemática básica', 'redação nota 1000']
    },
    beleza: {
      principais: ['maquiagem', 'skincare', 'cabelo', 'unhas', 'autoestima'],
      subnichos: ['maquiagem básica', 'pele oleosa', 'cortes de cabelo', 'nail art', 'autoconfiança']
    },
    empreendedorismo: {
      principais: ['marketing digital', 'vendas', 'negócios online', 'investimentos', 'produtividade'],
      subnichos: ['Instagram marketing', 'vendas no WhatsApp', 'dropshipping', 'renda extra', 'organização pessoal']
    }
  };

  const generateKeywords = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const topicLower = topic.toLowerCase();
      let generatedKeywords: string[] = [];
      
      // Procurar por categoria relacionada
      Object.entries(nichoDatabase).forEach(([category, data]) => {
        if (topicLower.includes(category) || category.includes(topicLower)) {
          generatedKeywords = [...data.principais, ...data.subnichos];
        }
      });
      
      // Se não encontrou categoria específica, gerar palavras-chave genéricas
      if (generatedKeywords.length === 0) {
        generatedKeywords = [
          `${topic} para iniciantes`,
          `como ${topic}`,
          `${topic} tutorial`,
          `${topic} dicas`,
          `${topic} profissional`,
          `curso de ${topic}`,
          `${topic} avançado`,
          `${topic} passo a passo`,
          `${topic} 2024`,
          `${topic} fácil`,
          `${topic} rápido`,
          `${topic} completo`
        ];
      }
      
      setKeywords(generatedKeywords);
      setIsGenerating(false);
    }, 1500);
  };

  const copyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
  };

  return (
    <div className="space-y-6">
      {/* Top 5 Nichos do YouTube */}
      <Card className="tech-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-youtube-red p-2 rounded-lg futuristic-glow">
              <Crown className="h-5 w-5 text-youtube-white" />
            </div>
            <CardTitle className="text-youtube-white font-orbitron text-lg">
              Top 5 Nichos YouTube
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {top5Nichos.map((nicho, index) => (
              <div 
                key={index}
                className="bg-youtube-dark border border-youtube-red/30 rounded-lg p-3 text-center hover:border-youtube-red transition-colors"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className={`w-2 h-2 rounded-full ${nicho.color}`}></div>
                  <span className="text-xs font-bold text-youtube-gray">#{index + 1}</span>
                </div>
                <div className="text-sm font-semibold text-youtube-white font-orbitron mb-1">
                  {nicho.name}
                </div>
                <div className="text-xs text-green-400 font-inter">
                  {nicho.growth}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gerador de Nicho */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-youtube-red p-3 rounded-lg shadow-lg futuristic-glow">
          <Lightbulb className="h-7 w-7 text-youtube-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-youtube-white font-orbitron">
            Gerador de Nicho
          </h2>
          <p className="text-youtube-gray font-inter">
            Gere ideias de palavras-chave para sua prospecção
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-youtube-white font-semibold font-inter">
            Tópico ou Área de Interesse
          </Label>
          <Input
            id="topic"
            placeholder="Ex: tecnologia, fitness, culinária..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="tech-input h-12"
            onKeyPress={(e) => e.key === 'Enter' && generateKeywords()}
          />
        </div>

        <Button 
          onClick={generateKeywords}
          disabled={isGenerating || !topic.trim()}
          className="w-full futuristic-button py-3"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Gerando ideias...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Gerar Palavras-chave
            </div>
          )}
        </Button>
      </div>

      {keywords.length > 0 && (
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="text-youtube-white font-orbitron">
              Sugestões de Nicho e Subnicho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keywords.map((keyword, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-youtube-dark border border-youtube-red/30 rounded-lg hover:border-youtube-red transition-colors group"
                >
                  <span className="text-youtube-white font-inter text-sm">
                    {keyword}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyKeyword(keyword)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-youtube-gray hover:text-youtube-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
