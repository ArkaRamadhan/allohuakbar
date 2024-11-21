import z from "zod";

export const MeetingFields = [
  {
    name: "task",
    label: "Task",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tindak_lanjut",
    label: "Tindak Lanjut",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Done", "On Progress", "Cancel"],
    validation: z.string().nullable(),
  },
  {
    name: "update_pengerjaan",
    label: "Update Pengerjaan",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "pic",
    label: "Pic",
    type: "text",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_target",
    label: "Tanggal Target",
    type: "date",
    validation: z.string().nullable(),
  },
  {
    name: "tanggal_actual",
    label: "Tanggal Actual",
    type: "date",
    validation: z.string().nullable(),
  },
];
