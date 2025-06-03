
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
    setEditingData(channel)
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
      size: 300,
      cell: (info: any) => {
        const channel = info.row.original
        const id = channel.id || channel.name
        const isEditing = editingId === id
        
        return (
          <div className="p-4">
            {/* Foto e Nome */}
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={info.getValue()} 
                alt="foto" 
                className="w-16 h-16 rounded-full border border-[#525252] flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editingData.name || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-sm h-8 mb-2"
                    placeholder="Nome do canal"
                  />
                ) : (
                  <div className="font-medium text-white text-lg mb-2 truncate" title={channel.name}>
                    {channel.name}
                  </div>
                )}
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-3">
              {/* Link do Canal */}
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-[#FF0000] flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.link || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, link: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-7 flex-1"
                    placeholder="Link do canal"
                  />
                ) : (
                  <a 
                    href={channel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs hover:underline truncate flex-1"
                    title={channel.link}
                  >
                    {channel.link || 'Link não informado'}
                  </a>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.email || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-7 flex-1"
                    placeholder="Email de contato"
                  />
                ) : (
                  <div className="text-green-400 text-xs truncate flex-1" title={channel.email}>
                    {channel.email || 'Email não informado'}
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editingData.phone || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-[#2A2A2A] border-[#525252] text-white text-xs h-7 flex-1"
                    placeholder="Telefone"
                  />
                ) : (
                  <div className="text-blue-400 text-xs" title={channel.phone}>
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
        <div className="text-center font-medium text-white">
          {formatNumber(info.getValue())}
        </div>
      )
    },
    { 
      accessorKey: 'avgViews', 
      header: 'Média Views',
      size: 120,
      cell: (info: any) => (
        <div className="text-center text-[#AAAAAA]">
          {formatNumber(info.getValue())}
        </div>
      )
    },
    { 
      accessorKey: 'monthlyVideos', 
      header: 'Freq/mês',
      size: 100,
      cell: (info: any) => (
        <div className="text-center text-[#AAAAAA]">
          {info.getValue() || 0}
        </div>
      )
    },
    { 
      accessorKey: 'engagement', 
      header: 'Engajamento',
      size: 120,
      cell: (info: any) => (
        <div className="text-center text-green-400 font-medium">
          {info.getValue() || '0.0'}%
        </div>
      )
    },
    { 
      accessorKey: 'subGrowth', 
      header: 'Crescimento',
      size: 120,
      cell: (info: any) => (
        <div className="text-center text-blue-400 font-medium">
          {info.getValue() || '0'}%
        </div>
      )
    },
    { 
      accessorKey: 'score', 
      header: 'Score',
      size: 80,
      cell: (info: any) => (
        <div className="text-center font-bold text-yellow-400">
          {info.getValue() || 0}
        </div>
      )
    },
    { 
      accessorKey: 'classification', 
      header: 'Classificação',
      size: 160,
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
          <div className={`text-center font-medium ${getColor(value)} text-sm`}>
            {value}
          </div>
        )
      }
    },
    {
      id: 'actions',
      header: 'Ações',
      size: 200,
      cell: (info: any) => {
        const channel = info.row.original
        const id = channel.id || channel.name
        const isEditing = editingId === id
        
        return (
          <div className="flex gap-2 justify-center">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                >
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  onClick={handleCancel}
                  size="sm"
                  variant="outline"
                  className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444] h-8 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleEdit(channel)}
                  size="sm"
                  variant="outline"
                  className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444] h-8 px-2"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  onClick={() => handleSendToPartners(channel)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                >
                  <Handshake className="h-3 w-3" />
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
          className="w-64 bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Button 
          onClick={exportToExcel}
          className="futuristic-button"
        >
          Exportar para Excel
        </Button>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1400px]">
            <table className="w-full">
              <thead className="bg-[#0D0D0D]">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-[#525252]">
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id} 
                        className="px-4 py-4 text-center text-[#AAAAAA] font-medium text-sm"
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
                        className="px-4 py-4 align-top"
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
    const newChannel: ChannelData = {
      id: channelData.id || channelData.name,
      photo: channelData.thumbnail || channelData.photo || 'https://via.placeholder.com/64',
      name: channelData.title || channelData.name,
      link: channelData.link || `https://youtube.com/channel/${channelData.id}`,
      phone: channelData.phone || '+55 11 00000-0000',
      email: channelData.email || 'contato@exemplo.com',
      subscribers: channelData.subscriberCount || channelData.subscribers || 0,
      avgViews: channelData.avgViews || 0,
      monthlyVideos: channelData.monthlyVideos || 10,
      engagement: channelData.engagement || '5.0',
      subGrowth: channelData.subGrowth || '15',
      score: channelData.score || channelData.pontuacaoGeral || 50,
      classification: channelData.classification || channelData.recomendacaoParceria || 'Médio Potencial'
    }
    
    setPlanilhaChannels(prev => [...prev, newChannel])
  }

  return {
    planilhaChannels,
    addToPlanilha
  }
}
