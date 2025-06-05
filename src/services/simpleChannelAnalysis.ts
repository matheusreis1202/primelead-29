
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
  videoCount: number;
  publishedAt: string;
}

interface AnalysisResult {
  channelId: string;
  title: string;
  score: number;
  classificacao: string;
  metrics: {
    views_por_video: number;
    engajamento_percent: number;
    frequencia_mensal: number;
    inscritos: number;
    crescimento_mensal: number;
  };
}

function calcularScore(canal: {
  viewsPorVideo: number;
  engajamento: number;
  frequenciaMensal: number;
  inscritos: number;
  crescimentoMensal: number;
}) {
  let score = 0;

  // 📈 Views por Vídeo (30 pts)
  if (canal.viewsPorVideo >= 30000) score += 30;
  else if (canal.viewsPorVideo >= 10000) score += 20;
  else if (canal.viewsPorVideo >= 5000) score += 10;
  else if (canal.viewsPorVideo < 3000) score += 5;

  // ❤️ Engajamento (25 pts)
  if (canal.engajamento >= 0.10) score += 25;
  else if (canal.engajamento >= 0.05) score += 15;
  else if (canal.engajamento < 0.03) score += 5;

  // 📅 Frequência de Publicação (20 pts)
  if (canal.frequenciaMensal >= 4) score += 20;
  else if (canal.frequenciaMensal >= 2) score += 10;
  else if (canal.frequenciaMensal < 1) score += 5;

  // 👥 Inscritos (15 pts)
  if (canal.inscritos >= 1000000) score += 15;
  else if (canal.inscritos >= 500000) score += 12;
  else if (canal.inscritos >= 100000) score += 10;
  else if (canal.inscritos >= 10000) score += 5;
  else if (canal.inscritos < 5000) score += 2;

  // 🚀 Crescimento Mensal de Inscritos (10 pts)
  if (canal.crescimentoMensal >= 10000) score += 10;
  else if (canal.crescimentoMensal >= 1000) score += 5;
  else if (canal.crescimentoMensal < 500) score += 0;

  return score;
}

function gerarTag(score: number) {
  if (score >= 80) return { tag: "Excelente", cor: "green" };
  else if (score >= 60) return { tag: "Promissor", cor: "blue" };
  else return { tag: "Fraco", cor: "red" };
}

export function analisarCanal(dadosCanal: ChannelData, videosRecentes: VideoData[] = []): AnalysisResult {
  const hoje = new Date();
  const dataCriacao = new Date(dadosCanal.publishedAt);
  const mesesAtivo = Math.max((hoje.getTime() - dataCriacao.getTime()) / (1000 * 60 * 60 * 24 * 30), 1);

  // Calcular métricas baseadas nos dados disponíveis
  const viewsPorVideo = dadosCanal.videoCount > 0 ? dadosCanal.viewCount / dadosCanal.videoCount : 0;
  
  // Frequência de postagem estimada
  const frequenciaMensal = dadosCanal.videoCount / mesesAtivo;
  
  // Engajamento médio estimado (mock baseado em dados típicos)
  const ultimosVideos = videosRecentes.slice(0, 5);
  let totalLikes = 0;
  let totalComments = 0;
  let totalViews = 0;

  if (ultimosVideos.length > 0) {
    ultimosVideos.forEach(video => {
      totalLikes += video.likeCount || 0;
      totalComments += video.commentCount || 0;
      totalViews += video.viewCount || 1;
    });
  } else {
    // Estimativa baseada em dados típicos do YouTube
    totalViews = viewsPorVideo * 5;
    totalLikes = totalViews * 0.03; // ~3% de like rate típico
    totalComments = totalViews * 0.005; // ~0.5% de comment rate típico
  }

  const engajamento = totalViews > 0 ? (totalLikes + totalComments) / totalViews : 0.03;
  
  // Crescimento mensal estimado
  const crescimentoMensal = dadosCanal.subscriberCount / mesesAtivo;

  // Usar o novo sistema de scoring
  const dadosParaScore = {
    viewsPorVideo: Math.round(viewsPorVideo),
    engajamento: engajamento,
    frequenciaMensal: Math.round(frequenciaMensal),
    inscritos: dadosCanal.subscriberCount,
    crescimentoMensal: Math.round(crescimentoMensal)
  };

  const score = calcularScore(dadosParaScore);
  const resultado = gerarTag(score);

  // Mapear as tags para as classificações existentes
  let classificacao = "";
  if (resultado.tag === "Excelente") classificacao = "Excelente para parceria";
  else if (resultado.tag === "Promissor") classificacao = "Canal promissor";
  else classificacao = "Canal fraco para parcerias";

  return {
    channelId: dadosCanal.id,
    title: dadosCanal.title,
    score,
    classificacao,
    metrics: {
      views_por_video: Math.round(viewsPorVideo),
      engajamento_percent: parseFloat((engajamento * 100).toFixed(2)),
      frequencia_mensal: Math.round(frequenciaMensal),
      inscritos: dadosCanal.subscriberCount,
      crescimento_mensal: Math.round(crescimentoMensal)
    }
  };
}
