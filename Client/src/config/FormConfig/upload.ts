import z from "zod";

// Upload
const MAX_FILE_SIZE = 5000000 * 50;
const ACCEPTED_FILE_TYPES = [
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "text/csv", // .csv
  "application/pdf", // .pdf
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "image/jpeg", // .jpeg
  "image/jpg", // .jpg
  "image/png", // .png
  "image/webp", // .webp
];
export const UploadFields = [
  {
    name: "file",
    label: "File Upload",
    type: "file",
    validation: z
      .any()
      .refine((file) => file?.size > 0, { message: "file harus diisi." })
      .refine(
        (file) => file?.size === 0 || ACCEPTED_FILE_TYPES.includes(file?.type),
        {
          message:
            "harus format .doc/.docx, .xlsx, .csv, .pdf, .ppt/.pptx, .jpg/.jpeg/.png/.webp",
        }
      )
      .refine((file) => file?.size <= MAX_FILE_SIZE, {
        message: `harus lebih kecil dari 50MB.`,
      }),
  },
];
// EndUpload
