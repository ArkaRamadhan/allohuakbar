import z from "zod";

// MEMO
export const MemoFields = [
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "no_memo",
    label: "Nomor Memo",
    type: "select",
    options: ["ITS-SAG", "ITS-ISO"],
    validation: z.any().nullable(),
  },
  {
    name: "perihal",
    label: "Perihal",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "pic",
    label: "PIC",
    type: "text",
    validation: z.string().nullable(),
  },
];
