import { Skeleton } from "@/components/ui/skeleton";

const TabsSkeleton = () => {
  return (
    <div className="w-full my-5 border-b border-x border-gray-100 rounded-b-2xl">
      {/* Tabs Header */}
      <div className="w-full lg:w-[70%] flex flex-wrap gap-2 me-auto mb-8">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-44 rounded-md" />
      </div>

      {/* Content */}
      <div className="p-6 border-t border-gray-100 shadow rounded-b-xl space-y-6">
        
        {/* Title */}
        <Skeleton className="h-6 w-48" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Left Card */}
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-4 space-y-3 rounded-lg">
            <Skeleton className="h-5 w-40" />

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Right Card */}
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-4 space-y-3 rounded-lg">
            <Skeleton className="h-5 w-40" />

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="space-y-6 pt-6 border-t">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            
            {/* Rating Summary */}
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-16 mx-auto" />
              <Skeleton className="h-5 w-24 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>

            {/* Bars */}
            <div className="flex-1 w-full space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-2 flex-1 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))}
          </div>

          {/* Review Button */}
          <div className="text-center py-6">
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>

        {/* Shipping & Returns */}
        <div className="grid sm:grid-cols-2 gap-4 pt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-5 rounded-lg space-y-3"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>

              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex gap-2 items-center">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TabsSkeleton;