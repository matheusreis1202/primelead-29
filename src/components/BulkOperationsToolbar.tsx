
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Handshake, Trash2, Mail } from 'lucide-react';

interface ChannelData {
  id?: string;
  photo: string;
  name: string;
  link: string;
  phone: string;
  email: string;
  subscribers: number;
  avgViews: number;
  monthlyVideos: number;
  engagement: string;
  subGrowth: string;
  score: number;
  classification: string;
}

interface BulkOperationsToolbarProps {
  selectedItems: ChannelData[];
  onExportSelected: (items: ChannelData[]) => void;
  onSendToPartners: (items: ChannelData[]) => void;
  onDeleteSelected: (items: ChannelData[]) => void;
  onClearSelection: () => void;
}

export const BulkOperationsToolbar = ({ 
  selectedItems, 
  onExportSelected, 
  onSendToPartners, 
  onDeleteSelected,
  onClearSelection 
}: BulkOperationsToolbarProps) => {
  if (selectedItems.length === 0) return null;

  return (
    <Card className="bg-[#FF0000]/10 border-[#FF0000]/30 p-3 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">
            {selectedItems.length} canal{selectedItems.length > 1 ? 'is' : ''} selecionado{selectedItems.length > 1 ? 's' : ''}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-[#AAAAAA] hover:text-white h-7"
          >
            Limpar seleção
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onExportSelected(selectedItems)}
            size="sm"
            variant="outline"
            className="border-[#FF0000]/50 bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 h-8"
          >
            <Download className="h-3 w-3 mr-1" />
            Exportar
          </Button>
          
          <Button
            onClick={() => onSendToPartners(selectedItems)}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white h-8"
          >
            <Handshake className="h-3 w-3 mr-1" />
            Enviar para Parceiros
          </Button>
          
          <Button
            onClick={() => onDeleteSelected(selectedItems)}
            size="sm"
            variant="outline"
            className="border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 h-8"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Remover
          </Button>
        </div>
      </div>
    </Card>
  );
};
