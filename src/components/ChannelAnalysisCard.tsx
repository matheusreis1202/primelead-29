
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
  Star,
  Zap,
  Heart,
  Mail,
  Globe,
  Instagram
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
  partnershipScore: {
    overall: number;
    audienceSize: number;
    engagement: number;
    consistency: number;
    content: number;
    reachability: number;
  };
  socialMedia: {
    email?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}

interface ChannelAnalysisCardProps {
  channel: Channel;
  analysis?: ChannelAnalysis;
  onRemove: () => void;
  onAnalyze?: () => void;
  onSave?: () => void;
  showSaveButton?: boolean;
  isSaved?: boolean;
}

export const ChannelAnalysisCard = ({ 
  channel, 
  analysis, 
  onRemove, 
  onAnalyze, 
  onSave,
  showSaveButton = true,
  isSaved = false
}: ChannelAnalysisCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={channel.thumbnail} 
              alt={channel.title}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-youtube-white font-roboto text-lg">
                {channel.title}
              </CardTitle>
              <p className="text-youtube-gray font-roboto text-sm">
                {formatNumber(channel.subscriberCount)} inscritos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {analysis && (
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.partnershipScore.overall)}`}>
                  {analysis.partnershipScore.overall}
                </div>
                <div className="text-xs text-youtube-gray">Score</div>
              </div>
            )}
            {!analysis && onAnalyze && (
              <Button
                onClick={onAnalyze}
                size="sm"
                className="bg-youtube-red hover:bg-youtube-red/80 text-white"
              >
                <Zap className="h-4 w-4 mr-1" />
                Analisar
              </Button>
            )}
            {showSaveButton && onSave && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
                className={`${isSaved ? 'text-red-500' : 'text-youtube-gray'} hover:text-red-400`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-youtube-gray hover:text-youtube-red"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {!analysis ? (
          <div className="flex items-center justify-center py-6">
            <p className="text-youtube-gray font-roboto">Clique em "Analisar" para ver os resultados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Informações de Contato */}
            {(analysis.socialMedia.email || analysis.socialMedia.instagram || analysis.socialMedia.tiktok || analysis.socialMedia.website) && (
              <div className="bg-youtube-dark/30 border border-youtube-red/20 rounded-lg p-3">
                <h4 className="text-youtube-white font-semibold text-sm mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-youtube-red" />
                  Informações de Contato
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {analysis.socialMedia.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-youtube-gray" />
                      <span className="text-youtube-white truncate">{analysis.socialMedia.email}</span>
                    </div>
                  )}
                  {analysis.socialMedia.instagram && (
                    <div className="flex items-center gap-1">
                      <Instagram className="h-3 w-3 text-youtube-gray" />
                      <span className="text-youtube-white truncate">Instagram</span>
                    </div>
                  )}
                  {analysis.socialMedia.tiktok && (
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 bg-youtube-gray rounded-sm" />
                      <span className="text-youtube-white truncate">TikTok</span>
                    </div>
                  )}
                  {analysis.socialMedia.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-youtube-gray" />
                      <span className="text-youtube-white truncate">Website</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="bg-youtube-dark/30 border border-youtube-red/20 rounded-lg p-3">
              <h4 className="text-youtube-white font-semibold text-sm mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-youtube-red" />
                Análise de Parceria
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className={`font-bold ${getScoreColor(analysis.partnershipScore.audienceSize * 4)}`}>
                    {analysis.partnershipScore.audienceSize}
                  </div>
                  <div className="text-youtube-gray">Audiência</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${getScoreColor(analysis.partnershipScore.engagement * 4)}`}>
                    {analysis.partnershipScore.engagement}
                  </div>
                  <div className="text-youtube-gray">Engajamento</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${getScoreColor(analysis.partnershipScore.reachability * 6.67)}`}>
                    {analysis.partnershipScore.reachability}
                  </div>
                  <div className="text-youtube-gray">Contato</div>
                </div>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-youtube-dark/30 border border-youtube-red/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-youtube-red" />
                  <span className="text-youtube-white font-semibold text-sm">Audiência</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-youtube-gray">Inscritos:</span>
                    <span className="text-youtube-white font-bold">{formatNumber(analysis.audienciaSize.inscritos)}</span>
                  </div>
                  <Badge className={`${getClassificationColor(analysis.audienciaSize.classificacao)} text-white text-xs`}>
                    {analysis.audienciaSize.classificacao}
                  </Badge>
                </div>
              </div>

              <div className="bg-youtube-dark/30 border border-youtube-red/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-youtube-red" />
                  <span className="text-youtube-white font-semibold text-sm">Engajamento</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-youtube-gray">Taxa:</span>
                    <span className="text-youtube-white font-bold">{analysis.engajamento.taxaEngajamento.toFixed(1)}%</span>
                  </div>
                  <Badge className={`${getClassificationColor(analysis.engajamento.classificacao)} text-white text-xs`}>
                    {analysis.engajamento.classificacao}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
