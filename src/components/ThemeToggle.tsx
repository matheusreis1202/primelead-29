
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
      <Sun className={`h-4 w-4 transition-colors ${
        theme === 'light' ? 'text-[#FF0000]' : 'text-[#AAAAAA]'
      }`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-[#FF0000] data-[state=unchecked]:bg-[#AAAAAA]/30"
      />
      <Moon className={`h-4 w-4 transition-colors ${
        theme === 'dark' ? 'text-[#FF0000]' : 'text-[#AAAAAA]'
      }`} />
    </div>
  );
};
