import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSummaryCart() {
  return (
    <div className="p-3 mb-4 bg-gray-200 rounded-xl flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 w-full">
        {/* image */}
        <Skeleton className="w-14 h-14 rounded" />

        {/* text */}
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
     

      {/* price */}
      <Skeleton className="h-4 w-10" />
    </div>
  );
}