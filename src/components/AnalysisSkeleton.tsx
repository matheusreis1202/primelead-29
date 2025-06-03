
import { Skeleton } from '@/components/ui/skeleton';

export const AnalysisSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-lg bg-[#333]" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48 bg-[#333]" />
          <Skeleton className="h-4 w-32 bg-[#333]" />
        </div>
        <Skeleton className="w-20 h-8 bg-[#333] rounded-lg" />
      </div>

      {/* Analysis Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 bg-[#333] rounded" />
          <Skeleton className="h-4 w-24 bg-[#333]" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-[#333]" />
            <Skeleton className="h-6 w-full bg-[#333]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-[#333]" />
            <Skeleton className="h-6 w-full bg-[#333]" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-16 bg-[#333]" />
          <Skeleton className="h-3 w-full bg-[#333] rounded-full" />
          <Skeleton className="h-6 w-32 bg-[#333] rounded-full" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-10 flex-1 bg-[#333] rounded-lg" />
        <Skeleton className="h-10 flex-1 bg-[#333] rounded-lg" />
        <Skeleton className="h-10 w-20 bg-[#333] rounded-lg" />
      </div>
    </div>
  );
};
