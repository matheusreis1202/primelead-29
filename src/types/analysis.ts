
export interface AnalysisFilters {
  apiKey: string;
  minInscritos: number;
  minVisualizacoes: number;
  minEngajamento: number;
  categoria?: string;
  pais?: string;
  idioma?: string;
  palavrasChave?: string;
  minUploadsPerMonth: number;
}

export interface ChannelDemographics {
  idadePredominante: string;
  generoPredominante: string;
  paisesTopAudiencia: string[];
}

export interface ChannelAnalysisData {
  id: string;
  nome: string;
  inscritos: number;
  visualizacoesTotais: number;
  totalVideos: number;
  taxaEngajamento: number;
  categoria?: string;
  pais?: string;
  idioma?: string;
  thumbnail: string;
  descricao: string;
  palavrasChaveEncontradas: string[];
  uploadsPerMonth: number;
  demographics: ChannelDemographics;
  emailContato?: string;
  aprovado: boolean;
  motivosReprovacao: string[];
  recomendacaoParceria: 'EXCELENTE' | 'BOM' | 'REGULAR' | 'RUIM';
  pontuacaoGeral: number;
}

export interface AnalysisResult {
  canaisAnalisados: number;
  canaisAprovados: number;
  canais: ChannelAnalysisData[];
}
