import z from "zod";

// MEMO
export const BeritaAcaraFields = [
  {
    name: "no_surat",
    label: "Nomor Surat",
    type: "select",
    options: ["ITS-SAG", "ITS-ISO"],
    validation: z.string().nullable(),
  },
  {
    name: "tanggal",
    label: "Tanggal",
    type: "date",
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
