
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, AlertCircle, CheckCircle, Download, Mapping } from 'lucide-react';
import * as XLSX from 'xlsx';

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

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (channels: ChannelData[]) => void;
}

interface ImportStep {
  current: 'upload' | 'mapping' | 'preview' | 'importing' | 'complete';
}

interface FieldMapping {
  [key: string]: string;
}

export const DataImportModal = ({ isOpen, onClose, onImport }: DataImportModalProps) => {
  const [step, setStep] = useState<ImportStep['current']>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<FieldMapping>({});
  const [previewData, setPreviewData] = useState<ChannelData[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = {
    name: 'Nome do Canal',
    email: 'Email',
    phone: 'Telefone',
    link: 'Link do Canal',
    subscribers: 'Inscritos',
    avgViews: 'Média de Views',
    engagement: 'Engajamento',
    score: 'Score',
    classification: 'Classificação'
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length === 0) {
          setError('O arquivo está vazio');
          return;
        }

        const fileHeaders = jsonData[0] as string[];
        const fileData = jsonData.slice(1);

        setHeaders(fileHeaders);
        setRawData(fileData);
        setStep('mapping');
      } catch (err) {
        setError('Erro ao ler o arquivo. Verifique se é um arquivo Excel válido.');
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleMappingComplete = () => {
    try {
      const mappedData: ChannelData[] = rawData.map((row, index) => {
        const channel: any = {
          id: `import_${index}`,
          photo: 'https://via.placeholder.com/64',
        };

        Object.entries(mapping).forEach(([field, columnIndex]) => {
          const value = row[parseInt(columnIndex)];
          
          switch (field) {
            case 'subscribers':
            case 'avgViews':
            case 'monthlyVideos':
            case 'score':
              channel[field] = typeof value === 'number' ? value : (parseInt(value) || 0);
              break;
            case 'engagement':
            case 'subGrowth':
              channel[field] = value?.toString() || '0';
              break;
            default:
              channel[field] = value?.toString() || '';
          }
        });

        // Valores padrão para campos não mapeados
        if (!channel.monthlyVideos) channel.monthlyVideos = Math.floor(Math.random() * 10) + 5;
        if (!channel.photo || channel.photo === 'https://via.placeholder.com/64') {
          channel.photo = 'https://via.placeholder.com/64';
        }

        return channel;
      }).filter(channel => channel.name && channel.name.trim() !== '');

      setPreviewData(mappedData);
      setStep('preview');
    } catch (err) {
      setError('Erro ao processar os dados. Verifique o mapeamento dos campos.');
    }
  };

  const handleImport = async () => {
    setStep('importing');
    setProgress(0);

    // Simular importação com progresso
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    onImport(previewData);
    setStep('complete');
  };

  const resetImport = () => {
    setStep('upload');
    setFile(null);
    setRawData([]);
    setHeaders([]);
    setMapping({});
    setPreviewData([]);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      ['Nome do Canal', 'Email', 'Telefone', 'Link do Canal', 'Inscritos', 'Média de Views', 'Engajamento', 'Score', 'Classificação'],
      ['Canal Exemplo', 'contato@exemplo.com', '+55 11 99999-9999', 'https://youtube.com/channel/exemplo', 1000000, 50000, '5.2', 85, 'Alto Potencial'],
      ['Outro Canal', 'outro@exemplo.com', '+55 11 88888-8888', 'https://youtube.com/channel/outro', 500000, 25000, '3.8', 72, 'Médio Potencial']
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'template_importacao_canais.xlsx');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] border-[#525252] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#FF0000]" />
            Importar Dados de Canais
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {['upload', 'mapping', 'preview', 'importing', 'complete'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === stepName ? 'bg-[#FF0000] text-white' :
                ['upload', 'mapping', 'preview', 'importing', 'complete'].indexOf(step) > index ? 'bg-green-600 text-white' :
                'bg-[#333] text-[#AAAAAA]'
              }`}>
                {index + 1}
              </div>
              {index < 4 && <div className="w-12 h-1 bg-[#333] mx-2" />}
            </div>
          ))}
        </div>

        {error && (
          <Alert className="mb-4 border-red-500 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {/* Step Content */}
        <div className="space-y-6">
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="text-center">
                <FileText className="h-12 w-12 text-[#FF0000] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Selecionar Arquivo</h3>
                <p className="text-[#AAAAAA] mb-4">
                  Faça upload de um arquivo Excel (.xlsx) ou CSV com os dados dos canais
                </p>
              </div>

              <Card className="bg-[#0D0D0D] border-[#333] border-dashed border-2 p-6">
                <CardContent className="text-center">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FF0000] hover:bg-[#CC0000] text-white mb-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                  {file && (
                    <p className="text-white text-sm">
                      Arquivo selecionado: <span className="text-[#FF0000]">{file.name}</span>
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={downloadTemplate}
                  className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Template
                </Button>
              </div>
            </div>
          )}

          {step === 'mapping' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Mapping className="h-12 w-12 text-[#FF0000] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Mapear Campos</h3>
                <p className="text-[#AAAAAA]">
                  Associe as colunas do seu arquivo aos campos do sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(requiredFields).map(([field, label]) => (
                  <div key={field}>
                    <Label className="text-[#AAAAAA] mb-2 block">{label}</Label>
                    <Select
                      value={mapping[field] || ''}
                      onValueChange={(value) => setMapping(prev => ({ ...prev, [field]: value }))}
                    >
                      <SelectTrigger className="bg-[#0D0D0D] border-[#333] text-white">
                        <SelectValue placeholder="Selecionar coluna..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E1E] border-[#333]">
                        {headers.map((header, index) => (
                          <SelectItem
                            key={index}
                            value={index.toString()}
                            className="text-white hover:bg-[#333]"
                          >
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('upload')}
                  className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleMappingComplete}
                  disabled={!mapping.name || !mapping.email}
                  className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Prévia dos Dados</h3>
                <p className="text-[#AAAAAA]">
                  Verifique os dados antes de importar ({previewData.length} canais encontrados)
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto bg-[#0D0D0D] rounded-lg border border-[#333]">
                <table className="w-full text-sm">
                  <thead className="bg-[#1E1E1E] sticky top-0">
                    <tr>
                      <th className="p-2 text-left text-[#AAAAAA]">Nome</th>
                      <th className="p-2 text-left text-[#AAAAAA]">Email</th>
                      <th className="p-2 text-left text-[#AAAAAA]">Inscritos</th>
                      <th className="p-2 text-left text-[#AAAAAA]">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 10).map((channel, index) => (
                      <tr key={index} className="border-t border-[#333]">
                        <td className="p-2 text-white">{channel.name}</td>
                        <td className="p-2 text-green-400">{channel.email}</td>
                        <td className="p-2 text-blue-400">{channel.subscribers.toLocaleString()}</td>
                        <td className="p-2 text-yellow-400">{channel.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.length > 10 && (
                  <div className="p-2 text-center text-[#AAAAAA] text-xs border-t border-[#333]">
                    ... e mais {previewData.length - 10} canais
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('mapping')}
                  className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleImport}
                  className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
                >
                  Importar {previewData.length} Canais
                </Button>
              </div>
            </div>
          )}

          {step === 'importing' && (
            <div className="space-y-4 text-center">
              <Upload className="h-12 w-12 text-[#FF0000] mx-auto animate-pulse" />
              <h3 className="text-lg font-semibold text-white">Importando Dados...</h3>
              <Progress value={progress} className="w-full" />
              <p className="text-[#AAAAAA]">{progress}% concluído</p>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-4 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Importação Concluída!</h3>
              <p className="text-[#AAAAAA]">
                {previewData.length} canais foram importados com sucesso
              </p>
              <Button
                onClick={() => { resetImport(); onClose(); }}
                className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
              >
                Finalizar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
