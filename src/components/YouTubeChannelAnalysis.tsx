
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Channel } from "@/pages/Index"

interface ChannelData {
  name: string
  subscribers: number
  avgViews: number
  monthlyVideos: number
  avgLikes: number
  avgComments: number
  subGrowth: number
}

interface YouTubeChannelAnalysisProps {
  channelData: ChannelData
}

export default function YouTubeChannelAnalysis({ channelData }: YouTubeChannelAnalysisProps) {
  const [score, setScore] = useState(0)
  const [classification, setClassification] = useState("")

  useEffect(() => {
    if (channelData) {
      const computedScore = calculateScore(channelData)
      setScore(computedScore)
      setClassification(getClassification(computedScore))
    }
  }, [channelData])

  const calculateScore = (data: ChannelData) => {
    let score = 0

    // Frequência
    const freq = data.monthlyVideos
    if (freq > 20) score += 10
    else if (freq >= 10) score += 7
    else score += 3

    // Visualizações médias
    const avgViews = data.avgViews
    if (avgViews > 100000) score += 10
    else if (avgViews >= 50000) score += 7
    else if (avgViews >= 10000) score += 5
    else score += 2

    // Inscritos
    const subs = data.subscribers
    if (subs > 1000000) score += 10
    else if (subs >= 500000) score += 8
    else if (subs >= 100000) score += 6
    else if (subs >= 10000) score += 4
    else score += 2

    // Engajamento
    const engagementRate = (data.avgLikes + data.avgComments) / data.avgViews
    if (engagementRate > 0.10) score += 10
    else if (engagementRate >= 0.05) score += 7
    else if (engagementRate >= 0.02) score += 5
    else score += 2

    // Crescimento
    const growth = data.subGrowth
    if (growth > 50) score += 10
    else if (growth >= 20) score += 7
    else if (growth >= 5) score += 5
    else score += 2

    return score
  }

  const getClassification = (score: number) => {
    if (score >= 45) return "Altíssimo Potencial"
    if (score >= 35) return "Grande Potencial"
    if (score >= 25) return "Médio Potencial"
    return "Baixo Potencial"
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white">Análise do Canal</h2>
      <div className="space-y-2 text-white">
        <p><strong>Nome:</strong> {channelData.name}</p>
        <p><strong>Inscritos:</strong> {channelData.subscribers.toLocaleString()}</p>
        <p><strong>Média de Visualizações:</strong> {channelData.avgViews.toLocaleString()}</p>
        <p><strong>Frequência de Vídeos:</strong> {channelData.monthlyVideos} vídeos/mês</p>
        <p><strong>Engajamento:</strong> {((channelData.avgLikes + channelData.avgComments) / channelData.avgViews * 100).toFixed(2)}%</p>
        <p><strong>Crescimento:</strong> {channelData.subGrowth}% nos últimos 90 dias</p>
      </div>

      <div className="space-y-2">
        <p className="text-white"><strong>Score:</strong> {score} / 50</p>
        <Progress value={(score / 50) * 100} className="h-3" />
        <Badge variant="outline" className="text-white">{classification}</Badge>
      </div>
    </Card>
  )
}
