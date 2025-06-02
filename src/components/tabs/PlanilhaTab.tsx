
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import * as XLSX from "xlsx"
import { FileSpreadsheet, Plus } from "lucide-react"

interface ChannelData {
  photoUrl: string
  name: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  avgLikes: number
  avgComments: number
  subGrowth: number
  score: number
  classification: string
  email: string
  phone: string
}

interface PlanilhaTabProps {
  // Props para futura integração com dados salvos
}

export const PlanilhaTab = ({}: PlanilhaTabProps) => {
  const [channels, setChannels] = useState<ChannelData[]>([])

  const handleAddToPlanilha = (channelData: ChannelData) => {
    setChannels([...channels, channelData])
  }

  const exportToExcel = () => {
    if (channels.length === 0) {
      alert("Não há canais para exportar!")
      return
    }

    const worksheetData = channels.map(channel => ({
      "Nome": channel.name,
      "Email": channel.email,
      "Telefone": channel.phone,
      "Inscritos": channel.subscribers,
      "Média de Visualizações": channel.avgViews,
      "Frequência (vídeos/mês)": channel.monthlyVideos,
      "Engajamento (%)": (((channel.avgLikes + channel.avgComments) / channel.avgViews) * 100).toFixed(2),
      "Crescimento (%)": channel.subGrowth,
      "Score": channel.score,
      "Classificação": channel.classification
    }))

    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Canais Analisados")

    XLSX.writeFile(workbook, "planilha_canais.xlsx")
  }

  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-youtube-red p-8 rounded-full mb-8 shadow-xl futuristic-glow">
          <FileSpreadsheet className="h-16 w-16 text-youtube-white" />
        </div>
        <h3 className="text-3xl font-bold text-youtube-white mb-4 font-roboto">
          Planilha Vazia
        </h3>
        <p className="text-youtube-gray max-w-lg text-lg leading-relaxed font-roboto mb-8">
          Você ainda não adicionou nenhum canal à planilha. Os canais analisados aparecerão aqui quando você enviá-los para a planilha.
        </p>
        
        <Button
          variant="outline"
          onClick={() => handleAddToPlanilha({
            photoUrl: "https://via.placeholder.com/64", 
            name: "Exemplo Canal",
            subscribers: 123456,
            avgViews: 50000,
            monthlyVideos: 12,
            avgLikes: 3000,
            avgComments: 500,
            subGrowth: 20,
            score: 42,
            classification: "Grande Potencial",
            email: "exemplo@canal.com",
            phone: "+55 11 91234-5678"
          })}
          className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Canal de Exemplo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-youtube-red p-3 rounded-lg futuristic-glow">
            <FileSpreadsheet className="h-6 w-6 text-youtube-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-youtube-white font-roboto">
              Planilha de Canais Analisados
            </h2>
            <p className="text-youtube-gray font-roboto">
              {channels.length} canal(is) na planilha
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button 
            onClick={exportToExcel} 
            className="futuristic-button"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar para Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAddToPlanilha({
              photoUrl: "https://via.placeholder.com/64", 
              name: "Exemplo Canal",
              subscribers: 123456,
              avgViews: 50000,
              monthlyVideos: 12,
              avgLikes: 3000,
              avgComments: 500,
              subGrowth: 20,
              score: 42,
              classification: "Grande Potencial",
              email: "exemplo@canal.com",
              phone: "+55 11 91234-5678"
            })}
            className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Canal de Exemplo
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel, idx) => (
          <Card key={idx} className="bg-[#1E1E1E] border border-[#525252] p-4 space-y-4 shadow-md hover:shadow-lg transition rounded-2xl">
            <div className="flex items-center space-x-4">
              <img 
                src={channel.photoUrl} 
                alt={channel.name} 
                width={64} 
                height={64} 
                className="rounded-full border border-[#525252]"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">{channel.name}</h2>
                <Badge variant="outline" className="text-white">{channel.classification}</Badge>
              </div>
            </div>

            <CardContent className="space-y-1 p-0">
              <p className="text-white"><strong>Inscritos:</strong> {channel.subscribers.toLocaleString()}</p>
              <p className="text-white"><strong>Média de Views:</strong> {channel.avgViews.toLocaleString()}</p>
              <p className="text-white"><strong>Frequência:</strong> {channel.monthlyVideos} vídeos/mês</p>
              <p className="text-white"><strong>Engajamento:</strong> {((channel.avgLikes + channel.avgComments) / channel.avgViews * 100).toFixed(2)}%</p>
              <p className="text-white"><strong>Crescimento:</strong> {channel.subGrowth}%</p>
              <p className="text-white"><strong>Score:</strong> {channel.score}/50</p>
              <p className="text-white"><strong>Email:</strong> {channel.email}</p>
              <p className="text-white"><strong>Telefone:</strong> {channel.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
