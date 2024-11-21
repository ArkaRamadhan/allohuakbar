import { useState, useCallback, useEffect } from "react";
import { Badge } from "../../ui/badge";
import { useDeleteData, useFetchData } from "@/features/MainData/hooks/useAPI";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/features/MainData/components/Sections/Table/Actions/Buttons";
import Modal from "@/components/Elements/Modal";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmToast, TimerToast } from "@/components/Elements/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { Detik, Menit } from "@/lib/time";
import checkNewNotifications from "@/hooks/useCheckNotif";
import { Events } from "@/config/types";
import dayjs from "@/lib/dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import NotifLoading from "@/features/MainData/components/Elements/Loading/NotifLoading";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface NotificationEvent {
  id: string;
  category: string;
  title: string;
  start: string | Date;
}

type NotificationCategories =
  | "JadwalCuti"
  | "JadwalRapat"
  | "TimelineProject"
  | "TimelineWallpaperDesktop"
  | "BookingRapat";

type FilterState = Record<NotificationCategories, boolean>;

export default function Notification() {
  // MODAL
  const {
    modals: { notificationModal },
    closeModal,
    openModal,
  } = useModalStore();

  // FILTER KATEGORI
  const [filter, setFilter] = useState<FilterState>({
    JadwalCuti: false,
    JadwalRapat: true,
    BookingRapat: true,
    TimelineWallpaperDesktop: true,
    TimelineProject: true,
  });

  // HANDLE FILTER KATEGORI
  const handleCheckboxChange = useCallback(
    (category: NotificationCategories) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [category]: !prevFilter[category],
      }));
    },
    [filter]
  );

  // FETCH NOTIF
  const { data: notif, isLoading } = useFetchData({
    queryKey: ["notifications"],
    axios: {
      url: "kegiatan/notifications",
    },
    staleTime: 0,
    refetchInterval: Menit(1),
    select: ({ data }: any) =>
      data.filter(
        (notif: NotificationEvent) =>
          filter[notif.category as NotificationCategories]
      ),
  });

  // CEK NOTIF BARU
  const newNotif = checkNewNotifications(notif as NotificationEvent[]);
  useEffect(() => {
    if (newNotif?.length > 0) {
      newNotif.forEach((event) => {
        TimerToast(
          "info",
          "Pengingat Acara",
          `Acara "${event.title}" dimulai pada ${dayjs(event.start).format(
            "dddd, DD MMM YYYY [pukul] HH:mm"
          )}`,
          Detik(5)
        );
      });
    }
  }, [notif]);

  // DEL NOTIF
  const DelNotif = useDeleteData({
    axios: {
      url: "/notifications",
    },
  });

  // NOTIF YANG DIPILIH
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  // HANDLE SELECT SEMUA NOTIF
  const handleSelectAll = useCallback(() => {
    if (
      selectedNotifications.length === (notif as NotificationEvent[]).length
    ) {
      setSelectedNotifications([]);
    } else {
      const allIds = (notif as NotificationEvent[]).map((event) => event.id);
      setSelectedNotifications(allIds);
    }
  }, [selectedNotifications, notif]);

  // HANDLE SELECT NOTIF
  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((notifId) => notifId !== id)
        : [...prevSelected, id]
    );
  };

  // UNTUK INVALIDATE KEY
  const queryClient = useQueryClient();

  // HANDLE DELETE NOTIF ID
  const handleDeleteNotif = useCallback(
    async (id: any) =>
      DelNotif.mutateAsync(id, {
        onError: ({ response }: any) => {
          TimerToast(
            "error",
            "Notifikasi gagal dihapus.",
            response.data.message
          );
        },
      }),
    [DelNotif]
  );

  // HANDLE DATA YANG DIPILIH
  const handleDeleteSelected = useCallback(() => {
    closeModal("notificationModal");
    ConfirmToast(
      "question",
      "Apakah Anda yakin?",
      "Notifikasi yang dipilih akan dihapus!"
    ).then(async (result) => {
      if (result.isConfirmed) {
        await Promise.all(
          selectedNotifications.map(
            async (id) => await DelNotif.mutateAsync(id as any)
          )
        )
          .then(({ data }: any) =>
            TimerToast("success", "Notifikasi telah dihapus.", data.message)
          )
          .catch(({ response }: any) =>
            TimerToast(
              "error",
              "Notifikasi gagal dihapus.",
              response.data.message
            )
          )
          .finally(() => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            DelNotif.reset();
            setSelectedNotifications([]);
          });
      }
    });
  }, [DelNotif, notif, selectedNotifications]);

  return (
    <Modal
      isOpen={notificationModal}
      trigger={{
        onOpen: (
          <div className="relative hover:cursor-pointer">
            {(notif as Events[])?.length > 0 ? (
              <Skeleton className="absolute top-0 right-0 size-3 bg-sky-500 rounded-full" />
            ) : null}
            <Bell
              onClick={() => {
                openModal("notificationModal");
              }}
            />
          </div>
        ),
        onClose: (
          <CloseButton
            onClick={() => {
              closeModal("notificationModal");
            }}
          />
        ),
      }}>
      <Modal.Title>
        <div className="flex flex-col gap-2 w-full">
          <span>{(notif as any)?.length} Notification</span>
          <div className="p-2 grid grid-cols-2 gap-2">
            {Object.keys(filter).map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox
                  checked={filter[category as NotificationCategories]}
                  onCheckedChange={() =>
                    handleCheckboxChange(category as NotificationCategories)
                  }
                  className="mr-2"
                />
                <Label className="text-sm">{category}</Label>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[2rem_1fr] gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Checkbox
                    checked={
                      selectedNotifications.length ===
                      (notif as NotificationEvent[])?.length
                    }
                    onCheckedChange={handleSelectAll}
                    className="w-full h-full"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pilih Semua</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              className="w-full"
              variant={"destructive"}
              onClick={handleDeleteSelected}
              disabled={selectedNotifications.length === 0}>
              Hapus yang Dipilih
            </Button>
          </div>
        </div>
      </Modal.Title>
      <Modal.Content>
        {!isLoading ? (
          <div className="ring ring-gray-400 rounded max-h-[50vh] px-4 py-2  overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {(notif as NotificationEvent[])?.length === 0 ? (
              <span className="flex justify-center items-center text-sm text-gray-600">
                <Badge color="warning">Tidak ada notifikasi</Badge>
              </span>
            ) : (
              (notif as NotificationEvent[])?.map((event) => (
                <div
                  className="flex justify-between items-center"
                  key={event.id}>
                  <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-2">
                    <Checkbox
                      checked={selectedNotifications.includes(event.id)}
                      onCheckedChange={() => handleSelectNotification(event.id)}
                      className="row-span-2 self-center mr-2"
                    />
                    <span className="font-medium">
                      <h1>
                        <b>{event.title}</b> | <i>{event.category}</i>
                      </h1>
                    </span>
                    <p className="col-start-2 row-start-2 text-xs text-gray-500">
                      {dayjs(event.start).format("dddd, DD MMMM YYYY, HH:mm")}
                    </p>
                  </div>
                  <Badge
                    variant={"destructive"}
                    onClick={async () =>
                      await handleDeleteNotif(event.id).finally(() => {
                        queryClient.invalidateQueries({
                          queryKey: ["notifications"],
                        });
                        DelNotif.reset();
                      })
                    }
                    className="hover:cursor-pointer">
                    Hapus
                  </Badge>
                </div>
              ))
            )}
          </div>
        ) : (
          <NotifLoading />
        )}
      </Modal.Content>
    </Modal>
  );
}
