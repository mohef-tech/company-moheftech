"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { portfolioSchema } from "@/lib/validation/portfolio";

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function requireSession() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
}

function parsePortfolioForm(formData: FormData, errorPath: string) {
  const parsed = portfolioSchema.safeParse({
    title: getText(formData, "title"),
    shortDescription: getText(formData, "shortDescription"),
    solutionType: getText(formData, "solutionType"),
    isVisible: formData.get("isVisible") === "on",
    sortOrder: Number(getText(formData, "sortOrder") || 0),
  });

  if (!parsed.success) {
    const message = encodeURIComponent(parsed.error.issues[0].message);
    redirect(`${errorPath}?error=${message}`);
  }

  return parsed.data;
}

export async function createPortfolio(formData: FormData) {
  await requireSession();
  const data = parsePortfolioForm(formData, "/admin/portfolio/baru");
  await prisma.portfolio.create({ data });
  redirect("/admin/portfolio");
}

export async function updatePortfolio(id: string, formData: FormData) {
  await requireSession();
  const data = parsePortfolioForm(formData, `/admin/portfolio/${id}`);
  await prisma.portfolio.update({ where: { id }, data });
  redirect("/admin/portfolio");
}

export async function togglePortfolioVisible(id: string, isVisible: boolean) {
  await requireSession();
  await prisma.portfolio.update({ where: { id }, data: { isVisible } });
  revalidatePath("/admin/portfolio");
}

export async function deletePortfolio(id: string) {
  await requireSession();
  await prisma.portfolio.delete({ where: { id } });
  redirect("/admin/portfolio");
}