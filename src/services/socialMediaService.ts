
import { SocialMediaInfo } from '@/types/analysis';

export class SocialMediaService {
  static async extractSocialMediaInfo(channelData: any): Promise<SocialMediaInfo> {
    const description = channelData.snippet.description || '';
    const customUrl = channelData.snippet.customUrl || '';
    const socialInfo: SocialMediaInfo = {};

    try {
      // Buscar Instagram
      const instagramRegex = /(?:instagram\.com\/|@)([a-zA-Z0-9._]+)/gi;
      const instagramMatch = description.match(instagramRegex);
      if (instagramMatch) {
        const username = instagramMatch[0].replace(/instagram\.com\/|@/gi, '');
        socialInfo.instagram = `https://instagram.com/${username}`;
      }

      // Buscar TikTok
      const tiktokRegex = /(?:tiktok\.com\/|@)([a-zA-Z0-9._]+)/gi;
      const tiktokMatch = description.match(tiktokRegex);
      if (tiktokMatch) {
        const username = tiktokMatch[0].replace(/tiktok\.com\/|@/gi, '');
        socialInfo.tiktok = `https://tiktok.com/@${username}`;
      }

      // Buscar email (já implementado no serviço principal)
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const emailMatch = description.match(emailRegex);
      if (emailMatch) {
        socialInfo.email = emailMatch[0];
      }

      // Buscar website
      const websiteRegex = /https?:\/\/(?!(?:youtube|youtu\.be|instagram|tiktok))[^\s]+/gi;
      const websiteMatch = description.match(websiteRegex);
      if (websiteMatch) {
        socialInfo.website = websiteMatch[0];
      }

      console.log('Redes sociais encontradas:', socialInfo);
      return socialInfo;
    } catch (error) {
      console.error('Erro ao extrair informações de redes sociais:', error);
      return socialInfo;
    }
  }

  static calculatePartnershipScore(channelData: any, socialInfo: SocialMediaInfo, stats: any): { score: number; breakdown: any } {
    const inscritos = parseInt(stats.subscriberCount || '0');
    const views = parseInt(stats.viewCount || '0');
    const videos = parseInt(stats.videoCount || '1');
    
    // Pontuação base por tamanho da audiência (0-25 pontos)
    let audienceScore = 0;
    if (inscritos >= 1000000) audienceScore = 25;
    else if (inscritos >= 500000) audienceScore = 22;
    else if (inscritos >= 100000) audienceScore = 20;
    else if (inscritos >= 50000) audienceScore = 15;
    else if (inscritos >= 10000) audienceScore = 10;
    else if (inscritos >= 1000) audienceScore = 5;

    // Pontuação por engajamento (0-25 pontos)
    const avgViewsPerVideo = views / videos;
    const engagementRate = (avgViewsPerVideo / inscritos) * 100;
    let engagementScore = 0;
    if (engagementRate >= 10) engagementScore = 25;
    else if (engagementRate >= 5) engagementScore = 20;
    else if (engagementRate >= 2) engagementScore = 15;
    else if (engagementRate >= 1) engagementScore = 10;
    else engagementScore = 5;

    // Pontuação por consistência (0-20 pontos)
    const consistencyScore = videos >= 50 ? 20 : videos >= 20 ? 15 : videos >= 10 ? 10 : 5;

    // Pontuação por qualidade do conteúdo (0-15 pontos)
    const description = channelData.snippet.description || '';
    let contentScore = 5; // Base
    if (description.length > 100) contentScore += 5;
    if (channelData.snippet.thumbnails?.high) contentScore += 5;

    // Pontuação por alcançabilidade (0-15 pontos)
    let reachabilityScore = 0;
    if (socialInfo.email) reachabilityScore += 5;
    if (socialInfo.instagram) reachabilityScore += 3;
    if (socialInfo.tiktok) reachabilityScore += 3;
    if (socialInfo.website) reachabilityScore += 4;

    const totalScore = audienceScore + engagementScore + consistencyScore + contentScore + reachabilityScore;

    return {
      score: Math.min(100, totalScore),
      breakdown: {
        overall: Math.min(100, totalScore),
        audienceSize: audienceScore,
        engagement: engagementScore,
        consistency: consistencyScore,
        content: contentScore,
        reachability: reachabilityScore
      }
    };
  }
}
