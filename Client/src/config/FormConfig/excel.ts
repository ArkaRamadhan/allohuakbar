import z from "zod";

const MAX_FILE_SIZE = 5000000 * 50;
const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];
export const ExcelFields = [
  {
    name: "file",
    label: "Import Excel",
    type: "file",
    validation: z
      .any()
      .refine((file) => file?.size > 0, { message: "file harus diisi." })
      .refine(
        (file) => file?.size === 0 || ACCEPTED_FILE_TYPES.includes(file?.type),
        {
          message: "harus format .xlsx",
        }
      )
      .refine((file) => file?.size <= MAX_FILE_SIZE, {
        message: `harus lebih kecil dari 50MB.`,
      }),
  },
];
