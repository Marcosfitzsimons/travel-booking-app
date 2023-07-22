import { Skeleton } from "./ui/skeleton";

type CardSkeletonProps = {
  cards: number;
};

const PublicationSkeleton = ({ cards }: CardSkeletonProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-10 pb-4 md:grid md:justify-items-center md:grid-cols-2 xl:grid-cols-3">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 h-72 max-w-lg relative mx-auto animate-pulse bg-card/80 rounded-sm shadow-input pb-4  border dark:shadow-none"
          >
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-[2px] pt-[10px] pl-2 lg:pl-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-2 w-12" />
              </div>
              <div className="pr-1 mt-[6px]">
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="px-2 lg:px-4 flex flex-col gap-3 overflow-y-hidden">
              <Skeleton className="h-5 w-40 shrink-0" />
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-48 rounded-none" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PublicationSkeleton;
