import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Mail, Phone, Youtube, Star, Edit3, Check, X, MessageCircle, Plus, GripVertical, DollarSign, Handshake, Calendar, TrendingUp, Eye, Settings, Shield, Sync as SyncIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { PartnersAnalytics } from '@/components/PartnersAnalytics'
import { PartnerCommunication } from '@/components/PartnerCommunication'
import { PartnerFollowUps } from '@/components/PartnerFollowUps'
import { PartnerSync } from '@/components/PartnerSync'
import { PartnerOfflineSync } from '@/components/PartnerOfflineSync'
import { PartnerCompliance } from '@/components/PartnerCompliance'

interface PartnerData {
  id: string
  photo: string
  name: string
  phone: string
  subscribers: number
  avgViews: number
  engagement: string
  score: number
  classification: string
  status: 'Interesse' | 'Negociando' | 'Fechado' | 'Rejeitado'
  notes?: string
  email?: string
  partnershipType?: string
  investment?: string
  proposedValue?: string
  negotiatedValue?: string
  finalValue?: string
  roi?: string
  nextFollowUp?: string
  lastContact?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

interface CommunicationEntry {
  id: string
  type: 'email' | 'whatsapp' | 'call' | 'meeting' | 'note'
  date: string
  content: string
  status?: 'sent' | 'delivered' | 'read' | 'replied'
}

interface FollowUp {
  id: string
  partnerId: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'completed' | 'overdue'
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'contract' | 'payment'
}

interface PartnersTabProps {
  partnershipsData?: PartnerData[]
}

export const PartnersTab = ({ partnershipsData = [] }: PartnersTabProps) => {
  const [partners, setPartners] = useState<PartnerData[]>(partnershipsData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<PartnerData>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<PartnerData | null>(null)
  const [communications, setCommunications] = useState<CommunicationEntry[]>([])
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [showAnalytics, setShowAnalytics] = useState(true)
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const [activeAdvancedTab, setActiveAdvancedTab] = useState('sync')
  const { toast } = useToast()

  const statusColumns = [
    { status: 'Interesse' as const, title: 'Interesse Inicial', color: 'bg-blue-500', bgColor: 'bg-blue-50/10' },
    { status: 'Negociando' as const, title: 'Em Negociação', color: 'bg-yellow-500', bgColor: 'bg-yellow-50/10' },
    { status: 'Fechado' as const, title: 'Parcerias Fechadas', color: 'bg-green-500', bgColor: 'bg-green-50/10' },
    { status: 'Rejeitado' as const, title: 'Rejeitados', color: 'bg-red-500', bgColor: 'bg-red-50/10' }
  ]

  // Communication handlers
  const handleAddCommunication = (communication: Omit<CommunicationEntry, 'id' | 'date'>) => {
    const newCommunication: CommunicationEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...communication
    }
    setCommunications(prev => [...prev, newCommunication])
  }

  // Follow-up handlers
  const handleAddFollowUp = (followUp: Omit<FollowUp, 'id'>) => {
    const newFollowUp: FollowUp = {
      id: Date.now().toString(),
      ...followUp
    }
    setFollowUps(prev => [...prev, newFollowUp])
  }

  const handleUpdateFollowUp = (id: string, updates: Partial<FollowUp>) => {
    setFollowUps(prev => prev.map(followUp => 
      followUp.id === id ? { ...followUp, ...updates } : followUp
    ))
  }

  const handleDeleteFollowUp = (id: string) => {
    setFollowUps(prev => prev.filter(followUp => followUp.id !== id))
    toast({
      title: "Follow-up removido",
      description: "Tarefa removida com sucesso",
    })
  }

  // Nova função para sincronização de dados
  const handleDataSync = (syncData: any) => {
    console.log('Dados sincronizados:', syncData);
    
    // Atualizar partners com dados das outras abas
    if (syncData.analysisChannels?.length > 0) {
      const newPartners = syncData.analysisChannels.map((channel: any) => ({
        id: channel.id || Date.now().toString(),
        photo: channel.thumbnail || 'https://via.placeholder.com/64',
        name: channel.title || channel.name,
        phone: '+55 11 00000-0000',
        subscribers: channel.subscriberCount || 0,
        avgViews: channel.avgViews || 0,
        engagement: '0.0',
        score: channel.score || 70,
        classification: 'Médio Potencial',
        status: 'Interesse' as const,
        email: `contato@${(channel.title || 'canal').replace(/\s+/g, '').toLowerCase()}.com`
      }));
      
      setPartners(prev => [...prev, ...newPartners.filter(np => !prev.find(p => p.id === np.id))]);
    }
    
    toast({
      title: "Dados sincronizados",
      description: "Informações atualizadas das outras abas",
    });
  };

  // Status and editing handlers
  const handleStatusChange = (partnerId: string, newStatus: PartnerData['status']) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ))
    
    const partner = partners.find(p => p.id === partnerId)
    if (partner) {
      toast({
        title: "Status atualizado",
        description: `${partner.name} movido para ${newStatus}`,
      })
    }
  }

  const handleEdit = (partner: PartnerData) => {
    setEditingId(partner.id)
    setEditingData(partner)
  }

  const handleSave = () => {
    if (editingId && editingData) {
      setPartners(prev => prev.map(partner => 
        partner.id === editingId ? { ...partner, ...editingData } : partner
      ))
      setEditingId(null)
      setEditingData({})
      toast({
        title: "Parceria atualizada",
        description: "As informações foram salvas com sucesso",
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData({})
  }

  const handleDragStart = (e: React.DragEvent, partnerId: string) => {
    setDraggedItem(partnerId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, newStatus: PartnerData['status']) => {
    e.preventDefault()
    if (draggedItem) {
      handleStatusChange(draggedItem, newStatus)
      setDraggedItem(null)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString()
  }

  const getPartnersByStatus = (status: PartnerData['status']) => {
    return partners.filter(partner => partner.status === status)
  }

  const getStatusColor = (classification: string) => {
    switch (classification) {
      case 'Altíssimo Potencial': return 'bg-green-500 text-white'
      case 'Grande Potencial': return 'bg-blue-500 text-white'
      case 'Médio Potencial': return 'bg-yellow-500 text-black'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-red-500'
      case 'high': return 'border-l-4 border-orange-500'
      case 'medium': return 'border-l-4 border-yellow-500'
      case 'low': return 'border-l-4 border-green-500'
      default: return ''
    }
  }

  const renderPartnerCard = (partner: PartnerData) => {
    const isEditing = editingId === partner.id
    const partnerCommunications = communications.filter(c => c.content.includes(partner.name))
    const partnerFollowUps = followUps.filter(f => f.partnerId === partner.id)
    const hasOverdueFollowUps = partnerFollowUps.some(f => f.status === 'overdue')

    return (
      <Card 
        key={partner.id} 
        className={`bg-[#1E1E1E] border-[#333] mb-3 hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing h-fit ${getPriorityColor(partner.priority)}`}
        draggable={!isEditing}
        onDragStart={(e) => handleDragStart(e, partner.id)}
      >
        <CardHeader className="pb-2 px-3 pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img 
                src={partner.photo} 
                alt={partner.name}
                className="w-8 h-8 rounded-full border border-[#444] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editingData.name || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-6 mb-1"
                  />
                ) : (
                  <CardTitle className="text-white text-sm font-medium truncate leading-tight">
                    {partner.name}
                  </CardTitle>
                )}
                <div className="flex items-center gap-1">
                  <Badge className={`text-[10px] px-1 py-0 h-4 ${getStatusColor(partner.classification)}`}>
                    {partner.classification === 'Altíssimo Potencial' ? 'Alto' : 
                     partner.classification === 'Grande Potencial' ? 'Grande' :
                     partner.classification === 'Médio Potencial' ? 'Médio' : partner.classification}
                  </Badge>
                  {hasOverdueFollowUps && (
                    <Badge className="bg-red-500/20 text-red-400 text-[10px] px-1 py-0 h-4">
                      Atrasado
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-xs">{partner.score}</span>
              </div>
              
              {!isEditing && <GripVertical className="h-3 w-3 text-[#666]" />}
              
              {isEditing ? (
                <div className="flex gap-1">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700 h-6 w-6 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline" className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedPartner(partner)}
                        size="sm" 
                        variant="outline" 
                        className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-6 w-6 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border-[#333]">
                      <DialogHeader>
                        <DialogTitle className="text-white text-xl">
                          Detalhes - {partner.name}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-[#1E1E1E]">
                          <TabsTrigger value="details" className="text-white data-[state=active]:bg-[#FF0000]">
                            Detalhes
                          </TabsTrigger>
                          <TabsTrigger value="communication" className="text-white data-[state=active]:bg-[#FF0000]">
                            Comunicação
                          </TabsTrigger>
                          <TabsTrigger value="followups" className="text-white data-[state=active]:bg-[#FF0000]">
                            Follow-ups
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="details" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-white text-sm">Valor Proposto</label>
                              <Input
                                value={partner.proposedValue || ''}
                                onChange={(e) => setPartners(prev => prev.map(p => 
                                  p.id === partner.id ? { ...p, proposedValue: e.target.value } : p
                                ))}
                                placeholder="R$ 5.000"
                                className="bg-[#2A2A2A] border-[#525252] text-white"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm">Valor Negociado</label>
                              <Input
                                value={partner.negotiatedValue || ''}
                                onChange={(e) => setPartners(prev => prev.map(p => 
                                  p.id === partner.id ? { ...p, negotiatedValue: e.target.value } : p
                                ))}
                                placeholder="R$ 4.500"
                                className="bg-[#2A2A2A] border-[#525252] text-white"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm">Valor Final</label>
                              <Input
                                value={partner.finalValue || ''}
                                onChange={(e) => setPartners(prev => prev.map(p => 
                                  p.id === partner.id ? { ...p, finalValue: e.target.value } : p
                                ))}
                                placeholder="R$ 4.200"
                                className="bg-[#2A2A2A] border-[#525252] text-white"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm">ROI Esperado</label>
                              <Input
                                value={partner.roi || ''}
                                onChange={(e) => setPartners(prev => prev.map(p => 
                                  p.id === partner.id ? { ...p, roi: e.target.value } : p
                                ))}
                                placeholder="300%"
                                className="bg-[#2A2A2A] border-[#525252] text-white"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm">Prioridade</label>
                              <Select 
                                value={partner.priority || 'medium'} 
                                onValueChange={(value) => setPartners(prev => prev.map(p => 
                                  p.id === partner.id ? { ...p, priority: value as PartnerData['priority'] } : p
                                ))}
                              >
                                <SelectTrigger className="bg-[#2A2A2A] border-[#525252] text-white">
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
                        </TabsContent>
                        
                        <TabsContent value="communication">
                          <PartnerCommunication
                            partnerId={partner.id}
                            partnerName={partner.name}
                            communications={partnerCommunications}
                            onAddCommunication={handleAddCommunication}
                          />
                        </TabsContent>
                        
                        <TabsContent value="followups">
                          <PartnerFollowUps
                            partnerId={partner.id}
                            followUps={followUps}
                            onAddFollowUp={handleAddFollowUp}
                            onUpdateFollowUp={handleUpdateFollowUp}
                            onDeleteFollowUp={handleDeleteFollowUp}
                          />
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  
                  <Button onClick={() => handleEdit(partner)} size="sm" variant="outline" className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-6 w-6 p-0">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
              <span className="text-white font-medium truncate">{formatNumber(partner.subscribers)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Youtube className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
              <span className="text-white font-medium truncate">{formatNumber(partner.avgViews)}</span>
            </div>
            
            <div className="flex items-center gap-1 col-span-2">
              <Phone className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
              {isEditing ? (
                <Input
                  value={editingData.phone || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-5 flex-1"
                />
              ) : (
                <span className="text-white text-xs truncate">{partner.phone}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1 col-span-2">
              <MessageCircle className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
              <span className="text-[#AAAAAA] text-xs">Eng:</span>
              <span className="text-green-400 font-medium text-xs">{partner.engagement}%</span>
            </div>
          </div>
          
          {/* Email */}
          <div className="flex items-center gap-1 text-xs">
            <Mail className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
            {isEditing ? (
              <Input
                placeholder="Email"
                value={editingData.email || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-5 flex-1"
              />
            ) : (
              <span className="text-blue-400 text-xs truncate">{partner.email || 'Não informado'}</span>
            )}
          </div>

          {/* Tipo de Parceria */}
          <div className="flex items-center gap-1 text-xs">
            <Handshake className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
            {isEditing ? (
              <Select 
                value={editingData.partnershipType || ''} 
                onValueChange={(value) => setEditingData(prev => ({ ...prev, partnershipType: value }))}
              >
                <SelectTrigger className="bg-[#2A2A2A] border-[#525252] text-white h-5 text-xs flex-1">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patrocínio">Patrocínio</SelectItem>
                  <SelectItem value="Colaboração">Colaboração</SelectItem>
                  <SelectItem value="Afiliação">Afiliação</SelectItem>
                  <SelectItem value="Brand Deal">Brand Deal</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-purple-400 text-xs truncate">{partner.partnershipType || 'Não definido'}</span>
            )}
          </div>

          {/* Investimento */}
          <div className="flex items-center gap-1 text-xs">
            <DollarSign className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
            {isEditing ? (
              <Input
                placeholder="Investimento"
                value={editingData.investment || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, investment: e.target.value }))}
                className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-5 flex-1"
              />
            ) : (
              <span className="text-green-400 text-xs truncate">{partner.investment || 'Não definido'}</span>
            )}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <textarea
                placeholder="Observações..."
                value={editingData.notes || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-[#2A2A2A] border border-[#525252] text-white text-xs rounded-md p-2 h-12 resize-none"
              />
            </div>
          )}
          
          {!isEditing && partner.notes && (
            <div className="bg-[#2A2A2A] p-2 rounded text-xs text-[#CCCCCC] border-l-2 border-[#FF0000]">
              {partner.notes}
            </div>
          )}
          
          <div className="pt-1">
            <Select 
              value={partner.status} 
              onValueChange={(value) => handleStatusChange(partner.id, value as PartnerData['status'])}
            >
              <SelectTrigger className="bg-[#2A2A2A] border-[#525252] text-white h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Interesse">Interesse</SelectItem>
                <SelectItem value="Negociando">Negociando</SelectItem>
                <SelectItem value="Fechado">Fechado</SelectItem>
                <SelectItem value="Rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (partners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-green-600 p-8 rounded-full mb-8 shadow-xl">
          <User className="h-16 w-16 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Nenhuma Parceria Registrada
        </h3>
        <p className="text-[#AAAAAA] max-w-lg text-lg leading-relaxed">
          Envie canais da aba Análise ou Planilha para começar a gerenciar suas parcerias.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Gestão de Parcerias</h2>
          <p className="text-[#AAAAAA]">{partners.length} parceria(s) registrada(s)</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAnalytics(!showAnalytics)}
            variant="outline"
            className="border-[#525252] bg-[#2A2A2A] text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {showAnalytics ? 'Ocultar' : 'Mostrar'} Analytics
          </Button>
          <Button
            onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
            variant="outline"
            className="border-[#525252] bg-[#2A2A2A] text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Recursos Avançados
          </Button>
        </div>
      </div>

      {showAnalytics && <PartnersAnalytics partners={partners} />}

      {/* Funcionalidades Avançadas */}
      {showAdvancedFeatures && (
        <Card className="bg-[#1E1E1E] border-[#333]">
          <CardHeader>
            <CardTitle className="text-white">Recursos Avançados</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeAdvancedTab} onValueChange={setActiveAdvancedTab}>
              <TabsList className="grid w-full grid-cols-3 bg-[#2A2A2A]">
                <TabsTrigger value="sync" className="text-white data-[state=active]:bg-[#FF0000]">
                  <SyncIcon className="h-4 w-4 mr-2" />
                  Sincronização
                </TabsTrigger>
                <TabsTrigger value="offline" className="text-white data-[state=active]:bg-[#FF0000]">
                  Modo Offline
                </TabsTrigger>
                <TabsTrigger value="compliance" className="text-white data-[state=active]:bg-[#FF0000]">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sync" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PartnerSync 
                    onDataSync={handleDataSync}
                    lastSyncTime={localStorage.getItem('lastPartnerSync') || undefined}
                  />
                  
                  <Card className="bg-[#2A2A2A] border-[#525252]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Integração Cross-Tab</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-[#AAAAAA] text-sm">
                        Sincronização automática com:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">Aba Análise</span>
                          <Badge className="bg-green-500/20 text-green-400 text-xs">Ativo</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">Email Marketing</span>
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">Integrado</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">Planilha</span>
                          <Badge className="bg-purple-500/20 text-purple-400 text-xs">Sincronizado</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="offline" className="mt-4">
                <PartnerOfflineSync />
              </TabsContent>
              
              <TabsContent value="compliance" className="mt-4">
                <PartnerCompliance />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {statusColumns.map(column => (
          <div 
            key={column.status} 
            className={`${column.bgColor} rounded-lg p-3 min-h-[400px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <div className="flex items-center gap-2 mb-4 sticky top-0 bg-[#0D0D0D] py-2 -mx-3 px-3 rounded-t-lg">
              <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
              <h3 className="text-white font-semibold text-sm">{column.title}</h3>
              <Badge variant="secondary" className="bg-[#333] text-[#AAAAAA] text-xs">
                {getPartnersByStatus(column.status).length}
              </Badge>
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF0000] scrollbar-track-[#1E1E1E]">
              {getPartnersByStatus(column.status).map(partner => renderPartnerCard(partner))}
              
              {getPartnersByStatus(column.status).length === 0 && (
                <div className="bg-[#1A1A1A] border border-dashed border-[#444] rounded-lg p-4 text-center">
                  <Plus className="h-6 w-6 text-[#666] mx-auto mb-2" />
                  <p className="text-[#666] text-xs">Arraste parceiros aqui</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ... keep existing code (usePartnersData hook)

export const usePartnersData = () => {
  const [partnerships, setPartnerships] = useState<PartnerData[]>([])

  const addPartnership = (channelData: any) => {
    const newPartnership: PartnerData = {
      id: channelData.id || channelData.name || Date.now().toString(),
      photo: channelData.thumbnail || channelData.photo || 'https://via.placeholder.com/64',
      name: channelData.title || channelData.name,
      phone: channelData.phone || '+55 11 00000-0000',
      subscribers: channelData.subscriberCount || channelData.subscribers || 0,
      avgViews: channelData.avgViews || 0,
      engagement: channelData.engagement || '0.0',
      score: channelData.score || 0,
      classification: channelData.classification || 'Médio Potencial',
      status: 'Interesse',
      notes: '',
      email: '',
      partnershipType: '',
      investment: '',
      priority: 'medium'
    }
    
    setPartnerships(prev => [...prev, newPartnership])
  }

  return {
    partnerships,
    addPartnership
  }
}
