import { Skeleton } from "@/components/ui/skeleton";

export const CalendarLoading = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-[1rem] h-[80vh] px-[2rem] pt-[1.5rem]">
      <Skeleton className="w-[15vw] h-full" />
      <div className="flex flex-col gap-[.5rem]">
        <div className="flex justify-between mb-2">
          <div className="flex gap-[.3rem]">
            <Skeleton className="h-[2.5rem] w-[6rem]" />
            <Skeleton className="h-[2.5rem] w-[4rem]" />
          </div>
          <div className="flex items-center gap-[.5rem]">
            <Skeleton className="h-[2.5rem] w-[3rem]" />
            <Skeleton className="h-[2.5rem] w-[10rem]" />
            <Skeleton className="h-[2.5rem] w-[3rem]" />
          </div>
          <div className="flex items-center gap-[.1rem]">
            <Skeleton className="h-[2.2rem] w-[4rem]" />
            <Skeleton className="h-[2.2rem] w-[4rem]" />
            <Skeleton className="h-[2.2rem] w-[4rem]" />
            <Skeleton className="h-[2.2rem] w-[4rem]" />
          </div>
        </div>
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};
