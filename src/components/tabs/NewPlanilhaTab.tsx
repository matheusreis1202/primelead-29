
import React, { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as XLSX from 'xlsx'

interface ChannelData {
  photo: string
  name: string
  link: string
  phone: string
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
}

export const NewPlanilhaTab = ({ channelsData = [], onAddChannel }: NewPlanilhaTabProps) => {
  const [data, setData] = useState<ChannelData[]>(channelsData)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(() => [
    {
      accessorKey: 'photo',
      header: 'Foto',
      cell: (info: any) => (
        <img 
          src={info.getValue()} 
          alt="foto" 
          width={40} 
          height={40} 
          className="rounded-full border border-[#525252]" 
        />
      )
    },
    { 
      accessorKey: 'name', 
      header: 'Nome'
    },
    {
      accessorKey: 'link',
      header: 'Link',
      cell: (info: any) => (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          {info.getValue()}
        </a>
      )
    },
    { accessorKey: 'phone', header: 'Telefone' },
    { accessorKey: 'subscribers', header: 'Inscritos' },
    { accessorKey: 'avgViews', header: 'Média Views' },
    { accessorKey: 'monthlyVideos', header: 'Freq (mês)' },
    { accessorKey: 'engagement', header: 'Engajamento (%)' },
    { accessorKey: 'subGrowth', header: 'Crescimento (%)' },
    { accessorKey: 'score', header: 'Score' },
    { accessorKey: 'classification', header: 'Classificação' }
  ], [])

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

  const addChannel = () => {
    const newChannel: ChannelData = {
      photo: 'https://via.placeholder.com/64',
      name: 'Canal Exemplo',
      link: 'https://youtube.com/channel/UC123456',
      phone: '+55 11 91234-5678',
      subscribers: 150000,
      avgViews: 50000,
      monthlyVideos: 12,
      engagement: '7.5',
      subGrowth: '20',
      score: 42,
      classification: 'Grande Potencial'
    }
    setData(prev => [...prev, newChannel])
    onAddChannel?.(newChannel)
  }

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("Não há canais para exportar!")
      return
    }

    const worksheetData = data.map(row => ({
      Nome: row.name,
      Link: row.link,
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
          onClick={addChannel}
          variant="outline"
          className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]"
        >
          Enviar informações
        </Button>
        <Button 
          onClick={exportToExcel}
          className="futuristic-button"
        >
          Exportar para Excel
        </Button>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] overflow-hidden">
        <div className="max-h-[600px] overflow-auto">
          <table className="w-full">
            <thead className="bg-[#0D0D0D]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-[#525252]">
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="px-4 py-3 text-left text-[#AAAAAA] font-medium"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className="border-b border-[#525252] hover:bg-[#2A2A2A] transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-8 text-[#AAAAAA]">
              Nenhum canal encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook para controlar a planilha globalmente
export const usePlanilhaData = () => {
  const [planilhaChannels, setPlanilhaChannels] = useState<ChannelData[]>([])

  const addToPlanilha = (channelData: any) => {
    const newChannel: ChannelData = {
      photo: channelData.thumbnail || 'https://via.placeholder.com/64',
      name: channelData.title || channelData.name,
      link: `https://youtube.com/channel/${channelData.id}`,
      phone: '+55 11 00000-0000', // Placeholder
      subscribers: channelData.subscriberCount || channelData.inscritos,
      avgViews: channelData.avgViews || Math.floor(channelData.viewCount / 100),
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
