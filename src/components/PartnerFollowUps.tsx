
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FollowUp {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'completed' | 'overdue';
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'contract' | 'payment';
}

interface PartnerFollowUpsProps {
  partnerId: string;
  followUps: FollowUp[];
  onAddFollowUp: (followUp: Omit<FollowUp, 'id'>) => void;
  onUpdateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  onDeleteFollowUp: (id: string) => void;
}

export const PartnerFollowUps = ({
  partnerId,
  followUps,
  onAddFollowUp,
  onUpdateFollowUp,
  onDeleteFollowUp
}: PartnerFollowUpsProps) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as const,
    type: 'call' as const
  });
  const { toast } = useToast();

  const partnerFollowUps = followUps.filter(f => f.partnerId === partnerId);

  const handleAddFollowUp = () => {
    if (!newFollowUp.title.trim() || !newFollowUp.dueDate) return;

    const today = new Date();
    const dueDate = new Date(newFollowUp.dueDate);
    const status: FollowUp['status'] = dueDate < today ? 'overdue' : 'pending';

    onAddFollowUp({
      partnerId,
      title: newFollowUp.title.trim(),
      description: newFollowUp.description.trim(),
      dueDate: newFollowUp.dueDate,
      priority: newFollowUp.priority,
      type: newFollowUp.type,
      status
    });

    setNewFollowUp({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      type: 'call'
    });
    setIsAddingNew(false);

    toast({
      title: "Follow-up criado",
      description: "Lembrete adicionado com sucesso",
    });
  };

  const handleToggleComplete = (followUp: FollowUp) => {
    const newStatus = followUp.status === 'completed' ? 'pending' : 'completed';
    onUpdateFollowUp(followUp.id, { status: newStatus });

    toast({
      title: newStatus === 'completed' ? "Follow-up concluído" : "Follow-up reaberto",
      description: followUp.title,
    });
  };

  const getPriorityColor = (priority: FollowUp['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'urgent': return 'bg-red-500/20 text-red-400';
    }
  };

  const getStatusColor = (status: FollowUp['status']) => {
    switch (status) {
      case 'pending': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
    }
  };

  const getTypeIcon = (type: FollowUp['type']) => {
    switch (type) {
      case 'call': return '📞';
      case 'email': return '✉️';
      case 'meeting': return '🤝';
      case 'proposal': return '📄';
      case 'contract': return '📋';
      case 'payment': return '💰';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#333]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Follow-ups e Lembretes
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
                <label className="text-white text-sm mb-1 block">Título</label>
                <Input
                  value={newFollowUp.title}
                  onChange={(e) => setNewFollowUp(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Ligar para negociar valores"
                  className="bg-[#1E1E1E] border-[#525252] text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-1 block">Data</label>
                <Input
                  type="date"
                  value={newFollowUp.dueDate}
                  onChange={(e) => setNewFollowUp(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="bg-[#1E1E1E] border-[#525252] text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white text-sm mb-1 block">Tipo</label>
                <Select value={newFollowUp.type} onValueChange={(value) => setNewFollowUp(prev => ({ ...prev, type: value as FollowUp['type'] }))}>
                  <SelectTrigger className="bg-[#1E1E1E] border-[#525252] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Ligação</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Reunião</SelectItem>
                    <SelectItem value="proposal">Proposta</SelectItem>
                    <SelectItem value="contract">Contrato</SelectItem>
                    <SelectItem value="payment">Pagamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white text-sm mb-1 block">Prioridade</label>
                <Select value={newFollowUp.priority} onValueChange={(value) => setNewFollowUp(prev => ({ ...prev, priority: value as FollowUp['priority'] }))}>
                  <SelectTrigger className="bg-[#1E1E1E] border-[#525252] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-1 block">Descrição</label>
              <Textarea
                value={newFollowUp.description}
                onChange={(e) => setNewFollowUp(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detalhes do follow-up..."
                className="bg-[#1E1E1E] border-[#525252] text-white resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddFollowUp}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                Criar Follow-up
              </Button>
              <Button
                onClick={() => setIsAddingNew(false)}
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
          {partnerFollowUps.length === 0 ? (
            <div className="text-center py-8 text-[#AAAAAA]">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p>Nenhum follow-up agendado</p>
            </div>
          ) : (
            partnerFollowUps.map((followUp) => (
              <div key={followUp.id} className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(followUp.type)}</span>
                    <div>
                      <h4 className="text-white font-medium text-sm">{followUp.title}</h4>
                      <p className="text-xs text-[#AAAAAA]">
                        {new Date(followUp.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getPriorityColor(followUp.priority)} text-xs`}>
                      {followUp.priority}
                    </Badge>
                    <Badge className={`${getStatusColor(followUp.status)} text-xs`}>
                      {followUp.status === 'overdue' ? 'Atrasado' : 
                       followUp.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                </div>

                {followUp.description && (
                  <p className="text-sm text-[#CCCCCC] mb-3">{followUp.description}</p>
                )}

                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => handleToggleComplete(followUp)}
                    size="sm"
                    variant="outline"
                    className="border-[#525252] bg-[#1E1E1E] text-white text-xs"
                  >
                    {followUp.status === 'completed' ? (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Reabrir
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Concluir
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => onDeleteFollowUp(followUp.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 text-xs"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
