"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getCheapestPriceLabel } from "@/lib/pricing";
import { buildWhatsappLink } from "@/lib/whatsapp";

type ServiceCard = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string | null;
  priceOptions: { price: number | null; priceType: string }[];
};

type PillarGroup = {
  pillar: string;
  services: ServiceCard[];
};

type SettingsForServices = {
  primaryWhatsapp: string;
};

export function ServicesSection({
  groups,
  settings,
}: {
  groups: PillarGroup[];
  settings: SettingsForServices;
}) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((group) => ({
        pillar: group.pillar,
        services: group.services.filter((service) =>
          [service.name, service.category, service.shortDescription]
            .join(" ")
            .toLowerCase()
            .includes(q),
        ),
      }))
      .filter((group) => group.services.length > 0);
  }, [groups, query]);

  const hasAnyResult = filteredGroups.length > 0;

  return (
    <section id="layanan" className="px-4 py-16 sm:px-8">
      <h2 className="mb-6 text-2xl font-bold text-mohef-navy sm:text-3xl">
        Layanan
      </h2>

      <div className="relative mb-10 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari layanan..."
          className="w-full rounded border border-gray-300 px-4 py-2 pr-10 text-foreground focus:border-mohef-blue focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-mohef-gray"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {!hasAnyResult && (
        <div className="rounded border border-gray-200 p-6 text-center">
          <p className="mb-2 font-medium text-mohef-navy">
            Layanan tidak ditemukan.
          </p>
          <p className="mb-4 text-mohef-gray">
            Tidak menemukan layanan yang sesuai? Konsultasikan kebutuhan Anda
            langsung dengan Mohef Tech.
          </p>
          <a
            href={buildWhatsappLink(
              settings.primaryWhatsapp,
              "Halo, saya mencari layanan yang tidak ada di daftar. Bisa dibantu?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      )}

      {filteredGroups.map((group) => (
        <div key={group.pillar} className="mb-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-mohef-blue">
            {group.pillar}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service) => (
              <div
                key={service.id}
                className="rounded border border-gray-200 p-4 transition hover:border-mohef-blue/40 hover:shadow-sm"
              >
                <h4 className="font-semibold text-mohef-navy">
                  {service.name}
                </h4>
                <p className="mb-2 text-sm text-mohef-gray">
                  {service.shortDescription}
                </p>
                <p className="font-semibold text-mohef-blue">
                  {getCheapestPriceLabel(service.priceOptions)}
                </p>
                {service.description && (
                  <Link
                    href={`?layanan=${service.slug}`}
                    scroll={false}
                    className="mt-2 inline-block text-sm text-mohef-blue underline hover:text-mohef-navy"
                  >
                    Lihat Detail
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
