
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
  Play
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

  const getStatusColor = (aprovado: boolean) => {
    return aprovado ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (aprovado: boolean) => {
    return aprovado ? CheckCircle : XCircle;
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
          <div className="grid grid-cols-3 gap-4 text-center">
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
                Aprovados
              </div>
            </div>
            <div className="bg-youtube-dark p-4 rounded-lg border border-red-500">
              <div className="text-2xl font-bold text-red-400 font-roboto">
                {result.canaisAnalisados - result.canaisAprovados}
              </div>
              <div className="text-youtube-gray text-sm font-roboto">
                Reprovados
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

  return (
    <Card className={`tech-card ${borderColor}`}>
      <CardContent className="p-4">
        {/* Header com Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {channel.thumbnail && (
              <img 
                src={channel.thumbnail} 
                alt={channel.nome}
                className="w-10 h-10 rounded-lg border border-youtube-gray"
              />
            )}
            <div>
              <h4 className="font-bold text-youtube-white text-sm font-roboto line-clamp-1">
                {channel.nome}
              </h4>
              <p className="text-xs text-youtube-gray font-roboto">
                ID: {channel.id}
              </p>
            </div>
          </div>
          <StatusIcon className={`h-5 w-5 ${statusColor}`} />
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-youtube-dark p-2 rounded border border-youtube-red">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <Users className="h-3 w-3" />
              <span className="font-roboto">Inscritos</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {formatNumber(channel.inscritos)}
            </div>
          </div>
          
          <div className="bg-youtube-dark p-2 rounded border border-youtube-red">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <Eye className="h-3 w-3" />
              <span className="font-roboto">Views</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {formatNumber(channel.visualizacoesTotais)}
            </div>
          </div>

          <div className="bg-youtube-dark p-2 rounded border border-youtube-red">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <Video className="h-3 w-3" />
              <span className="font-roboto">Vídeos</span>
            </div>
            <div className="text-sm font-bold text-youtube-white font-roboto">
              {channel.totalVideos}
            </div>
          </div>

          <div className="bg-youtube-dark p-2 rounded border border-green-500">
            <div className="flex items-center gap-1 text-xs text-youtube-gray mb-1">
              <TrendingUp className="h-3 w-3" />
              <span className="font-roboto">Engajamento</span>
            </div>
            <div className="text-sm font-bold text-green-400 font-roboto">
              {channel.taxaEngajamento.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Uploads por Mês */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs bg-youtube-dark border-youtube-red text-youtube-white">
            {channel.uploadsPerMonth.toFixed(1)} uploads/mês
          </Badge>
        </div>

        {/* Palavras-chave encontradas */}
        {channel.palavrasChaveEncontradas.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-youtube-gray mb-1 font-roboto">Palavras-chave:</p>
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
          <div className="mb-3">
            <div className="flex items-center gap-1 text-xs text-red-400 mb-1">
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
          className="w-full futuristic-button text-xs py-2"
        >
          <a 
            href={`https://www.youtube.com/channel/${channel.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Play className="h-3 w-3 fill-current" />
            Ver Canal
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
