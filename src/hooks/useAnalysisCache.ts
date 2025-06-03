
import { useState, useEffect } from 'react';

interface ChannelData {
  name: string;
  subscribers: number;
  avgViews: number;
  monthlyVideos: number;
  avgLikes: number;
  avgComments: number;
  subGrowth: number;
}

interface CachedAnalysis {
  channelId: string;
  data: ChannelData;
  timestamp: number;
  expiresAt: number;
}

const CACHE_KEY = 'channel_analysis_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const useAnalysisCache = () => {
  const [cache, setCache] = useState<Map<string, CachedAnalysis>>(new Map());

  // Carregar cache do localStorage na inicialização
  useEffect(() => {
    try {
      const savedCache = localStorage.getItem(CACHE_KEY);
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        const cacheMap = new Map<string, CachedAnalysis>();
        
        // Filtrar entradas expiradas
        const now = Date.now();
        parsedCache.forEach((item: CachedAnalysis) => {
          if (item.expiresAt > now) {
            cacheMap.set(item.channelId, item);
          }
        });
        
        setCache(cacheMap);
      }
    } catch (error) {
      console.error('Erro ao carregar cache:', error);
    }
  }, []);

  // Salvar cache no localStorage sempre que mudar
  useEffect(() => {
    try {
      const cacheArray = Array.from(cache.values());
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheArray));
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }, [cache]);

  const getCachedAnalysis = (channelId: string): ChannelData | null => {
    const cached = cache.get(channelId);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
    return null;
  };

  const setCachedAnalysis = (channelId: string, data: ChannelData) => {
    const now = Date.now();
    const cachedItem: CachedAnalysis = {
      channelId,
      data,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    };
    
    setCache(prev => new Map(prev).set(channelId, cachedItem));
  };

  const clearCache = () => {
    setCache(new Map());
    localStorage.removeItem(CACHE_KEY);
  };

  const clearExpiredCache = () => {
    const now = Date.now();
    setCache(prev => {
      const newCache = new Map(prev);
      for (const [key, value] of newCache) {
        if (value.expiresAt <= now) {
          newCache.delete(key);
        }
      }
      return newCache;
    });
  };

  return {
    getCachedAnalysis,
    setCachedAnalysis,
    clearCache,
    clearExpiredCache,
    cacheSize: cache.size
  };
};
