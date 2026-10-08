"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { PriceType } from "@prisma/client";
import { getCheapestPriceLabel } from "@/lib/pricing";
import { buildWhatsappLink } from "@/lib/whatsapp";

type ServiceCard = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string | null;
  priceOptions: { price: number | null; priceType: PriceType }[];
};

type PillarGroup = {
  pillar: string;
  services: ServiceCard[];
};

type SettingsForServices = {
  primaryWhatsapp: string;
};

// Icon map for pillars
const pillarIcons: Record<string, string> = {
  default: "⚡",
  web: "🌐",
  mobile: "📱",
  design: "🎨",
  marketing: "📣",
  cloud: "☁️",
  data: "📊",
  security: "🔒",
  konsultasi: "💡",
};

function getPillarIcon(pillar: string): string {
  const lower = pillar.toLowerCase();
  for (const [key, icon] of Object.entries(pillarIcons)) {
    if (lower.includes(key)) return icon;
  }
  return pillarIcons.default;
}

function ServiceCardComponent({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  return (
    <div
      className="service-card reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="service-card-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ width: 22, height: 22, color: "#60a5fa" }}
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <h4 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 8 }}>
        {service.name}
      </h4>

      <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 12 }}>
        {service.shortDescription}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <p className="service-price">
          {getCheapestPriceLabel(service.priceOptions)}
        </p>

        {service.description && (
          <Link
            href={`?layanan=${service.slug}`}
            scroll={false}
            style={{
              fontSize: 12,
              color: "#60a5fa",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: 50,
              border: "1px solid rgba(59,130,246,0.3)",
              transition: "all 0.2s",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
            }}
          >
            Detail →
          </Link>
        )}
      </div>
    </div>
  );
}

export function ServicesSection({
  groups,
  settings,
}: {
  groups: PillarGroup[];
  settings: SettingsForServices;
}) {
  const [query, setQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Jika ada query aktif, langsung visible semua kartu tanpa animasi
    if (query.trim()) {
      section.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    // Re-observe semua elemen setiap kali filteredGroups berubah
    const elements = section.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredGroups, query]);

  return (
    <section
      id="layanan"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <div className="reveal" style={{ marginBottom: 48 }}>
        <div className="section-label">
          <span>🛠</span>
          <span>Layanan Kami</span>
        </div>
        <h2 className="section-title">
          Solusi Digital{" "}
          <span className="gradient-text">Terpercaya</span>
        </h2>
        <div className="gradient-divider" />
        <p className="section-desc">
          Kami hadir dengan berbagai layanan IT profesional untuk kebutuhan
          digital bisnis Anda — dari web hingga konsultasi teknologi.
        </p>
      </div>

      {/* Search */}
      <div className="reveal reveal-delay-1" style={{ marginBottom: 48 }}>
        <div className="search-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari layanan yang Anda butuhkan..."
            className="search-input"
            id="layanan-search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            style={{
              position: "absolute",
              right: 18,
              top: "50%",
              transform: "translateY(-50%)",
              width: 18,
              height: 18,
              color: "#475569",
              pointerEvents: "none",
            }}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* No results */}
      {!hasAnyResult && (
        <div
          className="glass-card"
          style={{ padding: 40, textAlign: "center", maxWidth: 480 }}
        >
          <p style={{ fontSize: 20, marginBottom: 8 }}>🔍</p>
          <p style={{ fontWeight: 700, color: "#e8edf5", marginBottom: 8 }}>
            Layanan tidak ditemukan
          </p>
          <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20 }}>
            Konsultasikan kebutuhan Anda langsung dengan kami.
          </p>
          <a
            href={buildWhatsappLink(
              settings.primaryWhatsapp,
              "Halo, saya mencari layanan yang tidak ada di daftar. Bisa dibantu?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ display: "inline-flex", fontSize: 14 }}
          >
            <span>💬</span> Konsultasi via WhatsApp
          </a>
        </div>
      )}

      {/* Groups */}
      {filteredGroups.map((group) => (
        <div key={group.pillar} style={{ marginBottom: 60 }}>
          <div
            className="reveal pillar-badge"
            style={{ display: "inline-flex" }}
          >
            <span>{getPillarIcon(group.pillar)}</span>
            <span>{group.pillar}</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {group.services.map((service, i) => (
              <ServiceCardComponent key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
