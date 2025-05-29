
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, Copy, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const KeywordGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const keywordTemplates = {
    tecnologia: ['inteligência artificial', 'programação', 'desenvolvimento web', 'gadgets', 'reviews tech', 'tutoriais programação'],
    fitness: ['treino em casa', 'exercícios funcionais', 'nutrição esportiva', 'perda de peso', 'musculação', 'yoga'],
    culinária: ['receitas fáceis', 'comida saudável', 'doces caseiros', 'pratos vegetarianos', 'culinária internacional', 'dicas de cozinha'],
    empreendedorismo: ['marketing digital', 'vendas online', 'negócios digitais', 'investimentos', 'produtividade', 'liderança'],
    educação: ['estudos eficazes', 'concursos públicos', 'idiomas', 'matemática', 'ciências', 'vestibular'],
    entretenimento: ['gaming', 'filmes e séries', 'música', 'comédia', 'vlogs', 'desafios'],
  };

  const generateKeywords = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const topicLower = topic.toLowerCase();
      let generatedKeywords: string[] = [];
      
      // Procurar por categoria relacionada
      Object.entries(keywordTemplates).forEach(([category, categoryKeywords]) => {
        if (topicLower.includes(category) || category.includes(topicLower)) {
          generatedKeywords = [...categoryKeywords];
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
              Sugestões de Nicho
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
