
import React, { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Handshake, Edit, ExternalLink, Mail, Phone, BarChart3, Upload, Download, Settings } from 'lucide-react'
import * as XLSX from 'xlsx'
import { useBulkOperations } from '@/hooks/useBulkOperations'
import { ChannelClassificationService } from '@/services/channelClassificationService'

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
  savedChannels: ChannelData[]
  onSendToPartners?: (channel: ChannelData) => void
}

interface FilterState {
  search: string;
  scoreRange: 'all' | 'high' | 'medium' | 'low';
  subscribersRange: 'all' | 'mega' | 'large' | 'medium' | 'small';
  engagementRange: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'score' | 'subscribers' | 'avgViews' | 'engagement';
  sortOrder: 'asc' | 'desc';
}

export const NewPlanilhaTab = ({ savedChannels, onSendToPartners }: NewPlanilhaTabProps) => {
  const [data, setData] = useState<ChannelData[]>(savedChannels || [])
  const [activeTab, setActiveTab] = useState('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const { toast } = useToast()

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    scoreRange: 'all',
    subscribersRange: 'all',
    engagementRange: 'all',
    sortBy: 'score',
    sortOrder: 'desc'
  })

  // Update local data when savedChannels changes
  React.useEffect(() => {
    if (savedChannels && savedChannels.length > 0) {
      const updatedChannels = savedChannels.map(channel => ({
        ...channel,
        classification: ChannelClassificationService.classifyChannel(channel),
        score: ChannelClassificationService.calculateQualityScore(channel)
      }));
      setData(updatedChannels)
    }
  }, [savedChannels])

  // Apply filters and sorting
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(channel => 
        channel.name.toLowerCase().includes(searchLower) ||
        channel.email.toLowerCase().includes(searchLower) ||
        channel.link.toLowerCase().includes(searchLower)
      );
    }

    // Apply score filter
    if (filters.scoreRange !== 'all') {
      filtered = filtered.filter(channel => {
        const score = channel.score;
        switch (filters.scoreRange) {
          case 'high': return score >= 80;
          case 'medium': return score >= 60 && score < 80;
          case 'low': return score < 60;
          default: return true;
        }
      });
    }

    // Apply subscribers filter
    if (filters.subscribersRange !== 'all') {
      filtered = filtered.filter(channel => {
        const subs = channel.subscribers;
        switch (filters.subscribersRange) {
          case 'mega': return subs >= 1000000;
          case 'large': return subs >= 100000 && subs < 1000000;
          case 'medium': return subs >= 10000 && subs < 100000;
          case 'small': return subs < 10000;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (filters.sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'subscribers':
          aValue = a.subscribers;
          bValue = b.subscribers;
          break;
        case 'avgViews':
          aValue = a.avgViews;
          bValue = b.avgViews;
          break;
        case 'engagement':
          aValue = parseFloat(a.engagement) || 0;
          bValue = parseFloat(b.engagement) || 0;
          break;
        default:
          return 0;
      }

      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [data, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const bulkOps = useBulkOperations(paginatedData);

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

  const exportToExcel = (channels: ChannelData[] = filteredData) => {
    if (channels.length === 0) {
      toast({
        title: "Erro na exportação",
        description: "Não há canais para exportar!",
        variant: "destructive",
      });
      return
    }

    try {
      const worksheetData = channels.map(row => ({
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
      XLSX.writeFile(workbook, `planilha_canais_${new Date().toISOString().split('T')[0]}.xlsx`)

      toast({
        title: "Exportação concluída!",
        description: `${channels.length} canais foram exportados para Excel.`,
      });
    } catch (error) {
      console.error('Erro na exportação:', error);
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  }

  const handleBulkSendToPartners = (channels: ChannelData[]) => {
    try {
      channels.forEach(channel => onSendToPartners?.(channel));
      bulkOps.clearSelection();

      toast({
        title: "Canais enviados!",
        description: `${channels.length} canais foram enviados para parceiros.`,
      });
    } catch (error) {
      console.error('Erro ao enviar para parceiros:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar os canais.",
        variant: "destructive",
      });
    }
  }

  const handleBulkDelete = (channels: ChannelData[]) => {
    try {
      const channelsToDelete = new Set(channels.map(c => c.id || c.name));
      setData(prev => prev.filter(channel => !channelsToDelete.has(channel.id || channel.name)));
      bulkOps.clearSelection();

      toast({
        title: "Canais removidos!",
        description: `${channels.length} canais foram removidos da planilha.`,
      });
    } catch (error) {
      console.error('Erro ao remover canais:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover os canais.",
        variant: "destructive",
      });
    }
  }

  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={bulkOps.isAllSelected}
          onCheckedChange={() => bulkOps.isAllSelected ? bulkOps.clearSelection() : bulkOps.selectAll()}
          className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={bulkOps.isSelected(row.original)}
          onCheckedChange={() => bulkOps.toggleSelection(row.original)}
          className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'photo',
      header: 'Canal',
      cell: (info: any) => {
        const channel = info.row.original
        
        return (
          <div className="p-2 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={info.getValue() || 'https://via.placeholder.com/64'} 
                alt="foto" 
                className="w-10 h-10 rounded-full border border-[#525252] flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm mb-1 truncate" title={channel.name}>
                  {channel.name}
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${ChannelClassificationService.getClassificationColor(channel.classification)}20`,
                    color: ChannelClassificationService.getClassificationColor(channel.classification)
                  }}
                >
                  {channel.classification}
                </Badge>
              </div>
            </div>

            <div className="space-y-1 pl-13">
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 text-[#FF0000] flex-shrink-0" />
                <a 
                  href={channel.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 text-xs hover:underline truncate flex-1"
                  title={channel.link}
                >
                  {channel.link ? 'Ver canal' : 'Link não informado'}
                </a>
              </div>

              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-green-400 flex-shrink-0" />
                <div className="text-green-400 text-xs truncate flex-1" title={channel.email}>
                  {channel.email || 'Não informado'}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-blue-400 flex-shrink-0" />
                <div className="text-blue-400 text-xs" title={channel.phone}>
                  {channel.phone || 'Não informado'}
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    { 
      accessorKey: 'subscribers', 
      header: 'Inscritos',
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-white text-sm mb-1">
            {formatNumber(info.getValue())}
          </div>
          <div className="text-xs text-[#AAAAAA]">inscritos</div>
        </div>
      )
    },
    { 
      accessorKey: 'avgViews', 
      header: 'Média Views',
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-blue-400 text-sm mb-1">
            {formatNumber(info.getValue())}
          </div>
          <div className="text-xs text-[#AAAAAA]">views médias</div>
        </div>
      )
    },
    { 
      accessorKey: 'engagement', 
      header: 'Engajamento',
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-green-400 text-sm mb-1">
            {info.getValue() || '0.0'}%
          </div>
          <div className="text-xs text-[#AAAAAA]">engajamento</div>
        </div>
      )
    },
    { 
      accessorKey: 'score', 
      header: 'Score',
      cell: (info: any) => (
        <div className="text-center p-2">
          <div className="font-bold text-yellow-400 text-lg mb-1">
            {info.getValue() || 0}
          </div>
          <div className="text-xs text-[#AAAAAA]">pontos</div>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: (info: any) => {
        const channel = info.row.original
        
        return (
          <div className="flex gap-1 justify-center p-2">
            <Button
              onClick={() => onSendToPartners?.(channel)}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white h-7 px-2"
            >
              <Handshake className="h-3 w-3" />
            </Button>
          </div>
        )
      }
    }
  ], [bulkOps, onSendToPartners])

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">CRM de Canais</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => exportToExcel()}
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="text-[#AAAAAA] text-sm">Total de Canais</div>
          <div className="text-2xl font-bold text-white">{data.length}</div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="text-[#AAAAAA] text-sm">Score Médio</div>
          <div className="text-2xl font-bold text-yellow-400">
            {data.length > 0 ? Math.round(data.reduce((sum, c) => sum + c.score, 0) / data.length) : 0}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="text-[#AAAAAA] text-sm">Alta Qualidade</div>
          <div className="text-2xl font-bold text-green-400">
            {data.filter(c => c.score >= 70).length}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#525252] rounded-lg p-4">
          <div className="text-[#AAAAAA] text-sm">Com Contato</div>
          <div className="text-2xl font-bold text-blue-400">
            {data.filter(c => c.email && c.phone).length}
          </div>
        </div>
      </div>

      {/* Bulk Operations */}
      {bulkOps.selectedCount > 0 && (
        <div className="bg-[#FF0000]/10 border-[#FF0000]/30 border rounded-lg p-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                {bulkOps.selectedCount} canal{bulkOps.selectedCount > 1 ? 'is' : ''} selecionado{bulkOps.selectedCount > 1 ? 's' : ''}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={bulkOps.clearSelection}
                className="text-[#AAAAAA] hover:text-white h-7"
              >
                Limpar seleção
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => exportToExcel(bulkOps.getSelectedItems())}
                size="sm"
                variant="outline"
                className="border-[#FF0000]/50 bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 h-8"
              >
                <Download className="h-3 w-3 mr-1" />
                Exportar
              </Button>
              
              <Button
                onClick={() => handleBulkSendToPartners(bulkOps.getSelectedItems())}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white h-8"
              >
                <Handshake className="h-3 w-3 mr-1" />
                Enviar para Parceiros
              </Button>
            </div>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#1E1E1E] border border-[#525252]">
          <TabsTrigger 
            value="table" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <Settings className="h-4 w-4 mr-2" />
            Tabela de Canais
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white text-[#AAAAAA]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] overflow-hidden">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="border-b border-[#525252] hover:bg-transparent">
                    {headerGroup.headers.map(header => (
                      <TableHead 
                        key={header.id} 
                        className="bg-[#0D0D0D] text-[#AAAAAA] font-medium border-r border-[#525252] last:border-r-0"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-b border-[#525252] ${
                      index % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1E1E1E]'
                    } hover:bg-[#2A2A2A] transition-colors`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell 
                        key={cell.id} 
                        className="border-r border-[#525252] last:border-r-0 p-2"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="text-center py-12 text-[#AAAAAA]">
                <div className="text-lg mb-2">
                  {data.length === 0 ? 'Nenhum canal encontrado' : 'Nenhum canal corresponde aos filtros'}
                </div>
                <div className="text-sm">
                  {data.length === 0 ? 'Adicione canais através da aba de Análise' : 'Tente ajustar os filtros de busca'}
                </div>
              </div>
            )}

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-[#1E1E1E] border-t border-[#525252]">
                <div className="text-sm text-[#AAAAAA]">
                  Página {currentPage} de {totalPages} • {filteredData.length} canais
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="bg-[#1E1E1E] rounded-lg border border-[#525252] p-6">
            <h3 className="text-xl font-bold text-white mb-4">Analytics em Desenvolvimento</h3>
            <p className="text-[#AAAAAA]">Funcionalidades de analytics serão implementadas em breve.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const usePlanilhaData = () => {
  const [planilhaChannels, setPlanilhaChannels] = useState<ChannelData[]>([])

  const addToPlanilha = (channelData: any) => {
    const calcularEngajamento = (channel: any) => {
      if (channel.engagement && typeof channel.engagement === 'string') {
        return channel.engagement
      }
      
      if (channel.avgLikes && channel.avgComments && channel.avgViews) {
        const totalInteractions = (channel.avgLikes + channel.avgComments)
        const engagementRate = (totalInteractions / channel.avgViews) * 100
        return Math.min(engagementRate, 15).toFixed(1)
      }
      
      const subscribers = channel.subscriberCount || channel.subscribers || 0
      const avgViews = channel.avgViews || (channel.viewCount / Math.max(channel.videoCount || 10, 1))
      
      if (avgViews && subscribers > 0) {
        const viewRate = avgViews / subscribers
        
        let estimatedEngagement
        if (viewRate > 0.5) estimatedEngagement = 8.5 + Math.random() * 3
        else if (viewRate > 0.3) estimatedEngagement = 6.0 + Math.random() * 2.5
        else if (viewRate > 0.15) estimatedEngagement = 3.5 + Math.random() * 2.5
        else if (viewRate > 0.05) estimatedEngagement = 2.0 + Math.random() * 1.5
        else estimatedEngagement = 0.5 + Math.random() * 1.5
        
        return estimatedEngagement.toFixed(1)
      }
      
      if (subscribers > 1000000) return (1.5 + Math.random() * 1.5).toFixed(1)
      if (subscribers > 500000) return (2.0 + Math.random() * 2.0).toFixed(1)
      if (subscribers > 100000) return (2.5 + Math.random() * 2.5).toFixed(1)
      if (subscribers > 50000) return (3.0 + Math.random() * 3.0).toFixed(1)
      if (subscribers > 10000) return (3.5 + Math.random() * 3.5).toFixed(1)
      
      return (4.0 + Math.random() * 4.0).toFixed(1)
    }

    const calcularCrescimento = (channel: any) => {
      if (channel.subGrowth) return channel.subGrowth.toString()
      
      const subscribers = channel.subscriberCount || channel.subscribers || 0
      
      if (subscribers < 1000) return (15 + Math.random() * 25).toFixed(0)
      if (subscribers < 10000) return (8 + Math.random() * 17).toFixed(0)
      if (subscribers < 50000) return (5 + Math.random() * 10).toFixed(0)
      if (subscribers < 100000) return (3 + Math.random() * 7).toFixed(0)
      if (subscribers < 500000) return (2 + Math.random() * 6).toFixed(0)
      if (subscribers < 1000000) return (1 + Math.random() * 4).toFixed(0)
      return (0.5 + Math.random() * 2.5).toFixed(0)
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
      monthlyVideos: channelData.monthlyVideos || Math.floor(Math.random() * 15) + 5,
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
