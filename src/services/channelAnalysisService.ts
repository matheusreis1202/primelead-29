
import { AnalysisFilters, ChannelAnalysisData, AnalysisResult } from '@/types/analysis';

export class ChannelAnalysisService {
  private async fetchChannelData(channelId: string, apiKey: string): Promise<any> {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;
    const response = await fetch(channelUrl);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do canal ${channelId}`);
    }
    return response.json();
  }

  private async getUploadsFrequency(uploadsPlaylistId: string, apiKey: string): Promise<number> {
    try {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
      const response = await fetch(playlistUrl);
      const data = await response.json();

      if (!data.items || data.items.length === 0) return 0;

      const videos = data.items;
      const dates = videos.map((video: any) => new Date(video.snippet.publishedAt));
      dates.sort((a: Date, b: Date) => b.getTime() - a.getTime());

      if (dates.length < 2) return 0;

      const daysDiff = (dates[0].getTime() - dates[dates.length - 1].getTime()) / (1000 * 60 * 60 * 24);
      const monthsDiff = daysDiff / 30;
      
      return monthsDiff > 0 ? videos.length / monthsDiff : 0;
    } catch (error) {
      console.error('Erro ao calcular frequência de uploads:', error);
      return 0;
    }
  }

  private findKeywords(text: string, keywords: string[]): string[] {
    const found: string[] = [];
    const textLower = text.toLowerCase();
    
    keywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        found.push(keyword);
      }
    });
    
    return found;
  }

  private applyFilters(channel: ChannelAnalysisData, filters: AnalysisFilters): { aprovado: boolean; motivos: string[] } {
    const motivos: string[] = [];
    let aprovado = true;

    if (channel.inscritos < filters.minInscritos) {
      aprovado = false;
      motivos.push(`Inscritos insuficientes (${channel.inscritos} < ${filters.minInscritos})`);
    }

    if (channel.visualizacoesTotais < filters.minVisualizacoes) {
      aprovado = false;
      motivos.push(`Visualizações insuficientes (${channel.visualizacoesTotais} < ${filters.minVisualizacoes})`);
    }

    if (channel.taxaEngajamento < filters.minEngajamento) {
      aprovado = false;
      motivos.push(`Engajamento baixo (${channel.taxaEngajamento.toFixed(1)}% < ${filters.minEngajamento}%)`);
    }

    if (channel.uploadsPerMonth < filters.minUploadsPerMonth) {
      aprovado = false;
      motivos.push(`Frequência de uploads baixa (${channel.uploadsPerMonth.toFixed(1)} < ${filters.minUploadsPerMonth} por mês)`);
    }

    if (filters.pais && channel.pais !== filters.pais) {
      aprovado = false;
      motivos.push(`País não corresponde (${channel.pais} ≠ ${filters.pais})`);
    }

    if (filters.palavrasChave && channel.palavrasChaveEncontradas.length === 0) {
      aprovado = false;
      motivos.push('Palavras-chave não encontradas');
    }

    return { aprovado, motivos };
  }

  async analyzeChannels(channelIds: string[], filters: AnalysisFilters): Promise<AnalysisResult> {
    const canais: ChannelAnalysisData[] = [];
    const keywords = filters.palavrasChave ? filters.palavrasChave.split(',').map(k => k.trim()) : [];

    for (const channelId of channelIds) {
      try {
        console.log(`Analisando canal: ${channelId}`);
        
        const channelData = await this.fetchChannelData(channelId.trim(), filters.apiKey);
        
        if (!channelData.items || channelData.items.length === 0) {
          console.warn(`Canal ${channelId} não encontrado`);
          continue;
        }

        const canal = channelData.items[0];
        const stats = canal.statistics;
        const snippet = canal.snippet;
        
        const inscritos = parseInt(stats.subscriberCount || '0');
        const visualizacoesTotais = parseInt(stats.viewCount || '0');
        const totalVideos = parseInt(stats.videoCount || '1');
        
        const taxaEngajamento = totalVideos > 0 ? (visualizacoesTotais / totalVideos / inscritos) * 100 : 0;
        
        // Buscar frequência de uploads
        const uploadsPlaylistId = canal.contentDetails?.relatedPlaylists?.uploads;
        const uploadsPerMonth = uploadsPlaylistId ? 
          await this.getUploadsFrequency(uploadsPlaylistId, filters.apiKey) : 0;

        // Buscar palavras-chave
        const descricaoCompleta = `${snippet.title} ${snippet.description}`;
        const palavrasChaveEncontradas = keywords.length > 0 ? 
          this.findKeywords(descricaoCompleta, keywords) : [];

        const channelAnalysis: ChannelAnalysisData = {
          id: canal.id,
          nome: snippet.title,
          inscritos,
          visualizacoesTotais,
          totalVideos,
          taxaEngajamento,
          categoria: snippet.categoryId,
          pais: snippet.country,
          idioma: snippet.defaultLanguage,
          thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
          descricao: snippet.description || '',
          palavrasChaveEncontradas,
          uploadsPerMonth,
          aprovado: false,
          motivosReprovacao: []
        };

        // Aplicar filtros
        const { aprovado, motivos } = this.applyFilters(channelAnalysis, filters);
        channelAnalysis.aprovado = aprovado;
        channelAnalysis.motivosReprovacao = motivos;

        canais.push(channelAnalysis);

      } catch (error) {
        console.error(`Erro ao analisar canal ${channelId}:`, error);
      }
    }

    return {
      canaisAnalisados: canais.length,
      canaisAprovados: canais.filter(c => c.aprovado).length,
      canais: canais.sort((a, b) => {
        // Ordenar por aprovados primeiro, depois por engajamento
        if (a.aprovado && !b.aprovado) return -1;
        if (!a.aprovado && b.aprovado) return 1;
        return b.taxaEngajamento - a.taxaEngajamento;
      })
    };
  }
}

export const channelAnalysisService = new ChannelAnalysisService();
