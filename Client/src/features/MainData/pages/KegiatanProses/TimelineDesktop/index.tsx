import App from "@/components/Layouts/App";
import { Calendar } from "@/features/MainData/components/Sections/Calendar/Calendar";
import {
  useDeleteData,
  useFetchData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import { Events } from "@/config/types";
import TimelineDesktopBar from "./LeftBar";
import { useState } from "react";
import { CalendarLoading } from "@/features/MainData/components/Elements/Loading/CalendarLoading";

export default function TimeLineDesktop() {
   // RESOURCE ID
   const [resourceId, setResourceId] = useState<number | null>(null);
   
  // EVENTS
  const { data: Events, isLoading } = useFetchData({
    queryKey: ["timelineDesktop"],
    axios: {
      url: "/kegiatan/timelineDesktop",
    },
    select: ({ data }: any) =>
      data.filter((data: Events) => data.resourceId === resourceId),
  });
  const Post = usePostData({
    axios: {
      url: "/kegiatan/timelineDesktop",
    },
  });
  const Del = useDeleteData({
    axios: {
      url: "/kegiatan/timelineDesktop",
    },
  });

  return (
    <App services="TimeLine Wallpaper Desktop">
      {isLoading ? (
        <CalendarLoading />
      ) : (
        <Calendar
          initialView="dayGridMonth"
          data={Events as Events[]}
          mutation={{
            post: Post,
            otherValue: {
              resourceId,
            },
            del: Del,
            invalidateKey: ["timelineDesktop"],
          }}
          subLeftBar={
            <TimelineDesktopBar
              resourceId={resourceId}
              setResourceId={setResourceId}
            />
          }
        />
      )}
    </App>
  );
}
