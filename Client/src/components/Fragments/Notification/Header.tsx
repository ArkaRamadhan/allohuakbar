import { RealtimeClock, RealtimeDate } from "@/Utils/RealtimeClock";
import { Label } from "../../ui/label";
import Notification from "./Notification";

export default function Header({ title }: { title: string | undefined }) {
  return (
    <header className="mx-4 mt-2 flex justify-between border-b-2 border-gray-100">
      <div className="flex gap-2 items-end m-2">
        <div>
          <Label className="block text-sm">Halaman</Label>
          <Label className="block truncate text-sm font-medium ">
            <b className="uppercase">{title}</b>
          </Label>
        </div>
      </div>
      <div className="flex items-center gap-4 m-2">
        <Label className="truncate text-sm font-medium ring-2 p-1.5 rounded bg-slate-50">
          {RealtimeClock()}
        </Label>
        <Label className="truncate text-sm font-medium ring-2 p-1.5 rounded bg-slate-50">
          {RealtimeDate()}
        </Label>
        <Notification />
      </div>
    </header>
  );
}
