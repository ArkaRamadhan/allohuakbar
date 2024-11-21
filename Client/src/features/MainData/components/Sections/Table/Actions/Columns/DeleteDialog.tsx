import React, { useCallback } from "react";
import Modal from "@/components/Elements/Modal";
import { DeleteDialog } from "../ActionsDialog";
import { CloseButton, DeleteButton } from "../Buttons";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { TimerToast } from "@/components/Elements/Toast";
import { useToken } from "@/hooks/useToken";

interface DeleteDialogProps {
  title: string;
  event: {
    onOpen: () => void;
    onClose: () => void;
  };
  form: {
    id: string | number;
    mutation: UseMutationResult<unknown, Error, void, unknown>;
    queryKey: string[];
  };
}

const DeleteAction: React.FC<DeleteDialogProps> = ({
  title,
  event: { onOpen, onClose },
  form: { id, mutation, queryKey },
}) => {
  const queryClient = useQueryClient();

  const {
    modals: { deleteModal },
    openModal,
    closeModal,
  } = useModalStore();

  const handleDelete = useCallback(
    async (id: any) => {
      await mutation
        .mutateAsync(id, {
          onSuccess: ({ data }: any) => {
            TimerToast("success", "Data berhasil dihapus!", data.message);
          },
          onError: ({ response }: any) => {
            TimerToast("error", "Data gagal dihapus!", response.data.message);
          },
        })
        .then(() => closeModal("deleteModal"))
        .then(() => queryClient.invalidateQueries({ queryKey: queryKey }))
        .then(() => mutation.reset());
    },
    [mutation]
  );

  const {
    userDetails: { role },
  } = useToken();

  // AUTHORIZATION
  if (role === "admin") {
    return (
      <Modal
        isOpen={deleteModal}
        trigger={{
          onOpen: (
            <DeleteButton
              onClick={() => {
                openModal("deleteModal");
                onOpen();
              }}
            />
          ),
          onClose: (
            <CloseButton
              onClick={() => {
                closeModal("deleteModal");
                onClose();
              }}
            />
          ),
        }}>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Content>
          <DeleteDialog onSubmit={() => handleDelete(id)} />
        </Modal.Content>
      </Modal>
    );
  }
};

export default DeleteAction;
