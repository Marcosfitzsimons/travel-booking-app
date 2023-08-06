import { Skeleton } from "./ui/skeleton";

type CardSkeletonProps = {
  cards: number;
};

const PublicationSkeleton = ({ cards }: CardSkeletonProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-10 pb-4">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 h-32 max-w-lg relative mx-auto animate-pulse bg-card/80 rounded-sm shadow-input pb-4  border dark:shadow-none"
          >
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-[2px] pt-[10px] pl-2 lg:pl-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-2 w-12" />
              </div>
              <div className="pr-2 mt-2 sm:pr-4">
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="px-2 lg:px-4 flex flex-col gap-3 overflow-y-hidden">
              <Skeleton className="h-5 w-40 shrink-0" />
              <Skeleton className="h-4 w-60" />
            </div>
            <Skeleton className="h-7 w-16 absolute bottom-3 right-2 sm:right-4" />
          </div>
        ))}
    </div>
  );
};

export default PublicationSkeleton;
