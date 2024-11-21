import { Skeleton } from "@/components/ui/skeleton";

export const TableLoading = () => {
  return (
    <div className="flex flex-col gap-[1rem] h-full px-[2rem] pt-[1.5rem]">
      <Skeleton className="h-[2rem] w-[10rem]" />
      <div className="flex justify-between">
        <div className="flex gap-[.5rem]">
          <Skeleton className="h-[2rem] w-[4rem]" />
          <Skeleton className="h-[2rem] w-[4rem]" />
          <Skeleton className="h-[2rem] w-[4rem]" />
          <Skeleton className="h-[2rem] w-[4rem]" />
        </div>
        <div className="flex gap-[.5rem]">
          <Skeleton className="h-[2rem] w-[10rem]" />
          <Skeleton className="h-[2rem] w-[3rem]" />
        </div>
      </div>
      <Skeleton className="w-full h-[50vh]" />
      <div className="flex justify-end gap-2">
        <Skeleton className="w-[20vh] h-[5vh]" />
        <Skeleton className="w-[10vh] h-[5vh]" />
        <Skeleton className="w-[5vh] h-[5vh]" />
        <Skeleton className="w-[5vh] h-[5vh]" />
        <Skeleton className="w-[5vh] h-[5vh]" />
        <Skeleton className="w-[5vh] h-[5vh]" />
      </div>
    </div>
  );
};
