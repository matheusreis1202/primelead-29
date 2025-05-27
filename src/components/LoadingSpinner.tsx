
import { Youtube } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin border-t-red-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Youtube className="h-6 w-6 text-red-600" />
        </div>
      </div>
    </div>
  );
};
