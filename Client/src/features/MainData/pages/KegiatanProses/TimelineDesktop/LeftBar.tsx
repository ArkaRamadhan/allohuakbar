import Modal from "@/components/Elements/Modal";
import { ConfirmToast, TimerToast } from "@/components/Elements/Toast";
import { Button } from "@/components/ui/button";
import { ResourceFields } from "@/config/FormConfig/calendar";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import { CloseButton } from "@/features/MainData/components/Sections/Table/Actions/Buttons";
import {
  useDeleteData,
  useFetchData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { useToken } from "@/hooks/useToken";
import { Excel } from "@/Utils/Excel";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback } from "react";

interface Props {
  resourceId: number | null;
  setResourceId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function LeftBar({ resourceId, setResourceId }: Props) {
  const {
    userDetails: { role },
  } = useToken();

  const { setFields } = useFormStore();

  const {
    modals: { addModal },
    openModal,
    closeModal,
  } = useModalStore();

  // RESOURCES
  const { data: Resources } = useFetchData({
    queryKey: ["resourceDesktops"],
    axios: {
      url: "/kegiatan/resourceDesktop",
    },
  });
  const PostResource = usePostData({
    axios: {
      url: "/kegiatan/resourceDesktop",
    },
  });
  const DelResource = useDeleteData({
    axios: {
      url: "/kegiatan/resourceDesktop",
    },
  });

  const queryClient = useQueryClient();

  // HANDLE ADD RESOURCE
  const handleAddResource = useCallback(
    async (values: any) => {
      await PostResource.mutateAsync(values, {
        onSuccess: ({ data }: any) => {
          TimerToast("success", "Resource berhasil disimpan", data.message);
        },
        onError: ({ response }: any) => {
          TimerToast(
            "success",
            "Resource berhasil disimpan",
            response.data.message
          );
        },
      }).finally(() => {
        closeModal("addModal");
        queryClient.invalidateQueries({ queryKey: ["resourceDesktops"] });
        PostResource.reset();
      });
    },
    [PostResource]
  );

  // HANDLE DELETE RESOURCE
  const handleDelResource = useCallback(
    (id: any) => {
      ConfirmToast(
        "question",
        "Apakah anda yakin ingin menghapus resource ini?"
      ).then(async (result) => {
        if (result.isConfirmed) {
          await DelResource.mutateAsync(id, {
            onSuccess: ({ data }: any) => {
              TimerToast("success", "Resource berhasil dihapus", data.message);
            },
            onError: ({ response }: any) => {
              TimerToast(
                "success",
                "Resource berhasil dihapus",
                response.data.message
              );
            },
          })
            .then(() => {
              setResourceId(0);
            })
            .finally(() => {
              queryClient.invalidateQueries({ queryKey: ["resourceDesktops"] });
              DelResource.reset();
            });
        }
      });
    },
    [ConfirmToast, DelResource, setResourceId, queryClient]
  );

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      {/* HEADER */}
      <span className="flex justify-between items-center gap-2 h-[3rem] pb-2 border-b-4">
        <Button className="font-bold bg-sky-500 h-full w-full rounded py-1 px-2 text-white">
          {(Resources as any)?.length} Resource
        </Button>
        {role === "admin" && (
          <Excel
            link={{
              exportThis: "kegiatan/exportTimelineDesktop",
              exportAll: "kegiatan",
            }}
            invalidateKey={["resourceDesktops"]}
          />
        )}
      </span>
      {/* LIST */}
      <div
        className={clsx(
          { "pe-0": (Resources as any)?.length === 0 },
          `flex flex-col gap-2 h-[69vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pe-2`
        )}>
        {/* MODAL */}
        <Modal
          isOpen={addModal}
          trigger={{
            onOpen: (
              <>
                <Button
                  onClick={() => {
                    setFields(ResourceFields);
                    openModal("addModal");
                  }}
                  className="font-bold bg-blue-600 hover:bg-blue-700 h-[2rem] w-full rounded py-1 px-2 text-white">
                  Tambah Resource
                </Button>
                <p className="text-xs text-center text-red-600 font-bold">
                  Click 2 kali untuk hapus
                </p>
              </>
            ),
            onClose: (
              <CloseButton
                onClick={() => {
                  setFields([]);
                  closeModal("addModal");
                }}
              />
            ),
          }}>
          <Modal.Title>Tambah Resource</Modal.Title>
          <Modal.Content>
            <DynamicForm type="add" onSubmit={handleAddResource} />
          </Modal.Content>
        </Modal>
        {/* MODAL */}
        {(Resources as any)?.length === 0 ? (
          <div className="ring-2 ring-blue-200 rounded m-2 p-1">
            <p>
              Belum ada Resources yang tersedia, tambahkan resources baru di
              sini.
            </p>
          </div>
        ) : (
          (Resources as any)?.map((event: any, idx: number) => {
            return (
              <div
                key={idx}
                className={clsx(
                  { "bg-gray-600 text-white": event.id === resourceId },
                  "text-gray-800 ring-2 ring-slate-200 shadow py-2 px-3 rounded hover:-translate-y-1 transition-all"
                )}>
                <div
                  className="font-bold grid grid-cols-[1fr_auto] justify-between"
                  onClick={() => {
                    if (resourceId === event.id) {
                      // AUTHORIZATION
                      if (role === "admin") {
                        handleDelResource(event.id);
                      }
                    } else {
                      setResourceId(event.id);
                    }
                  }}>
                  <h1>{event.name}</h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
