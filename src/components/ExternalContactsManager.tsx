
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Mail, User } from 'lucide-react';

interface ExternalContact {
  id: string;
  name: string;
  email: string;
  source: 'external';
}

interface ExternalContactsManagerProps {
  onContactsChange: (contacts: ExternalContact[]) => void;
  initialContacts?: ExternalContact[];
}

export const ExternalContactsManager = ({ 
  onContactsChange, 
  initialContacts = [] 
}: ExternalContactsManagerProps) => {
  const [contacts, setContacts] = useState<ExternalContact[]>(initialContacts);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddContact = () => {
    if (!newContactName.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!newContactEmail.trim()) {
      toast({
        title: "Erro",
        description: "Email é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(newContactEmail)) {
      toast({
        title: "Erro",
        description: "Email inválido",
        variant: "destructive",
      });
      return;
    }

    // Verificar se email já existe
    if (contacts.some(contact => contact.email.toLowerCase() === newContactEmail.toLowerCase())) {
      toast({
        title: "Erro",
        description: "Este email já foi adicionado",
        variant: "destructive",
      });
      return;
    }

    const newContact: ExternalContact = {
      id: `external-${Date.now()}`,
      name: newContactName.trim(),
      email: newContactEmail.trim().toLowerCase(),
      source: 'external'
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    onContactsChange(updatedContacts);
    
    setNewContactName('');
    setNewContactEmail('');

    toast({
      title: "Sucesso",
      description: "Contato adicionado com sucesso",
    });
  };

  const handleRemoveContact = (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    onContactsChange(updatedContacts);

    toast({
      title: "Contato removido",
      description: "O contato foi removido da lista",
    });
  };

  const handleBulkImport = (emailsText: string) => {
    const lines = emailsText.split('\n').filter(line => line.trim());
    const newContacts: ExternalContact[] = [];
    const errors: string[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(',').map(part => part.trim());
      let name, email;

      if (parts.length === 1) {
        // Apenas email
        email = parts[0];
        name = email.split('@')[0];
      } else if (parts.length >= 2) {
        // Nome e email
        name = parts[0];
        email = parts[1];
      } else {
        errors.push(`Linha ${index + 1}: formato inválido`);
        return;
      }

      if (!validateEmail(email)) {
        errors.push(`Linha ${index + 1}: email inválido (${email})`);
        return;
      }

      // Verificar se email já existe
      if (contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase()) ||
          newContacts.some(contact => contact.email.toLowerCase() === email.toLowerCase())) {
        errors.push(`Linha ${index + 1}: email duplicado (${email})`);
        return;
      }

      newContacts.push({
        id: `external-bulk-${Date.now()}-${index}`,
        name: name,
        email: email.toLowerCase(),
        source: 'external'
      });
    });

    if (newContacts.length > 0) {
      const updatedContacts = [...contacts, ...newContacts];
      setContacts(updatedContacts);
      onContactsChange(updatedContacts);

      toast({
        title: "Importação concluída",
        description: `${newContacts.length} contatos adicionados${errors.length > 0 ? ` (${errors.length} erros)` : ''}`,
      });
    }

    if (errors.length > 0) {
      console.log('Erros na importação:', errors);
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#525252]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Contatos Externos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Adicionar contato individual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <Label htmlFor="contactName" className="text-white text-sm">
              Nome
            </Label>
            <Input
              id="contactName"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              placeholder="Nome do contato"
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="contactEmail" className="text-white text-sm">
              Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
              placeholder="email@exemplo.com"
              className="bg-[#2A2A2A] border-[#525252] text-white"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddContact();
                }
              }}
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={handleAddContact}
              className="bg-[#FF0000] hover:bg-[#CC0000] text-white w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Lista de contatos */}
        {contacts.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">
                Contatos Adicionados ({contacts.length})
              </h4>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between bg-[#2A2A2A] border border-[#525252] rounded-lg p-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Mail className="h-4 w-4 text-[#AAAAAA] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">
                        {contact.name}
                      </div>
                      <div className="text-sm text-[#AAAAAA] truncate">
                        {contact.email}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      Externo
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => handleRemoveContact(contact.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dica de uso */}
        <div className="text-sm text-[#AAAAAA] bg-[#2A2A2A] border border-[#525252] rounded-lg p-3">
          💡 <strong>Dica:</strong> Você pode adicionar contatos externos que não estão na sua lista de canais do YouTube.
        </div>
      </CardContent>
    </Card>
  );
};
