
import { useState, useEffect, useRef } from 'react';

export function useUltraFastDebounce<T>(value: T, delay: number = 100): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTime = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    lastCallTime.current = now;

    // Se o valor mudou, começar debounce ultra rápido
    if (value !== debouncedValue) {
      setIsDebouncing(true);
    }

    // Limpar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Configurar novo timeout com delay ultra baixo
    timeoutRef.current = setTimeout(() => {
      // Verificar se esta é a última chamada
      if (now === lastCallTime.current) {
        setDebouncedValue(value);
        setIsDebouncing(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, debouncedValue]);

  return [debouncedValue, isDebouncing];
}
