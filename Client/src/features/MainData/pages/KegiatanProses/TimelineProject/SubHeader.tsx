import Modal from "@/components/Elements/Modal";
import { TimerToast } from "@/components/Elements/Toast";
import { Button } from "@/components/ui/button";
import { ResourceFields } from "@/config/FormConfig/timeline";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import { CloseButton } from "@/features/MainData/components/Sections/Table/Actions/Buttons";
import { usePostData } from "@/features/MainData/hooks/useAPI";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { Excel } from "@/Utils/Excel";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function SubHeader() {
  const {
    modals: { addModal },
    openModal,
    closeModal,
  } = useModalStore();

  const { setInitialData, setFields } = useFormStore();

  const onCloseFormModal = () => {
    closeModal("addModal");
    setFields([]);
    setInitialData({});
  };

  const queryClient = useQueryClient();

  const PostResource = usePostData({
    axios: {
      url: "/resourceProject",
    },
  });

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
        onCloseFormModal();
        queryClient.invalidateQueries({
          queryKey: ["resourceProjects"],
        });
        PostResource.reset();
      });
    },
    [PostResource, onCloseFormModal, queryClient]
  );

  return (
    <div className="flex gap-[.5rem]">
      <Modal
        isOpen={addModal}
        trigger={{
          onOpen: (
            <Button
              onClick={() => {
                setFields(ResourceFields);
                openModal("addModal");
              }}
              className="font-bold bg-gray-600 hover:bg-gray-700 rounded py-1 px-2 text-white">
              Tambah Resource
            </Button>
          ),
          onClose: (
            <CloseButton
              onClick={() => {
                onCloseFormModal();
              }}
            />
          ),
        }}>
        <Modal.Title>Tambah Resource</Modal.Title>
        <Modal.Content>
          <DynamicForm type="add" onSubmit={handleAddResource} />
        </Modal.Content>
      </Modal>
      {/* EXCEL */}
      <Excel
        link={{
          exportThis: "kegiatan/exportTimelineProject",
        }}
        invalidateKey={["resourceProjects"]}
      />
    </div>
  );
}
