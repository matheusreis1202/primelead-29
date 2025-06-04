
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X, User, Mail, Phone, ExternalLink, Star, TrendingUp, Video, Eye } from 'lucide-react';

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
  onSave: (channel: ChannelData) => void;
}

export const ChannelEditModal = ({ channel, isOpen, onClose, onSave }: ChannelEditModalProps) => {
  const [formData, setFormData] = useState<ChannelData>({
    id: '',
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

  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('novo');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (channel) {
      setFormData(channel);
    }
  }, [channel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleNumberChange = (field: keyof ChannelData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  if (!channel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] border-[#525252] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <User className="h-5 w-5 text-[#FF0000]" />
            Editar Canal - {channel.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#FF0000] flex items-center gap-2">
                <User className="h-4 w-4" />
                Informações Básicas
              </h3>
              
              <div>
                <Label htmlFor="name" className="text-[#AAAAAA]">Nome do Canal</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="link" className="text-[#AAAAAA] flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Link do Canal
                </Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="https://youtube.com/channel/..."
                />
              </div>

              <div>
                <Label htmlFor="photo" className="text-[#AAAAAA]">URL da Foto</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contato
              </h3>

              <div>
                <Label htmlFor="email" className="text-[#AAAAAA] flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="contato@canal.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#AAAAAA] flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="+55 11 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-[#AAAAAA]">Status do Contato</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E] border-[#333]">
                    <SelectItem value="novo" className="text-white hover:bg-[#333]">Novo</SelectItem>
                    <SelectItem value="contatado" className="text-white hover:bg-[#333]">Contatado</SelectItem>
                    <SelectItem value="respondeu" className="text-white hover:bg-[#333]">Respondeu</SelectItem>
                    <SelectItem value="negociando" className="text-white hover:bg-[#333]">Negociando</SelectItem>
                    <SelectItem value="fechado" className="text-white hover:bg-[#333]">Parceria Fechada</SelectItem>
                    <SelectItem value="rejeitado" className="text-white hover:bg-[#333]">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Métricas
              </h3>

              <div>
                <Label htmlFor="subscribers" className="text-[#AAAAAA]">Inscritos</Label>
                <Input
                  id="subscribers"
                  type="number"
                  value={formData.subscribers}
                  onChange={(e) => handleNumberChange('subscribers', e.target.value)}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                />
              </div>

              <div>
                <Label htmlFor="avgViews" className="text-[#AAAAAA] flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Média de Views
                </Label>
                <Input
                  id="avgViews"
                  type="number"
                  value={formData.avgViews}
                  onChange={(e) => handleNumberChange('avgViews', e.target.value)}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Performance
              </h3>

              <div>
                <Label htmlFor="engagement" className="text-[#AAAAAA]">Engajamento (%)</Label>
                <Input
                  id="engagement"
                  value={formData.engagement}
                  onChange={(e) => setFormData(prev => ({ ...prev, engagement: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="5.2"
                />
              </div>

              <div>
                <Label htmlFor="subGrowth" className="text-[#AAAAAA]">Crescimento (%)</Label>
                <Input
                  id="subGrowth"
                  value={formData.subGrowth}
                  onChange={(e) => setFormData(prev => ({ ...prev, subGrowth: e.target.value }))}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Avaliação
              </h3>

              <div>
                <Label htmlFor="monthlyVideos" className="text-[#AAAAAA]">Vídeos/Mês</Label>
                <Input
                  id="monthlyVideos"
                  type="number"
                  value={formData.monthlyVideos}
                  onChange={(e) => handleNumberChange('monthlyVideos', e.target.value)}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
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
                  onChange={(e) => handleNumberChange('score', e.target.value)}
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000]"
                />
              </div>
            </div>
          </div>

          {/* Classificação e Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="classification" className="text-[#AAAAAA]">Classificação</Label>
              <Select 
                value={formData.classification} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, classification: value }))}
              >
                <SelectTrigger className="bg-[#0D0D0D] border-[#333] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-[#333]">
                  <SelectItem value="Alto Potencial" className="text-white hover:bg-[#333]">Alto Potencial</SelectItem>
                  <SelectItem value="Médio Potencial" className="text-white hover:bg-[#333]">Médio Potencial</SelectItem>
                  <SelectItem value="Baixo Potencial" className="text-white hover:bg-[#333]">Baixo Potencial</SelectItem>
                  <SelectItem value="Premium" className="text-white hover:bg-[#333]">Premium</SelectItem>
                  <SelectItem value="Nicho" className="text-white hover:bg-[#333]">Nicho</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#AAAAAA]">Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Adicionar tag..."
                  className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000] flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="sm"
                  className="bg-[#FF0000] hover:bg-[#CC0000]"
                >
                  +
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Notas */}
          <div>
            <Label htmlFor="notes" className="text-[#AAAAAA]">Notas e Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações sobre o canal, histórico de contato, etc..."
              className="bg-[#0D0D0D] border-[#333] text-white focus:border-[#FF0000] min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#525252] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
            >
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
