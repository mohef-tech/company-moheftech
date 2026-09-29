import { prisma } from "@/lib/db/prisma";

const SETTINGS_ID = "singleton";

const DEFAULT_SETTINGS = {
  businessName: "Mohef Tech",
  tagline: "Solusi IT terbaik untuk Anda",
  aboutDescription:
    "Mohef Tech menyediakan berbagai solusi IT yang mencakup kebutuhan hardware dan software, mulai dari maintenance, troubleshooting, upgrade perangkat hingga pengembangan solusi software.",
  primaryWhatsapp: "082336744354",
  secondaryWhatsapp: "085785168163",
  whatsappMessageTemplate:
    "Mas Hendra, saya ingin konsultasi mengenai [layanan].\n\n[Tulis kebutuhan atau rencana Anda]",
  githubUrl: "https://github.com/mohef-tech",
  googleMapsUrl: null,
  showGoogleMaps: false,
  locationMeetingText:
    "Mohef Tech melayani secara fleksibel. Untuk konsultasi atau pengerjaan tertentu, lokasi dapat disepakati terlebih dahulu melalui WhatsApp.",
};

export async function getOrCreateSettings() {
  return prisma.settings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID, ...DEFAULT_SETTINGS },
  });
}

export async function writeSettings(data: {
  businessName: string;
  tagline: string;
  aboutDescription: string;
  primaryWhatsapp: string;
  secondaryWhatsapp: string | null;
  whatsappMessageTemplate: string;
  githubUrl: string;
  googleMapsUrl: string | null;
  showGoogleMaps: boolean;
  locationMeetingText: string;
}) {
  return prisma.settings.upsert({
    where: { id: SETTINGS_ID },
    update: data,
    create: { id: SETTINGS_ID, ...data },
  });
}