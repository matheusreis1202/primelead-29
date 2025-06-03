
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Mail, Phone, Youtube, Star, Edit3, Check, X, MessageCircle, Plus, GripVertical } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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
}

interface PartnersTabProps {
  partnershipsData?: PartnerData[]
}

export const PartnersTab = ({ partnershipsData = [] }: PartnersTabProps) => {
  const [partners, setPartners] = useState<PartnerData[]>(partnershipsData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<PartnerData>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const { toast } = useToast()

  const statusColumns = [
    { status: 'Interesse' as const, title: 'Interesse Inicial', color: 'bg-blue-500', bgColor: 'bg-blue-50/10' },
    { status: 'Negociando' as const, title: 'Em Negociação', color: 'bg-yellow-500', bgColor: 'bg-yellow-50/10' },
    { status: 'Fechado' as const, title: 'Parcerias Fechadas', color: 'bg-green-500', bgColor: 'bg-green-50/10' },
    { status: 'Rejeitado' as const, title: 'Rejeitados', color: 'bg-red-500', bgColor: 'bg-red-50/10' }
  ]

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

  const renderPartnerCard = (partner: PartnerData) => {
    const isEditing = editingId === partner.id

    return (
      <Card 
        key={partner.id} 
        className="bg-[#1E1E1E] border-[#333] mb-3 hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing h-fit"
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
                <Badge className={`text-xs px-1.5 py-0 ${getStatusColor(partner.classification)}`}>
                  {partner.classification}
                </Badge>
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
                <Button onClick={() => handleEdit(partner)} size="sm" variant="outline" className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-6 w-6 p-0">
                  <Edit3 className="h-3 w-3" />
                </Button>
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
          
          {isEditing ? (
            <div className="space-y-2">
              <Input
                placeholder="Email (opcional)"
                value={editingData.email || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-6"
              />
              <textarea
                placeholder="Observações..."
                value={editingData.notes || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-[#2A2A2A] border border-[#525252] text-white text-xs rounded-md p-2 h-12 resize-none"
              />
            </div>
          ) : (
            <>
              {partner.email && (
                <div className="flex items-center gap-1 text-xs">
                  <Mail className="h-3 w-3 text-[#AAAAAA] flex-shrink-0" />
                  <span className="text-blue-400 truncate">{partner.email}</span>
                </div>
              )}
              
              {partner.notes && (
                <div className="bg-[#2A2A2A] p-2 rounded text-xs text-[#CCCCCC] border-l-2 border-[#FF0000]">
                  {partner.notes}
                </div>
              )}
            </>
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
      </div>

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
      email: ''
    }
    
    setPartnerships(prev => [...prev, newPartnership])
  }

  return {
    partnerships,
    addPartnership
  }
}
