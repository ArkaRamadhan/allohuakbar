import Card from "../../Elements/Card";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const DokumenChart = () => {
  const { data: GetMemo, isLoading: LoadingMemo } = useFetchData({
    queryKey: ["memos"],
    axios: {
      url: "/dokumen/memo",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetBeritaAcara, isLoading: LoadingBerita } = useFetchData({
    queryKey: ["beritaAcaras"],
    axios: {
      url: "/dokumen/beritaAcara",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetSurat, isLoading: LoadingSurat } = useFetchData({
    queryKey: ["surats"],
    axios: {
      url: "/dokumen/surat",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetSK, isLoading: LoadingSK } = useFetchData({
    queryKey: ["sks"],
    axios: {
      url: "/dokumen/sk",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetPerdin, isLoading: LoadingPerdin } = useFetchData({
    queryKey: ["perdins"],
    axios: {
      url: "/dokumen/Perdin",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const Dokumen = useMemo(
    () => [
      {
        label: "Memo",
        color: "purple",
        count: GetMemo,
      },
      {
        label: "Berita Acara",
        color: "purple",
        count: GetBeritaAcara,
      },
      {
        label: "Surat",
        color: "purple",
        count: GetSurat,
      },
      {
        label: "SK",
        color: "purple",
        count: GetSK,
      },
      {
        label: "Perjalanan Dinas",
        color: "purple",
        count: GetPerdin,
      },
    ],
    [GetMemo, GetBeritaAcara, GetSurat, GetSK, GetPerdin]
  );

  const isLoading =
    LoadingMemo || LoadingBerita || LoadingSurat || LoadingSK || LoadingPerdin;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card className="grid grid-cols-5 gap-2" title="Dokumen" color="purple">
      {Dokumen.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
