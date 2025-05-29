
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  X,
  BarChart3,
  Clock,
  Star
} from 'lucide-react';
import { Channel } from '@/pages/Index';

interface ChannelAnalysis {
  id: string;
  audienciaSize: {
    inscritos: number;
    views: number;
    classificacao: 'Pequena' | 'Média' | 'Grande' | 'Mega';
  };
  engajamento: {
    mediaViews: number;
    taxaEngajamento: number;
    classificacao: 'Baixo' | 'Médio' | 'Alto' | 'Excelente';
  };
  nicho: {
    categoria: string;
    publicoAlvo: string;
    relevancia: 'Baixa' | 'Média' | 'Alta';
  };
  qualidadeConteudo: {
    estilo: string;
    consistencia: 'Baixa' | 'Média' | 'Alta';
    nota: number;
  };
  frequencia: {
    uploadsPerMes: number;
    consistencia: 'Irregular' | 'Regular' | 'Muito Regular';
  };
  crescimento: {
    tendencia: 'Decrescente' | 'Estável' | 'Crescente' | 'Em Alta';
    velocidade: 'Lenta' | 'Moderada' | 'Rápida';
  };
  tipoPublico: {
    genero: 'Masculino' | 'Feminino' | 'Misto';
    faixaEtaria: string;
    localizacao: string;
  };
}

interface ChannelAnalysisCardProps {
  channel: Channel;
  analysis?: ChannelAnalysis;
  onRemove: () => void;
}

export const ChannelAnalysisCard = ({ channel, analysis, onRemove }: ChannelAnalysisCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Mega':
      case 'Excelente':
      case 'Em Alta':
      case 'Alta':
        return 'bg-green-500';
      case 'Grande':
      case 'Alto':
      case 'Crescente':
        return 'bg-blue-500';
      case 'Média':
      case 'Médio':
      case 'Regular':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="tech-card border-youtube-red/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
              <BarChart3 className="h-6 w-6 text-youtube-white" />
            </div>
            <div>
              <CardTitle className="text-youtube-white font-roboto">
                Canal Analisado
              </CardTitle>
              <p className="text-youtube-gray font-roboto text-sm">
                {channel.title}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-youtube-gray hover:text-youtube-red"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!analysis ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-youtube-red/30 border-t-youtube-red rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-youtube-gray font-roboto">Aguardando análise...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tamanho da Audiência */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Audiência</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Inscritos:</span>
                  <span className="text-youtube-white font-bold">{formatNumber(analysis.audienciaSize.inscritos)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Views:</span>
                  <span className="text-youtube-white font-bold">{formatNumber(analysis.audienciaSize.views)}</span>
                </div>
                <Badge className={`${getClassificationColor(analysis.audienciaSize.classificacao)} text-white`}>
                  {analysis.audienciaSize.classificacao}
                </Badge>
              </div>
            </div>

            {/* Engajamento */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Engajamento</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Taxa:</span>
                  <span className="text-youtube-white font-bold">{analysis.engajamento.taxaEngajamento.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Média Views:</span>
                  <span className="text-youtube-white font-bold">{formatNumber(analysis.engajamento.mediaViews)}</span>
                </div>
                <Badge className={`${getClassificationColor(analysis.engajamento.classificacao)} text-white`}>
                  {analysis.engajamento.classificacao}
                </Badge>
              </div>
            </div>

            {/* Nicho e Público-Alvo */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Nicho</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Categoria:</span>
                  <span className="text-youtube-white">{analysis.nicho.categoria}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Público:</span>
                  <span className="text-youtube-white">{analysis.nicho.publicoAlvo}</span>
                </div>
                <Badge className={`${getClassificationColor(analysis.nicho.relevancia)} text-white`}>
                  Relevância {analysis.nicho.relevancia}
                </Badge>
              </div>
            </div>

            {/* Qualidade do Conteúdo */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Qualidade</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Estilo:</span>
                  <span className="text-youtube-white">{analysis.qualidadeConteudo.estilo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Nota:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-youtube-white font-bold">{analysis.qualidadeConteudo.nota}/10</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  </div>
                </div>
                <Badge className={`${getClassificationColor(analysis.qualidadeConteudo.consistencia)} text-white`}>
                  {analysis.qualidadeConteudo.consistencia}
                </Badge>
              </div>
            </div>

            {/* Frequência */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Frequência</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Uploads/mês:</span>
                  <span className="text-youtube-white font-bold">{analysis.frequencia.uploadsPerMes}</span>
                </div>
                <Badge className={`${getClassificationColor(analysis.frequencia.consistencia)} text-white`}>
                  {analysis.frequencia.consistencia}
                </Badge>
              </div>
            </div>

            {/* Tipo de Público */}
            <div className="bg-youtube-dark/50 border border-youtube-red/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-4 w-4 text-youtube-red" />
                <h3 className="font-semibold text-youtube-white font-roboto">Público</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Gênero:</span>
                  <span className="text-youtube-white">{analysis.tipoPublico.genero}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Idade:</span>
                  <span className="text-youtube-white">{analysis.tipoPublico.faixaEtaria}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-youtube-gray">Local:</span>
                  <span className="text-youtube-white">{analysis.tipoPublico.localizacao}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
