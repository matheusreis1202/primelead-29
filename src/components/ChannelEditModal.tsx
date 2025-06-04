
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

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

interface ChannelEditModalProps {
  channel: ChannelData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedChannel: ChannelData) => void;
}

export const ChannelEditModal = ({ channel, isOpen, onClose, onSave }: ChannelEditModalProps) => {
  const [formData, setFormData] = useState<ChannelData>({
    photo: '',
    name: '',
    link: '',
    phone: '',
    email: '',
    subscribers: 0,
    avgViews: 0,
    monthlyVideos: 0,
    engagement: '',
    subGrowth: '',
    score: 0,
    classification: ''
  });

  useEffect(() => {
    if (channel) {
      setFormData({ ...channel });
    }
  }, [channel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof ChannelData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!channel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] border-[#525252] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Editar Canal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informações Básicas */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#AAAAAA]">Informações Básicas</h3>
              
              <div>
                <Label htmlFor="name" className="text-[#AAAAAA]">Nome do Canal</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="Nome do canal"
                />
              </div>

              <div>
                <Label htmlFor="link" className="text-[#AAAAAA]">Link do Canal</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => handleChange('link', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#AAAAAA]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="contato@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#AAAAAA]">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="+55 11 99999-9999"
                />
              </div>
            </div>

            {/* Métricas */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#AAAAAA]">Métricas</h3>
              
              <div>
                <Label htmlFor="subscribers" className="text-[#AAAAAA]">Inscritos</Label>
                <Input
                  id="subscribers"
                  type="number"
                  value={formData.subscribers}
                  onChange={(e) => handleChange('subscribers', parseInt(e.target.value) || 0)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                />
              </div>

              <div>
                <Label htmlFor="avgViews" className="text-[#AAAAAA]">Média de Views</Label>
                <Input
                  id="avgViews"
                  type="number"
                  value={formData.avgViews}
                  onChange={(e) => handleChange('avgViews', parseInt(e.target.value) || 0)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                />
              </div>

              <div>
                <Label htmlFor="monthlyVideos" className="text-[#AAAAAA]">Vídeos/Mês</Label>
                <Input
                  id="monthlyVideos"
                  type="number"
                  value={formData.monthlyVideos}
                  onChange={(e) => handleChange('monthlyVideos', parseInt(e.target.value) || 0)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                />
              </div>

              <div>
                <Label htmlFor="engagement" className="text-[#AAAAAA]">Engajamento (%)</Label>
                <Input
                  id="engagement"
                  value={formData.engagement}
                  onChange={(e) => handleChange('engagement', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="5.2"
                />
              </div>

              <div>
                <Label htmlFor="subGrowth" className="text-[#AAAAAA]">Crescimento (%)</Label>
                <Input
                  id="subGrowth"
                  value={formData.subGrowth}
                  onChange={(e) => handleChange('subGrowth', e.target.value)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                  placeholder="15"
                />
              </div>

              <div>
                <Label htmlFor="score" className="text-[#AAAAAA]">Score</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.score}
                  onChange={(e) => handleChange('score', parseInt(e.target.value) || 0)}
                  className="bg-[#2A2A2A] border-[#525252] text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-[#525252] bg-[#2A2A2A] text-[#AAAAAA] hover:bg-[#444]"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#FF0000] hover:bg-[#CC0000] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
