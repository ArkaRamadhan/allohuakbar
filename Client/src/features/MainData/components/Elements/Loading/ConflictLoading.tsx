import { Skeleton } from "@/components/ui/skeleton";

export default function ConflictLoading() {
  return (
    <div className="p-[2rem] h-screen grid grid-cols-3  gap-4">
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
      <Skeleton className="w-full h-[11rem]" />
    </div>
  );
}
