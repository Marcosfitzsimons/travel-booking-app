import { Skeleton } from "../ui/skeleton";

type CardSkeletonProps = {
  cards: number;
};

const CardSkeleton = ({ cards }: CardSkeletonProps) => {
  return (
    <div className="mt-3 flex flex-col items-center gap-10 md:grid md:justify-items-center md:grid-cols-2 xl:grid-cols-3">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 relative mx-auto animate-pulse bg-card/80 rounded-sm shadow-input pb-4 max-w-[400px] dark:shadow-none"
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col gap-[2px] pt-[10px] pl-2 lg:pl-4">
                <Skeleton className="h-1 w-8" />
                <Skeleton className="h-1 w-4" />
                <Skeleton className="h-1 w-2" />
              </div>
              <div className="pr-2 lg:pr-4 mt-[7px]">
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="px-2 lg:px-4 flex flex-col gap-3">
              <Skeleton className="h-6 w-52" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-40" />

                <div className="w-full">
                  <Skeleton className="h-32" />
                </div>
                <div className="w-full">
                  <Skeleton className="h-12" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardSkeleton;
