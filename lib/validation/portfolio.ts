import { z } from "zod";

export const portfolioSchema = z.object({
  title: z.string().trim().min(1, "Nama proyek wajib diisi"),
  shortDescription: z.string().trim().min(1, "Deskripsi singkat wajib diisi"),
  solutionType: z.string().trim().min(1, "Jenis solusi wajib diisi"),
  isVisible: z.boolean(),
  sortOrder: z.number().int("Urutan harus bilangan bulat"),
});