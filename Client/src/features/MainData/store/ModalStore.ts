import { create } from "zustand";

type Modal =
  | "addModal"
  | "editModal"
  | "showModal"
  | "deleteModal"
  | "uploadModal"
  | "calendarModal"
  | "notificationModal";

interface ModalStore {
  modals: {
    addModal: boolean;
    editModal: boolean;
    showModal: boolean;
    deleteModal: boolean;
    uploadModal: boolean;
    calendarModal: boolean;
    notificationModal: boolean;
  };
  openModal: (modalName: Modal) => void;
  closeModal: (modalName: Modal) => void;
  resetModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {
    addModal: false,
    editModal: false,
    showModal: false,
    deleteModal: false,
    uploadModal: false,
    calendarModal: false,
    notificationModal: false,
  },
  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),
  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),
  resetModals: () =>
    set({
      modals: {
        addModal: false,
        editModal: false,
        showModal: false,
        deleteModal: false,
        uploadModal: false,
        calendarModal: false,
        notificationModal: false,
      },
    }),
}));
