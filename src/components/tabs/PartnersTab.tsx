
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Mail, Phone, Youtube, Star, Edit3, Check, X, MessageCircle } from 'lucide-react'

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

  const statusColumns = [
    { status: 'Interesse' as const, title: 'Interesse Inicial', color: 'bg-blue-500' },
    { status: 'Negociando' as const, title: 'Em Negociação', color: 'bg-yellow-500' },
    { status: 'Fechado' as const, title: 'Parcerias Fechadas', color: 'bg-green-500' },
    { status: 'Rejeitado' as const, title: 'Rejeitados', color: 'bg-red-500' }
  ]

  const handleStatusChange = (partnerId: string, newStatus: PartnerData['status']) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ))
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
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData({})
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
      case 'Altíssimo Potencial': return 'bg-green-100 text-green-800 border-green-200'
      case 'Grande Potencial': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Médio Potencial': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const renderPartnerCard = (partner: PartnerData) => {
    const isEditing = editingId === partner.id

    return (
      <Card key={partner.id} className="bg-[#1E1E1E] border-[#333] mb-4 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={partner.photo} 
                alt={partner.name}
                className="w-12 h-12 rounded-full border-2 border-[#444]"
              />
              <div>
                {isEditing ? (
                  <Input
                    value={editingData.name || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-sm mb-1"
                  />
                ) : (
                  <CardTitle className="text-white text-lg">{partner.name}</CardTitle>
                )}
                <Badge className={`text-xs ${getStatusColor(partner.classification)}`}>
                  {partner.classification}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{partner.score}</span>
              </div>
              
              {isEditing ? (
                <div className="flex gap-1">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline" className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-8 w-8 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => handleEdit(partner)} size="sm" variant="outline" className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] h-8 w-8 p-0">
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#AAAAAA]" />
              <span className="text-[#AAAAAA]">Inscritos:</span>
              <span className="text-white font-medium">{formatNumber(partner.subscribers)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-[#AAAAAA]" />
              <span className="text-[#AAAAAA]">Avg Views:</span>
              <span className="text-white font-medium">{formatNumber(partner.avgViews)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#AAAAAA]" />
              {isEditing ? (
                <Input
                  value={editingData.phone || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-6 flex-1"
                />
              ) : (
                <>
                  <span className="text-[#AAAAAA]">Tel:</span>
                  <span className="text-white font-medium">{partner.phone}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#AAAAAA]" />
              <span className="text-[#AAAAAA]">Eng:</span>
              <span className="text-green-400 font-medium">{partner.engagement}%</span>
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <Input
                placeholder="Email (opcional)"
                value={editingData.email || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-[#2A2A2A] border-[#525252] text-white text-sm"
              />
              <textarea
                placeholder="Observações..."
                value={editingData.notes || ''}
                onChange={(e) => setEditingData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-[#2A2A2A] border border-[#525252] text-white text-sm rounded-md p-2 h-16 resize-none"
              />
            </div>
          ) : (
            <>
              {partner.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#AAAAAA]" />
                  <span className="text-blue-400">{partner.email}</span>
                </div>
              )}
              
              {partner.notes && (
                <div className="bg-[#2A2A2A] p-2 rounded text-sm text-[#CCCCCC]">
                  {partner.notes}
                </div>
              )}
            </>
          )}
          
          <div className="pt-2">
            <Select 
              value={partner.status} 
              onValueChange={(value) => handleStatusChange(partner.id, value as PartnerData['status'])}
            >
              <SelectTrigger className="bg-[#2A2A2A] border-[#525252] text-white">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map(column => (
          <div key={column.status} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
              <h3 className="text-white font-semibold">{column.title}</h3>
              <Badge variant="secondary" className="bg-[#333] text-[#AAAAAA]">
                {getPartnersByStatus(column.status).length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {getPartnersByStatus(column.status).map(partner => renderPartnerCard(partner))}
              
              {getPartnersByStatus(column.status).length === 0 && (
                <div className="bg-[#1A1A1A] border border-dashed border-[#444] rounded-lg p-6 text-center">
                  <p className="text-[#666] text-sm">Nenhuma parceria neste status</p>
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
