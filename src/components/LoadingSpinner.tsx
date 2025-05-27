
import { Target } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-black"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black p-3 rounded-full shadow-lg">
            <Target className="h-6 w-6 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
