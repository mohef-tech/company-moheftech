import { Suspense } from "react";
import Image from "next/image";
import { getOrCreateSettings } from "@/lib/settings";
import { getActiveServicesGroupedByPillar } from "@/lib/services";
import { ServicesSection } from "@/components/public/services-section";
import { ServiceModal } from "@/components/public/service-modal";

export default async function HomePage() {
  const settings = await getOrCreateSettings();
  const serviceGroups = await getActiveServicesGroupedByPillar();
  const allServices = serviceGroups.flatMap((group) => group.services);

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/mohef-logo.png"
            alt={settings.businessName}
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-semibold">{settings.businessName}</span>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <a href="#layanan">Layanan</a>
          <a href="#tentang">Tentang</a>
          <a href="#kontak">Kontak</a>
        </nav>
      </header>

      <section
        id="home"
        className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <Image
          src="/logo/mohef-logo.png"
          alt={settings.businessName}
          width={160}
          height={160}
          priority
        />
        <h1 className="text-3xl font-bold sm:text-5xl">
          {settings.businessName}
        </h1>
        <p className="max-w-md text-base text-gray-600 sm:text-lg">
          {settings.tagline}
        </p>
        <a
          href="#layanan"
          className="rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Lihat Layanan
        </a>
      </section>

      <ServicesSection groups={serviceGroups} />

      <Suspense fallback={null}>
        <ServiceModal services={allServices} settings={settings} />
      </Suspense>
    </>
  );
}
