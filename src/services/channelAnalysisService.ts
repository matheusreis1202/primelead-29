
import { AnalysisFilters, ChannelAnalysisData, AnalysisResult, ChannelDemographics } from '@/types/analysis';

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

  private async extractContactEmail(channelData: any): Promise<string | undefined> {
    try {
      const description = channelData.snippet.description || '';
      const aboutSection = channelData.snippet.customUrl || '';
      
      // Buscar email na descrição usando regex
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const emailsFound = description.match(emailRegex);
      
      if (emailsFound && emailsFound.length > 0) {
        return emailsFound[0];
      }

      // Tentar buscar em seções comuns
      const commonEmailSections = [
        'contato:', 'contact:', 'email:', 'business:', 'parcerias:', 'partnerships:'
      ];
      
      for (const section of commonEmailSections) {
        const sectionIndex = description.toLowerCase().indexOf(section);
        if (sectionIndex !== -1) {
          const afterSection = description.substring(sectionIndex, sectionIndex + 100);
          const emailInSection = afterSection.match(emailRegex);
          if (emailInSection) {
            return emailInSection[0];
          }
        }
      }

      return undefined;
    } catch (error) {
      console.error('Erro ao extrair email:', error);
      return undefined;
    }
  }

  private estimateDemographics(channelData: any): ChannelDemographics {
    // Análise baseada no conteúdo e categoria do canal
    const categoria = channelData.snippet.categoryId;
    const titulo = channelData.snippet.title.toLowerCase();
    const descricao = (channelData.snippet.description || '').toLowerCase();
    const pais = channelData.snippet.country || 'BR';

    let idadePredominante = '18-34 anos';
    let generoPredominante = 'Misto';

    // Estimativas baseadas em palavras-chave e categoria
    if (titulo.includes('game') || titulo.includes('jogo') || categoria === '20') {
      idadePredominante = '13-24 anos';
      generoPredominante = 'Masculino (70%)';
    } else if (titulo.includes('beleza') || titulo.includes('moda') || titulo.includes('makeup')) {
      idadePredominante = '18-34 anos';
      generoPredominante = 'Feminino (80%)';
    } else if (titulo.includes('tech') || titulo.includes('tecnologia') || categoria === '28') {
      idadePredominante = '25-44 anos';
      generoPredominante = 'Masculino (65%)';
    } else if (titulo.includes('família') || titulo.includes('criança') || categoria === '19') {
      idadePredominante = '25-44 anos';
      generoPredominante = 'Feminino (60%)';
    } else if (titulo.includes('fitness') || titulo.includes('academia') || categoria === '17') {
      idadePredominante = '18-34 anos';
      generoPredominante = 'Misto';
    }

    return {
      idadePredominante,
      generoPredominante,
      paisesTopAudiencia: [pais, 'US', 'PT']
    };
  }

  private calculatePartnershipScore(channel: ChannelAnalysisData): { recomendacao: 'EXCELENTE' | 'BOM' | 'REGULAR' | 'RUIM', pontuacao: number } {
    let pontuacao = 0;

    // Critérios de pontuação
    if (channel.inscritos >= 100000) pontuacao += 25;
    else if (channel.inscritos >= 50000) pontuacao += 20;
    else if (channel.inscritos >= 10000) pontuacao += 15;
    else pontuacao += 5;

    if (channel.taxaEngajamento >= 5.0) pontuacao += 25;
    else if (channel.taxaEngajamento >= 3.0) pontuacao += 20;
    else if (channel.taxaEngajamento >= 1.0) pontuacao += 15;
    else pontuacao += 5;

    if (channel.uploadsPerMonth >= 4) pontuacao += 20;
    else if (channel.uploadsPerMonth >= 2) pontuacao += 15;
    else if (channel.uploadsPerMonth >= 1) pontuacao += 10;
    else pontuacao += 5;

    if (channel.emailContato) pontuacao += 15;
    
    if (channel.palavrasChaveEncontradas.length > 0) pontuacao += 15;

    let recomendacao: 'EXCELENTE' | 'BOM' | 'REGULAR' | 'RUIM';
    if (pontuacao >= 80) recomendacao = 'EXCELENTE';
    else if (pontuacao >= 60) recomendacao = 'BOM';
    else if (pontuacao >= 40) recomendacao = 'REGULAR';
    else recomendacao = 'RUIM';

    return { recomendacao, pontuacao };
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
      motivos.push(`Inscritos insuficientes (${channel.inscritos.toLocaleString()} < ${filters.minInscritos.toLocaleString()})`);
    }

    if (channel.visualizacoesTotais < filters.minVisualizacoes) {
      aprovado = false;
      motivos.push(`Visualizações insuficientes (${channel.visualizacoesTotais.toLocaleString()} < ${filters.minVisualizacoes.toLocaleString()})`);
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

        // Extrair email de contato
        const emailContato = await this.extractContactEmail(canal);

        // Estimar demografia
        const demographics = this.estimateDemographics(canal);

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
          demographics,
          emailContato,
          aprovado: false,
          motivosReprovacao: [],
          recomendacaoParceria: 'RUIM',
          pontuacaoGeral: 0
        };

        // Aplicar filtros
        const { aprovado, motivos } = this.applyFilters(channelAnalysis, filters);
        channelAnalysis.aprovado = aprovado;
        channelAnalysis.motivosReprovacao = motivos;

        // Calcular pontuação e recomendação
        const { recomendacao, pontuacao } = this.calculatePartnershipScore(channelAnalysis);
        channelAnalysis.recomendacaoParceria = recomendacao;
        channelAnalysis.pontuacaoGeral = pontuacao;

        canais.push(channelAnalysis);

      } catch (error) {
        console.error(`Erro ao analisar canal ${channelId}:`, error);
      }
    }

    return {
      canaisAnalisados: canais.length,
      canaisAprovados: canais.filter(c => c.aprovado).length,
      canais: canais.sort((a, b) => {
        // Ordenar por aprovados primeiro, depois por pontuação
        if (a.aprovado && !b.aprovado) return -1;
        if (!a.aprovado && b.aprovado) return 1;
        return b.pontuacaoGeral - a.pontuacaoGeral;
      })
    };
  }
}

export const channelAnalysisService = new ChannelAnalysisService();
