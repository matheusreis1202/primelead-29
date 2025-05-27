
import { Target } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-700/30 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-full shadow-lg">
            <Target className="h-6 w-6 text-slate-900 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
