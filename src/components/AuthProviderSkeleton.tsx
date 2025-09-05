import { Skeleton } from "@/components/ui/skeleton";

export function AuthProviderSkeleton() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Skeleton (no sidebar components) */}
      <div className="w-64 bg-accent/40 p-6 flex flex-col gap-6 border-r">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
