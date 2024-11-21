import { useCallback } from "react";
import Modal from "@/components/Elements/Modal";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import { CloseButton, EditButton } from "../Buttons";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { TimerToast } from "@/components/Elements/Toast";

interface EditFormProps {
  title: string;
  form: {
    mutation: UseMutationResult<unknown, Error, void, unknown>;
    queryKey: string[];
    otherValue?: any;
  };
  event: {
    onOpen: () => void;
    onClose: () => void;
  };
}

const EditForm = ({
  title,
  form: { mutation, queryKey, otherValue = undefined },
  event: { onOpen, onClose },
}: EditFormProps) => {
  const queryClient = useQueryClient();

  const {
    modals: { editModal },
    openModal,
    closeModal,
  } = useModalStore();

  const handleSubmit = useCallback(
    async (values: any) => {
      await mutation
        .mutateAsync(
          { ...values, ...otherValue },
          {
            onSuccess: ({ data }: any) => {
              TimerToast("success", "Data berhasil diubah!", data.message);
            },
            onError: ({ response }: any) => {
              TimerToast("error", "Data gagal diubah!", response.data.message);
            },
          }
        )
        .then(() => queryClient.invalidateQueries({ queryKey: queryKey }))
        .then(() => closeModal("editModal"))
        .then(() => mutation.reset());
    },
    [mutation, closeModal, queryClient]
  );

  return (
    <Modal
      isOpen={editModal}
      trigger={{
        onOpen: (
          <EditButton
            onClick={() => {
              openModal("editModal");
              onOpen();
            }}
          />
        ),
        onClose: (
          <CloseButton
            onClick={() => {
              closeModal("editModal");
              onClose();
            }}
          />
        ),
      }}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        <DynamicForm type="edit" onSubmit={handleSubmit} />
      </Modal.Content>
    </Modal>
  );
};

export default EditForm;
