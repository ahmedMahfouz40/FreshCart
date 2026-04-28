import { Skeleton } from "@/components/ui/skeleton";

export default function AddressCardSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="p-5 border border-gray-100 rounded-2xl shadow"
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4 w-full">
              {/* Icon */}
              <Skeleton className="w-11 h-11 rounded-xl shrink-0" />

              {/* Text */}
              <div className="w-full">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-48 mb-3" />

                <div className="mt-3 flex items-center flex-wrap gap-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>

            {/* RIGHT (Buttons) */}
            <div className="self-start flex gap-2 items-center">
              <Skeleton className="w-9 h-9 rounded-lg" />
              <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
