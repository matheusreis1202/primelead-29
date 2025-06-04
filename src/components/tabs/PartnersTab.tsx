import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  RotateCw,
  Plus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { PartnersAnalytics } from '@/components/PartnersAnalytics';
import { PartnerSync } from '@/components/PartnerSync';
import { useToast } from '@/hooks/use-toast';

// Define the partner data structure
interface PartnerData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Interesse' | 'Negociando' | 'Fechado' | 'Rejeitado';
  lastContact: string;
  investment?: string;
  score: number;
  classification: string;
  notes?: string;
  tags: string[];
}

// Define the sync data structure
interface SyncData {
  analysisChannels: any[];
  emailCampaigns: any[];
  spreadsheetData: any[];
}

export const PartnersTab = () => {
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const { toast } = useToast();

  // Load partners from localStorage on component mount
  useEffect(() => {
    const savedPartners = localStorage.getItem('partners');
    const savedLastSync = localStorage.getItem('lastPartnerSync');
    
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    }
    
    if (savedLastSync) {
      setLastSyncTime(savedLastSync);
    }
  }, []);

  // Save partners to localStorage whenever partners change
  useEffect(() => {
    localStorage.setItem('partners', JSON.stringify(partners));
  }, [partners]);

  const handleDataSync = (syncData: SyncData) => {
    setIsLoading(true);
    
    // Simulate processing sync data
    setTimeout(() => {
      // Process analysis channels and convert to partners
      const newPartners: PartnerData[] = syncData.analysisChannels.map((channel, index) => ({
        id: `sync-${Date.now()}-${index}`,
        name: channel.title || `Canal ${index + 1}`,
        email: `contato@${channel.title?.toLowerCase().replace(/\s+/g, '') || 'canal'}.com`,
        status: Math.random() > 0.5 ? 'Interesse' : 'Negociando' as const,
        lastContact: new Date().toISOString(),
        score: Math.floor(Math.random() * 100),
        classification: Math.random() > 0.7 ? 'Alto Potencial' : 'Médio Potencial',
        tags: ['Sincronizado', 'YouTube']
      }));

      setPartners(prev => [...prev, ...newPartners]);
      setLastSyncTime(new Date().toISOString());
      setIsLoading(false);

      toast({
        title: "Sincronização concluída",
        description: `${newPartners.length} novos parceiros adicionados`,
      });
    }, 2000);
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: PartnerData['status']) => {
    switch (status) {
      case 'Interesse': return 'bg-blue-500/20 text-blue-400';
      case 'Negociando': return 'bg-yellow-500/20 text-yellow-400';
      case 'Fechado': return 'bg-green-500/20 text-green-400';
      case 'Rejeitado': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: PartnerData['status']) => {
    switch (status) {
      case 'Interesse': return <AlertCircle className="h-4 w-4" />;
      case 'Negociando': return <Clock className="h-4 w-4" />;
      case 'Fechado': return <CheckCircle className="h-4 w-4" />;
      case 'Rejeitado': return <Trash2 className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const handleUpdateStatus = (partnerId: string, newStatus: PartnerData['status']) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId 
        ? { ...partner, status: newStatus, lastContact: new Date().toISOString() }
        : partner
    ));

    toast({
      title: "Status atualizado",
      description: "Status do parceiro foi alterado com sucesso",
    });
  };

  const handleDeletePartner = (partnerId: string) => {
    setPartners(prev => prev.filter(partner => partner.id !== partnerId));
    
    toast({
      title: "Parceiro removido",
      description: "Parceiro foi removido da lista",
    });
  };

  const addSamplePartner = () => {
    const samplePartner: PartnerData = {
      id: `partner-${Date.now()}`,
      name: `Parceiro ${partners.length + 1}`,
      email: `parceiro${partners.length + 1}@email.com`,
      phone: `(11) 9999-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'Interesse',
      lastContact: new Date().toISOString(),
      score: Math.floor(Math.random() * 100),
      classification: Math.random() > 0.5 ? 'Alto Potencial' : 'Médio Potencial',
      tags: ['Novo', 'Prospect']
    };

    setPartners(prev => [...prev, samplePartner]);
    
    toast({
      title: "Parceiro adicionado",
      description: "Novo parceiro foi adicionado com sucesso",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header com Analytics Toggle */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Gestão de Parceiros</h2>
          <p className="text-[#AAAAAA]">
            Gerencie relacionamentos e acompanhe o pipeline de parcerias
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="analytics-toggle"
              checked={showAnalytics}
              onCheckedChange={setShowAnalytics}
            />
            <Label htmlFor="analytics-toggle" className="text-[#AAAAAA]">
              Mostrar Analytics
            </Label>
          </div>
          
          <Button
            onClick={addSamplePartner}
            className="bg-[#FF0000] hover:bg-[#CC0000]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Parceiro
          </Button>
        </div>
      </div>

      {/* Analytics */}
      {showAnalytics && <PartnersAnalytics partners={partners} />}

      {/* Sync Component */}
      <PartnerSync onDataSync={handleDataSync} lastSyncTime={lastSyncTime} />

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] h-4 w-4" />
            <Input
              placeholder="Buscar parceiros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1E1E1E] border-[#333] text-white"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#1E1E1E] border border-[#333] rounded-md text-white focus:ring-2 focus:ring-[#FF0000]"
          >
            <option value="all">Todos os Status</option>
            <option value="Interesse">Interesse</option>
            <option value="Negociando">Negociando</option>
            <option value="Fechado">Fechado</option>
            <option value="Rejeitado">Rejeitado</option>
          </select>
          
          <Button variant="outline" className="border-[#333] text-[#AAAAAA]">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          
          <Button variant="outline" className="border-[#333] text-[#AAAAAA]">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Partners List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPartners.length === 0 ? (
          <div className="col-span-full">
            <Card className="bg-[#1E1E1E] border-[#333]">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-[#AAAAAA] mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  Nenhum parceiro encontrado
                </h3>
                <p className="text-[#AAAAAA] mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece adicionando seus primeiros parceiros ou sincronize dados de outras abas'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button
                    onClick={addSamplePartner}
                    className="bg-[#FF0000] hover:bg-[#CC0000]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Parceiro
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <Card key={partner.id} className="bg-[#1E1E1E] border-[#333] hover:border-[#FF0000]/50 transition-colors duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">{partner.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(partner.status)}>
                        {getStatusIcon(partner.status)}
                        <span className="ml-1">{partner.status}</span>
                      </Badge>
                      <div className="text-[#FF0000] font-bold text-sm">
                        Score: {partner.score}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-[#AAAAAA] hover:text-white p-1">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#AAAAAA] hover:text-red-400 p-1"
                      onClick={() => handleDeletePartner(partner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-[#AAAAAA]" />
                    <span className="text-[#AAAAAA]">{partner.email}</span>
                  </div>
                  {partner.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-[#AAAAAA]" />
                      <span className="text-[#AAAAAA]">{partner.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#AAAAAA]" />
                    <span className="text-[#AAAAAA]">
                      {new Date(partner.lastContact).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Classification */}
                <div>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {partner.classification}
                  </Badge>
                </div>

                {/* Investment */}
                {partner.investment && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold">{partner.investment}</span>
                  </div>
                )}

                {/* Tags */}
                {partner.tags && partner.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {partner.tags.map((tag, index) => (
                      <Badge key={index} className="bg-[#333] text-[#AAAAAA] text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#FF0000] hover:bg-[#CC0000] text-xs"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Contatar
                  </Button>
                  
                  <select
                    value={partner.status}
                    onChange={(e) => handleUpdateStatus(partner.id, e.target.value as PartnerData['status'])}
                    className="px-2 py-1 bg-[#333] border border-[#555] rounded text-white text-xs focus:ring-1 focus:ring-[#FF0000]"
                  >
                    <option value="Interesse">Interesse</option>
                    <option value="Negociando">Negociando</option>
                    <option value="Fechado">Fechado</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#1E1E1E] border-[#333] p-6">
            <div className="flex items-center gap-3">
              <RotateCw className="h-5 w-5 text-[#FF0000] animate-spin" />
              <span className="text-white">Sincronizando dados...</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
