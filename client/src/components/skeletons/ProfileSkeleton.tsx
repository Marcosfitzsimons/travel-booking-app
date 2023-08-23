import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full mt-3 mb-16 bg-transparent flex flex-col items-center gap-5">
      <Skeleton className="w-24 aspect-square rounded-full" />
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="w-full h-72" />
    </div>
  );
};

export default ProfileSkeleton;
