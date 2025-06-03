
import { Trash2, BarChart3, FileSpreadsheet, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Channel } from '@/pages/Index';

interface BatchOperationsProps {
  selectedChannels: Channel[];
  onAnalyzeSelected: () => void;
  onRemoveSelected: () => void;
  onSendToSpreadsheet: () => void;
  onCompareSelected: () => void;
  onClearSelection: () => void;
}

export const BatchOperations = ({
  selectedChannels,
  onAnalyzeSelected,
  onRemoveSelected,
  onSendToSpreadsheet,
  onCompareSelected,
  onClearSelection
}: BatchOperationsProps) => {
  if (selectedChannels.length === 0) return null;

  return (
    <Card className="bg-[#1e1e1e] border-[#333] mb-6 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-[#FF0000] text-white">
              {selectedChannels.length} selecionado{selectedChannels.length > 1 ? 's' : ''}
            </Badge>
            <span className="text-[#AAAAAA] text-sm">
              Operações em lote disponíveis
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={onAnalyzeSelected}
              size="sm"
              className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#AA0000] text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analisar Todos
            </Button>

            <Button
              onClick={onSendToSpreadsheet}
              size="sm"
              variant="outline"
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Enviar para Planilha
            </Button>

            <Button
              onClick={onCompareSelected}
              size="sm"
              variant="outline"
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
              disabled={selectedChannels.length < 2}
            >
              <Users className="h-4 w-4 mr-2" />
              Comparar ({selectedChannels.length})
            </Button>

            <Button
              onClick={onRemoveSelected}
              size="sm"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover
            </Button>

            <Button
              onClick={onClearSelection}
              size="sm"
              variant="ghost"
              className="text-[#AAAAAA] hover:text-white"
            >
              Limpar Seleção
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
