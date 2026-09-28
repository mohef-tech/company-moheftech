"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { priceOptionSchema } from "@/lib/validation/price-option";

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function requireSession() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
}

function parsePriceOptionForm(formData: FormData, serviceId: string) {
  const priceRaw = getText(formData, "price").trim();

  const parsed = priceOptionSchema.safeParse({
    label: getText(formData, "label"),
    priceType: getText(formData, "priceType"),
    price: priceRaw === "" ? null : Number(priceRaw),
    note: getText(formData, "note"),
  });

  if (!parsed.success) {
    const message = encodeURIComponent(parsed.error.issues[0].message);
    redirect(`/admin/layanan/${serviceId}?priceError=${message}`);
  }

  const data = parsed.data;
  return {
    label: data.label,
    priceType: data.priceType,
    price: data.priceType === "CUSTOM" ? null : data.price,
    note: data.note || null,
  };
}

export async function createPriceOption(serviceId: string, formData: FormData) {
  await requireSession();
  const data = parsePriceOptionForm(formData, serviceId);

  await prisma.$transaction(async (tx) => {
    const option = await tx.priceOption.create({
      data: { ...data, serviceId },
    });

    if (option.price !== null) {
      await tx.priceHistory.create({
        data: { priceOptionId: option.id, oldPrice: null, newPrice: option.price },
      });
    }
  });

  redirect(`/admin/layanan/${serviceId}`);
}

export async function updatePriceOption(
  serviceId: string,
  optionId: string,
  formData: FormData
) {
  await requireSession();

  const existing = await prisma.priceOption.findFirst({
    where: { id: optionId, serviceId },
  });
  if (!existing) redirect(`/admin/layanan/${serviceId}`);

  const data = parsePriceOptionForm(formData, serviceId);

  await prisma.$transaction(async (tx) => {
    await tx.priceOption.update({ where: { id: optionId }, data });

    if (existing.price !== data.price) {
      await tx.priceHistory.create({
        data: {
          priceOptionId: optionId,
          oldPrice: existing.price,
          newPrice: data.price,
        },
      });
    }
  });

  redirect(`/admin/layanan/${serviceId}`);
}

export async function deletePriceOption(serviceId: string, optionId: string) {
  await requireSession();
  await prisma.priceOption.deleteMany({ where: { id: optionId, serviceId } });
  redirect(`/admin/layanan/${serviceId}`);
}