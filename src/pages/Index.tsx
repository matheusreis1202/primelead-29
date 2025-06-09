import {
  ArrowRight,
  Check,
  ChevronRight,
  Cpu,
  Database,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Componente para seção, para manter consistência
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-20 sm:py-28 <span class="math-inline">\{className\}\`\}\>
<div className\="container mx\-auto px\-6 lg\:px\-8"\>\{children\}</div\>
</section\>
\);
// Componente para os cards de destaque
const FeatureCard \= \(\{
icon\: Icon,
title,
description,
\}\: \{
icon\: React\.ElementType;
title\: string;
description\: string;
\}\) \=\> \(
<div className\="bg\-gray\-900/50 border border\-white/10 p\-6 rounded\-2xl backdrop\-blur\-sm transition\-all duration\-300 hover\:border\-blue\-500/50 hover\:bg\-gray\-900 hover\:scale\-\[1\.02\]"\>
<div className\="flex items\-start gap\-4"\>
<div className\="bg\-blue\-500/10 text\-blue\-400 p\-3 rounded\-lg border border\-blue\-500/20"\>
<Icon className\="h\-6 w\-6" /\>
</div\>
<div\>
<h3 className\="text\-lg font\-bold text\-white mb\-2"\>\{title\}</h3\>
<p className\="text\-gray\-400 leading\-relaxed"\>\{description\}</p\>
</div\>
</div\>
</div\>
\);
const Sales \= \(\) \=\> \{
const plans \= \[
\{
name\: "Pro",
price\: "R</span> 97",
      period: "/mês",
      description: "Ideal para empreendedores e agências que buscam crescimento acelerado.",
      features: [
        "Até 500 canais por dia",
        "Filtros avançados de prospecção",
        "Análise de engajamento e score",
        "Gestão de parcerias (CRM)",
        "Suporte prioritário via chat",
      ],
      link: "https://pay.kiwify.com.br/ITTB1iC",
      popular: true,
    },
    {
      name: "Starter",
      price: "R$ 49",
      period: "/mês",
      description: "Perfeito para quem está começando a prospectar.",
      features: [
        "Até 100 canais por dia",
        "Filtros básicos de nicho",
        "Análise de inscritos e views",
        "Suporte via e-mail",
      ],
      link: "https://pay.kiwify.com.br/QtSaOUj",
      popular: false,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-gray-300 font-inter antialiased">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div
          className="absolute inset-0 z-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0, #1d4ed8 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0a0a0a, #0369a1 50%, transparent 90%)",
          }}
        ></div>

        <div className="absolute inset-0 z-0 bg-[url('https://res.cloudinary.com/delba/image/upload/v1699703299/folio/gradient-background.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 z-0 bg-black/50"></div>


        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Lançamento Oficial PrimeLead</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            A Prospecção no YouTube,
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
              Reinventada com IA.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            Pare de perder horas em buscas manuais. O PrimeLead é a plataforma
            definitiva que automatiza a captação de canais qualificados,
            entregando parcerias de alto impacto para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#planos">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30"
              >
                Começar Agora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </a>
            <Link to="/login">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-gray-300 border-white/20 hover:bg-white/10 hover:text-white px-8 py-7 text-lg font-semibold rounded-xl"
                >
                  Fazer Login
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== O Método Tradicional é Ineficaz ===== */}
      <Section className="bg-[#0A0A0A]">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            O Método Tradicional é Lento e Ineficaz
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            A busca manual por parceiros no YouTube consome seu tempo e energia,
            com resultados muitas vezes decepcionantes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-900/30 border border-white/10 rounded-2xl">
            <h3 className="text-5xl font-bold text-blue-400 mb-3">5+</h3>
            <p className="text-gray-400">Horas por dia gastas em prospecção manual</p>
          </div>
          <div className="text-center p-8 bg-gray-900/30 border border-white/10 rounded-2xl">
            <h3 className="text-5xl font-bold text-blue-400 mb-3">80%</h3>
            <p className="text-gray-400">Das parcerias não geram o resultado esperado</p>
          </div>
          <div className="text-center p-8 bg-gray-900/30 border border-white/10 rounded-2xl">
            <h3 className="text-5xl font-bold text-blue-400 mb-3">Inúmeras</h3>
            <p className="text-gray-400">Oportunidades de ouro perdidas para a concorrência</p>
          </div>
        </div>
      </Section>
      
      {/* ===== A Revolução PrimeLead ===== */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            A Revolução PrimeLead
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transformamos o caos da prospecção em um processo simples,
            automatizado e orientado por dados.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Cpu}
            title="IA de Prospecção"
            description="Nossa inteligência artificial varre o YouTube 24/7, aplicando filtros complexos para encontrar os canais com o perfil exato do seu público."
          />
          <FeatureCard
            icon={Database}
            title="Dados, Não Achismos"
            description="Tome decisões baseadas em métricas reais. Analisamos score de engajamento, consistência e potencial de parceria de cada canal."
          />
          <FeatureCard
            icon={Target}
            title="Foco em Conversão"
            description="Economize tempo e dinheiro focando apenas em parcerias com alto potencial de retorno sobre o investimento (ROI)."
          />
        </div>
      </Section>

      {/* ===== Mockup UI Section ===== */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Interface Intuitiva e Poderosa
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Visualize o poder do PrimeLead. Encontre canais premium em segundos.
          </p>
        </div>

        <div className="relative bg-gray-900/80 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl shadow-blue-900/20">
            <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 space-y-4">
                    <h3 className="text-white font-bold text-xl">Filtros Ativos</h3>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-400 flex justify-between">Nicho: <span className="font-semibold text-white">Marketing Digital</span></p>
                        <p className="text-sm text-gray-400 flex justify-between">Inscritos: <span className="font-semibold text-white">50k - 500k</span></p>
                        <p className="text-sm text-gray-400 flex justify-between">Score Mínimo: <span className="font-semibold text-blue-400">85</span></p>
                        <p className="text-sm text-gray-400 flex justify-between">País: <span className="font-semibold text-white">Brasil</span></p>
                    </div>
                </div>
                <div className="md:w-2/3 bg-black/30 border border-white/10 p-6 rounded-xl">
                    <div className="
