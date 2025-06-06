
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FastChannelSkeletonProps {
  viewMode?: 'grid' | 'list';
  index?: number;
}

export const FastChannelSkeleton = React.memo(({ 
  viewMode = 'grid', 
  index = 0 
}: FastChannelSkeletonProps) => {
  if (viewMode === 'list') {
    return (
      <Card 
        className="bg-[#1E1E1E] border-[#333] animate-pulse"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Checkbox */}
            <Skeleton className="h-4 w-4 rounded bg-[#333]" />

            {/* Avatar */}
            <div className="relative">
              <Skeleton className="w-16 h-16 rounded-full bg-[#333]" />
              <Skeleton className="absolute -top-1 -right-1 w-6 h-4 rounded-full bg-blue-500/20" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 bg-[#333]" />
              <Skeleton className="h-4 w-24 bg-blue-500/20 rounded-full" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-3 w-20 bg-[#333]" />
                <Skeleton className="h-3 w-16 bg-[#333]" />
                <Skeleton className="h-3 w-24 bg-[#333]" />
                <Skeleton className="h-3 w-18 bg-[#333]" />
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4 w-72">
              {[1, 2, 3].map(i => (
                <div key={i} className="text-center space-y-1">
                  <Skeleton className="h-4 w-4 rounded bg-blue-500/20 mx-auto" />
                  <Skeleton className="h-3 w-12 bg-[#333] mx-auto" />
                  <Skeleton className="h-4 w-16 bg-[#333] mx-auto" />
                </div>
              ))}
            </div>

            {/* Botões */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 bg-blue-500/20 rounded" />
              <Skeleton className="h-9 w-20 bg-[#333] rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view - mais compacto e rápido
  return (
    <Card 
      className="bg-[#1E1E1E] border-[#333] animate-pulse h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4 h-full flex flex-col">
        {/* Checkbox */}
        <div className="absolute top-2 left-2">
          <Skeleton className="h-4 w-4 rounded bg-[#333]" />
        </div>

        {/* Preview */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-6 rounded bg-[#333]" />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-3 mt-2">
          <div className="relative">
            <Skeleton className="w-12 h-12 rounded-full bg-[#333]" />
            <Skeleton className="absolute -top-1 -right-1 w-5 h-4 rounded-full bg-blue-500/20" />
          </div>
        </div>

        {/* Info */}
        <div className="text-center mb-3 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-[#333] mx-auto" />
          <Skeleton className="h-3 w-20 bg-green-500/20 rounded-full mx-auto" />
          <div className="flex items-center justify-center gap-1">
            <Skeleton className="h-3 w-3 rounded bg-[#333]" />
            <Skeleton className="h-3 w-12 bg-[#333]" />
          </div>
        </div>

        {/* Métricas */}
        <div className="space-y-2 mb-4 flex-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2 p-2 bg-[#0D0D0D] rounded-lg">
              <Skeleton className="h-3 w-3 rounded bg-blue-500/20" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-16 bg-[#333]" />
                <Skeleton className="h-3 w-12 bg-[#333]" />
              </div>
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="space-y-2 mt-auto">
          <Skeleton className="h-8 w-full bg-blue-500/20 rounded" />
          <Skeleton className="h-7 w-full bg-[#333] rounded" />
        </div>
      </CardContent>
    </Card>
  );
});

FastChannelSkeleton.displayName = 'FastChannelSkeleton';
