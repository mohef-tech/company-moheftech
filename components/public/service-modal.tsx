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
    <div className="modal-overlay" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 50,
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Detail Layanan
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#e8edf5",
                lineHeight: 1.3,
              }}
            >
              {service.name}
            </h3>
          </div>

          <button
            onClick={close}
            aria-label="Tutup"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#94a3b8",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#e8edf5";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            }}
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)",
            marginBottom: 20,
          }}
        />

        {/* Description */}
        {service.description && (
          <p
            style={{
              marginBottom: 24,
              whiteSpace: "pre-line",
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            {service.description}
          </p>
        )}

        {/* Pricing */}
        <div
          style={{
            background: "rgba(59,130,246,0.05)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#60a5fa",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            💰 Opsi Harga
          </p>

          {service.priceOptions.map((option) => (
            <div key={option.id} className="modal-price-row">
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{option.label}</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {option.price !== null ? formatRupiah(option.price) : "Konsultasi"}
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 12,
            color: "#475569",
            marginBottom: 20,
            fontStyle: "italic",
          }}
        >
          * Harga dapat menyesuaikan kondisi dan kebutuhan spesifik.
        </p>

        <a
          href={buildWhatsappLink(
            settings.primaryWhatsapp,
            buildServiceWhatsappMessage(settings.whatsappMessageTemplate, service.name),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <span>💬</span> Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
}
