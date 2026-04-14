// import React from 'react'
// import { Skeleton } from "@/components/ui/skeleton"

// const CategorySkeleton = () => {
//   return (
//      <div className="flex w-full max-w-xs flex-col gap-2">
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-3/4" />
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-3/4" />
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-3/4" />
//     </div>
//   )
// }

// export default CategorySkeleton



import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface CategorySkeletonsProps {
  count?: number;
  className?: string;
}

export default function CategorySkeleton({
  count = 10,
  className = "",
}: CategorySkeletonsProps) {
  return (
    <div className={`w-full grid md:grid-cols-4 xl:grid-cols-5 pt-8 pb-10 px-8 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="p-6 flex flex-col items-center justify-center gap-4"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
          <Skeleton className="h-5 w-28 rounded" />
        </Card>
      ))}
    </div>
  );
}