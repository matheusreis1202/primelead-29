
interface VideoData {
  publishedAt: string;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
}

interface ChannelData {
  id: string;
  title: string;
  subscriberCount: number;
  viewCount: number;
  publishedAt: string;
}

interface AnalysisResult {
  channelId: string;
  title: string;
  score: number;
  classificacao: string;
  metrics: {
    crescimento_subs_mes: number;
    views_totais: number;
    engajamento_percent: number;
    videos_mes: number;
    canal_ativo_ha_meses: number;
  };
}

export function analisarCanal(dadosCanal: ChannelData, videosRecentes: VideoData[] = []): AnalysisResult {
  const hoje = new Date();
  const dataCriacao = new Date(dadosCanal.publishedAt);
  const diasAtivo = Math.floor((hoje.getTime() - dataCriacao.getTime()) / (1000 * 60 * 60 * 24));
  const mesesAtivo = Math.max(diasAtivo / 30, 1); // evita divisão por zero

  // Crescimento
  const crescimentoSubs = dadosCanal.subscriberCount / mesesAtivo;
  const crescimentoViews = dadosCanal.viewCount / mesesAtivo;

  // Frequência de postagem
  const ultimos30Dias = new Date();
  ultimos30Dias.setDate(ultimos30Dias.getDate() - 30);
  const videos30Dias = videosRecentes.filter(video => new Date(video.publishedAt) > ultimos30Dias);
  const videosPorMes = videos30Dias.length;

  // Engajamento médio nos últimos vídeos
  const ultimosVideos = videosRecentes.slice(0, 5);
  let totalLikes = 0;
  let totalComments = 0;
  let totalViews = 0;

  ultimosVideos.forEach(video => {
    totalLikes += video.likeCount || 0;
    totalComments += video.commentCount || 0;
    totalViews += video.viewCount || 1; // evita divisão por zero
  });

  const likeRate = totalViews > 0 ? totalLikes / totalViews : 0;
  const commentRate = totalViews > 0 ? totalComments / totalViews : 0;
  const engajamentoPercent = (likeRate + commentRate) * 100;

  // Score
  let score = 0;

  // Crescimento (25%)
  if (crescimentoSubs >= 1000) score += 25;
  else if (crescimentoSubs >= 500) score += 20;
  else if (crescimentoSubs >= 200) score += 15;
  else score += 5;

  // Frequência (20%)
  if (videosPorMes >= 4) score += 20;
  else if (videosPorMes >= 2) score += 10;
  else score += 5;

  // Engajamento (30%)
  if (engajamentoPercent >= 2) score += 30;
  else if (engajamentoPercent >= 1) score += 20;
  else score += 10;

  // Views totais (15%)
  if (dadosCanal.viewCount >= 1000000) score += 15;
  else if (dadosCanal.viewCount >= 500000) score += 10;
  else score += 5;

  // Antiguidade (10%)
  if (mesesAtivo >= 12) score += 10;
  else if (mesesAtivo >= 6) score += 5;

  // Classificação
  let classificacao = "";
  if (score >= 80) classificacao = "Excelente para parceria";
  else if (score >= 60) classificacao = "Canal promissor";
  else if (score >= 40) classificacao = "Canal regular";
  else classificacao = "Canal fraco para parcerias";

  return {
    channelId: dadosCanal.id,
    title: dadosCanal.title,
    score,
    classificacao,
    metrics: {
      crescimento_subs_mes: Math.round(crescimentoSubs),
      views_totais: dadosCanal.viewCount,
      engajamento_percent: parseFloat(engajamentoPercent.toFixed(2)),
      videos_mes: videosPorMes,
      canal_ativo_ha_meses: Math.floor(mesesAtivo)
    }
  };
}
