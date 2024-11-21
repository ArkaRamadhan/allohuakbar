import z from "zod";

// MEETINGSCHUDULE
export const MeetingScheduleFields = [
  {
    name: "tanggal",
    label: "Tanggal",
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
    name: "waktu",
    label: "Waktu",
    type: "time",
    validation: z.string().nullable(),
  },
  {
    name: "selesai",
    label: "Selesai",
    type: "time",
    validation: z.string().nullable(),
  },
  {
    name: "tempat",
    label: "Tempat",
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
    name: "status",
    label: "Status",
    type: "select",
    options: ["Done", "Reschedule", "On Progress", "Cancel"],
    validation: z.string().nullable(),
  },
];
