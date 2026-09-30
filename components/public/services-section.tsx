"use client";

import { useMemo, useState } from "react";
import { getCheapestPriceLabel } from "@/lib/pricing";

type ServiceCard = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  priceOptions: { price: number | null; priceType: string }[];
};

type PillarGroup = {
  pillar: string;
  services: ServiceCard[];
};

export function ServicesSection({ groups }: { groups: PillarGroup[] }) {
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
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Layanan</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari layanan..."
        className="mb-8 w-full max-w-md rounded border border-gray-300 px-4 py-2"
      />

      {!hasAnyResult && (
        <div className="rounded border border-gray-200 p-6 text-center">
          <p className="mb-2 font-medium">Layanan tidak ditemukan.</p>
          <p className="text-gray-600">
            Tidak menemukan layanan yang sesuai? Konsultasikan kebutuhan Anda
            langsung dengan Mohef Tech.
          </p>
          {/* Tombol WhatsApp ditambahkan di Langkah 14 */}
        </div>
      )}

      {filteredGroups.map((group) => (
        <div key={group.pillar} className="mb-10">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            {group.pillar}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service) => (
              <div
                key={service.id}
                className="rounded border border-gray-200 p-4"
              >
                <h4 className="font-semibold">{service.name}</h4>
                <p className="mb-2 text-sm text-gray-600">
                  {service.shortDescription}
                </p>
                <p className="font-medium">
                  {getCheapestPriceLabel(service.priceOptions)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
