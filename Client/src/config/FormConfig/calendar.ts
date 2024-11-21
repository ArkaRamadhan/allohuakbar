import z from "zod";

// CALENDAR
export const CalendarFields = [
  {
    name: "title",
    label: "Judul",
    type: "string",
    validation: z
      .string()
      .min(1, "minimal 1 karakter")
      .max(50, "maksimal 50 karakter"),
  },
  {
    name: "color",
    label: "Warna",
    type: "radio",
    options: [
      "#4285f4",
      "#db4437",
      "#fbbc05",
      "#0f9d58",
      "#00bfa5",
      "#9c27b0",
      "#e91e63",
    ],
    validation: z
      .enum(
        [
          "#4285f4",
          "#db4437",
          "#fbbc05",
          "#0f9d58",
          "#00bfa5",
          "#9c27b0",
          "#e91e63",
        ],
        {
          message: "Pilih warna yang tertera.",
          required_error: "Pilih warna yang tertera.",
        }
      )
      .nullable(),
  },
];

// RESOURCE
export const ResourceFields = [
  {
    name: "name",
    label: "Nama Resource",
    type: "string",
    validation: z
      .string()
      .min(1, "minimal 1 karakter")
      .max(20, "maksimal 20 karakter"),
  },
];
