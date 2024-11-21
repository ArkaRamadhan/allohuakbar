import z from "zod";

// Surat Masuk
export const SuratMasukFields = [
  {
    name: "no_surat",
    label: "Nomor Surat",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "title",
    label: "Title",
    type: "text",
    validation: z.any().nullable(),
  },
  {
    name: "related_div",
    label: "Related Div",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "destiny_div",
    label: "Destiny Div",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
    validation: z.string().nullable(),
  },
];
