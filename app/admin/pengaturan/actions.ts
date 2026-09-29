"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/session";
import { settingsSchema } from "@/lib/validation/settings";
import { writeSettings } from "@/lib/settings";

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

export async function updateSettings(formData: FormData) {
  await requireSession();
  const errorPath = "/admin/pengaturan";

  const parsed = settingsSchema.safeParse({
    businessName: getText(formData, "businessName"),
    tagline: getText(formData, "tagline"),
    aboutDescription: getText(formData, "aboutDescription"),
    primaryWhatsapp: getText(formData, "primaryWhatsapp"),
    secondaryWhatsapp: getText(formData, "secondaryWhatsapp"),
    whatsappMessageTemplate: getText(formData, "whatsappMessageTemplate"),
    githubUrl: getText(formData, "githubUrl"),
    googleMapsUrl: getText(formData, "googleMapsUrl"),
    showGoogleMaps: formData.get("showGoogleMaps") === "on",
    locationMeetingText: getText(formData, "locationMeetingText"),
  });

  if (!parsed.success) {
    backWithError(errorPath, parsed.error.issues[0].message);
  }

  const data = parsed.data;

  await writeSettings({
    ...data,
    secondaryWhatsapp: data.secondaryWhatsapp || null,
    googleMapsUrl: data.googleMapsUrl || null,
  });

  revalidatePath("/admin/pengaturan");
  redirect("/admin/pengaturan?saved=1");
}