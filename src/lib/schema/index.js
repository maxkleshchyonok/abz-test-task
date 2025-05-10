import { z } from "zod";

const photoValidation =
  typeof window !== "undefined"
    ? z
        .instanceof(File, { message: "Photo is required and must be a file." })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than 5MB.",
        })
        .refine((file) => ["image/jpeg", "image/jpg"].includes(file.type), {
          message: "Only JPG or JPEG formats.",
        })
        .refine(
          (file) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              img.onload = () => {
                URL.revokeObjectURL(img.src);
                resolve(img.width >= 70 && img.height >= 70);
              };
              img.onerror = () => resolve(false);
            }),
          {
            message: "Min resolution is 70x70 pixels.",
          }
        )
    : z.any(); // Skip validation on the server

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Username is required.")
    .max(60, "Username should contain 2-60 characters."),
  email: z
    .string()
    .min(6, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email according to RFC2822."
    ),
  phone: z
    .string()
    .regex(/^\+380/, "Number should start with code of Ukraine +380.")
    .regex(/^[\d+]+$/gm, "Incorrect symbol")
    .max(13, "Invalid phone number"),
  position_id: z.any(),
  photo: photoValidation,
});
