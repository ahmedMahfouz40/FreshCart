import { Skeleton } from "@/components/ui/skeleton";

const ProductSliderSkeleton = ({ items = 4 }: { items?: number }) => {
  return (
    <div className="relative">
      {/* Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Image */}
            <Skeleton className="w-full h-48 rounded-xl" />

            {/* Title */}
            <Skeleton className="h-4 w-3/4 rounded-md" />

            {/* Price */}
            <Skeleton className="h-4 w-1/2 rounded-md" />

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex absolute -top-13 sm:-top-15 -right-2 sm:right-0">
        <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-2" />
        <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-2" />
      </div>
    </div>
  );
};

export default ProductSliderSkeleton;