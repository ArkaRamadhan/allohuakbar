import { Skeleton } from "@/components/ui/skeleton";

export const TimelineLoading = () => {
  return (
    <div className="flex flex-col gap-[1rem] h-full px-[2rem] pt-[1.5rem]">
      <div className="flex justify-between mb-2">
        <div className="flex gap-[.5rem]">
          <Skeleton className="h-[2.5rem] w-[10rem]" />
          <Skeleton className="h-[2.5rem] w-[5rem]" />
        </div>
        <div className="flex items-center gap-[.5rem]">
          <Skeleton className="h-[1rem] w-[2rem]" />
          <Skeleton className="h-[1rem] w-[8rem]" />
          <Skeleton className="h-[1rem] w-[2rem]" />
        </div>
        <div className="flex gap-[.5rem]">
          <Skeleton className="h-[2.3rem] w-[8rem]" />
        </div>
      </div>
      <Skeleton className="w-full h-[60vh]" />
      <div className="flex justify-end gap-2">
        <Skeleton className="w-[15vw] h-[2vh]" />
        <Skeleton className="w-[50vw] h-[2vh]" />
      </div>
    </div>
  );
};
