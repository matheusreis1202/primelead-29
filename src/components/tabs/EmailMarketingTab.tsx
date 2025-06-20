import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Send, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  BarChart3, 
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { EmailCampaignForm } from '@/components/EmailCampaignForm';
import { EmailTemplateLibrary } from '@/components/EmailTemplateLibrary';
import { EmailAnalytics } from '@/components/EmailAnalytics';
import { ContactsList } from '@/components/ContactsList';

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template: string;
  recipients: string[];
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  externalContacts?: any[];
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

interface EmailMarketingTabProps {
  contacts: any[];
}

export const EmailMarketingTab = ({ contacts }: EmailMarketingTabProps) => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);
  const [activeSubTab, setActiveSubTab] = useState('campaigns');
  const { toast } = useToast();

  // Converter contatos para formato de email
  const emailContacts = useMemo(() => {
    return contacts.map(contact => ({
      id: contact.id || contact.name,
      name: contact.name,
      email: contact.email || `contato@${contact.name.replace(/\s+/g, '').toLowerCase()}.com`,
      channel: contact.name,
      subscribers: contact.subscribers || 0,
      engagement: contact.engagement || '0.0',
      score: contact.score || 0,
      tags: ['canal-youtube', contact.classification || 'medium-potential']
    }));
  }, [contacts]);

  const handleCreateCampaign = (campaignData: Partial<EmailCampaign>) => {
    const newCampaign: EmailCampaign = {
      id: Date.now().toString(),
      name: campaignData.name || 'Nova Campanha',
      subject: campaignData.subject || '',
      content: campaignData.content || '',
      template: campaignData.template || 'basic',
      recipients: campaignData.recipients || [],
      status: campaignData.status || 'draft',
      createdAt: new Date().toISOString(),
      sentAt: campaignData.sentAt,
      externalContacts: campaignData.externalContacts || [],
      stats: campaignData.stats || {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0
      }
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setIsCreatingCampaign(false);

    const statusMessage = newCampaign.status === 'sent' 
      ? `Campanha enviada com sucesso! ${newCampaign.stats.delivered} emails entregues.`
      : `${newCampaign.name} foi salva como rascunho.`;

    toast({
      title: newCampaign.status === 'sent' ? "Campanha enviada!" : "Campanha criada!",
      description: statusMessage,
    });

    console.log('Nova campanha criada:', newCampaign);
  };

  const handleUpdateCampaign = (campaignData: Partial<EmailCampaign>) => {
    if (!editingCampaign) return;

    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === editingCampaign.id) {
        const updatedCampaign = {
          ...campaign,
          ...campaignData,
          updatedAt: new Date().toISOString()
        };
        console.log('Campanha atualizada:', updatedCampaign);
        return updatedCampaign;
      }
      return campaign;
    }));

    setEditingCampaign(null);

    const statusMessage = campaignData.status === 'sent' 
      ? `Campanha enviada com sucesso! ${campaignData.stats?.delivered || 0} emails entregues.`
      : 'Campanha atualizada com sucesso.';

    toast({
      title: campaignData.status === 'sent' ? "Campanha enviada!" : "Campanha atualizada!",
      description: statusMessage,
    });
  };

  const handleSendCampaign = async (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Simular processo de envio
    toast({
      title: "Iniciando envio",
      description: `Enviando ${campaign.name} para ${campaign.recipients.length} contatos...`,
    });

    // Simular delay de envio
    setTimeout(() => {
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.id === campaignId) {
          const sentCount = campaign.recipients.length;
          const updatedCampaign = {
            ...campaign,
            status: 'sent' as const,
            sentAt: new Date().toISOString(),
            stats: {
              ...campaign.stats,
              sent: sentCount,
              delivered: Math.floor(sentCount * 0.95),
              opened: Math.floor(sentCount * 0.25),
              clicked: Math.floor(sentCount * 0.05),
              bounced: Math.floor(sentCount * 0.05),
              unsubscribed: Math.floor(sentCount * 0.01)
            }
          };
          console.log('Campanha enviada:', updatedCampaign);
          return updatedCampaign;
        }
        return campaign;
      }));

      toast({
        title: "Campanha enviada!",
        description: "Sua campanha foi enviada com sucesso.",
      });
    }, 2000);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
    
    toast({
      title: "Campanha removida!",
      description: `"${campaign?.name}" foi removida com sucesso.`,
    });

    console.log('Campanha removida:', campaignId);
  };

  const getStatusBadge = (status: EmailCampaign['status']) => {
    const statusConfig = {
      draft: { label: 'Rascunho', color: 'bg-gray-500', icon: Edit },
      scheduled: { label: 'Agendada', color: 'bg-blue-500', icon: Clock },
      sent: { label: 'Enviada', color: 'bg-green-500', icon: CheckCircle },
      failed: { label: 'Falhou', color: 'bg-red-500', icon: XCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Combinar todos os contatos (YouTube + externos das campanhas)
  const allContactsForList = useMemo(() => {
    const externalContacts = campaigns.flatMap(campaign => 
      campaign.externalContacts || []
    );
    
    return [
      ...emailContacts,
      ...externalContacts.map(contact => ({
        ...contact,
        channel: contact.name,
        subscribers: 0,
        engagement: '0',
        score: 50,
        tags: ['external']
      }))
    ];
  }, [emailContacts, campaigns]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Email Marketing</h1>
          <p className="text-[#AAAAAA] mt-1">
            Gerencie campanhas de email para seus contatos captados
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreatingCampaign(true)}
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Stats Cards - atualizado com dados mais precisos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#AAAAAA] mb-1">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Total Campanhas</span>
          </div>
          <div className="text-2xl font-bold text-white">{campaigns.length}</div>
        </div>
        
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#AAAAAA] mb-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">Contatos Totais</span>
          </div>
          <div className="text-2xl font-bold text-white">{allContactsForList.length}</div>
        </div>
        
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#AAAAAA] mb-1">
            <Send className="h-4 w-4" />
            <span className="text-sm">Emails Enviados</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {campaigns.reduce((acc, campaign) => acc + campaign.stats.sent, 0)}
          </div>
        </div>
        
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#AAAAAA] mb-1">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Taxa de Abertura</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {campaigns.length > 0 
              ? ((campaigns.reduce((acc, campaign) => acc + campaign.stats.opened, 0) / 
                  Math.max(campaigns.reduce((acc, campaign) => acc + campaign.stats.sent, 0), 1)) * 100).toFixed(1)
              : '0.0'}%
          </div>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#1E1E1E] border border-[#525252]">
          <TabsTrigger 
            value="campaigns" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <Mail className="h-4 w-4 mr-2" />
            Campanhas
          </TabsTrigger>
          <TabsTrigger 
            value="contacts" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <Users className="h-4 w-4 mr-2" />
            Contatos
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {isCreatingCampaign && (
            <EmailCampaignForm
              contacts={emailContacts}
              onSave={handleCreateCampaign}
              onCancel={() => setIsCreatingCampaign(false)}
            />
          )}

          {editingCampaign && (
            <EmailCampaignForm
              contacts={emailContacts}
              onSave={handleUpdateCampaign}
              onCancel={() => setEditingCampaign(null)}
              editingCampaign={editingCampaign}
            />
          )}

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                      {(campaign.externalContacts?.length || 0) > 0 && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          +{campaign.externalContacts?.length} externos
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#AAAAAA] text-sm mb-2">{campaign.subject}</p>
                    <div className="flex items-center gap-4 text-sm text-[#AAAAAA]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Criada em {formatDate(campaign.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {campaign.recipients.length} destinatários
                      </span>
                      {campaign.sentAt && (
                        <span className="flex items-center gap-1">
                          <Send className="h-3 w-3" />
                          Enviada em {formatDate(campaign.sentAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {campaign.status === 'draft' && (
                      <Button
                        onClick={() => handleSendCampaign(campaign.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Enviar
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => setEditingCampaign(campaign)}
                      size="sm"
                      variant="outline"
                      className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {campaign.status === 'sent' && (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t border-[#525252]">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{campaign.stats.sent}</div>
                      <div className="text-xs text-[#AAAAAA]">Enviados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{campaign.stats.delivered}</div>
                      <div className="text-xs text-[#AAAAAA]">Entregues</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{campaign.stats.opened}</div>
                      <div className="text-xs text-[#AAAAAA]">Abertos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{campaign.stats.clicked}</div>
                      <div className="text-xs text-[#AAAAAA]">Cliques</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">{campaign.stats.bounced}</div>
                      <div className="text-xs text-[#AAAAAA]">Rejeitados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-400">{campaign.stats.unsubscribed}</div>
                      <div className="text-xs text-[#AAAAAA]">Descadastros</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {campaigns.length === 0 && (
              <div className="text-center py-12 text-[#AAAAAA]">
                <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <div className="text-lg mb-2">Nenhuma campanha criada</div>
                <div className="text-sm mb-4">Crie sua primeira campanha de email marketing</div>
                <Button
                  onClick={() => setIsCreatingCampaign(true)}
                  className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Campanha
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <ContactsList contacts={allContactsForList} />
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplateLibrary onSelectTemplate={(template) => {
            console.log('Template selecionado:', template);
          }} />
        </TabsContent>

        <TabsContent value="analytics">
          <EmailAnalytics campaigns={campaigns} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const useEmailMarketingData = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  const addCampaign = (campaignData: Partial<EmailCampaign>) => {
    const newCampaign: EmailCampaign = {
      id: Date.now().toString(),
      name: campaignData.name || 'Nova Campanha',
      subject: campaignData.subject || '',
      content: campaignData.content || '',
      template: campaignData.template || 'basic',
      recipients: campaignData.recipients || [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      stats: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0
      }
    };

    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  return {
    campaigns,
    addCampaign,
    setCampaigns
  };
};
