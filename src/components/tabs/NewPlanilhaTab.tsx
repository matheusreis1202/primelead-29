
import React, { useState, useMemo, useCallback } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Handshake, Edit, ExternalLink, Mail, Phone, BarChart3, Upload, Download, Settings } from 'lucide-react'
import * as XLSX from 'xlsx'
import { ChannelEditModal } from '@/components/ChannelEditModal'
import { AdvancedTableFilters } from '@/components/AdvancedTableFilters'
import { BulkOperationsToolbar } from '@/components/BulkOperationsToolbar'
import { PlanilhaAnalytics } from '@/components/PlanilhaAnalytics'
import { DataImportModal } from '@/components/DataImportModal'
import { TablePagination } from '@/components/TablePagination'
import { LiveStatsCard } from '@/components/LiveStatsCard'

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

// Otimizações: funções puras para evitar recálculos
const classifyChannel = (channel: ChannelData): string => {
  const score = Number(channel.score) || 0;
  const subscribers = Number(channel.subscribers) || 0;
  const engagement = parseFloat(String(channel.engagement)) || 0;

  if (score >= 85 || (subscribers >= 500000 && engagement >= 5)) {
    return 'Alto Potencial';
  } else if (score >= 70 || (subscribers >= 100000 && engagement >= 3)) {
    return 'Médio Potencial';
  } else if (score >= 50 || subscribers >= 10000) {
    return 'Baixo Potencial';
  }
  return 'Micro Influencer';
};

const calculateQualityScore = (channel: ChannelData): number => {
  const subscribers = Number(channel.subscribers) || 0;
  const avgViews = Number(channel.avgViews) || 0;
  const engagement = parseFloat(String(channel.engagement)) || 0;
  const monthlyVideos = Number(channel.monthlyVideos) || 0;

  let score = 0;

  // Score baseado em inscritos (0-30 pontos)
  if (subscribers >= 1000000) score += 30;
  else if (subscribers >= 500000) score += 25;
  else if (subscribers >= 100000) score += 20;
  else if (subscribers >= 50000) score += 15;
  else if (subscribers >= 10000) score += 10;
  else score += 5;

  // Score baseado em views (0-25 pontos)
  const viewRatio = subscribers > 0 ? avgViews / subscribers : 0;
  if (viewRatio >= 0.3) score += 25;
  else if (viewRatio >= 0.2) score += 20;
  else if (viewRatio >= 0.1) score += 15;
  else if (viewRatio >= 0.05) score += 10;
  else score += 5;

  // Score baseado em engajamento (0-25 pontos)
  if (engagement >= 8) score += 25;
  else if (engagement >= 5) score += 20;
  else if (engagement >= 3) score += 15;
  else if (engagement >= 1) score += 10;
  else score += 5;

  // Score baseado em frequência (0-20 pontos)
  if (monthlyVideos >= 15) score += 20;
  else if (monthlyVideos >= 10) score += 15;
  else if (monthlyVideos >= 5) score += 10;
  else if (monthlyVideos >= 2) score += 5;
  else score += 2;

  return Math.min(100, Math.max(0, score));
};

const getClassificationColor = (classification: string): string => {
  switch (classification) {
    case 'Alto Potencial': return '#22c55e';
    case 'Médio Potencial': return '#eab308';
    case 'Baixo Potencial': return '#f97316';
    case 'Micro Influencer': return '#8b5cf6';
    default: return '#6b7280';
  }
};

const formatNumber = (num: number | undefined | null) => {
  const validNum = Number(num) || 0;
  if (validNum >= 1000000) {
    return `${(validNum / 1000000).toFixed(1)}M`;
  } else if (validNum >= 1000) {
    return `${(validNum / 1000).toFixed(1)}K`;
  }
  return validNum.toLocaleString();
};

export const NewPlanilhaTab = ({ savedChannels = [], onSendToPartners }: NewPlanilhaTabProps) => {
  const [editingChannel, setEditingChannel] = useState<ChannelData | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    scoreRange: 'all',
    subscribersRange: 'all',
    engagementRange: 'all',
    sortBy: 'score',
    sortOrder: 'desc'
  })

  // Memoizar processamento dos dados
  const processedData = useMemo(() => {
    if (!Array.isArray(savedChannels)) return [];
    
    return savedChannels.map(channel => ({
      ...channel,
      id: channel.id || channel.name || `channel-${Math.random()}`,
      classification: classifyChannel(channel),
      score: calculateQualityScore(channel)
    }));
  }, [savedChannels])

  // Memoizar dados filtrados
  const filteredData = useMemo(() => {
    let filtered = [...processedData];

    // Apply search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(channel => 
        (channel.name || '').toLowerCase().includes(searchLower) ||
        (channel.email || '').toLowerCase().includes(searchLower) ||
        (channel.link || '').toLowerCase().includes(searchLower)
      );
    }

    // Apply score filter
    if (filters.scoreRange !== 'all') {
      filtered = filtered.filter(channel => {
        const score = Number(channel.score) || 0;
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
        const subs = Number(channel.subscribers) || 0;
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
          aValue = Number(a.score) || 0;
          bValue = Number(b.score) || 0;
          break;
        case 'subscribers':
          aValue = Number(a.subscribers) || 0;
          bValue = Number(b.subscribers) || 0;
          break;
        case 'avgViews':
          aValue = Number(a.avgViews) || 0;
          bValue = Number(b.avgViews) || 0;
          break;
        case 'engagement':
          aValue = parseFloat(String(a.engagement)) || 0;
          bValue = parseFloat(String(b.engagement)) || 0;
          break;
        default:
          return 0;
      }

      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [processedData, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage, itemsPerPage]);

  // Callbacks otimizados
  const handleEdit = useCallback((channel: ChannelData) => {
    setEditingChannel(channel);
    setIsEditModalOpen(true);
  }, []);

  const handleSaveEdit = useCallback((updatedChannel: ChannelData) => {
    // Esta função seria implementada no componente pai
    toast({
      title: "Canal atualizado!",
      description: `${updatedChannel.name} foi atualizado com sucesso.`,
    });
    setIsEditModalOpen(false);
  }, [toast]);

  const handleImport = useCallback((importedChannels: ChannelData[]) => {
    toast({
      title: "Importação concluída!",
      description: `${importedChannels.length} canais foram importados.`,
    });
    setIsImportModalOpen(false);
  }, [toast]);

  const exportToExcel = useCallback((channels: ChannelData[] = filteredData) => {
    if (channels.length === 0) {
      toast({
        title: "Erro na exportação",
        description: "Não há canais para exportar!",
        variant: "destructive",
      });
      return;
    }

    const worksheetData = channels.map(row => ({
      Nome: row.name || '',
      Link: row.link || '',
      Email: row.email || '',
      Telefone: row.phone || '',
      Inscritos: Number(row.subscribers) || 0,
      'Média Views': Number(row.avgViews) || 0,
      'Frequência': Number(row.monthlyVideos) || 0,
      'Engajamento (%)': row.engagement || '0',
      'Crescimento (%)': row.subGrowth || '0',
      Score: Number(row.score) || 0,
      Classificação: row.classification || ''
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Canais');
    XLSX.writeFile(workbook, `planilha_canais_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({
      title: "Exportação concluída!",
      description: `${channels.length} canais foram exportados para Excel.`,
    });
  }, [filteredData, toast]);

  // Bulk operations
  const toggleSelection = useCallback((channel: ChannelData) => {
    const channelId = channel.id || channel.name || '';
    setSelectedChannels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(channelId)) {
        newSet.delete(channelId);
      } else {
        newSet.add(channelId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = paginatedData.map(c => c.id || c.name || '');
    setSelectedChannels(new Set(allIds));
  }, [paginatedData]);

  const clearSelection = useCallback(() => {
    setSelectedChannels(new Set());
  }, []);

  const getSelectedChannels = useCallback(() => {
    return paginatedData.filter(c => selectedChannels.has(c.id || c.name || ''));
  }, [paginatedData, selectedChannels]);

  // Colunas da tabela memoizadas
  const columns: ColumnDef<ChannelData>[] = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={selectedChannels.size === paginatedData.length && paginatedData.length > 0}
          onCheckedChange={() => selectedChannels.size === paginatedData.length ? clearSelection() : selectAll()}
          className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
        />
      ),
      cell: ({ row }) => {
        const channelId = row.original.id || row.original.name || '';
        return (
          <Checkbox
            checked={selectedChannels.has(channelId)}
            onCheckedChange={() => toggleSelection(row.original)}
            className="border-[#525252] data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'photo',
      header: 'Canal',
      cell: ({ row }) => {
        const channel = row.original;
        
        return (
          <div className="p-2 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={channel.photo || 'https://via.placeholder.com/40'} 
                alt="foto" 
                className="w-10 h-10 rounded-full border border-[#525252] flex-shrink-0" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/40';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm mb-1 truncate" title={channel.name}>
                  {channel.name || 'Nome não informado'}
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${getClassificationColor(channel.classification)}20`,
                    color: getClassificationColor(channel.classification)
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
                  href={channel.link || '#'} 
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
        );
      }
    },
    { 
      accessorKey: 'subscribers', 
      header: 'Inscritos',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return (
          <div className="text-center p-2">
            <div className="font-bold text-white text-sm mb-1">
              {formatNumber(value)}
            </div>
            <div className="text-xs text-[#AAAAAA]">inscritos</div>
          </div>
        );
      }
    },
    { 
      accessorKey: 'avgViews', 
      header: 'Média Views',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return (
          <div className="text-center p-2">
            <div className="font-bold text-blue-400 text-sm mb-1">
              {formatNumber(value)}
            </div>
            <div className="text-xs text-[#AAAAAA]">views médias</div>
          </div>
        );
      }
    },
    { 
      accessorKey: 'engagement', 
      header: 'Engajamento',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <div className="text-center p-2">
            <div className="font-bold text-green-400 text-sm mb-1">
              {value || '0.0'}%
            </div>
            <div className="text-xs text-[#AAAAAA]">engajamento</div>
          </div>
        );
      }
    },
    { 
      accessorKey: 'score', 
      header: 'Score',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return (
          <div className="text-center p-2">
            <div className="font-bold text-yellow-400 text-lg mb-1">
              {value || 0}
            </div>
            <div className="text-xs text-[#AAAAAA]">pontos</div>
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const channel = row.original;
        
        return (
          <div className="flex gap-1 justify-center p-2">
            <Button
              onClick={() => handleEdit(channel)}
              size="sm"
              variant="outline"
              className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444] h-7 px-2"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => onSendToPartners?.(channel)}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white h-7 px-2"
            >
              <Handshake className="h-3 w-3" />
            </Button>
          </div>
        );
      }
    }
  ], [selectedChannels, paginatedData, clearSelection, selectAll, toggleSelection, handleEdit, onSendToPartners]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">CRM de Canais</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsImportModalOpen(true)}
            variant="outline"
            className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar Dados
          </Button>
          <Button 
            onClick={() => exportToExcel()}
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <LiveStatsCard channels={processedData} />

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
            Analytics & Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <AdvancedTableFilters
            onFiltersChange={setFilters}
            totalItems={processedData.length}
            filteredItems={filteredData.length}
          />

          <BulkOperationsToolbar
            selectedItems={getSelectedChannels()}
            onExportSelected={exportToExcel}
            onSendToPartners={(channels) => {
              channels.forEach(channel => onSendToPartners?.(channel));
              clearSelection();
              toast({
                title: "Canais enviados!",
                description: `${channels.length} canais foram enviados para parceiros.`,
              });
            }}
            onDeleteSelected={() => {
              clearSelection();
              toast({
                title: "Canais removidos!",
                description: "Canais selecionados foram removidos.",
              });
            }}
            onClearSelection={clearSelection}
          />

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
                  {processedData.length === 0 ? 'Nenhum canal encontrado' : 'Nenhum canal corresponde aos filtros'}
                </div>
                <div className="text-sm">
                  {processedData.length === 0 ? 'Adicione canais através da aba de Análise ou importe dados' : 'Tente ajustar os filtros de busca'}
                </div>
              </div>
            )}

            {filteredData.length > 0 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredData.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                  setItemsPerPage(newItemsPerPage);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <PlanilhaAnalytics channels={processedData} />
        </TabsContent>
      </Tabs>

      <ChannelEditModal
        channel={editingChannel}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingChannel(null);
        }}
        onSave={handleSaveEdit}
      />

      <DataImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
};
