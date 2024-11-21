import { Field } from "@/config/types";
import { create } from "zustand";

interface FormState {
  initialData: any;
  fields: Partial<Field>[];
}

interface FormAction {
  setInitialData: (initialData: any) => void;
  setFields: (fields: Partial<Field>[]) => void;
}

interface FileState {
  file: any;
  setFile: (file: any) => void;
  setFileAsync: (file: any) => Promise<void>;
}

export const useFormStore = create<FormState & FormAction>((set) => ({
  initialData: {},
  setInitialData: (initialData) => set({ initialData }),
  fields: [],
  setFields: (fields) => set({ fields }),
}));

export const useFileStore = create<FileState>((set) => ({
  file: {},
  setFile: (file) => set({ file }),
  setFileAsync: (file) =>
    new Promise<void>((resolve) => {
      set({ file });
      resolve();
    }),
}));
