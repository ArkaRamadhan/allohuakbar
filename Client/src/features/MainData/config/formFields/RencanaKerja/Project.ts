import z from "zod";

// MEMO
export const ProjectFields = [
  {
    name: "group",
    label: "Group",
    type: "select",
    options: ["ITS-ISO", "ITS-SAG"],
    validation: z.any().nullable(),
  },
  {
    name: "infra_type",
    label: "Infrastructure Type",
    type: "select",
    options: ["SOF", "HAR", "SER"],
    validation: z.any().nullable(),
  },
  {
    name: "budget_type",
    label: "Type Anggaran",
    type: "select",
    options: ["RBB", "NRBB"],
    validation: z.any().nullable(),
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: ["A", "B"],
    validation: z.any().nullable(),
  },
  {
    name: "jenis_pengadaan",
    label: "Jenis Pengadaan",
    type: "text",
    validation: z.any().nullable(),
  },
  {
    name: "nama_pengadaan",
    label: "Nama Pengadaan",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "div_inisiasi",
    label: "Div Inisiasi",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "bulan",
    label: "Bulan",
    type: "month",
    validation: z.string().nullable(),
  },
  {
    name: "sumber_pendanaan",
    label: "Sumber Pendanaan",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "anggaran",
    label: "Anggaran",
    type: "number",
    validation: z.string().nullable(),
  },
  {
    name: "no_izin",
    label: "Nomor Izin",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_izin",
    label: "Tanggal Izin",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_tor",
    label: "Tanggal Tor",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "pic",
    label: "PIC",
    type: "text",
    validation: z.string().nullable(),
  },
];
