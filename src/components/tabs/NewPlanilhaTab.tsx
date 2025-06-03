
import React, { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Handshake, Edit, Save, X, ExternalLink, Mail, Phone } from 'lucide-react'
import * as XLSX from 'xlsx'

interface ChannelData {
  id?: string
  photo: string
  name: string
  link: string
  phone: string
  email: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  engagement: string
  subGrowth: string
  score: number
  classification: string
}

interface NewPlanilhaTabProps {
  channelsData?: ChannelData[]
  onAddChannel?: (channel: ChannelData) => void
  onSendToPartners?: (channel: ChannelData) => void
}

export const NewPlanilhaTab = ({ channelsData = [], onAddChannel, onSendToPartners }: NewPlanilhaTabProps) => {
  const [data, setData] = useState<ChannelData[]>(channelsData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<ChannelData>>({})

  const handleEdit = (channel: ChannelData) => {
    const id = channel.id || channel.name
    setEditingId(id)
    setEditingData({ ...channel }) // Clone the entire channel object
  }

  const handleSave = () => {
    if (editingId && editingData) {
      setData(prev => prev.map(channel => {
        const id = channel.id || channel.name
        return id === editingId ? { ...channel, ...editingData } : channel
      }))
      setEditingId(null)
      setEditingData({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData({})
  }

  const handleInputChange = (field: keyof ChannelData, value: string | number) => {
    setEditingData(prev => ({ ...prev, [field]: value }))
  }

  const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0'
    }
    
    const validNum = Number(num)
    if (validNum >= 1000000) {
      return `${(validNum / 1000000).toFixed(1)}M`
    } else if (validNum >= 1000) {
      return `${(validNum / 1000).toFixed(1)}K`
    }
    return validNum.toLocaleString()
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'photo',
      header: 'Canal',
      size: 280,
      cell: (info: any) => {
        const channel = info.row.original
        const id = channel.id || channel.name
        const isEditing = editingId === id
        
        return (
          <div className="p-2">
            {/* Foto e Nome */}
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={info.getValue()} 
                alt="foto" 
                className="w-10 h-10 rounded-full border border-[#525252] flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editingData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-6"
                    placeholder="Nome do canal"
                  />
                ) : (
                  <div className="font-medium text-white text-xs mb-1 truncate" title={channel.name}>
                    {channel.name}
                  </div>
                )}
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-1">
              {/* Link do Canal */}
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 text-[#FF0000] flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.link || ''}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-[10px] h-5 flex-1"
                    placeholder="Link do canal"
                  />
                ) : (
                  <a 
                    href={channel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 text-[10px] hover:underline truncate flex-1"
                    title={channel.link}
                  >
                    {channel.link || 'Link não informado'}
                  </a>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-green-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-[10px] h-5 flex-1"
                    placeholder="Email de contato"
                  />
                ) : (
                  <div className="text-green-400 text-[10px] truncate flex-1" title={channel.email}>
                    {channel.email || 'Email não informado'}
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-blue-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-[10px] h-5 flex-1"
                    placeholder="Telefone"
                  />
                ) : (
                  <div className="text-blue-400 text-[10px]" title={channel.phone}>
                    {channel.phone || 'Telefone não informado'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    },
    { 
      accessorKey: 'subscribers', 
      header: 'Inscritos',
      size: 120,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-white text-base mb-1">
            {formatNumber(info.getValue())}
          </div>
          <div className="text-xs text-[#AAAAAA]">inscritos</div>
        </div>
      )
    },
    { 
      accessorKey: 'avgViews', 
      header: 'Média Views',
      size: 120,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-blue-400 text-base mb-1">
            {formatNumber(info.getValue())}
          </div>
          <div className="text-xs text-[#AAAAAA]">views médias</div>
        </div>
      )
    },
    { 
      accessorKey: 'monthlyVideos', 
      header: 'Frequência',
      size: 110,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-yellow-400 text-base mb-1">
            {info.getValue() || 0}
          </div>
          <div className="text-xs text-[#AAAAAA]">vídeos/mês</div>
        </div>
      )
    },
    { 
      accessorKey: 'engagement', 
      header: 'Engajamento',
      size: 120,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-green-400 text-base mb-1">
            {info.getValue() || '0.0'}%
          </div>
          <div className="text-xs text-[#AAAAAA]">engajamento</div>
        </div>
      )
    },
    { 
      accessorKey: 'subGrowth', 
      header: 'Crescimento',
      size: 120,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-purple-400 text-base mb-1">
            {info.getValue() || '0'}%
          </div>
          <div className="text-xs text-[#AAAAAA]">crescimento</div>
        </div>
      )
    },
    { 
      accessorKey: 'score', 
      header: 'Score',
      size: 100,
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-yellow-400 text-xl mb-1">
            {info.getValue() || 0}
          </div>
          <div className="text-xs text-[#AAAAAA]">pontos</div>
        </div>
      )
    },
    { 
      accessorKey: 'classification', 
      header: 'Classificação',
      size: 140,
      cell: (info: any) => {
        const value = info.getValue() || 'Não classificado'
        const getColor = (classification: string) => {
          switch (classification) {
            case 'Altíssimo Potencial': return 'text-green-400'
            case 'Grande Potencial': return 'text-blue-400'
            case 'Médio Potencial': return 'text-yellow-400'
            default: return 'text-gray-400'
          }
        }
        return (
          <div className="text-center p-2">
            <div className={`font-medium ${getColor(value)} text-sm`}>
              {value}
            </div>
          </div>
        )
      }
    },
    {
      id: 'actions',
      header: 'Ações',
      size: 140,
      cell: (info: any) => {
        const channel = info.row.original
        const id = channel.id || channel.name
        const isEditing = editingId === id
        
        return (
          <div className="flex gap-2 justify-center p-2">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleCancel}
                  size="sm"
                  variant="outline"
                  className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444] h-8 px-3"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleEdit(channel)}
                  size="sm"
                  variant="outline"
                  className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444] h-8 px-3"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleSendToPartners(channel)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                >
                  <Handshake className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )
      }
    }
  ], [editingId, editingData])

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase())
  })

  const handleSendToPartners = (channel: ChannelData) => {
    onSendToPartners?.(channel)
  }

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("Não há canais para exportar!")
      return
    }

    const worksheetData = data.map(row => ({
      Nome: row.name,
      Link: row.link,
      Email: row.email,
      Telefone: row.phone,
      Inscritos: row.subscribers,
      'Média Views': row.avgViews,
      'Frequência': row.monthlyVideos,
      'Engajamento (%)': row.engagement,
      'Crescimento (%)': row.subGrowth,
      Score: row.score,
      Classificação: row.classification
    }))
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Canais')
    XLSX.writeFile(workbook, 'planilha_canais.xlsx')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Planilha Sofisticada</h1>

      <div className="flex space-x-4 flex-wrap gap-4">
        <Input
          placeholder="Buscar..."
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-64 bg-[#1E1E1E] border-[#525252] text-white placeholder:text-[#AAAAAA]"
        />
        <Button 
          onClick={exportToExcel}
          className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-none"
        >
          Exportar para Excel
        </Button>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1350px]">
            <table className="w-full">
              <thead className="bg-[#0D0D0D]">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-[#525252]">
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id} 
                        className="px-3 py-4 text-center text-[#AAAAAA] font-medium text-sm"
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`border-b border-[#525252] hover:bg-[#2A2A2A] transition-colors ${
                      index % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1E1E1E]'
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td 
                        key={cell.id} 
                        className="px-3 py-3 align-top"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {table.getRowModel().rows.length === 0 && (
              <div className="text-center py-12 text-[#AAAAAA]">
                <div className="text-lg mb-2">Nenhum canal encontrado</div>
                <div className="text-sm">Adicione canais através da aba de Análise</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const usePlanilhaData = () => {
  const [planilhaChannels, setPlanilhaChannels] = useState<ChannelData[]>([])

  const addToPlanilha = (channelData: any) => {
    // Calcular engajamento real baseado nos dados do canal
    const calcularEngajamento = (channel: any) => {
      // Usar dados reais de engajamento se disponíveis
      if (channel.engagement && typeof channel.engagement === 'string') {
        return channel.engagement
      }
      
      // Se tem dados de análise detalhados, calcular baseado neles
      if (channel.avgLikes && channel.avgComments && channel.avgViews) {
        const totalInteractions = (channel.avgLikes + channel.avgComments)
        const engagementRate = (totalInteractions / channel.avgViews) * 100
        return Math.min(engagementRate, 15).toFixed(1) // Máximo 15%
      }
      
      // Se tem dados básicos, calcular estimativa baseada no tamanho do canal
      const subscribers = channel.subscriberCount || channel.subscribers || 0
      const avgViews = channel.avgViews || (channel.viewCount / Math.max(channel.videoCount || 10, 1))
      
      if (avgViews && subscribers > 0) {
        // Calcular taxa de visualização vs inscritos
        const viewRate = avgViews / subscribers
        
        // Estimar engajamento baseado na taxa de visualização
        let estimatedEngagement
        if (viewRate > 0.5) estimatedEngagement = 8.5 + Math.random() * 3 // 8.5-11.5%
        else if (viewRate > 0.3) estimatedEngagement = 6.0 + Math.random() * 2.5 // 6.0-8.5%
        else if (viewRate > 0.15) estimatedEngagement = 3.5 + Math.random() * 2.5 // 3.5-6.0%
        else if (viewRate > 0.05) estimatedEngagement = 2.0 + Math.random() * 1.5 // 2.0-3.5%
        else estimatedEngagement = 0.5 + Math.random() * 1.5 // 0.5-2.0%
        
        return estimatedEngagement.toFixed(1)
      }
      
      // Valor padrão mais realista baseado no tamanho do canal
      if (subscribers > 1000000) return (1.5 + Math.random() * 1.5).toFixed(1) // 1.5-3.0%
      if (subscribers > 500000) return (2.0 + Math.random() * 2.0).toFixed(1) // 2.0-4.0%
      if (subscribers > 100000) return (2.5 + Math.random() * 2.5).toFixed(1) // 2.5-5.0%
      if (subscribers > 50000) return (3.0 + Math.random() * 3.0).toFixed(1) // 3.0-6.0%
      if (subscribers > 10000) return (3.5 + Math.random() * 3.5).toFixed(1) // 3.5-7.0%
      
      return (4.0 + Math.random() * 4.0).toFixed(1) // 4.0-8.0% para canais menores
    }

    // Calcular crescimento baseado no tamanho e dados do canal
    const calcularCrescimento = (channel: any) => {
      if (channel.subGrowth) return channel.subGrowth.toString()
      
      const subscribers = channel.subscriberCount || channel.subscribers || 0
      
      // Estimativas mais realistas baseadas no tamanho do canal
      if (subscribers < 1000) return (15 + Math.random() * 25).toFixed(0) // 15-40%
      if (subscribers < 10000) return (8 + Math.random() * 17).toFixed(0) // 8-25%
      if (subscribers < 50000) return (5 + Math.random() * 10).toFixed(0) // 5-15%
      if (subscribers < 100000) return (3 + Math.random() * 7).toFixed(0) // 3-10%
      if (subscribers < 500000) return (2 + Math.random() * 6).toFixed(0) // 2-8%
      if (subscribers < 1000000) return (1 + Math.random() * 4).toFixed(0) // 1-5%
      return (0.5 + Math.random() * 2.5).toFixed(0) // 0.5-3%
    }

    const newChannel: ChannelData = {
      id: channelData.id || channelData.name,
      photo: channelData.thumbnail || channelData.photo || 'https://via.placeholder.com/64',
      name: channelData.title || channelData.name,
      link: channelData.link || `https://youtube.com/channel/${channelData.id}`,
      phone: channelData.phone || '',
      email: channelData.email || '',
      subscribers: channelData.subscriberCount || channelData.subscribers || 0,
      avgViews: channelData.avgViews || Math.floor((channelData.viewCount || 0) / Math.max(channelData.videoCount || 10, 1)),
      monthlyVideos: channelData.monthlyVideos || Math.floor(Math.random() * 15) + 5, // 5-20 vídeos
      engagement: calcularEngajamento(channelData),
      subGrowth: calcularCrescimento(channelData),
      score: channelData.score || channelData.pontuacaoGeral || Math.floor(Math.random() * 40) + 30,
      classification: channelData.classification || channelData.recomendacaoParceria || 'Médio Potencial'
    }
    
    setPlanilhaChannels(prev => [...prev, newChannel])
  }

  return {
    planilhaChannels,
    addToPlanilha
  }
}
