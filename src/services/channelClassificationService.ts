
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

    // Algoritmo de classificação inteligente melhorado
    let points = 0;

    // Score base (30% do peso)
    if (score >= 90) points += 30;
    else if (score >= 80) points += 27;
    else if (score >= 70) points += 24;
    else if (score >= 60) points += 20;
    else if (score >= 50) points += 15;
    else if (score >= 40) points += 10;
    else points += 5;

    // Engajamento (25% do peso)
    if (engagement >= 10) points += 25;
    else if (engagement >= 7) points += 22;
    else if (engagement >= 5) points += 18;
    else if (engagement >= 3) points += 14;
    else if (engagement >= 1) points += 10;
    else points += 5;

    // Taxa de visualização (20% do peso)
    if (viewRate >= 0.4) points += 20;
    else if (viewRate >= 0.3) points += 17;
    else if (viewRate >= 0.2) points += 14;
    else if (viewRate >= 0.1) points += 10;
    else if (viewRate >= 0.05) points += 6;
    else points += 2;

    // Crescimento (15% do peso)
    if (growth >= 30) points += 15;
    else if (growth >= 20) points += 13;
    else if (growth >= 10) points += 10;
    else if (growth >= 5) points += 7;
    else if (growth >= 2) points += 4;
    else points += 1;

    // Frequência de conteúdo (10% do peso)
    if (channel.monthlyVideos >= 12) points += 10;
    else if (channel.monthlyVideos >= 8) points += 8;
    else if (channel.monthlyVideos >= 4) points += 6;
    else if (channel.monthlyVideos >= 2) points += 4;
    else points += 2;

    // Determinar classificação com limites mais realistas
    if (points >= 80) return 'Premium Partner';
    if (points >= 65) return 'Alto Potencial';
    if (points >= 50) return 'Médio Potencial';
    if (points >= 35) return 'Baixo Potencial';
    return 'Em Análise';
  }

  static getClassificationColor(classification: string): string {
    switch (classification) {
      case 'Premium Partner': return '#10b981'; // green-500
      case 'Alto Potencial': return '#3b82f6'; // blue-500
      case 'Médio Potencial': return '#eab308'; // yellow-500
      case 'Baixo Potencial': return '#f97316'; // orange-500
      case 'Em Análise': return '#6b7280'; // gray-500
      default: return '#6b7280';
    }
  }

  static calculateQualityScore(channel: ChannelData): number {
    const engagement = parseFloat(channel.engagement) || 0;
    const viewRate = channel.subscribers > 0 ? channel.avgViews / channel.subscribers : 0;
    const growth = parseFloat(channel.subGrowth) || 0;
    const frequency = channel.monthlyVideos || 0;

    // Calcular score de qualidade baseado em múltiplos fatores (0-100)
    const engagementScore = Math.min(engagement * 8, 25); // máximo 25 pontos
    const viewRateScore = Math.min(viewRate * 80, 25); // máximo 25 pontos
    const growthScore = Math.min(growth * 0.8, 20); // máximo 20 pontos
    const frequencyScore = Math.min(frequency * 1.5, 15); // máximo 15 pontos
    const baseScore = Math.min(channel.score * 0.15, 15); // máximo 15 pontos

    return Math.round(engagementScore + viewRateScore + growthScore + frequencyScore + baseScore);
  }
}
