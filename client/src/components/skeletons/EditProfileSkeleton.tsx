import { Skeleton } from "../ui/skeleton";

const EditProfileSkeleton = () => {
  return (
    <div className="w-full mt-3 mb-16 bg-transparent flex flex-col items-center gap-5 lg:flex-row lg:gap-16 lg:items-start lg:px-12">
      <Skeleton className="w-24 aspect-square rounded-full lg:w-32" />
      <Skeleton className="h-6 w-48 lg:hidden" />
      <Skeleton className="w-full h-96 max-w-[25rem] lg:max-w-2xl" />
    </div>
  );
};

export default EditProfileSkeleton;
