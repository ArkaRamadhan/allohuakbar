import React, { useCallback } from "react";
import Modal from "@/components/Elements/Modal";
import { DynamicForm } from "@/features/MainData/components/Sections/Form/DynamicForm";
import { AddButton, CloseButton } from "../Buttons";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { TimerToast } from "@/components/Elements/Toast";

interface AddFormProps {
  title: string;
  event?: {
    onOpen: () => void;
    onClose: () => void;
  };
  form: {
    mutation: UseMutationResult<unknown, Error, void, unknown>;
    queryKey: string[];
    otherValue?: any;
  };
}

const AddForm: React.FC<AddFormProps> = ({
  title,
  event,
  form: { mutation, queryKey, otherValue = undefined },
}) => {
  const queryClient = useQueryClient();

  const {
    modals: { addModal },
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
              TimerToast("success", "Data berhasil ditambahkan!", data.message);
            },
            onError: ({ response }: any) => {
              TimerToast(
                "error",
                "Data gagal ditambahkan!",
                response.data.message
              );
            },
          }
        )
        .then(() => closeModal("addModal"))
        .then(() => queryClient.invalidateQueries({ queryKey: queryKey }))
        .then(() => mutation.reset());
    },
    [mutation, closeModal, queryClient]
  );

  return (
    <Modal
      isOpen={addModal}
      trigger={{
        onOpen: (
          <AddButton
            onClick={() => {
              openModal("addModal");
              event?.onOpen();
            }}
          />
        ),
        onClose: (
          <CloseButton
            onClick={() => {
              closeModal("addModal");
              event?.onClose();
            }}
          />
        ),
      }}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        {/* FORM */}
        <DynamicForm type="add" onSubmit={handleSubmit} />
        {/* END FORM */}
      </Modal.Content>
    </Modal>
  );
};

export default AddForm;
