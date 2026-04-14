import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 shadow border border-gray-100 rounded-2xl my-4 p-5">
      
      {/* Image */}
      <div className="col-span-1">
        <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
          <Skeleton className="w-full h-28 rounded-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="col-span-3 space-y-3">
        
        {/* Title */}
        <Skeleton className="h-6 w-2/3" />

        {/* Category + SKU */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-xl" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-24" />

        {/* Bottom section */}
        <div className="flex items-center justify-between mt-4">
          
          {/* Counter */}
          <div className="flex bg-gray-100 p-1 rounded-2xl items-center gap-1">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>

          {/* Total + delete */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;