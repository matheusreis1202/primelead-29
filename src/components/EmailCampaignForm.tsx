
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Send, Save, X, Users, Mail, FileText, Eye } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  channel: string;
  subscribers: number;
  engagement: string;
  score: number;
  tags: string[];
}

interface EmailCampaignFormProps {
  contacts: Contact[];
  onSave: (campaignData: any) => void;
  onCancel: () => void;
  editingCampaign?: any;
}

export const EmailCampaignForm = ({ 
  contacts, 
  onSave, 
  onCancel, 
  editingCampaign 
}: EmailCampaignFormProps) => {
  const [campaignName, setCampaignName] = useState(editingCampaign?.name || '');
  const [subject, setSubject] = useState(editingCampaign?.subject || '');
  const [content, setContent] = useState(editingCampaign?.content || '');
  const [selectedContacts, setSelectedContacts] = useState<string[]>(
    editingCampaign?.recipients || []
  );
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(contacts.map(c => c.id));
  };

  const handleSelectNone = () => {
    setSelectedContacts([]);
  };

  const handleSelectByScore = (minScore: number) => {
    setSelectedContacts(
      contacts.filter(c => c.score >= minScore).map(c => c.id)
    );
  };

  const handleSave = () => {
    if (!campaignName.trim()) {
      toast({
        title: "Erro",
        description: "Nome da campanha é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Erro",
        description: "Assunto do email é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (selectedContacts.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um contato",
        variant: "destructive",
      });
      return;
    }

    onSave({
      name: campaignName,
      subject,
      content,
      recipients: selectedContacts,
      template: 'custom'
    });
  };

  const getEmailPreview = () => {
    return `
Assunto: ${subject}

${content}

---
Enviado via Email Marketing
Para descadastrar, clique aqui.
    `.trim();
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#525252]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">
            {editingCampaign ? 'Editar Campanha' : 'Nova Campanha de Email'}
          </CardTitle>
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="text-[#AAAAAA] hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#2A2A2A]">
            <TabsTrigger value="details" className="data-[state=active]:bg-[#FF0000]">
              <FileText className="h-4 w-4 mr-2" />
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="recipients" className="data-[state=active]:bg-[#FF0000]">
              <Users className="h-4 w-4 mr-2" />
              Destinatários ({selectedContacts.length})
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#FF0000]">
              <Mail className="h-4 w-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-[#FF0000]">
              <Eye className="h-4 w-4 mr-2" />
              Prévia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="campaignName" className="text-white">
                Nome da Campanha
              </Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Ex: Proposta de Parceria YouTube"
                className="bg-[#2A2A2A] border-[#525252] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Assunto do Email
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Oportunidade de Parceria - Vamos conversar?"
                className="bg-[#2A2A2A] border-[#525252] text-white"
              />
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-4 mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                onClick={handleSelectAll}
                size="sm"
                variant="outline"
                className="border-[#525252] text-[#AAAAAA] hover:text-white"
              >
                Selecionar Todos
              </Button>
              <Button
                onClick={handleSelectNone}
                size="sm"
                variant="outline"
                className="border-[#525252] text-[#AAAAAA] hover:text-white"
              >
                Limpar Seleção
              </Button>
              <Button
                onClick={() => handleSelectByScore(80)}
                size="sm"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Score ≥ 80
              </Button>
              <Button
                onClick={() => handleSelectByScore(60)}
                size="sm"
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                Score ≥ 60
              </Button>
            </div>

            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                    selectedContacts.includes(contact.id)
                      ? 'border-[#FF0000] bg-[#FF0000]/10'
                      : 'border-[#525252] bg-[#2A2A2A]'
                  }`}
                >
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleContactToggle(contact.id)}
                    className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white truncate">
                        {contact.name}
                      </span>
                      <Badge 
                        variant="secondary"
                        className={`text-xs ${
                          contact.score >= 80 ? 'bg-green-500/20 text-green-400' :
                          contact.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {contact.score}
                      </Badge>
                    </div>
                    <div className="text-sm text-[#AAAAAA] truncate">
                      {contact.email}
                    </div>
                    <div className="text-xs text-[#666] mt-1">
                      {contact.subscribers.toLocaleString()} inscritos • {contact.engagement}% engajamento
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">
                Conteúdo do Email
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Olá [NOME_DO_CANAL],

Espero que esteja tudo bem! Meu nome é [SEU_NOME] e estou entrando em contato porque admiro muito o trabalho que vocês desenvolvem no canal.

Gostaria de propor uma parceria...

Aguardo seu retorno!

Atenciosamente,
[SEU_NOME]`}
                rows={12}
                className="bg-[#2A2A2A] border-[#525252] text-white"
              />
            </div>
            
            <div className="text-sm text-[#AAAAAA]">
              💡 Dica: Use [NOME_DO_CANAL] para personalizar automaticamente cada email
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 mt-6">
            <div className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-4">
              <div className="border-b border-[#525252] pb-2 mb-4">
                <div className="text-sm text-[#AAAAAA]">Assunto:</div>
                <div className="text-white font-medium">{subject || 'Sem assunto'}</div>
              </div>
              
              <div className="whitespace-pre-wrap text-[#AAAAAA] text-sm">
                {content || 'Conteúdo do email aparecerá aqui...'}
              </div>
              
              <div className="border-t border-[#525252] pt-4 mt-4 text-xs text-[#666]">
                Enviado via Email Marketing • Para descadastrar, clique aqui
              </div>
            </div>
            
            <div className="text-sm text-[#AAAAAA]">
              📧 Esta é uma prévia de como seu email será exibido
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#525252]">
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-[#525252] text-[#AAAAAA] hover:text-white"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {editingCampaign ? 'Atualizar' : 'Criar Campanha'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
