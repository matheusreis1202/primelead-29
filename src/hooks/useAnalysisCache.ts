
import { useState, useEffect, useCallback } from 'react';

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
  compressed?: boolean;
}

const CACHE_KEY = 'channel_analysis_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
const MAX_CACHE_SIZE = 1000; // Máximo de 1000 canais em cache
const CLEANUP_INTERVAL = 60 * 60 * 1000; // Limpeza a cada hora

export const useAnalysisCache = () => {
  const [cache, setCache] = useState<Map<string, CachedAnalysis>>(new Map());
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0, size: 0 });

  // Função para comprimir dados (básica)
  const compressData = useCallback((data: ChannelData): string => {
    return JSON.stringify(data);
  }, []);

  const decompressData = useCallback((compressed: string): ChannelData => {
    return JSON.parse(compressed);
  }, []);

  // Limpeza automática do cache
  const cleanupCache = useCallback(() => {
    const now = Date.now();
    setCache(prev => {
      const newCache = new Map(prev);
      let removedCount = 0;

      // Remover itens expirados
      for (const [key, value] of newCache) {
        if (value.expiresAt <= now) {
          newCache.delete(key);
          removedCount++;
        }
      }

      // Se ainda tiver muitos itens, remover os mais antigos
      if (newCache.size > MAX_CACHE_SIZE) {
        const sortedEntries = Array.from(newCache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        const toRemove = newCache.size - MAX_CACHE_SIZE;
        for (let i = 0; i < toRemove; i++) {
          newCache.delete(sortedEntries[i][0]);
          removedCount++;
        }
      }

      if (removedCount > 0) {
        console.log(`Cache cleanup: removed ${removedCount} expired/old items`);
      }

      return newCache;
    });
  }, []);

  // Carregar cache do localStorage na inicialização
  useEffect(() => {
    try {
      const savedCache = localStorage.getItem(CACHE_KEY);
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        const cacheMap = new Map<string, CachedAnalysis>();
        
        // Filtrar entradas expiradas e aplicar limpeza inicial
        const now = Date.now();
        parsedCache.forEach((item: CachedAnalysis) => {
          if (item.expiresAt > now) {
            cacheMap.set(item.channelId, item);
          }
        });
        
        setCache(cacheMap);
        setCacheStats(prev => ({ ...prev, size: cacheMap.size }));
      }
    } catch (error) {
      console.error('Erro ao carregar cache:', error);
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  // Salvar cache no localStorage com debounce
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        const cacheArray = Array.from(cache.values());
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheArray));
        setCacheStats(prev => ({ ...prev, size: cache.size }));
      } catch (error) {
        console.error('Erro ao salvar cache:', error);
        // Se der erro de quota, limpar cache antigo
        if (error instanceof DOMException && error.code === 22) {
          cleanupCache();
        }
      }
    }, 1000); // Debounce de 1 segundo

    return () => clearTimeout(saveTimeout);
  }, [cache, cleanupCache]);

  // Limpeza automática periódica
  useEffect(() => {
    const interval = setInterval(cleanupCache, CLEANUP_INTERVAL);
    return () => clearInterval(interval);
  }, [cleanupCache]);

  const getCachedAnalysis = useCallback((channelId: string): ChannelData | null => {
    const cached = cache.get(channelId);
    if (cached && cached.expiresAt > Date.now()) {
      setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
      return cached.data;
    }
    setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
    return null;
  }, [cache]);

  const setCachedAnalysis = useCallback((channelId: string, data: ChannelData) => {
    const now = Date.now();
    const cachedItem: CachedAnalysis = {
      channelId,
      data,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    };
    
    setCache(prev => new Map(prev).set(channelId, cachedItem));
  }, []);

  const clearCache = useCallback(() => {
    setCache(new Map());
    localStorage.removeItem(CACHE_KEY);
    setCacheStats({ hits: 0, misses: 0, size: 0 });
  }, []);

  const getCacheStats = useCallback(() => {
    const hitRate = cacheStats.hits + cacheStats.misses > 0 
      ? (cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100 
      : 0;
    
    return {
      ...cacheStats,
      hitRate: hitRate.toFixed(1) + '%'
    };
  }, [cacheStats]);

  return {
    getCachedAnalysis,
    setCachedAnalysis,
    clearCache,
    clearExpiredCache: cleanupCache,
    cacheSize: cache.size,
    cacheStats: getCacheStats()
  };
};
