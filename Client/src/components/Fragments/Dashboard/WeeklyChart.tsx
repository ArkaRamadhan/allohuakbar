import Card from "../../Elements/Card";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const WeeklyChart = () => {
  const { data: GetTimelineProject, isLoading: LoadingProject } = useFetchData({
    queryKey: ["timelineProjects"],
    axios: {
      url: "/weeklytimeline/timelineProject",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetSchedule, isLoading: LoadingSchedule } = useFetchData({
    queryKey: ["meetingSchedules"],
    axios: {
      url: "/weeklytimeline/meetingSchedule",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const Weekly = useMemo(
    () => [
      {
        label: "Timeline Project",
        color: "green",
        count: GetTimelineProject,
      },
      {
        label: "Schedule",
        color: "green",
        count: GetSchedule,
      },
    ],
    [GetTimelineProject, GetSchedule]
  );

  const isLoading = LoadingProject || LoadingSchedule;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card
      className="grid grid-cols-2 gap-2"
      title="Weekly Timeline"
      color="green">
      {Weekly.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
