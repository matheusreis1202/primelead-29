
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Phone, Mail, Calendar, ExternalLink } from 'lucide-react'

interface Partnership {
  id: string
  foto: string
  nome: string
  link: string
  contato: string
  email: string
  tipo: string
  data: string
  status: 'Interesse' | 'Negociando' | 'Fechado' | 'Rejeitado'
  observacoes: string
  valor?: string
  prazo?: string
}

interface PartnersTabProps {
  partnershipsData?: Partnership[]
  onAddPartnership?: (partnership: Partnership) => void
}

export const PartnersTab = ({ partnershipsData = [], onAddPartnership }: PartnersTabProps) => {
  const [parcerias, setParcerias] = useState<Partnership[]>(partnershipsData)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [novaParceria, setNovaParceria] = useState({
    foto: "https://via.placeholder.com/64",
    nome: "",
    link: "",
    contato: "",
    email: "",
    tipo: "Publicidade",
    data: new Date().toISOString().slice(0, 10),
    status: "Interesse" as const,
    observacoes: "",
    valor: "",
    prazo: ""
  })

  const handleAdd = () => {
    const newPartnership: Partnership = { 
      ...novaParceria, 
      id: Date.now().toString()
    }
    setParcerias([...parcerias, newPartnership])
    onAddPartnership?.(newPartnership)
    setNovaParceria({
      foto: "https://via.placeholder.com/64",
      nome: "",
      link: "",
      contato: "",
      email: "",
      tipo: "Publicidade",
      data: new Date().toISOString().slice(0, 10),
      status: "Interesse",
      observacoes: "",
      valor: "",
      prazo: ""
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setParcerias(parcerias.filter(p => p.id !== id))
  }

  const handleStatusChange = (id: string, newStatus: Partnership['status']) => {
    setParcerias(parcerias.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ))
  }

  const statusConfig = {
    'Interesse': { color: 'bg-blue-100 text-blue-700 border-blue-200', bgColor: 'bg-blue-50' },
    'Negociando': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', bgColor: 'bg-yellow-50' },
    'Fechado': { color: 'bg-green-100 text-green-700 border-green-200', bgColor: 'bg-green-50' },
    'Rejeitado': { color: 'bg-red-100 text-red-700 border-red-200', bgColor: 'bg-red-50' }
  }

  const getParceirasByStatus = (status: Partnership['status']) => {
    return parcerias.filter(p => p.status === status)
  }

  const renderCard = (parceria: Partnership) => (
    <Card key={parceria.id} className="mb-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={parceria.foto} 
              alt={parceria.nome} 
              className="w-10 h-10 rounded-full border-2 border-gray-200" 
            />
            <div>
              <CardTitle className="text-sm font-semibold text-gray-800">{parceria.nome}</CardTitle>
              <a 
                href={parceria.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Ver Canal
              </a>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setEditingId(parceria.id)}
              className="h-6 w-6 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => handleDelete(parceria.id)}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center text-xs text-gray-600">
          <Phone className="w-3 h-3 mr-1" />
          {parceria.contato}
        </div>
        {parceria.email && (
          <div className="flex items-center text-xs text-gray-600">
            <Mail className="w-3 h-3 mr-1" />
            {parceria.email}
          </div>
        )}
        <div className="flex items-center text-xs text-gray-600">
          <Calendar className="w-3 h-3 mr-1" />
          {parceria.data}
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-700">Tipo: {parceria.tipo}</div>
          {parceria.valor && (
            <div className="text-xs text-gray-600">Valor: {parceria.valor}</div>
          )}
          {parceria.prazo && (
            <div className="text-xs text-gray-600">Prazo: {parceria.prazo}</div>
          )}
        </div>
        {parceria.observacoes && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            {parceria.observacoes}
          </div>
        )}
        <Select value={parceria.status} onValueChange={(value) => handleStatusChange(parceria.id, value as Partnership['status'])}>
          <SelectTrigger className="h-6 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Interesse">Interesse</SelectItem>
            <SelectItem value="Negociando">Negociando</SelectItem>
            <SelectItem value="Fechado">Fechado</SelectItem>
            <SelectItem value="Rejeitado">Rejeitado</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Sistema de Parcerias</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Parceria
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1E1E1E] border-[#525252] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input 
              placeholder="Nome do Canal" 
              value={novaParceria.nome} 
              onChange={e => setNovaParceria({ ...novaParceria, nome: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Link do Canal" 
              value={novaParceria.link} 
              onChange={e => setNovaParceria({ ...novaParceria, link: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Telefone" 
              value={novaParceria.contato} 
              onChange={e => setNovaParceria({ ...novaParceria, contato: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Email" 
              value={novaParceria.email} 
              onChange={e => setNovaParceria({ ...novaParceria, email: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Tipo de Parceria" 
              value={novaParceria.tipo} 
              onChange={e => setNovaParceria({ ...novaParceria, tipo: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Valor estimado" 
              value={novaParceria.valor} 
              onChange={e => setNovaParceria({ ...novaParceria, valor: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Input 
              placeholder="Prazo" 
              value={novaParceria.prazo} 
              onChange={e => setNovaParceria({ ...novaParceria, prazo: e.target.value })}
              className="bg-[#2A2A2A] border-[#525252] text-white"
            />
            <Select value={novaParceria.status} onValueChange={(value) => setNovaParceria({ ...novaParceria, status: value as Partnership['status'] })}>
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
            <div className="md:col-span-2">
              <Textarea 
                placeholder="Observações" 
                value={novaParceria.observacoes} 
                onChange={e => setNovaParceria({ ...novaParceria, observacoes: e.target.value })}
                className="bg-[#2A2A2A] border-[#525252] text-white"
              />
            </div>
            <div className="md:col-span-2 flex space-x-2">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                Adicionar Parceria
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]">
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Colunas estilo Trello */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(['Interesse', 'Negociando', 'Fechado', 'Rejeitado'] as const).map(status => (
          <div key={status} className={`rounded-lg p-4 ${statusConfig[status].bgColor} border-2 ${statusConfig[status].color.split(' ')[2]}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{status}</h3>
              <Badge className={statusConfig[status].color}>
                {getParceirasByStatus(status).length}
              </Badge>
            </div>
            <div className="space-y-3">
              {getParceirasByStatus(status).map(renderCard)}
              {getParceirasByStatus(status).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-sm">Nenhuma parceria em {status.toLowerCase()}</div>
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
  const [partnerships, setPartnerships] = useState<Partnership[]>([])

  const addPartnership = (partnershipData: any) => {
    const newPartnership: Partnership = {
      id: Date.now().toString(),
      foto: partnershipData.photo || partnershipData.thumbnail || 'https://via.placeholder.com/64',
      nome: partnershipData.name || partnershipData.title,
      link: partnershipData.link || `https://youtube.com/channel/${partnershipData.id}`,
      contato: partnershipData.contato || '+55 11 00000-0000',
      email: '',
      tipo: 'Publicidade',
      data: new Date().toISOString().slice(0, 10),
      status: 'Interesse',
      observacoes: `Canal com ${partnershipData.subscribers || partnershipData.subscriberCount} inscritos`,
      valor: '',
      prazo: ''
    }
    
    setPartnerships(prev => [...prev, newPartnership])
  }

  return {
    partnerships,
    addPartnership
  }
}
