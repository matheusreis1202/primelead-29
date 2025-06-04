
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Mail, Calendar, Plus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunicationEntry {
  id: string;
  type: 'email' | 'whatsapp' | 'call' | 'meeting' | 'note';
  date: string;
  content: string;
  status?: 'sent' | 'delivered' | 'read' | 'replied';
}

interface PartnerCommunicationProps {
  partnerId: string;
  partnerName: string;
  communications: CommunicationEntry[];
  onAddCommunication: (communication: Omit<CommunicationEntry, 'id' | 'date'>) => void;
}

export const PartnerCommunication = ({ 
  partnerId, 
  partnerName, 
  communications, 
  onAddCommunication 
}: PartnerCommunicationProps) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCommType, setNewCommType] = useState<CommunicationEntry['type']>('note');
  const [newCommContent, setNewCommContent] = useState('');
  const { toast } = useToast();

  const handleAddCommunication = () => {
    if (!newCommContent.trim()) return;

    onAddCommunication({
      type: newCommType,
      content: newCommContent.trim(),
      status: newCommType === 'note' ? undefined : 'sent'
    });

    setNewCommContent('');
    setIsAddingNew(false);
    
    toast({
      title: "Comunicação registrada",
      description: "Nova interação adicionada ao histórico",
    });
  };

  const getTypeIcon = (type: CommunicationEntry['type']) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: CommunicationEntry['type']) => {
    switch (type) {
      case 'email': return 'bg-blue-500/20 text-blue-400';
      case 'whatsapp': return 'bg-green-500/20 text-green-400';
      case 'call': return 'bg-purple-500/20 text-purple-400';
      case 'meeting': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-500/20 text-blue-400';
      case 'delivered': return 'bg-yellow-500/20 text-yellow-400';
      case 'read': return 'bg-green-500/20 text-green-400';
      case 'replied': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#333]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">
            Comunicação - {partnerName}
          </CardTitle>
          <Button
            onClick={() => setIsAddingNew(true)}
            size="sm"
            className="bg-[#FF0000] hover:bg-[#CC0000]"
          >
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isAddingNew && (
          <div className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white text-sm mb-1 block">Tipo</label>
                <Select value={newCommType} onValueChange={(value) => setNewCommType(value as CommunicationEntry['type'])}>
                  <SelectTrigger className="bg-[#1E1E1E] border-[#525252] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Nota</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="call">Ligação</SelectItem>
                    <SelectItem value="meeting">Reunião</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-1 block">Conteúdo</label>
              <Textarea
                value={newCommContent}
                onChange={(e) => setNewCommContent(e.target.value)}
                placeholder="Descreva a interação..."
                className="bg-[#1E1E1E] border-[#525252] text-white resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddCommunication}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-1" />
                Salvar
              </Button>
              <Button
                onClick={() => {
                  setIsAddingNew(false);
                  setNewCommContent('');
                }}
                size="sm"
                variant="outline"
                className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA]"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {communications.length === 0 ? (
            <div className="text-center py-8 text-[#AAAAAA]">
              <MessageCircle className="h-8 w-8 mx-auto mb-2" />
              <p>Nenhuma comunicação registrada</p>
            </div>
          ) : (
            communications.map((comm) => (
              <div key={comm.id} className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTypeColor(comm.type)} text-xs`}>
                      {getTypeIcon(comm.type)}
                      <span className="ml-1 capitalize">{comm.type}</span>
                    </Badge>
                    {comm.status && (
                      <Badge className={`${getStatusColor(comm.status)} text-xs`}>
                        {comm.status}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-[#AAAAAA]">
                    {new Date(comm.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-white text-sm">{comm.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
