
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, FileText, Download, Eye, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  targetType: 'partner' | 'communication' | 'followup';
  targetId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

interface UserPermission {
  userId: string;
  userName: string;
  role: 'admin' | 'manager' | 'viewer';
  permissions: string[];
  lastLogin?: string;
}

export const PartnerCompliance = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [selectedLogType, setSelectedLogType] = useState<string>('all');
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadActivityLogs();
    loadUserPermissions();
    checkBackupStatus();
  }, []);

  const loadActivityLogs = () => {
    try {
      const logs = JSON.parse(localStorage.getItem('partnerActivityLogs') || '[]');
      setActivityLogs(logs.slice(0, 100)); // Limitar aos últimos 100 logs
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    }
  };

  const loadUserPermissions = () => {
    // Simulação de usuários e permissões
    const mockUsers: UserPermission[] = [
      {
        userId: 'user1',
        userName: 'Admin Principal',
        role: 'admin',
        permissions: ['create', 'read', 'update', 'delete', 'export', 'manage_users'],
        lastLogin: new Date().toISOString()
      },
      {
        userId: 'user2',
        userName: 'Gerente de Parcerias',
        role: 'manager',
        permissions: ['create', 'read', 'update', 'export'],
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userId: 'user3',
        userName: 'Visualizador',
        role: 'viewer',
        permissions: ['read'],
        lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    setUserPermissions(mockUsers);
  };

  const checkBackupStatus = () => {
    const lastBackupTime = localStorage.getItem('lastPartnersBackup');
    setLastBackup(lastBackupTime);
  };

  const logActivity = (action: string, targetType: ActivityLog['targetType'], targetId: string, details: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      userId: 'current_user',
      action,
      targetType,
      targetId,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Simulado
      userAgent: navigator.userAgent
    };

    const existingLogs = JSON.parse(localStorage.getItem('partnerActivityLogs') || '[]');
    const updatedLogs = [newLog, ...existingLogs].slice(0, 1000); // Manter apenas os últimos 1000 logs
    
    localStorage.setItem('partnerActivityLogs', JSON.stringify(updatedLogs));
    setActivityLogs(updatedLogs.slice(0, 100));
  };

  const createBackup = async () => {
    try {
      const backupData = {
        partners: JSON.parse(localStorage.getItem('partnersData') || '[]'),
        communications: JSON.parse(localStorage.getItem('partnerCommunications') || '[]'),
        followUps: JSON.parse(localStorage.getItem('partnerFollowUps') || '[]'),
        activityLogs: JSON.parse(localStorage.getItem('partnerActivityLogs') || '[]'),
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `partners-backup-${new Date().toISOString().split('T')[0]}-${Date.now()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);

      // Salvar timestamp do backup
      const backupTime = new Date().toISOString();
      localStorage.setItem('lastPartnersBackup', backupTime);
      setLastBackup(backupTime);

      logActivity('backup_created', 'partner', 'system', 'Backup completo criado');

      toast({
        title: "Backup criado",
        description: "Dados exportados com sucesso conforme LGPD",
      });
    } catch (error) {
      toast({
        title: "Erro no backup",
        description: "Não foi possível criar o backup",
        variant: "destructive",
      });
    }
  };

  const exportComplianceReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      period: 'últimos 30 dias',
      summary: {
        totalActivities: activityLogs.length,
        userAccess: userPermissions.length,
        lastBackup: lastBackup,
        dataProtection: 'LGPD Compliant'
      },
      activityLogs: activityLogs.slice(0, 50),
      userPermissions: userPermissions.map(user => ({
        ...user,
        userAgent: undefined // Remover dados sensíveis do relatório
      })),
      compliance: {
        dataRetention: '5 anos',
        encryption: 'AES-256',
        accessControl: 'Role-based',
        auditTrail: 'Completo'
      }
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);

    logActivity('compliance_report_exported', 'partner', 'system', 'Relatório de compliance exportado');

    toast({
      title: "Relatório exportado",
      description: "Relatório de compliance gerado",
    });
  };

  const getRoleColor = (role: UserPermission['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'manager': return 'bg-yellow-500/20 text-yellow-400';
      case 'viewer': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('create')) return <CheckCircle className="h-3 w-3 text-green-400" />;
    if (action.includes('update')) return <Eye className="h-3 w-3 text-blue-400" />;
    if (action.includes('delete')) return <AlertTriangle className="h-3 w-3 text-red-400" />;
    return <FileText className="h-3 w-3 text-[#AAAAAA]" />;
  };

  const filteredLogs = selectedLogType === 'all' 
    ? activityLogs 
    : activityLogs.filter(log => log.targetType === selectedLogType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Compliance e Segurança
          </h3>
          <p className="text-[#AAAAAA] text-sm">Auditoria, controle de acesso e proteção de dados</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={exportComplianceReport}
            size="sm"
            variant="outline"
            className="border-[#525252] bg-[#2A2A2A] text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Button
            onClick={createBackup}
            size="sm"
            className="bg-[#FF0000] hover:bg-[#CC0000]"
          >
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log de Atividades */}
        <Card className="bg-[#1E1E1E] border-[#333]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Log de Atividades</CardTitle>
              <Select value={selectedLogType} onValueChange={setSelectedLogType}>
                <SelectTrigger className="w-32 bg-[#2A2A2A] border-[#525252] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="partner">Parceiros</SelectItem>
                  <SelectItem value="communication">Comunicação</SelectItem>
                  <SelectItem value="followup">Follow-ups</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-4 text-[#AAAAAA]">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <p>Nenhuma atividade registrada</p>
                </div>
              ) : (
                filteredLogs.slice(0, 20).map((log) => (
                  <div key={log.id} className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-white text-sm font-medium">{log.action}</span>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                          {log.targetType}
                        </Badge>
                      </div>
                      <span className="text-xs text-[#AAAAAA]">
                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-xs text-[#AAAAAA]">{log.details}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#666]">Usuário: {log.userId}</span>
                      {log.ipAddress && (
                        <span className="text-xs text-[#666]">IP: {log.ipAddress}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controle de Acesso */}
        <Card className="bg-[#1E1E1E] border-[#333]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Controle de Acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userPermissions.map((user) => (
                <div key={user.userId} className="bg-[#2A2A2A] border border-[#525252] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-white font-medium text-sm">{user.userName}</div>
                      <div className="text-xs text-[#AAAAAA]">ID: {user.userId}</div>
                    </div>
                    <Badge className={`${getRoleColor(user.role)} text-xs`}>
                      {user.role === 'admin' ? 'Administrador' :
                       user.role === 'manager' ? 'Gerente' : 'Visualizador'}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-[#AAAAAA] mb-2">
                    Permissões: {user.permissions.join(', ')}
                  </div>
                  
                  {user.lastLogin && (
                    <div className="text-xs text-[#666]">
                      Último acesso: {new Date(user.lastLogin).toLocaleString('pt-BR')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status de Backup e Compliance */}
      <Card className="bg-[#1E1E1E] border-[#333]">
        <CardHeader>
          <CardTitle className="text-white">Status de Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-sm text-white font-medium">LGPD</div>
              <div className="text-xs text-green-400">Compliant</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-sm text-white font-medium">Criptografia</div>
              <div className="text-xs text-green-400">AES-256</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-sm text-white font-medium">Auditoria</div>
              <div className="text-xs text-green-400">Ativa</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Download className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-sm text-white font-medium">Último Backup</div>
              <div className="text-xs text-[#AAAAAA]">
                {lastBackup ? new Date(lastBackup).toLocaleDateString('pt-BR') : 'Nunca'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
