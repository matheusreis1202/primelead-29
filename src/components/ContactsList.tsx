
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Mail, 
  Phone, 
  ExternalLink, 
  Users, 
  Star,
  Filter,
  Download,
  Send
} from 'lucide-react';

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

interface ContactsListProps {
  contacts: Contact[];
}

export const ContactsList = ({ contacts }: ContactsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [scoreFilter, setScoreFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScore = scoreFilter === 'all' || 
                        (scoreFilter === 'high' && contact.score >= 80) ||
                        (scoreFilter === 'medium' && contact.score >= 60 && contact.score < 80) ||
                        (scoreFilter === 'low' && contact.score < 60);
    
    return matchesSearch && matchesScore;
  });

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(filteredContacts.map(c => c.id));
  };

  const handleClearSelection = () => {
    setSelectedContacts([]);
  };

  const handleBulkEmail = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "Nenhum contato selecionado",
        description: "Selecione pelo menos um contato para enviar email",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Preparando email",
      description: `Preparando email para ${selectedContacts.length} contatos selecionados`,
    });
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatSubscribers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Lista de Contatos</h2>
          <p className="text-[#AAAAAA]">Gerencie seus contatos de canais captados</p>
        </div>
        
        {selectedContacts.length > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={handleBulkEmail}
              className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar Email ({selectedContacts.length})
            </Button>
            <Button
              onClick={handleClearSelection}
              variant="outline"
              className="border-[#525252] text-[#AAAAAA] hover:text-white"
            >
              Limpar Seleção
            </Button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{contacts.length}</div>
            <div className="text-sm text-[#AAAAAA]">Total Contatos</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">
              {contacts.filter(c => c.score >= 80).length}
            </div>
            <div className="text-sm text-[#AAAAAA]">Score Alto</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4 text-center">
            <Mail className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">
              {contacts.filter(c => c.email && c.email !== 'Não informado').length}
            </div>
            <div className="text-sm text-[#AAAAAA]">Com Email</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E1E] border-[#525252]">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">
              {Math.round(contacts.reduce((acc, c) => acc + c.subscribers, 0) / 1000000)}M
            </div>
            <div className="text-sm text-[#AAAAAA]">Total Inscritos</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#AAAAAA]" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-[#525252] text-white"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setScoreFilter('all')}
            variant={scoreFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={scoreFilter === 'all' ? 'bg-[#FF0000] hover:bg-[#CC0000]' : 'border-[#525252] text-[#AAAAAA]'}
          >
            Todos
          </Button>
          <Button
            onClick={() => setScoreFilter('high')}
            variant={scoreFilter === 'high' ? 'default' : 'outline'}
            size="sm"
            className={scoreFilter === 'high' ? 'bg-green-600 hover:bg-green-700' : 'border-[#525252] text-[#AAAAAA]'}
          >
            Score Alto
          </Button>
          <Button
            onClick={() => setScoreFilter('medium')}
            variant={scoreFilter === 'medium' ? 'default' : 'outline'}
            size="sm"
            className={scoreFilter === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-[#525252] text-[#AAAAAA]'}
          >
            Score Médio
          </Button>
        </div>
        
        <Button
          onClick={handleSelectAll}
          variant="outline"
          size="sm"
          className="border-[#525252] text-[#AAAAAA] hover:text-white"
        >
          Selecionar Todos
        </Button>
      </div>

      {/* Lista de Contatos */}
      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card 
            key={contact.id} 
            className={`bg-[#1E1E1E] border-[#525252] transition-all ${
              selectedContacts.includes(contact.id) ? 'border-[#FF0000] bg-[#FF0000]/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => handleContactToggle(contact.id)}
                  className="mt-1 border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg mb-1 truncate">
                        {contact.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getScoreBadgeColor(contact.score)} text-white`}>
                          Score: {contact.score}
                        </Badge>
                        <span className="text-sm text-[#AAAAAA]">
                          {formatSubscribers(contact.subscribers)} inscritos
                        </span>
                        <span className="text-sm text-[#AAAAAA]">
                          {contact.engagement}% engajamento
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-[#AAAAAA] truncate">{contact.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-[#AAAAAA] truncate">{contact.channel}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-[#2A2A2A] text-[#AAAAAA]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12 text-[#AAAAAA]">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <div className="text-lg mb-2">
            {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato disponível'}
          </div>
          <div className="text-sm">
            {searchTerm 
              ? 'Tente ajustar os filtros de busca' 
              : 'Adicione canais através da aba de Análise para criar contatos'
            }
          </div>
        </div>
      )}
    </div>
  );
};
