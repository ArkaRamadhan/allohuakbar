import Card from "../../Elements/Card";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const DataInformasiChart = () => {
  const { data: GetSuratMasuk, isLoading: LoadingMasuk } = useFetchData({
    queryKey: ["suratMasuks"],
    axios: {
      url: "/informasi/SuratMasuk",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetSuratKeluar, isLoading: LoadingKeluar } = useFetchData({
    queryKey: ["suratKeluars"],
    axios: {
      url: "/informasi/SuratKeluar",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetArsip, isLoading: loadingArsip } = useFetchData({
    queryKey: ["arsips"],

    axios: {
      url: "/informasi/Arsip",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const DataInformasi = useMemo(
    () => [
      {
        label: "Surat Masuk",
        color: "blue",
        count: GetSuratMasuk,
      },
      {
        label: "Surat Keluar",
        color: "blue",
        count: GetSuratKeluar,
      },
      {
        label: "Arsip",
        color: "blue",
        count: GetArsip,
      },
    ],
    [GetSuratMasuk, GetSuratKeluar, GetArsip]
  );

  const isLoading = LoadingMasuk || LoadingKeluar || loadingArsip;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card
      className="grid grid-cols-3 gap-2"
      title="Data & Informasi"
      color="blue">
      {DataInformasi.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
