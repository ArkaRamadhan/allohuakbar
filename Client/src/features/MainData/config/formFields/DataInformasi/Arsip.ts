import z from "zod";

// MEMO
export const ArsipFields = [
  {
    name: "no_arsip",
    label: "Nomor Arsip",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "jenis_dokumen",
    label: "Jenis Dokumen",
    type: "text",
    validation: z.any().nullable(),
  },
  {
    name: "no_dokumen",
    label: "Nomor Dokumen",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_dokumen",
    label: "Tanggal Dokumen",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "perihal",
    label: "Perihal",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "no_box",
    label: "Nomor Box",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_penyerahan",
    label: "Tanggal Penyerahan",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "keterangan",
    label: "Keterangan",
    type: "text",
    validation: z.string().nullable(),
  },
];
