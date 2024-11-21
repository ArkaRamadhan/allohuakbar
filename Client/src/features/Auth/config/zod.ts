import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid.")
    .min(5, "Email harus memiliki setidaknya 5 karakter.")
    .max(50, "Email tidak boleh lebih dari 50 karakter."),
  password: z
    .string()
    .min(8, "Password harus memiliki setidaknya 8 karakter.")
    .max(50, "Password tidak boleh lebih dari 50 karakter.")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
      "Password mengandung karakter yang tidak diperbolehkan."
    ),
});
export type loginValue = z.infer<typeof loginSchema>;

// user
export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username harus memiliki setidaknya 3 karakter.")
    .max(50, "Username tidak boleh lebih dari 50 karakter.")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
      "Username mengandung karakter yang tidak diperbolehkan."
    ),
  email: z.string().email("Format email tidak valid."),
  password: z
    .string()
    .min(8, "Password harus memiliki setidaknya 8 karakter.")
    .max(50, "Password tidak boleh lebih dari 50 karakter.")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
      "Password mengandung karakter yang tidak diperbolehkan."
    ),
  role: z.enum(["admin", "user"], {
    required_error: "Role harus dipilih.",
  }),
});
export type userValue = z.infer<typeof userSchema>;
