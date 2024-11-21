import { Skeleton } from "@/components/ui/skeleton";

export default function NotifLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[70%_26%] gap-4">
        <Skeleton className="w-full h-[3rem] rounded" />
        <Skeleton className="w-full h-[3rem] rounded" />
      </div>
      <div className="grid grid-cols-[70%_26%] gap-4">
        <Skeleton className="w-full h-[3rem] rounded" />
        <Skeleton className="w-full h-[3rem] rounded" />
      </div>
      <div className="grid grid-cols-[70%_26%] gap-4">
        <Skeleton className="w-full h-[3rem] rounded" />
        <Skeleton className="w-full h-[3rem] rounded" />
      </div>
    </div>
  );
}
