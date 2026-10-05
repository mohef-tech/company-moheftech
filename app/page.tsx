import { Suspense } from "react";
import Image from "next/image";
import { getOrCreateSettings } from "@/lib/settings";
import { getActiveServicesGroupedByPillar } from "@/lib/services";
import { getVisiblePortfolio } from "@/lib/portfolio";
import { ServicesSection } from "@/components/public/services-section";
import { ServiceModal } from "@/components/public/service-modal";
import { buildWhatsappLink } from "@/lib/whatsapp";

export default async function HomePage() {
  const settings = await getOrCreateSettings();
  const serviceGroups = await getActiveServicesGroupedByPillar();
  const allServices = serviceGroups.flatMap((group) => group.services);
  const portfolioItems = await getVisiblePortfolio();

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/mohef-logo.png"
            alt={settings.businessName}
            width={40}
            height={40}
            priority
          />
          <span className="font-bold text-mohef-navy">
            {settings.businessName}
          </span>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-foreground">
          <a href="#layanan" className="hover:text-mohef-blue">
            Layanan
          </a>
          <a href="#tentang" className="hover:text-mohef-blue">
            Tentang
          </a>
          <a href="#portfolio" className="hover:text-mohef-blue">
            Portfolio
          </a>
          <a href="#kontak" className="hover:text-mohef-blue">
            Kontak
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="flex min-h-[80svh] flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <Image
          src="/logo/mohef-logo.png"
          alt={settings.businessName}
          width={160}
          height={160}
          priority
        />
        <h1 className="font-bold text-3xl text-mohef-navy sm:text-5xl">
          {settings.businessName}
        </h1>
        <p className="max-w-md text-base text-mohef-gray sm:text-lg">
          {settings.tagline}
        </p>
        <a
          href="#layanan"
          className="rounded bg-mohef-blue px-6 py-3 font-medium text-white hover:bg-mohef-navy"
        >
          Lihat Layanan
        </a>
      </section>

      <ServicesSection groups={serviceGroups} settings={settings} />
      <section id="tentang" className="px-4 py-16 sm:px-8">
        <h2 className="mb-4 text-2xl font-bold text-mohef-navy sm:text-3xl">
          Tentang
        </h2>
        <p className="max-w-2xl text-mohef-gray">{settings.aboutDescription}</p>
      </section>

      <section
        id="portfolio"
        className="bg-mohef-navy px-4 py-16 text-white sm:px-8"
      >
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Portfolio</h2>
        {portfolioItems.length === 0 ? (
          <p className="text-white/70">Produk sedang disiapkan.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="rounded border border-white/15 bg-white/5 p-4"
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-mohef-blue">
                  {item.solutionType}
                </p>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-white/70">{item.shortDescription}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="kontak" className="px-4 py-16 sm:px-8">
        <h2 className="mb-4 text-2xl font-bold text-mohef-navy sm:text-3xl">
          Kontak
        </h2>
        <p className="mb-2 text-mohef-gray">
          WhatsApp: {settings.primaryWhatsapp}
        </p>
        {settings.secondaryWhatsapp && (
          <p className="mb-4 text-mohef-gray">
            WhatsApp alternatif: {settings.secondaryWhatsapp}
          </p>
        )}
        <a
          href={buildWhatsappLink(
            settings.primaryWhatsapp,
            "Halo Mas Hendra, saya ingin konsultasi",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 inline-block rounded bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
        >
          Konsultasi via WhatsApp
        </a>
        <p className="max-w-xl whitespace-pre-line text-mohef-gray">
          {settings.locationMeetingText}
        </p>
        {settings.showGoogleMaps && settings.googleMapsUrl && (
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-mohef-blue underline hover:text-mohef-navy"
          >
            Buka di Google Maps
          </a>
        )}
      </section>

      <Suspense fallback={null}>
        <ServiceModal services={allServices} settings={settings} />
      </Suspense>
    </>
  );
}
