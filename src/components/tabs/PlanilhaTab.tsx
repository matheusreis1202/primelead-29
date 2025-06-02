
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import * as XLSX from "xlsx"
import { DataGrid } from 'react-data-grid'
import 'react-data-grid/lib/styles.css'

interface ChannelData {
  photoUrl: string
  name: string
  channelId: string
  phone: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  avgLikes: number
  avgComments: number
  subGrowth: number
  score: number
  classification: string
}

interface PlanilhaTabProps {
  // Props para futura integração com dados salvos
}

export const PlanilhaTab = ({}: PlanilhaTabProps) => {
  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filterClass, setFilterClass] = useState('')

  const columns = [
    {
      key: 'photo',
      name: 'Foto',
      renderCell: ({ row }: any) => (
        <img src={row.photo} alt={row.name} width={40} height={40} className="rounded-full" />
      )
    },
    { key: 'name', name: 'Nome', editable: true },
    { 
      key: 'link', 
      name: 'Link', 
      editable: true, 
      renderCell: ({ row }: any) => (
        <a href={row.link} target="_blank" className="text-blue-500 underline">
          {row.link}
        </a>
      )
    },
    { key: 'phone', name: 'Telefone', editable: true },
    { key: 'subscribers', name: 'Inscritos', editable: true },
    { key: 'avgViews', name: 'Média Views', editable: true },
    { key: 'monthlyVideos', name: 'Freq (mês)', editable: true },
    { key: 'engagement', name: 'Engajamento (%)', editable: true },
    { key: 'subGrowth', name: 'Crescimento (%)', editable: true },
    { key: 'score', name: 'Score', editable: false },
    { key: 'classification', name: 'Classificação', editable: false },
  ]

  const handleRowsChange = (updatedRows: any[]) => {
    setRows(updatedRows)
  }

  const addChannelToPlanilha = (channelData: ChannelData) => {
    const newRow = {
      photo: channelData.photoUrl,
      name: channelData.name,
      link: `https://youtube.com/channel/${channelData.channelId}`,
      phone: channelData.phone,
      subscribers: channelData.subscribers,
      avgViews: channelData.avgViews,
      monthlyVideos: channelData.monthlyVideos,
      engagement: (((channelData.avgLikes + channelData.avgComments) / channelData.avgViews) * 100).toFixed(2),
      subGrowth: channelData.subGrowth,
      score: channelData.score,
      classification: channelData.classification
    }
    setRows([...rows, newRow])
  }

  const exportToExcel = () => {
    if (rows.length === 0) {
      alert("Não há canais para exportar!")
      return
    }

    const worksheetData = rows.map(row => ({
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Canais")
    XLSX.writeFile(workbook, "planilha_canais.xlsx")
  }

  const filteredRows = rows.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase())
    const matchesClass = filterClass ? row.classification === filterClass : true
    return matchesSearch && matchesClass
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Planilha Sofisticada</h1>

      <div className="flex space-x-4 flex-wrap gap-4">
        <Input 
          placeholder="Buscar..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        
        <Select onValueChange={setFilterClass}>
          <SelectTrigger className="bg-[#1E1E1E] border-[#525252] text-white">
            <SelectValue placeholder="Filtrar por classificação" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] border-[#525252]">
            <SelectItem value="">Todas</SelectItem>
            <SelectItem value="Altíssimo Potencial">Altíssimo Potencial</SelectItem>
            <SelectItem value="Grande Potencial">Grande Potencial</SelectItem>
            <SelectItem value="Médio Potencial">Médio Potencial</SelectItem>
            <SelectItem value="Baixo Potencial">Baixo Potencial</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={exportToExcel} className="futuristic-button">
          Exportar para Excel
        </Button>

        <Button
          variant="outline"
          onClick={() => addChannelToPlanilha({
            photoUrl: "https://via.placeholder.com/64",
            name: "Canal Exemplo",
            channelId: "UC123456",
            phone: "+55 11 91234-5678",
            subscribers: 150000,
            avgViews: 50000,
            monthlyVideos: 12,
            avgLikes: 3000,
            avgComments: 500,
            subGrowth: 20,
            score: 42,
            classification: "Grande Potencial"
          })}
          className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]"
        >
          Enviar informações
        </Button>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4">
        <DataGrid
          columns={columns}
          rows={filteredRows}
          onRowsChange={handleRowsChange}
          className="rdg-light border rounded-lg"
          style={{ 
            height: '500px',
            backgroundColor: '#1E1E1E',
            color: 'white'
          }}
        />
      </div>
    </div>
  )
}
