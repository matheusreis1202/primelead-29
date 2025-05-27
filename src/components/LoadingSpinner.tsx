
import { Crown } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-200/20 rounded-full animate-spin border-t-purple-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
            <Crown className="h-6 w-6 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
