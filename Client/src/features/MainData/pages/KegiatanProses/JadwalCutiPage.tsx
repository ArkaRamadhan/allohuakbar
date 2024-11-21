import App from "@/components/Layouts/App";
import { Calendar } from "../../components/Sections/Calendar/Calendar";
import { useDeleteData, useFetchData, usePostData } from "../../hooks/useAPI";
import { Events } from "@/config/types";
import { useToken } from "@/hooks/useToken";
import { Excel } from "@/Utils/Excel";
import { Button } from "@/components/ui/button";
import { id } from "date-fns/locale/id";
import { format } from "date-fns";
import clsx from "clsx";
import { CalendarLoading } from "../../components/Elements/Loading/CalendarLoading";

export default function JadwalCuti() {
  const {
    userDetails: { role },
  } = useToken();

  const { data, isLoading } = useFetchData({
    queryKey: ["jadwalCutis"],
    axios: {
      url: "/kegiatan/jadwal-cuti",
    },
  });

  const Post = usePostData({
    axios: {
      url: "/kegiatan/jadwal-cuti",
    },
  });

  const Del = useDeleteData({
    axios: {
      url: "/kegiatan/jadwal-cuti",
    },
  });

  const subLeftBar = (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      {/* HEADER */}
      <span className="flex justify-between items-center gap-2 h-[3rem] pb-2 border-b-4">
        <Button className="font-bold bg-sky-500 h-full w-full rounded py-1 px-2 text-white">
          {(data as any)?.length} Jadwal
        </Button>
        {role === "admin" && <Excel link={{ 
          exportThis: "kegiatan/exportCuti",
          exportAll: "kegiatan",
          }}
          invalidateKey={["jadwalCutis"]}
           />}
      </span>
      {/* LIST */}
      <div
        className={clsx(
          { "pe-0": (data as any)?.length === 0 },
          `flex flex-col gap-2 h-[69vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pe-2`
        )}>
        {(data as any)?.length === 0 ? (
          <div className="ring-2 ring-blue-200 rounded m-2 p-1">
            <p>
              Belum ada jadwal yang tersedia, tambahkan jadwal baru di menu
              Calendar.
            </p>
          </div>
        ) : (
          (data as any)?.map((event: any, idx: number) => {
            return (
              <div
                key={idx}
                className="ring-2 ring-slate-200 shadow py-2 px-3 rounded"
                style={{ backgroundColor: event.color }}>
                <div className="font-bold text-white">{event.title}</div>
                <div className="text-white">
                  {format(event.start, "dd MMMM", {
                    locale: id,
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <App services="Jadwal Cuti">
      {isLoading ? (
        <CalendarLoading />
      ) : (
        <Calendar
          initialView="dayGridMonth"
          data={data as Events[]}
          mutation={{ post: Post, del: Del, invalidateKey: ["jadwalCutis"] }}
          subLeftBar={subLeftBar}
        />
      )}
    </App>
  );
}
