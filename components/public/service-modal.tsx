"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/lib/pricing";
import { buildWhatsappLink, buildServiceWhatsappMessage } from "@/lib/whatsapp";

type PriceOption = {
  id: string;
  label: string;
  price: number | null;
  priceType: string;
};

type ServiceDetail = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  priceOptions: PriceOption[];
};

type SettingsForModal = {
  primaryWhatsapp: string;
  whatsappMessageTemplate: string;
};

export function ServiceModal({
  services,
  settings,
}: {
  services: ServiceDetail[];
  settings: SettingsForModal;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = searchParams.get("layanan");

  const service = services.find((s) => s.slug === slug) ?? null;

  function close() {
    router.push(pathname, { scroll: false });
  }

  useEffect(() => {
    if (!service) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [service]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mohef-navy/60 p-4"
      onClick={close}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-mohef-navy">{service.name}</h3>
          <button
            onClick={close}
            aria-label="Tutup"
            className="text-2xl leading-none text-mohef-gray hover:text-mohef-navy"
          >
            &times;
          </button>
        </div>

        {service.description && (
          <p className="mb-4 whitespace-pre-line text-mohef-gray">
            {service.description}
          </p>
        )}

        <div className="mb-4 space-y-2">
          <p className="font-medium text-mohef-navy">Opsi harga:</p>
          {service.priceOptions.map((option) => (
            <div
              key={option.id}
              className="flex justify-between border-b border-gray-100 pb-1 text-sm"
            >
              <span className="text-mohef-gray">{option.label}</span>
              <span className="font-semibold text-mohef-blue">
                {option.price !== null
                  ? formatRupiah(option.price)
                  : "Konsultasi"}
              </span>
            </div>
          ))}
        </div>

        <p className="mb-4 text-xs text-mohef-gray">
          Catatan: Harga dapat menyesuaikan kondisi dan kebutuhan.
        </p>

        <a
          href={buildWhatsappLink(
            settings.primaryWhatsapp,
            buildServiceWhatsappMessage(
              settings.whatsappMessageTemplate,
              service.name,
            ),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded bg-green-600 px-4 py-3 text-center font-medium text-white hover:bg-green-700"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
}
