
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
  MessageCircle
} from 'lucide-react';

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const objections = [
    {
      objection: "Não tenho tempo para prospectar canais",
      solution: "Nossa IA faz tudo automaticamente",
      description: "Em apenas 2 minutos você configura sua busca e nossa IA trabalha 24/7 encontrando os melhores canais para você.",
      icon: <Clock className="h-8 w-8 text-green-500" />,
      stats: "Economia de 80% do tempo"
    },
    {
      objection: "Não sei avaliar se um canal é bom",
      solution: "Score Premium 100/100 com IA",
      description: "Nosso algoritmo analisa milhões de dados e entrega um score preciso de 0 a 100 para cada canal.",
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      stats: "95% de precisão"
    },
    {
      objection: "É muito caro para minha empresa",
      solution: "ROI comprovado de 300%",
      description: "Nossos clientes recuperam o investimento em menos de 30 dias com os leads qualificados.",
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      stats: "ROI de 300%"
    },
    {
      objection: "Não confio em ferramentas automáticas",
      solution: "Dados verificados manualmente",
      description: "Além da IA, nossa equipe verifica manualmente os canais TOP para garantir máxima qualidade.",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      stats: "100% verificados"
    }
  ];

  const proofCards = [
    {
      channel: "MARCEMÁTICA",
      score: "100/100",
      badge: "TOP #3",
      subscribers: "675.0K",
      views: "209.7M", 
      engagement: "31059.3%",
      description: "Canal de matemática com altíssimo engajamento",
      avatar: "/lovable-uploads/f7577f20-44f1-4b5d-99ce-0a7f8d3027b9.png"
    },
    {
      channel: "Cortes de Matemática e Física",
      score: "100/100", 
      badge: "TOP #1",
      subscribers: "479.0K",
      views: "143.9M",
      engagement: "30044.6%",
      description: "Canal de cortes educacionais premium",
      avatar: "/lovable-uploads/bdec2d4f-097a-4996-84a3-92797e3fd23f.png"
    },
    {
      channel: "Je Lindsay", 
      score: "100/100",
      badge: "TOP #2", 
      subscribers: "809.0K",
      views: "316.1M",
      engagement: "39074.0%",
      description: "Maior bloguerica educacional do Brasil",
      avatar: "/lovable-uploads/bdec2d4f-097a-4996-84a3-92797e3fd23f.png"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Growth Manager",
      company: "EduTech",
      content: "Encontrei 50 canais premium em 5 minutos. Antes levava semanas!",
      rating: 5,
      result: "+300% conversão"
    },
    {
      name: "Ana Costa", 
      role: "Marketing Director",
      company: "StartupBR",
      content: "O score é extremamente preciso. Todos os canais TOP converteram!",
      rating: 5,
      result: "95% taxa conversão"
    },
    {
      name: "Roberto Lima",
      role: "CEO", 
      company: "DigitalMax",
      content: "ROI incrível! Recuperei o investimento em 15 dias.",
      rating: 5,
      result: "ROI 400%"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20">
              <Target className="h-10 w-10 text-white" />
            </div>
            
            <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-400/30 px-4 py-2">
              <AlertCircle className="h-4 w-4 mr-2" />
              Pare de Perder Oportunidades
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Você Está Perdendo
              <span className="block text-red-400">Milhares de Leads</span>
              <span className="block text-green-400">Todo Dia!</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Enquanto você busca canais manualmente, seus concorrentes já estão fechando negócios com nossa IA que encontra os canais premium automaticamente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/login">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group">
                  <span>Parar de Perder Leads AGORA</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                <Play className="h-5 w-5 mr-2" />
                Ver Como Funciona
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Objections Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              "Mas eu penso que..."
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vamos quebrar todas as suas objeções com dados reais
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {objections.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-600 mb-2">OBJEÇÃO:</h3>
                      <p className="text-gray-700 italic">"{item.objection}"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-600 mb-2">SOLUÇÃO:</h3>
                      <p className="text-xl font-semibold text-gray-800 mb-2">{item.solution}</p>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {item.stats}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Canais Premium Encontrados
            </h2>
            <p className="text-xl text-gray-600">
              Ranqueados por algoritmo de performance avançado
            </p>
            <Badge className="mt-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              50 canais descobertos
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {proofCards.map((channel, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white overflow-hidden relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    {channel.badge}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{channel.score}</div>
                      <div className="text-sm text-green-500 font-medium">PREMIUM</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.channel}</h3>
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
                        <MessageCircle className="h-5 w-5 text-green-500" />
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

      {/* Social Proof */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Resultados Reais de Clientes Reais
            </h2>
            <p className="text-xl text-gray-600">
              Não é só promessa, são resultados comprovados
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  
                  <div className="mb-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {testimonial.result}
                    </Badge>
                  </div>
                  
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

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Não Perca Mais Nenhum Lead
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Enquanto você decide, seus concorrentes já estão fechando negócios. 
            Comece AGORA e recupere todas as oportunidades perdidas.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-10">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">10.000+</div>
                <div className="text-blue-200">Leads Qualificados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-blue-200">Taxa de Conversão</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">300%</div>
                <div className="text-blue-200">ROI Médio</div>
              </div>
            </div>
          </div>
          
          <Link to="/login">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all group mb-6">
              <span>COMEÇAR AGORA - 7 DIAS GRÁTIS</span>
              <Rocket className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          
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
