import React, { memo } from "react";
import Modal from "@/components/Elements/Modal";
import { DetailDialog } from "../ActionsDialog";
import { CloseButton, ShowButton } from "../Buttons";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { useFormStore } from "@/features/MainData/store/FormStore";

interface ShowDialogProps {
  title: string;
  event: {
    onOpen: () => void;
    onClose: () => void;
  };
}

const ShowDialog: React.FC<ShowDialogProps> = ({
  title,
  event: { onOpen, onClose },
}) => {
  const {
    modals: { showModal },
    openModal,
    closeModal,
  } = useModalStore();

  const { fields, initialData } = useFormStore();

  return (
    <Modal
      isOpen={showModal}
      trigger={{
        onOpen: (
          <ShowButton
            onClick={() => {
              openModal("showModal");
              onOpen();
            }}
          />
        ),
        onClose: (
          <CloseButton
            onClick={() => {
              onClose();
              closeModal("showModal");
            }}
          />
        ),
      }}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        <DetailDialog fields={fields} initialData={initialData} />
      </Modal.Content>
    </Modal>
  );
};

export default ShowDialog;
