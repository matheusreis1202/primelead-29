
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Partnership {
  foto: string
  nome: string
  link: string
  contato: string
  tipo: string
  data: string
  status: string
  observacoes: string
}

interface PartnersTabProps {
  partnershipsData?: Partnership[]
  onAddPartnership?: (partnership: Partnership) => void
}

export const PartnersTab = ({ partnershipsData = [], onAddPartnership }: PartnersTabProps) => {
  const [parcerias, setParcerias] = useState<Partnership[]>(partnershipsData)

  const [novaParceria, setNovaParceria] = useState({
    foto: "https://via.placeholder.com/64",
    nome: "",
    link: "",
    contato: "",
    tipo: "Publicidade",
    data: new Date().toISOString().slice(0, 10),
    status: "Ativa",
    observacoes: ""
  })

  const [busca, setBusca] = useState("")

  const handleAdd = () => {
    const newPartnership = { ...novaParceria }
    setParcerias([...parcerias, newPartnership])
    onAddPartnership?.(newPartnership)
    setNovaParceria({
      foto: "https://via.placeholder.com/64",
      nome: "",
      link: "",
      contato: "",
      tipo: "Publicidade",
      data: new Date().toISOString().slice(0, 10),
      status: "Ativa",
      observacoes: ""
    })
  }

  const handleDelete = (index: number) => {
    setParcerias(parcerias.filter((_, i) => i !== index))
  }

  const statusColor = (status: string) => {
    if (status === "Ativa") return "bg-green-100 text-green-700"
    if (status === "Inativa") return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  const filtradas = parcerias.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Parcerias Fechadas</h1>

      {/* Formulário */}
      <div className="grid gap-2 md:grid-cols-2">
        <Input 
          placeholder="Nome do Canal" 
          value={novaParceria.nome} 
          onChange={e => setNovaParceria({ ...novaParceria, nome: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Input 
          placeholder="Link do Canal" 
          value={novaParceria.link} 
          onChange={e => setNovaParceria({ ...novaParceria, link: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Input 
          placeholder="Contato" 
          value={novaParceria.contato} 
          onChange={e => setNovaParceria({ ...novaParceria, contato: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Input 
          placeholder="Tipo de Parceria" 
          value={novaParceria.tipo} 
          onChange={e => setNovaParceria({ ...novaParceria, tipo: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Input 
          placeholder="Status" 
          value={novaParceria.status} 
          onChange={e => setNovaParceria({ ...novaParceria, status: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Input 
          placeholder="Observações" 
          value={novaParceria.observacoes} 
          onChange={e => setNovaParceria({ ...novaParceria, observacoes: e.target.value })}
          className="bg-[#1E1E1E] border-[#525252] text-white"
        />
        <Button 
          onClick={handleAdd}
          className="futuristic-button"
        >
          Adicionar Parceria
        </Button>
      </div>

      {/* Campo de busca */}
      <Input 
        placeholder="Buscar parcerias..." 
        value={busca} 
        onChange={e => setBusca(e.target.value)} 
        className="max-w-sm bg-[#1E1E1E] border-[#525252] text-white"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((p, idx) => (
          <Card key={idx} className="p-4 space-y-3 shadow hover:shadow-lg rounded-2xl bg-[#1E1E1E] border-[#525252]">
            <div className="flex items-center space-x-3">
              <img src={p.foto} alt={p.nome} className="w-12 h-12 rounded-full border border-[#525252]" />
              <div>
                <h2 className="text-lg font-semibold text-white">{p.nome}</h2>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:text-blue-300">Visitar Canal</a>
              </div>
            </div>
            <CardContent className="space-y-1 text-[#AAAAAA]">
              <p><strong>Contato:</strong> {p.contato}</p>
              <p><strong>Tipo:</strong> {p.tipo}</p>
              <p><strong>Data:</strong> {p.data}</p>
              <p><strong>Observações:</strong> {p.observacoes}</p>
            </CardContent>
            <Badge className={`${statusColor(p.status)} py-1 px-2 rounded`}>{p.status}</Badge>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDelete(idx)}
                className="border-[#525252] text-[#AAAAAA] hover:bg-[#525252]"
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="text-center py-8 text-[#AAAAAA]">
          Nenhuma parceria encontrada
        </div>
      )}
    </div>
  )
}

export const usePartnersData = () => {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])

  const addPartnership = (partnershipData: any) => {
    const newPartnership: Partnership = {
      foto: partnershipData.photo || partnershipData.thumbnail || 'https://via.placeholder.com/64',
      nome: partnershipData.name || partnershipData.title,
      link: partnershipData.link || `https://youtube.com/channel/${partnershipData.id}`,
      contato: partnershipData.contato || '+55 11 00000-0000',
      tipo: 'Publicidade',
      data: new Date().toISOString().slice(0, 10),
      status: 'Ativa',
      observacoes: `Canal com ${partnershipData.subscribers || partnershipData.subscriberCount} inscritos`
    }
    
    setPartnerships(prev => [...prev, newPartnership])
  }

  return {
    partnerships,
    addPartnership
  }
}
