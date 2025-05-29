
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Users, 
  Eye, 
  Video, 
  TrendingUp,
  ExternalLink,
  AlertTriangle,
  Play,
  Mail,
  Target,
  UserCheck,
  Calendar
} from 'lucide-react';
import { AnalysisResult, ChannelAnalysisData } from '@/types/analysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getRecommendationColor = (recomendacao: string) => {
    switch (recomendacao) {
      case 'EXCELENTE': return 'text-green-400 border-green-500';
      case 'BOM': return 'text-blue-400 border-blue-500';
      case 'REGULAR': return 'text-yellow-400 border-yellow-500';
      case 'RUIM': return 'text-red-400 border-red-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const canaisAprovados = result.canais.filter(c => c.aprovado);
  const canaisReprovados = result.canais.filter(c => !c.aprovado);

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="text-youtube-white font-roboto">
            📊 Resumo da Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-youtube-dark p-4 rounded-lg border border-youtube-red">
              <div className="text-2xl font-bold text-youtube-white font-roboto">
                {result.canaisAnalisados}
              </div>
              <div className="text-youtube-gray text-sm font-roboto">
                Canais Analisados
              </div>
            </div>
            <div className="bg-youtube-dark p-4 rounded-lg border border-green-500">
              <div className="text-2xl font-bold text-green-400 font-roboto">
                {result.canaisAprovados}
              </div>
              <div className="text-youtube-gray text-sm font-roboto">
                Aprovados nos Filtros
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canais Aprovados */}
      {canaisAprovados.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4 font-roboto flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Canais Aprovados ({canaisAprovados.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {canaisAprovados.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}

      {/* Canais Reprovados */}
      {canaisReprovados.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-4 font-roboto flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Canais Reprovados ({canaisReprovados.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {canaisReprovados.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ChannelCard = ({ channel }: { channel: ChannelAnalysisData }) => {
  const StatusIcon = channel.aprovado ? CheckCircle : XCircle;
  const statusColor = channel.aprovado ? 'text-green-400' : 'text-red-400';
  const borderColor = channel.aprovado ? 'border-green-500' : 'border-red-500';

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getRecommendationColor = (recomendacao: string) => {
    switch (recomendacao) {
      case 'EXCELENTE': return 'bg-green-500';
      case 'BOM': return 'bg-blue-500';
      case 'REGULAR': return 'bg-yellow-500';
      case 'RUIM': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`tech-card ${borderColor}`}>
      <CardContent className="p-6">
        {/* Header com Status e Recomendação */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {channel.thumbnail && (
              <img 
                src={channel.thumbnail} 
                alt={channel.nome}
                className="w-12 h-12 rounded-lg border border-youtube-gray"
              />
            )}
            <div>
              <h4 className="font-bold text-youtube-white text-lg font-roboto">
                {channel.nome}
              </h4>
              <p className="text-sm text-youtube-gray font-roboto">
                ID: {channel.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getRecommendationColor(channel.recomendacaoParceria)} text-white font-roboto`}>
              {channel.recomendacaoParceria}
            </Badge>
            <StatusIcon className={`h-6 w-6 ${statusColor}`} />
          </div>
        </div>

        {/* Pontuação Geral */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-youtube-red" />
            <span className="text-sm font-semibold text-youtube-white font-roboto">
              Pontuação Geral: {channel.pontuacaoGeral}/100
            </span>
          </div>
          <div className="w-full bg-youtube-dark rounded-full h-2">
            <div 
              className="bg-youtube-red h-2 rounded-full transition-all duration-300"
              style={{ width: `${channel.pontuacaoGeral}%` }}
            ></div>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-youtube-dark p-3 rounded border border-youtube-red">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <Users className="h-3 w-3" />
              <span className="font-roboto">Inscritos</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {formatNumber(channel.inscritos)}
            </div>
          </div>
          
          <div className="bg-youtube-dark p-3 rounded border border-youtube-red">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <Eye className="h-3 w-3" />
              <span className="font-roboto">Views Totais</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {formatNumber(channel.visualizacoesTotais)}
            </div>
          </div>

          <div className="bg-youtube-dark p-3 rounded border border-green-500">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <TrendingUp className="h-3 w-3" />
              <span className="font-roboto">Engajamento</span>
            </div>
            <div className="text-sm font-bold text-green-400 font-roboto">
              {channel.taxaEngajamento.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Informações do Público */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-youtube-dark p-3 rounded border border-blue-500">
            <div className="flex items-center gap-1 text-xs text-blue-400 mb-1">
              <UserCheck className="h-3 w-3" />
              <span className="font-roboto">Faixa Etária</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {channel.demographics.idadePredominante}
            </div>
          </div>
          
          <div className="bg-youtube-dark p-3 rounded border border-purple-500">
            <div className="flex items-center gap-1 text-xs text-purple-400 mb-1">
              <Users className="h-3 w-3" />
              <span className="font-roboto">Gênero</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {channel.demographics.generoPredominante}
            </div>
          </div>
        </div>

        {/* Uploads e Email */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-youtube-dark p-3 rounded border border-yellow-500">
            <div className="flex items-center gap-1 text-xs text-yellow-400 mb-1">
              <Calendar className="h-3 w-3" />
              <span className="font-roboto">Uploads/Mês</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {channel.uploadsPerMonth.toFixed(1)}
            </div>
          </div>

          <div className="bg-youtube-dark p-3 rounded border border-green-500">
            <div className="flex items-center gap-1 text-xs text-green-400 mb-1">
              <Mail className="h-3 w-3" />
              <span className="font-roboto">Contato</span>
            </div>
            <div className="text-xs font-bold text-youtube-white font-roboto">
              {channel.emailContato ? (
                <a href={`mailto:${channel.emailContato}`} className="text-green-400 hover:underline">
                  {channel.emailContato}
                </a>
              ) : (
                <span className="text-red-400">Não encontrado</span>
              )}
            </div>
          </div>
        </div>

        {/* Palavras-chave encontradas */}
        {channel.palavrasChaveEncontradas.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-youtube-gray mb-2 font-roboto">Palavras-chave encontradas:</p>
            <div className="flex flex-wrap gap-1">
              {channel.palavrasChaveEncontradas.map((keyword, index) => (
                <Badge key={index} className="text-xs bg-youtube-red text-youtube-white">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Motivos de reprovação */}
        {!channel.aprovado && channel.motivosReprovacao.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-xs text-red-400 mb-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-roboto">Motivos da reprovação:</span>
            </div>
            <ul className="text-xs text-red-300 space-y-1 font-roboto">
              {channel.motivosReprovacao.map((motivo, index) => (
                <li key={index}>• {motivo}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Botão de ação */}
        <Button 
          asChild 
          className="w-full futuristic-button text-sm py-3"
        >
          <a 
            href={`https://www.youtube.com/channel/${channel.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4 fill-current" />
            Visualizar Canal no YouTube
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
