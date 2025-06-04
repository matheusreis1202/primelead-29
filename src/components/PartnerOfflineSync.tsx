
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi, Download, Upload, HardDrive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineData {
  partners: any[];
  communications: any[];
  followUps: any[];
  lastUpdate: string;
}

export const PartnerOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [pendingSync, setPendingSync] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Conexão restaurada",
        description: "Sincronizando dados offline...",
      });
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Modo offline ativado",
        description: "Seus dados serão salvos localmente",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Carregar dados offline existentes
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = () => {
    try {
      const data = localStorage.getItem('partnersOfflineData');
      if (data) {
        setOfflineData(JSON.parse(data));
      }
      
      const pending = localStorage.getItem('partnersPendingSync');
      if (pending) {
        setPendingSync(JSON.parse(pending).length || 0);
      }
    } catch (error) {
      console.error('Erro ao carregar dados offline:', error);
    }
  };

  const saveOfflineData = (data: any) => {
    try {
      const offlineData: OfflineData = {
        partners: data.partners || [],
        communications: data.communications || [],
        followUps: data.followUps || [],
        lastUpdate: new Date().toISOString()
      };

      localStorage.setItem('partnersOfflineData', JSON.stringify(offlineData));
      setOfflineData(offlineData);

      // Adicionar à fila de sincronização se offline
      if (!isOnline) {
        const pending = JSON.parse(localStorage.getItem('partnersPendingSync') || '[]');
        pending.push({
          id: Date.now(),
          action: 'update',
          data: data,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('partnersPendingSync', JSON.stringify(pending));
        setPendingSync(pending.length);
      }
    } catch (error) {
      console.error('Erro ao salvar dados offline:', error);
    }
  };

  const syncOfflineData = async () => {
    try {
      const pending = JSON.parse(localStorage.getItem('partnersPendingSync') || '[]');
      
      for (const item of pending) {
        // Simular sincronização com servidor
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Sincronizando:', item);
      }

      // Limpar fila de sincronização
      localStorage.removeItem('partnersPendingSync');
      setPendingSync(0);

      toast({
        title: "Sincronização concluída",
        description: `${pending.length} item(s) sincronizado(s)`,
      });
    } catch (error) {
      toast({
        title: "Erro na sincronização",
        description: "Alguns dados não puderam ser sincronizados",
        variant: "destructive",
      });
    }
  };

  const exportOfflineData = () => {
    if (!offlineData) return;

    const dataStr = JSON.stringify(offlineData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `partners-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Backup exportado",
      description: "Dados salvos no dispositivo",
    });
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#333]">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-400" />
          ) : (
            <WifiOff className="h-4 w-4 text-yellow-400" />
          )}
          Modo Offline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Badge className={`text-xs ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            {pendingSync > 0 && (
              <Badge className="bg-orange-500/20 text-orange-400 text-xs ml-2">
                {pendingSync} pendente(s)
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={exportOfflineData}
              disabled={!offlineData}
              size="sm"
              variant="outline"
              className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA]"
            >
              <Download className="h-3 w-3 mr-1" />
              Backup
            </Button>
            
            {!isOnline && pendingSync > 0 && (
              <Button
                onClick={syncOfflineData}
                size="sm"
                className="bg-[#FF0000] hover:bg-[#CC0000]"
              >
                <Upload className="h-3 w-3 mr-1" />
                Tentar Sync
              </Button>
            )}
          </div>
        </div>

        {offlineData && (
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div>
              <HardDrive className="h-3 w-3 mx-auto mb-1 text-[#AAAAAA]" />
              <div className="text-white">{offlineData.partners.length}</div>
              <div className="text-[#AAAAAA]">Parceiros</div>
            </div>
            <div>
              <HardDrive className="h-3 w-3 mx-auto mb-1 text-[#AAAAAA]" />
              <div className="text-white">{offlineData.communications.length}</div>
              <div className="text-[#AAAAAA]">Comunicações</div>
            </div>
            <div>
              <HardDrive className="h-3 w-3 mx-auto mb-1 text-[#AAAAAA]" />
              <div className="text-white">{offlineData.followUps.length}</div>
              <div className="text-[#AAAAAA]">Follow-ups</div>
            </div>
          </div>
        )}

        {offlineData && (
          <div className="text-xs text-[#AAAAAA] text-center">
            Última atualização: {new Date(offlineData.lastUpdate).toLocaleString('pt-BR')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
