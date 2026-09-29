import { z } from "zod";

export const settingsSchema = z
  .object({
    businessName: z.string().min(1, "Nama bisnis wajib diisi"),
    tagline: z.string().min(1, "Tagline wajib diisi"),
    aboutDescription: z.string().min(1, "Deskripsi tentang wajib diisi"),
    primaryWhatsapp: z
      .string()
      .min(8, "Nomor WhatsApp utama tidak valid")
      .regex(/^[0-9]+$/, "Nomor WhatsApp hanya boleh berisi angka"),
    secondaryWhatsapp: z
      .string()
      .regex(/^[0-9]*$/, "Nomor WhatsApp hanya boleh berisi angka")
      .optional(),
    whatsappMessageTemplate: z.string().min(1, "Template pesan wajib diisi"),
    githubUrl: z.string().url("URL GitHub tidak valid"),
    googleMapsUrl: z
      .string()
      .url("URL Google Maps tidak valid")
      .optional()
      .or(z.literal("")),
    showGoogleMaps: z.boolean(),
    locationMeetingText: z.string().min(1, "Teks lokasi & meeting wajib diisi"),
  })
  .superRefine((data, ctx) => {
    if (data.showGoogleMaps && (!data.googleMapsUrl || data.googleMapsUrl.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL Google Maps wajib diisi kalau peta diaktifkan",
        path: ["googleMapsUrl"],
      });
    }
  });