import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play,
  BarChart3,
  DollarSign,
  Clock,
  Shield,
  Sparkles,
  Award,
  Rocket,
  AlertCircle,
  ThumbsUp,
  Eye,
  MessageCircle,
  Crown,
  Filter,
  FileText,
  HeadphonesIcon,
  Timer,
  TrendingDown,
  AlertTriangle,
  LogIn
} from 'lucide-react';

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState('trimestral');

  const benefits = [
    {
      icon: <Clock className="h-7 w-7 text-emerald-500" />,
      title: "Economia de tempo",
      description: "Pare de gastar entre 2 a 5 horas diárias procurando canais manualmente.",
      highlight: "2-5 horas economizadas por dia"
    },
    {
      icon: <Target className="h-7 w-7 text-blue-500" />,
      title: "Leads qualificados",
      description: "Nosso sistema filtra automaticamente apenas os canais que fazem sentido para o seu negócio.",
      highlight: "100% qualificados"
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-emerald-500" />,
      title: "Canais com engajamento",
      description: "Nossa tecnologia analisa dados reais para que você foque em parcerias que realmente tragam resultado.",
      highlight: "Dados reais de performance"
    },
    {
      icon: <Users className="h-7 w-7 text-blue-500" />,
      title: "Parcerias estratégicas",
      description: "Chega de perder tempo com parcerias sem potencial. Foque apenas no que converte.",
      highlight: "Apenas parcerias que convertem"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Informe o nicho ou palavra-chave",
      description: "Digite o segmento que você deseja prospectar"
    },
    {
      number: "2", 
      title: "Deixe o sistema rodar automaticamente",
      description: "Nossa IA trabalha 24/7 analisando milhões de canais"
    },
    {
      number: "3",
      title: "Receba uma lista qualificada",
      description: "Canais com informações completas e dados de engajamento"
    }
  ];

  const plans = [
    {
      name: "Plano Mensal",
      price: "R$ 49,90",
      period: "/mês",
      features: [
        "Captação automática de até 100 canais por dia",
        "Filtros avançados por nicho e engajamento", 
        "Relatórios semanais de performance"
      ],
      link: "https://pay.kiwify.com.br/QtSaOUj",
      popular: false
    },
    {
      name: "Plano Trimestral",
      price: "R$ 97,90",
      period: "a cada 3 meses",
      features: [
        "Captação automática de até 200 canais por dia",
        "Filtros avançados e relatórios personalizados",
        "Acesso prioritário a novas funcionalidades"
      ],
      link: "https://pay.kiwify.com.br/ITTB1iC",
      popular: true
    },
    {
      name: "Plano Anual", 
      price: "R$ 199,90",
      period: "por ano",
      features: [
        "Captação automática de até 500 canais por dia",
        "Filtros avançados, relatórios personalizados e análises preditivas",
        "Suporte prioritário",
        "Acesso antecipado a todas as atualizações"
      ],
      link: "https://pay.kiwify.com.br/mfa2MD9",
      popular: false
    }
  ];

  const targetAudience = [
    "Empreendedores digitais que querem fechar parcerias com canais relevantes",
    "Agências que precisam prospectar influenciadores de forma escalável", 
    "Produtores de conteúdo que buscam colaborações estratégicas",
    "Negócios que desejam captar leads qualificados no YouTube sem perder tempo"
  ];

  const channelDemos = [
    {
      name: "MARCEMÁTICA",
      score: "100/100",
      badge: "TOP #1",
      subscribers: "675.0K",
      views: "209.7M",
      engagement: "31059.3%",
      description: "Canal de matemática com altíssimo engajamento",
      quality: "premium"
    },
    {
      name: "Cortes de Matemática e Física", 
      score: "50/100",
      badge: "MÉDIO",
      subscribers: "479.0K",
      views: "143.9M", 
      engagement: "15044.6%",
      description: "Canal de cortes educacionais com engajamento médio",
      quality: "medium"
    },
    {
      name: "Canal Básico Edu",
      score: "10/100", 
      badge: "RUIM",
      subscribers: "89.0K",
      views: "16.1M",
      engagement: "2074.0%",
      description: "Canal educacional com baixo engajamento",
      quality: "poor"
    }
  ];

  const getChannelColors = (quality: string) => {
    switch(quality) {
      case 'premium': return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200' };
      case 'poor': return { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-200' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 hover:scale-110 transition-transform duration-300">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            
            <Badge className="mb-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white border-0 px-3 sm:px-4 py-2 text-sm sm:text-lg font-bold animate-pulse shadow-lg">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Nova Era da Captação
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Pare de Perder Horas
              <span className="block text-emerald-400">Procurando Canais</span>
              <span className="block text-blue-200">no YouTube</span>
            </h1>
            
            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Automatize todo o processo de captação e foque no que realmente importa: crescer o seu negócio.
            </p>

            <p className="text-sm sm:text-base text-blue-200 mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto">
              Apresentamos o <strong className="text-white">PrimeLead</strong>, a ferramenta definitiva que faz captações no YouTube de forma 100% automática. 
              Em poucos cliques, você encontra canais altamente qualificados, economizando horas do seu dia e aumentando a eficiência das suas parcerias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#planos">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group hover:scale-105">
                  <span>Automatizar Captações Agora</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all hover:scale-105"
                >
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* O que você está perdendo */}
      <section className="py-12 sm:py-16 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 flex items-center justify-center gap-3">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8" />
              O que você está perdendo AGORA
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="border-red-200 hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">2-5h</div>
                <div className="text-sm sm:text-base text-slate-600">Por dia procurando canais manualmente</div>
              </CardContent>
            </Card>
            <Card className="border-red-200 hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">80%</div>
                <div className="text-sm sm:text-base text-slate-600">Das parcerias não geram resultado</div>
              </CardContent>
            </Card>
            <Card className="border-red-200 hover:shadow-lg transition-all hover:scale-105 sm:col-span-2 md:col-span-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">R$ 300+</div>
                <div className="text-sm sm:text-base text-slate-600">Valor do seu tempo perdido por semana</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Por que usar o PrimeLead?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Transforme a maneira como você encontra e qualifica canais no YouTube
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all bg-white hover:scale-105 duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-2">{benefit.description}</p>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                        {benefit.highlight}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Como funciona?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Simples, rápido e eficiente
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                  {step.number}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Demos Section */}
      <section id="demonstracao" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Canais <span className="text-emerald-600">Premium</span> Encontrados
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-4">
              Ranqueados por algoritmo de performance avançado
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {channelDemos.map((channel, index) => {
              const colors = getChannelColors(channel.quality);
              return (
                <Card key={index} className="border-0 shadow-lg bg-white overflow-hidden relative hover:shadow-xl transition-all hover:scale-105 duration-300">
                  <div className="absolute top-4 right-4">
                    <Badge className={`${colors.bg} text-white px-2 sm:px-3 py-1 text-xs sm:text-sm`}>
                      {channel.badge}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                        {channel.quality === 'premium' && <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                        {channel.quality === 'medium' && <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                        {channel.quality === 'poor' && <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                      </div>
                      <div className="text-right">
                        <div className={`text-xl sm:text-2xl font-bold ${colors.text}`}>{channel.score}</div>
                        <div className={`text-xs ${colors.text} font-medium opacity-80`}>
                          {channel.quality === 'premium' && 'PREMIUM'}
                          {channel.quality === 'medium' && 'MÉDIO'}
                          {channel.quality === 'poor' && 'RUIM'}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">{channel.name}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mb-4">{channel.description}</p>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                          <span className="text-slate-600">Inscritos</span>
                        </div>
                        <span className="font-bold text-slate-800">{channel.subscribers}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                          <span className="text-slate-600">Visualizações</span>
                        </div>
                        <span className="font-bold text-slate-800">{channel.views}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.text}`} />
                          <span className="text-slate-600">Engajamento</span>
                        </div>
                        <span className={`font-bold ${colors.text}`}>{channel.engagement}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-2">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Acessar Canal
                      </Button>
                      <Button variant="outline" className="w-full text-xs sm:text-sm py-2">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Ver Contatos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Planos flexíveis para todas as necessidades
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative overflow-hidden transition-all hover:shadow-xl ${plan.popular ? 'ring-2 ring-blue-500 scale-105 hover:scale-110' : 'hover:scale-105'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2 font-semibold text-sm">
                    MAIS POPULAR
                  </div>
                )}
                
                <CardContent className={`p-4 sm:p-6 ${plan.popular ? 'pt-12 sm:pt-14' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                    <div className="mb-3">
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-slate-600 ml-1 text-sm sm:text-base">{plan.period}</span>
                    </div>
                    {plan.name === "Plano Trimestral" && (
                      <p className="text-xs sm:text-sm text-slate-600">Mais economia e recursos extras para quem precisa de captações constantes.</p>
                    )}
                  </div>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href={plan.link} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full h-10 font-semibold rounded-xl transition-all hover:scale-105 text-sm ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}>
                      Começar Agora
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Para quem é o PrimeLead?
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105">
                <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-slate-700">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-800 to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Chega de perder tempo e oportunidades
          </h2>
          
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-blue-100 mb-4 leading-relaxed">
              Você ainda vai continuar gastando 2 a 5 horas por dia tentando encontrar canais, sem nenhuma garantia de resultado?
            </p>
            <p className="text-base sm:text-lg text-blue-100 mb-4 leading-relaxed">
              Vai continuar fechando parcerias com canais sem engajamento e que não geram retorno?
            </p>
            <p className="text-base sm:text-lg text-emerald-300 font-semibold leading-relaxed">
              Com o PrimeLead, você vira o jogo: automatize, qualifique e aumente a eficiência das suas captações.
            </p>
          </div>
          
          <div className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Garanta agora o seu acesso</h3>
            <p className="text-sm sm:text-base text-blue-200 mb-6">
              Escolha o plano que mais se encaixa com a sua necessidade, comece a automatizar as suas captações hoje mesmo 
              e transforme a maneira como você encontra canais no YouTube.
            </p>
          </div>
          
          <a href="https://pay.kiwify.com.br/ITTB1iC" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all group mb-4 hover:scale-105">
              <span>Quero automatizar minhas captações agora</span>
              <Rocket className="h-4 w-4 sm:h-5 sm:w-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </a>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-blue-200 text-xs sm:text-sm">
            <div className="flex items-center">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span>Setup em 2min</span>
            </div>
            <div className="flex items-center">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span>Garantia 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-xl mb-4">
            <Target className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-3">PrimeLead</h3>
          <p className="text-sm sm:text-base text-slate-400 mb-4">
            A única IA que encontra canais premium automaticamente
          </p>
          <div className="mt-6 pt-6 border-t border-slate-800 text-slate-500 text-xs sm:text-sm">
            © 2024 PrimeLead. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sales;
