import z from "zod";

// MEMO
export const SuratKeluarFields = [
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
    name: "from",
    label: "From",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "pic",
    label: "PIC",
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
