import { useMemo } from "react";
import Card from "../../Elements/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const RencanaKerjaChart = () => {
  const { data: GetProject, isLoading: LoadingProject } = useFetchData({
    queryKey: ["projects"],
    axios: {
      url: "/project/Project",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const RencanaKerja = useMemo(
    () => [
      {
        label: "Project",
        color: "gold",
        count: GetProject,
      },
    ],
    [GetProject]
  );

  if (LoadingProject) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card
      className="grid grid-cols-1 gap-2"
      title="Rencana Kerja"
      color="gold">
      {RencanaKerja.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
