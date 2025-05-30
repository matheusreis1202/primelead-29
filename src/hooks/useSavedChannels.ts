
import { useState, useEffect } from 'react';
import { Channel } from '@/pages/Index';

export const useSavedChannels = () => {
  const [savedChannels, setSavedChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedChannels');
    if (saved) {
      setSavedChannels(JSON.parse(saved));
    }
  }, []);

  const saveChannel = (channel: Channel) => {
    const isAlreadySaved = savedChannels.some(c => c.id === channel.id);
    if (!isAlreadySaved) {
      const updated = [...savedChannels, channel];
      setSavedChannels(updated);
      localStorage.setItem('savedChannels', JSON.stringify(updated));
      console.log('Canal salvo:', channel.title);
    }
  };

  const removeChannel = (channelId: string) => {
    const updated = savedChannels.filter(c => c.id !== channelId);
    setSavedChannels(updated);
    localStorage.setItem('savedChannels', JSON.stringify(updated));
    console.log('Canal removido dos salvos');
  };

  const isChannelSaved = (channelId: string) => {
    return savedChannels.some(c => c.id === channelId);
  };

  return {
    savedChannels,
    saveChannel,
    removeChannel,
    isChannelSaved
  };
};
