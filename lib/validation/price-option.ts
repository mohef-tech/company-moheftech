import { z } from "zod";

export const priceOptionSchema = z
  .object({
    label: z.string().trim().min(1, "Label wajib diisi"),
    priceType: z.enum(["FIXED", "STARTING_FROM", "CUSTOM"]),
    price: z
      .number()
      .int("Nominal harus bilangan bulat")
      .min(0, "Nominal tidak boleh negatif")
      .nullable(),
    note: z.string().trim().optional(),
  })
  .refine((value) => value.priceType === "CUSTOM" || value.price !== null, {
    message: "Nominal wajib diisi untuk jenis harga Pasti atau Mulai Dari",
    path: ["price"],
  });