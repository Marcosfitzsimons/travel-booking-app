import Skeleton from "react-loading-skeleton";

type CardSkeletonProps = {
  cards: number;
};
const CardSkeleton = ({ cards }: CardSkeletonProps) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-10 md:grid md:justify-items-center md:grid-cols-2 xl:grid-cols-3">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="opacity-5 w-full flex flex-col gap-4 relative mx-auto bg-card animate-pulse rounded-md shadow-input pb-4 max-w-[400px] border dark:shadow-none dark:opacity-100"
          >
            <div className="w-full flex justify-between">
              <div className="flex flex-col pl-2 lg:pl-4">
                <div className="h-2">
                  <Skeleton
                    borderRadius={4}
                    width={32}
                    height={4}
                    className="bg-[#ebebeb] dark:bg-[#313131]"
                  />
                </div>
                <div className="h-2">
                  <Skeleton
                    borderRadius={4}
                    width={16}
                    height={4}
                    className="bg-[#ebebeb] dark:bg-[#313131]"
                  />
                </div>
                <div className="h-2">
                  <Skeleton
                    borderRadius={4}
                    width={8}
                    height={4}
                    className="bg-[#ebebeb] dark:bg-[#313131]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pr-2 lg:pr-4 mt-[7px]">
                <div className="h-6">
                  <Skeleton
                    height={24}
                    width={54}
                    className="bg-[#ebebeb] dark:bg-[#313131]"
                  />
                </div>
                <div className="h-6">
                  <Skeleton
                    height={24}
                    width={120}
                    className="bg-[#ebebeb] dark:bg-[#313131]"
                  />
                </div>
              </div>
            </div>
            <div className="px-2 lg:px-4 flex flex-col gap-3">
              <div className="h-6">
                <Skeleton
                  height={24}
                  width={200}
                  className="bg-[#ebebeb] dark:bg-[#313131]"
                />
              </div>
              <div className="h-2 ">
                <Skeleton
                  height={10}
                  borderRadius={2}
                  width={155}
                  className="bg-[#ebebeb] dark:bg-[#313131]"
                />
              </div>
              <div className="w-full">
                <Skeleton
                  height={120}
                  className="bg-[#ebebeb] dark:bg-[#313131]"
                />
              </div>
              <div className="w-full">
                <Skeleton
                  height={45}
                  className="bg-[#ebebeb] dark:bg-[#313131]"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardSkeleton;
