
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Copy, Star, Handshake, Zap, Heart, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'partnership' | 'follow-up' | 'introduction' | 'business';
  subject: string;
  content: string;
  tags: string[];
  popularity: number;
}

interface EmailTemplateLibraryProps {
  onSelectTemplate: (template: EmailTemplate) => void;
}

export const EmailTemplateLibrary = ({ onSelectTemplate }: EmailTemplateLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('partnership');
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const { toast } = useToast();

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Proposta de Parceria Direta',
      description: 'Template direto para propor parcerias com criadores',
      category: 'partnership',
      subject: 'Parceria estratégica com [NOME_DO_CANAL] - Vamos conversar?',
      content: `Olá [NOME_DO_CANAL]!

Espero que esteja tudo bem! Meu nome é [SEU_NOME] e estou entrando em contato porque admiro muito o conteúdo que vocês produzem.

Tenho uma proposta de parceria que pode ser muito interessante para ambos os lados:

🎯 **O que oferecemos:**
- [DETALHE_DA_OFERTA]
- Suporte completo durante toda a parceria
- Flexibilidade nos termos de colaboração

🚀 **Por que acreditamos que seria uma ótima parceria:**
- Seu canal tem um engajamento excepcional
- Nossos valores se alinham perfeitamente
- Potencial de crescimento mútuo

Gostaria de agendar uma conversa rápida para apresentar a proposta completa. Que tal um café virtual de 15 minutos?

Aguardo seu retorno!

Atenciosamente,
[SEU_NOME]
[SEU_CARGO]
[EMPRESA]`,
      tags: ['parceria', 'colaboração', 'negócios'],
      popularity: 95
    },
    {
      id: '2',
      name: 'Follow-up Educado',
      description: 'Para dar seguimento a uma proposta anterior',
      category: 'follow-up',
      subject: 'Re: Parceria com [NOME_DO_CANAL] - Ainda interessados?',
      content: `Olá [NOME_DO_CANAL],

Espero que estejam bem!

Enviei uma proposta de parceria há alguns dias e gostaria de saber se tiveram a oportunidade de analisar.

Entendo que vocês devem receber muitas propostas, então deixo claro que:

✅ Não há pressa - respeitamos totalmente o tempo de vocês
✅ Estamos abertos a ajustar nossa proposta conforme suas necessidades
✅ Podemos começar com algo menor para testar a sinergia

Se não for o momento ideal, sem problemas! Adoraria manter o contato para futuras oportunidades.

Um abraço,
[SEU_NOME]`,
      tags: ['follow-up', 'educado', 'flexível'],
      popularity: 87
    },
    {
      id: '3',
      name: 'Apresentação da Empresa',
      description: 'Template para se apresentar e criar relacionamento',
      category: 'introduction',
      subject: 'Conhecendo criadores incríveis - [NOME_DO_CANAL]',
      content: `Olá [NOME_DO_CANAL]!

Meu nome é [SEU_NOME] e trabalho na [EMPRESA], uma empresa que [DESCRIÇÃO_BREVE_EMPRESA].

Acabei de descobrir o canal de vocês e fiquei impressionado com:
- A qualidade do conteúdo
- O engajamento da comunidade
- A consistência nas publicações

Não estou entrando em contato com uma proposta específica agora, mas gostaria de conhecer melhor o trabalho de vocês e talvez encontrar formas de colaborar no futuro.

Vocês estão fazendo um trabalho incrível! 

Se tiverem interesse em trocar uma ideia, estarei sempre disponível.

Parabéns pelo canal!

[SEU_NOME]
[CONTATO]`,
      tags: ['apresentação', 'networking', 'relacionamento'],
      popularity: 78
    },
    {
      id: '4',
      name: 'Proposta Comercial Formal',
      description: 'Template formal para propostas comerciais estruturadas',
      category: 'business',
      subject: 'Proposta Comercial - [EMPRESA] x [NOME_DO_CANAL]',
      content: `Prezados [NOME_DO_CANAL],

A [EMPRESA] tem o prazer de apresentar uma proposta de parceria comercial.

**SOBRE NÓS:**
[DESCRIÇÃO_EMPRESA]

**PROPOSTA:**
- Tipo: [TIPO_PARCERIA]
- Duração: [DURAÇÃO]
- Investimento: [VALOR/CONDIÇÕES]
- Entregáveis: [LISTA_ENTREGÁVEIS]

**BENEFÍCIOS PARA O CANAL:**
✓ [BENEFÍCIO_1]
✓ [BENEFÍCIO_2]
✓ [BENEFÍCIO_3]

**PRÓXIMOS PASSOS:**
1. Análise da proposta
2. Reunião de alinhamento
3. Assinatura do contrato
4. Início da parceria

Estamos à disposição para esclarecimentos e ajustes na proposta.

Aguardamos retorno em até [PRAZO] para darmos continuidade.

Atenciosamente,
[SEU_NOME]
[CARGO]
[EMPRESA]
[CONTATOS]`,
      tags: ['formal', 'comercial', 'estruturado'],
      popularity: 82
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'partnership': return <Handshake className="h-4 w-4" />;
      case 'follow-up': return <Zap className="h-4 w-4" />;
      case 'introduction': return <Heart className="h-4 w-4" />;
      case 'business': return <Briefcase className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'partnership': return 'Parceria';
      case 'follow-up': return 'Follow-up';
      case 'introduction': return 'Apresentação';
      case 'business': return 'Comercial';
      default: return 'Outros';
    }
  };

  const handleCopyTemplate = (template: EmailTemplate) => {
    navigator.clipboard.writeText(template.content);
    toast({
      title: "Template copiado!",
      description: "O conteúdo foi copiado para a área de transferência.",
    });
  };

  const filteredTemplates = templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Biblioteca de Templates</h2>
          <p className="text-[#AAAAAA]">Templates profissionais para suas campanhas de email</p>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 bg-[#1E1E1E] border border-[#525252]">
          <TabsTrigger value="partnership" className="data-[state=active]:bg-[#FF0000]">
            <Handshake className="h-4 w-4 mr-2" />
            Parceria
          </TabsTrigger>
          <TabsTrigger value="follow-up" className="data-[state=active]:bg-[#FF0000]">
            <Zap className="h-4 w-4 mr-2" />
            Follow-up
          </TabsTrigger>
          <TabsTrigger value="introduction" className="data-[state=active]:bg-[#FF0000]">
            <Heart className="h-4 w-4 mr-2" />
            Apresentação
          </TabsTrigger>
          <TabsTrigger value="business" className="data-[state=active]:bg-[#FF0000]">
            <Briefcase className="h-4 w-4 mr-2" />
            Comercial
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="bg-[#1E1E1E] border-[#525252]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">
                        {template.name}
                      </CardTitle>
                      <p className="text-[#AAAAAA] text-sm mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(template.category)}
                        <span className="text-sm text-[#AAAAAA]">
                          {getCategoryName(template.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs">{template.popularity}%</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-[#2A2A2A] text-[#AAAAAA]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm text-[#AAAAAA] mb-1">Assunto:</div>
                    <div className="text-white text-sm font-medium">
                      {template.subject}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setPreviewTemplate(template)}
                      size="sm"
                      variant="outline"
                      className="border-[#525252] text-[#AAAAAA] hover:text-white flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Prévia
                    </Button>
                    <Button
                      onClick={() => handleCopyTemplate(template)}
                      size="sm"
                      variant="outline"
                      className="border-[#525252] text-[#AAAAAA] hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => onSelectTemplate(template)}
                      size="sm"
                      className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
                    >
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-[#1E1E1E] border-[#525252] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  Prévia: {previewTemplate.name}
                </CardTitle>
                <Button
                  onClick={() => setPreviewTemplate(null)}
                  variant="ghost"
                  size="sm"
                  className="text-[#AAAAAA] hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#AAAAAA] mb-1">Assunto:</div>
                  <div className="text-white font-medium p-2 bg-[#2A2A2A] rounded">
                    {previewTemplate.subject}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-[#AAAAAA] mb-1">Conteúdo:</div>
                  <div className="text-[#AAAAAA] p-4 bg-[#2A2A2A] rounded whitespace-pre-wrap text-sm">
                    {previewTemplate.content}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopyTemplate(previewTemplate)}
                    variant="outline"
                    className="border-[#525252] text-[#AAAAAA] hover:text-white flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Template
                  </Button>
                  <Button
                    onClick={() => {
                      onSelectTemplate(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="bg-[#FF0000] hover:bg-[#CC0000] text-white flex-1"
                  >
                    Usar Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
