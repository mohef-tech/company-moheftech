import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug hanya boleh huruf kecil, angka, dan tanda strip (-)"
    ),
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  pillar: z.string().trim().min(1, "Pilar wajib diisi"),
  shortDescription: z.string().trim().min(1, "Deskripsi singkat wajib diisi"),
  description: z.string().trim().optional(),
  internalNote: z.string().trim().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int("Urutan harus bilangan bulat"),
});