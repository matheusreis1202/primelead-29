
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SyncData {
  analysisChannels: any[];
  emailCampaigns: any[];
  spreadsheetData: any[];
}

interface PartnerSyncProps {
  onDataSync: (data: SyncData) => void;
  lastSyncTime?: string;
}

export const PartnerSync = ({ onDataSync, lastSyncTime }: PartnerSyncProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      // Simular sincronização com outras abas
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Buscar dados das outras abas (simulado)
      const syncData: SyncData = {
        analysisChannels: JSON.parse(localStorage.getItem('analysisChannels') || '[]'),
        emailCampaigns: JSON.parse(localStorage.getItem('emailCampaigns') || '[]'),
        spreadsheetData: JSON.parse(localStorage.getItem('spreadsheetData') || '[]')
      };

      onDataSync(syncData);
      setSyncStatus('success');
      
      // Salvar timestamp do último sync
      localStorage.setItem('lastPartnerSync', new Date().toISOString());

      toast({
        title: "Sincronização concluída",
        description: "Dados atualizados com sucesso das outras abas",
      });

    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar os dados",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSyncing) {
        handleSync();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isSyncing]);

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing': return <Clock className="h-4 w-4 text-yellow-400 animate-spin" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <RotateCw className="h-4 w-4 text-[#AAAAAA]" />;
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#333]">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          {getStatusIcon()}
          Sincronização Automática
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#AAAAAA]">
              Última sincronização:
            </p>
            <p className="text-xs text-white">
              {lastSyncTime ? new Date(lastSyncTime).toLocaleString('pt-BR') : 'Nunca'}
            </p>
          </div>
          <Button
            onClick={handleSync}
            disabled={isSyncing}
            size="sm"
            className="bg-[#FF0000] hover:bg-[#CC0000]"
          >
            <RotateCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
              Análises
            </Badge>
          </div>
          <div className="text-center">
            <Badge className="bg-red-500/20 text-red-400 text-xs">
              Email Marketing
            </Badge>
          </div>
          <div className="text-center">
            <Badge className="bg-green-500/20 text-green-400 text-xs">
              Planilha
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
