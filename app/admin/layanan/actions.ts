"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { serviceSchema } from "@/lib/validation/service";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function backWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

async function requireSession() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
}

function parseServiceForm(formData: FormData, errorPath: string) {
  const name = getText(formData, "name");
  const slugInput = getText(formData, "slug");

  const parsed = serviceSchema.safeParse({
    name,
    slug: slugInput.trim() === "" ? slugify(name) : slugInput,
    category: getText(formData, "category"),
    pillar: getText(formData, "pillar"),
    shortDescription: getText(formData, "shortDescription"),
    description: getText(formData, "description"),
    internalNote: getText(formData, "internalNote"),
    isActive: formData.get("isActive") === "on",
    sortOrder: Number(getText(formData, "sortOrder") || 0),
  });

  if (!parsed.success) {
    backWithError(errorPath, parsed.error.issues[0].message);
  }

  const data = parsed.data;
  return {
    ...data,
    description: data.description || null,
    internalNote: data.internalNote || null,
  };
}

function handleWriteError(error: unknown, errorPath: string): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    backWithError(errorPath, "Slug sudah dipakai layanan lain");
  }
  throw error;
}

export async function createService(formData: FormData) {
  await requireSession();
  const errorPath = "/admin/layanan/baru";
  const data = parseServiceForm(formData, errorPath);

  try {
    await prisma.service.create({ data });
  } catch (error) {
    handleWriteError(error, errorPath);
  }

  redirect("/admin/layanan");
}

export async function updateService(id: string, formData: FormData) {
  await requireSession();
  const errorPath = `/admin/layanan/${id}`;
  const data = parseServiceForm(formData, errorPath);

  try {
    await prisma.service.update({ where: { id }, data });
  } catch (error) {
    handleWriteError(error, errorPath);
  }

  redirect("/admin/layanan");
}

export async function toggleServiceActive(id: string, isActive: boolean) {
  await requireSession();
  await prisma.service.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/layanan");
}

export async function deleteService(id: string) {
  await requireSession();
  await prisma.service.delete({ where: { id } });
  redirect("/admin/layanan");
}