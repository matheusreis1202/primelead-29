
import { Skeleton } from '@/components/ui/skeleton';

interface ChannelCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

export const ChannelCardSkeleton = ({ viewMode = 'grid' }: ChannelCardSkeletonProps) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-4 space-y-4 animate-fade-in flex items-center gap-4">
        {/* Channel Photo */}
        <Skeleton className="w-16 h-16 rounded-full bg-[#333] flex-shrink-0" />
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48 bg-[#333]" />
          <Skeleton className="h-4 w-72 bg-[#333]" />
          <Skeleton className="h-4 w-20 bg-[#333]" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 w-64">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <Skeleton className="h-4 w-4 bg-[#333] mx-auto rounded" />
              <Skeleton className="h-3 w-12 bg-[#333] mx-auto" />
              <Skeleton className="h-4 w-8 bg-[#333] mx-auto" />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Skeleton className="h-10 w-20 bg-[#333] rounded-lg" />
          <Skeleton className="h-10 w-20 bg-[#333] rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-4 space-y-4 animate-fade-in">
      {/* Header with checkboxes */}
      <div className="flex justify-between items-start">
        <Skeleton className="w-4 h-4 bg-[#333] rounded" />
        <Skeleton className="w-6 h-6 bg-[#333] rounded-lg" />
      </div>

      {/* Channel Photo */}
      <div className="flex justify-center">
        <Skeleton className="w-12 h-12 rounded-full bg-[#333]" />
      </div>

      {/* Channel Info */}
      <div className="text-center space-y-2">
        <Skeleton className="h-4 w-32 bg-[#333] mx-auto" />
        <Skeleton className="h-3 w-48 bg-[#333] mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-3 h-3 bg-[#333] rounded" />
          <Skeleton className="h-3 w-12 bg-[#333]" />
        </div>
        <Skeleton className="h-3 w-16 bg-[#333] mx-auto" />
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
            <Skeleton className="w-3 h-3 bg-[#333] rounded flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-12 bg-[#333]" />
              <Skeleton className="h-4 w-16 bg-[#333]" />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-full bg-[#333] rounded-lg" />
        <Skeleton className="h-7 w-full bg-[#333] rounded-lg" />
      </div>
    </div>
  );
};
