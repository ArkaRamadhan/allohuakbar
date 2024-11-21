import { Skeleton } from "@/components/ui/skeleton";

export default function UploadLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[70%_13%_13%] gap-2">
        <Skeleton className="w-full h-[3rem] rounded" />
        <Skeleton className="w-full h-[3rem] rounded" />
        <Skeleton className="w-full h-[3rem] rounded" />
      </div>
    </div>
  );
}
