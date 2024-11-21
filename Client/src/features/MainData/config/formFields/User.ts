import z from "zod";

// USER
export const UserFields = [
  {
    name: "Username",
    label: "Username",
    type: "text",
    validation: z
      .string()
      .min(4, {
        message: "Username harus lebih dari 4 karakter.",
      })
      .max(50, { message: "Username harus kurang dari 50 karakter" })
      .regex(
        /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
        "Username mengandung karakter yang tidak diperbolehkan."
      ),
  },
  {
    name: "Email",
    label: "Email",
    type: "text",
    validation: z.string().email({
      message: "Email tidak valid.",
    }),
  },
  {
    name: "Password",
    label: "password",
    type: "text",
    validation: z
      .string()
      .min(8, {
        message: "Password harus lebih dari 8 karakter.",
      })
      .max(250, { message: "Password harus kurang dari 250 karakter" })
      .regex(
        /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
        "Password mengandung karakter yang tidak diperbolehkan."
      ),
  },
  {
    name: "Role",
    label: "Role",
    type: "select",
    options: ["user", "admin"],
    validation: z.enum(["user", "admin"], { message: "role tidak valid" }),
  },
];
