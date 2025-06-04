
interface ChannelData {
  id?: string;
  name: string;
  subscribers: number;
  avgViews: number;
  engagement: string;
  score: number;
  monthlyVideos: number;
  subGrowth: string;
}

export class ChannelClassificationService {
  static classifyChannel(channel: ChannelData): string {
    const score = channel.score;
    const subscribers = channel.subscribers;
    const engagement = parseFloat(channel.engagement) || 0;
    const viewRate = subscribers > 0 ? channel.avgViews / subscribers : 0;
    const growth = parseFloat(channel.subGrowth) || 0;

    // Algoritmo de classificação inteligente
    let points = 0;

    // Score base (40% do peso)
    if (score >= 90) points += 40;
    else if (score >= 80) points += 35;
    else if (score >= 70) points += 30;
    else if (score >= 60) points += 25;
    else if (score >= 50) points += 20;
    else points += 10;

    // Engajamento (25% do peso)
    if (engagement >= 8) points += 25;
    else if (engagement >= 6) points += 20;
    else if (engagement >= 4) points += 15;
    else if (engagement >= 2) points += 10;
    else points += 5;

    // Taxa de visualização (20% do peso)
    if (viewRate >= 0.3) points += 20;
    else if (viewRate >= 0.2) points += 15;
    else if (viewRate >= 0.1) points += 10;
    else if (viewRate >= 0.05) points += 5;

    // Crescimento (15% do peso)
    if (growth >= 20) points += 15;
    else if (growth >= 10) points += 12;
    else if (growth >= 5) points += 8;
    else if (growth >= 2) points += 5;

    // Determinar classificação
    if (points >= 85) return 'Premium Partner';
    if (points >= 70) return 'Alto Potencial';
    if (points >= 55) return 'Médio Potencial';
    if (points >= 40) return 'Baixo Potencial';
    return 'Em Análise';
  }

  static getClassificationColor(classification: string): string {
    switch (classification) {
      case 'Premium Partner': return '#FFD700';
      case 'Alto Potencial': return '#00FF00';
      case 'Médio Potencial': return '#FFA500';
      case 'Baixo Potencial': return '#FF6B6B';
      case 'Em Análise': return '#AAAAAA';
      default: return '#AAAAAA';
    }
  }

  static calculateQualityScore(channel: ChannelData): number {
    const engagement = parseFloat(channel.engagement) || 0;
    const viewRate = channel.subscribers > 0 ? channel.avgViews / channel.subscribers : 0;
    const growth = parseFloat(channel.subGrowth) || 0;
    const frequency = channel.monthlyVideos || 0;

    // Calcular score de qualidade baseado em múltiplos fatores
    const engagementScore = Math.min(engagement * 10, 30);
    const viewRateScore = Math.min(viewRate * 100, 25);
    const growthScore = Math.min(growth, 20);
    const frequencyScore = Math.min(frequency * 2.5, 15);
    const baseScore = Math.min(channel.score * 0.1, 10);

    return Math.round(engagementScore + viewRateScore + growthScore + frequencyScore + baseScore);
  }
}
