import z from "zod";

// MEMO
export const PerdinFields = [
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
    validation: z.any().nullable(),
  },
  {
    name: "hotel",
    label: "Deskripsi",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "transport",
    label: "~",
    type: "text",
    validation: z.string().nullable(),
  },
];
