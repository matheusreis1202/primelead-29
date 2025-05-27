
import { useState } from 'react';
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
  HeadphonesIcon
} from 'lucide-react';

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState('trimestral');

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Economia de tempo",
      description: "Pare de gastar entre 2 a 5 horas diárias procurando canais manualmente."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Leads qualificados",
      description: "Nosso sistema filtra automaticamente apenas os canais que fazem sentido para o seu negócio."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Canais com engajamento",
      description: "Nossa tecnologia analisa dados reais para que você foque em parcerias que realmente tragam resultado."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Parcerias estratégicas",
      description: "Chega de perder tempo com parcerias sem potencial. Foque apenas no que converte."
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
      badge: "TOP #3",
      subscribers: "675.0K",
      views: "209.7M",
      engagement: "31059.3%",
      description: "Canal de matemática com altíssimo engajamento"
    },
    {
      name: "Cortes de Matemática e Física", 
      score: "100/100",
      badge: "TOP #1",
      subscribers: "479.0K",
      views: "143.9M", 
      engagement: "30044.6%",
      description: "Canal de cortes educacionais premium"
    },
    {
      name: "Je Lindsay",
      score: "100/100", 
      badge: "TOP #2",
      subscribers: "809.0K",
      views: "316.1M",
      engagement: "39074.0%",
      description: "Maior blogueira educacional do Brasil"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20">
              <Target className="h-10 w-10 text-white" />
            </div>
            
            <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Nova Era da Captação
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Pare de Perder Horas
              <span className="block text-green-400">Procurando Canais</span>
              <span className="block text-blue-200">no YouTube</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-4xl mx-auto">
              Automatize todo o processo de captação e foque no que realmente importa: crescer o seu negócio.
            </p>

            <p className="text-lg text-blue-200 mb-12 leading-relaxed max-w-4xl mx-auto">
              Apresentamos o <strong className="text-white">PrimeLead</strong>, a ferramenta definitiva que faz captações no YouTube de forma 100% automática. 
              Em poucos cliques, você encontra canais altamente qualificados, economizando horas do seu dia e aumentando a eficiência das suas parcerias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#planos">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group">
                  <span>Automatizar Captações Agora</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#demonstracao">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                  <Play className="h-5 w-5 mr-2" />
                  Ver Demonstração
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Por que usar o PrimeLead?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme a maneira como você encontra e qualifica canais no YouTube
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Simples, rápido e eficiente
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Demos Section */}
      <section id="demonstracao" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Canais <span className="text-green-600">Premium</span> Encontrados
            </h2>
            <p className="text-xl text-gray-600">
              Ranqueados por algoritmo de performance avançado
            </p>
            <Badge className="mt-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              50 canais descobertos
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {channelDemos.map((channel, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white overflow-hidden relative hover:shadow-xl transition-shadow">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    {channel.badge}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{channel.score}</div>
                      <div className="text-sm text-green-500 font-medium">PREMIUM</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{channel.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-600">Inscritos</span>
                      </div>
                      <span className="font-bold text-gray-800">{channel.subscribers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-600">Visualizações</span>
                      </div>
                      <span className="font-bold text-gray-800">{channel.views}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">Engajamento</span>
                      </div>
                      <span className="font-bold text-green-600">{channel.engagement}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Acessar Canal
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ver Contatos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600">
              Planos flexíveis para todas as necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative overflow-hidden transition-all hover:shadow-xl ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2 font-semibold">
                    MAIS POPULAR
                  </div>
                )}
                
                <CardContent className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    {plan.name === "Plano Trimestral" && (
                      <p className="text-sm text-gray-600">Mais economia e recursos extras para quem precisa de captações constantes.</p>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href={plan.link} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full h-12 font-semibold rounded-xl transition-all ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Para quem é o PrimeLead?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <p className="text-gray-700">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Chega de perder tempo e oportunidades
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              Você ainda vai continuar gastando 2 a 5 horas por dia tentando encontrar canais, sem nenhuma garantia de resultado?
            </p>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              Vai continuar fechando parcerias com canais sem engajamento e que não geram retorno?
            </p>
            <p className="text-xl text-green-300 font-semibold leading-relaxed">
              Com o PrimeLead, você vira o jogo: automatize, qualifique e aumente a eficiência das suas captações.
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-8">Garanta agora o seu acesso</h3>
            <p className="text-lg text-blue-200 mb-8">
              Escolha o plano que mais se encaixa com a sua necessidade, comece a automatizar as suas captações hoje mesmo 
              e transforme a maneira como você encontra canais no YouTube.
            </p>
          </div>
          
          <a href="https://pay.kiwify.com.br/ITTB1iC" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all group mb-6">
              <span>Quero automatizar minhas captações agora</span>
              <Rocket className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </a>
          
          <div className="flex items-center justify-center gap-8 text-blue-200 text-sm">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Setup em 2min</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span>Garantia 30 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">PrimeLead</h3>
          <p className="text-gray-400 mb-6">
            A única IA que encontra canais premium automaticamente
          </p>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
            © 2024 PrimeLead. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sales;
