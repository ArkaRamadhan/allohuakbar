import Card from "../../Elements/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const KegiatanChart = () => {
  const { data: GetTimelineDesktop, isLoading: LoadingDesktop } = useFetchData({
    queryKey: ["timelineDesktops"],
    axios: {
      url: "/kegiatan/timelineDesktop",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetBookingRapat, isLoading: LoadingBooking } = useFetchData({
    queryKey: ["bookingRapats"],
    axios: {
      url: "/kegiatan/booking-rapat",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetJadwalRapat, isLoading: loadingRapat } = useFetchData({
    queryKey: ["jadwalRapats"],
    axios: {
      url: "/kegiatan/jadwal-rapat",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetJadwalCuti, isLoading: loadingCuti } = useFetchData({
    queryKey: ["jadwalCutis"],
    axios: {
      url: "/kegiatan/jadwal-cuti",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetMeeting, isLoading: loadingMeeting } = useFetchData({
    queryKey: ["meetings"],
    axios: {
      url: "/kegiatan/meetings",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const Kegiatan = useMemo(
    () => [
      {
        label: "Timeline Desktop",
        color: "red",
        count: GetTimelineDesktop,
      },
      {
        label: "Booking Ruang Rapat",
        color: "red",
        count: GetBookingRapat,
      },
      {
        label: "Jadwal Rapat",
        color: "red",
        count: GetJadwalRapat,
      },
      {
        label: "Jadwal Cuti",
        color: "red",
        count: GetJadwalCuti,
      },
      {
        label: "Meeting",
        color: "red",
        count: GetMeeting,
      },
    ],
    [
      GetTimelineDesktop,
      GetBookingRapat,
      GetJadwalRapat,
      GetJadwalCuti,
      GetMeeting,
    ]
  );

  const isLoading =
    LoadingDesktop ||
    LoadingBooking ||
    loadingRapat ||
    loadingCuti ||
    loadingMeeting;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card className="grid grid-cols-5 gap-2" title="Kegiatan" color="red">
      {Kegiatan.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
