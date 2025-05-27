
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
  Youtube,
  Award,
  Rocket
} from 'lucide-react';

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const features = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Prospecção Inteligente",
      description: "IA avançada que identifica os melhores canais para sua estratégia"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-600" />,
      title: "Análise de Performance",
      description: "Score exclusivo que classifica canais por potencial de conversão"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Base Premium",
      description: "Acesso a mais de 10.000 canais qualificados e atualizados"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      title: "Automação Completa",
      description: "Filtragem automática por nicho, país, idioma e engajamento"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Marketing Director",
      company: "TechFlow",
      content: "Aumentamos nossa conversão em 300% usando o PrimeLead. A qualidade dos leads é excepcional!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Growth Manager",
      company: "StartupBR",
      content: "A ferramenta mais completa que já usei. O score dos canais é extremamente preciso.",
      rating: 5
    },
    {
      name: "Roberto Lima",
      role: "CEO",
      company: "DigitalMax",
      content: "ROI incrível! Economizamos 80% do tempo na prospecção e triplicamos os resultados.",
      rating: 5
    }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'R$ 97',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Até 500 buscas/mês',
        'Análise básica de canais',
        'Suporte por email',
        'Dashboard básico'
      ],
      color: 'from-gray-400 to-gray-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 197',
      period: '/mês',
      description: 'Mais escolhido pelos profissionais',
      features: [
        'Buscas ilimitadas',
        'Score premium com IA',
        'Suporte prioritário',
        'Dashboard avançado',
        'Exportação de dados',
        'Análise de concorrentes'
      ],
      color: 'from-blue-600 to-blue-800',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R$ 397',
      period: '/mês',
      description: 'Para equipes e agências',
      features: [
        'Tudo do Premium',
        'API dedicada',
        'Gerente de conta',
        'Treinamento personalizado',
        'Relatórios customizados',
        'Integração personalizada'
      ],
      color: 'from-purple-600 to-purple-800',
      popular: false
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "10.000+", label: "Canais Analisados" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "95%", label: "Taxa de Conversão" },
    { icon: <Award className="h-8 w-8" />, value: "500+", label: "Clientes Satisfeitos" },
    { icon: <Rocket className="h-8 w-8" />, value: "300%", label: "Aumento Médio de ROI" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20">
              <Target className="h-10 w-10 text-white" />
            </div>
            
            <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by AI Premium
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Transforme Leads em
              <span className="block text-green-400">Oportunidades Reais</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              A única plataforma de prospecção do YouTube que usa IA para identificar os canais com maior potencial de conversão. Resultados comprovados por mais de 500 empresas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/login">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group">
                  <span>Começar Gratuitamente</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                <Play className="h-5 w-5 mr-2" />
                Ver Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-white mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Por que o PrimeLead é Diferente?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa tecnologia de IA analisa milhões de dados para entregar apenas os leads mais qualificados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de empresas que transformaram suas vendas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-600">
              Comece gratuitamente e escale conforme sua necessidade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`border-0 shadow-lg relative overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-2 text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}>
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/login">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900' 
                          : 'bg-gray-800 hover:bg-gray-900'
                      } text-white py-3 rounded-xl font-semibold transition-all`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Transformar Sua Prospecção?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Junte-se a mais de 500 empresas que já descobriram o poder da prospecção inteligente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group">
                <span>Começar Gratuitamente</span>
                <Rocket className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-blue-200">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>Seguro e Confiável</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Setup em 2 minutos</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>7 dias grátis</span>
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
            A plataforma mais avançada de prospecção do YouTube
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Youtube className="h-5 w-5" />
            <span>Powered by YouTube Data API</span>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
            © 2024 PrimeLead. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sales;
