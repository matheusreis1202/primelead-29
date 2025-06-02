
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import * as XLSX from "xlsx"

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
  const [editingCell, setEditingCell] = useState<{rowIndex: number, field: string} | null>(null)

  const handleCellEdit = (rowIndex: number, field: string, value: string) => {
    const updatedRows = [...rows]
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value }
    setRows(updatedRows)
    setEditingCell(null)
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

  const renderEditableCell = (value: any, rowIndex: number, field: string) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.field === field
    
    if (isEditing) {
      return (
        <Input
          defaultValue={value}
          onBlur={(e) => handleCellEdit(rowIndex, field, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCellEdit(rowIndex, field, e.currentTarget.value)
            }
          }}
          className="bg-[#2A2A2A] border-[#525252] text-white h-8"
          autoFocus
        />
      )
    }
    
    return (
      <div 
        onClick={() => setEditingCell({rowIndex, field})}
        className="cursor-pointer hover:bg-[#2A2A2A] p-1 rounded min-h-[2rem] flex items-center"
      >
        {value}
      </div>
    )
  }

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

      <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] overflow-hidden">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#525252] hover:bg-[#2A2A2A]">
                <TableHead className="text-[#AAAAAA]">Foto</TableHead>
                <TableHead className="text-[#AAAAAA]">Nome</TableHead>
                <TableHead className="text-[#AAAAAA]">Link</TableHead>
                <TableHead className="text-[#AAAAAA]">Telefone</TableHead>
                <TableHead className="text-[#AAAAAA]">Inscritos</TableHead>
                <TableHead className="text-[#AAAAAA]">Média Views</TableHead>
                <TableHead className="text-[#AAAAAA]">Freq (mês)</TableHead>
                <TableHead className="text-[#AAAAAA]">Engajamento (%)</TableHead>
                <TableHead className="text-[#AAAAAA]">Crescimento (%)</TableHead>
                <TableHead className="text-[#AAAAAA]">Score</TableHead>
                <TableHead className="text-[#AAAAAA]">Classificação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index} className="border-[#525252] hover:bg-[#2A2A2A]">
                  <TableCell>
                    <img src={row.photo} alt={row.name} width={40} height={40} className="rounded-full" />
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.name, index, 'name')}
                  </TableCell>
                  <TableCell className="text-white">
                    <a href={row.link} target="_blank" className="text-blue-400 underline hover:text-blue-300">
                      {row.link}
                    </a>
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.phone, index, 'phone')}
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.subscribers, index, 'subscribers')}
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.avgViews, index, 'avgViews')}
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.monthlyVideos, index, 'monthlyVideos')}
                  </TableCell>
                  <TableCell className="text-white">
                    {row.engagement}
                  </TableCell>
                  <TableCell className="text-white">
                    {renderEditableCell(row.subGrowth, index, 'subGrowth')}
                  </TableCell>
                  <TableCell className="text-white">
                    {row.score}
                  </TableCell>
                  <TableCell className="text-white">
                    {row.classification}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRows.length === 0 && (
            <div className="text-center py-8 text-[#AAAAAA]">
              Nenhum canal encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
