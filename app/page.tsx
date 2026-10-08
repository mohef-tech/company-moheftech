import { Suspense } from "react";
import Image from "next/image";
import { getOrCreateSettings } from "@/lib/settings";
import { getActiveServicesGroupedByPillar } from "@/lib/services";
import { getVisiblePortfolio } from "@/lib/portfolio";
import { ServicesSection } from "@/components/public/services-section";
import { ServiceModal } from "@/components/public/service-modal";
import { TechBackground } from "@/components/public/tech-background";
import { buildWhatsappLink } from "@/lib/whatsapp";

export default async function HomePage() {
  const settings = await getOrCreateSettings();
  const serviceGroups = await getActiveServicesGroupedByPillar();
  const allServices = serviceGroups.flatMap((group) => group.services);
  const portfolioItems = await getVisiblePortfolio();

  return (
    <>
      {/* Animated tech background */}
      <TechBackground />

      {/* ============ NAVBAR ============ */}
      <header className="navbar">
        <a href="#home" className="nav-logo">
          <Image
            src="/logo/mohef-logo.png"
            alt={settings.businessName}
            width={36}
            height={36}
            priority
            style={{ borderRadius: 8 }}
          />
          <span className="nav-logo-text">{settings.businessName}</span>
        </a>

        <nav>
          <ul className="nav-links">
            <li><a href="#layanan">Layanan</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li>
              <a
                href="#kontak"
                style={{
                  padding: "8px 20px",
                  borderRadius: 50,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Kontak
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="hero-section">
        <div className="hero-badge">
          <span className="dot" />
          IT Solutions Partner
        </div>

        <div className="animate-float" style={{ marginBottom: 24 }}>
          <Image
            src="/logo/mohef-logo.png"
            alt={settings.businessName}
            width={100}
            height={100}
            priority
            style={{
              borderRadius: 24,
              boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(6,182,212,0.15)",
            }}
          />
        </div>

        <h1 className="hero-title">
          <span className="gradient-text">{settings.businessName}</span>
        </h1>

        <p className="hero-subtitle">{settings.tagline}</p>

        <div className="hero-cta">
          <a href="#layanan" className="btn-primary">
            <span>⚡</span> Lihat Layanan
          </a>
          <a
            href={buildWhatsappLink(
              settings.primaryWhatsapp,
              "Halo Mas Hendra, saya ingin konsultasi",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <span>💬</span> Konsultasi Gratis
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.5,
            animation: "fadeInUp 1s ease 1s both",
          }}
        >
          <span style={{ fontSize: 11, color: "#94a3b8", letterSpacing: "0.1em" }}>
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #3b82f6, transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(59,130,246,0.1)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
          background: "rgba(15,34,64,0.4)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            padding: "0 24px",
          }}
        >
          {[
            { number: "50+", label: "Proyek Selesai" },
            { number: "5+", label: "Tahun Pengalaman" },
            { number: "98%", label: "Klien Puas" },
            { number: "24/7", label: "Dukungan Teknis" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                borderRight: i < 3 ? "1px solid rgba(59,130,246,0.1)" : "none",
              }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ SERVICES ============ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <ServicesSection groups={serviceGroups} settings={settings} />
      </div>

      {/* ============ ABOUT ============ */}
      <section
        id="tentang"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div className="two-col-grid">
          <div>
            <div className="section-label">
              <span>👋</span>
              <span>Tentang Kami</span>
            </div>
            <h2 className="section-title">
              Kenapa Pilih{" "}
              <span className="gradient-text">{settings.businessName}?</span>
            </h2>
            <div className="gradient-divider" />
            <p className="section-desc" style={{ marginBottom: 24 }}>
              {settings.aboutDescription}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "🎯", title: "Solusi Tepat Sasaran", desc: "Kami memahami kebutuhan bisnis Anda dan memberikan solusi yang sesuai." },
                { icon: "⚡", title: "Pengerjaan Cepat", desc: "Timeline terstruktur dengan hasil yang tidak mengecewakan." },
                { icon: "🔧", title: "Support Berkelanjutan", desc: "Kami ada untuk Anda bahkan setelah proyek selesai." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="feature-item"
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#e8edf5", marginBottom: 4, fontSize: 14 }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
                width: 280,
                height: 280,
              }}
            >
              {/* Outer glow rings */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: "50%",
                  border: "1px solid rgba(59,130,246,0.2)",
                  animation: "float 6s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -40,
                  borderRadius: "50%",
                  border: "1px solid rgba(6,182,212,0.1)",
                  animation: "float 8s ease-in-out infinite reverse",
                }}
              />

              {/* Center circle */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))",
                  border: "2px solid rgba(59,130,246,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  animation: "float 4s ease-in-out infinite",
                  boxShadow: "0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(6,182,212,0.1)",
                }}
              >
                💻
              </div>

              {/* Floating badges */}
              {[
                { label: "Web Dev", pos: { top: 0, right: -20 }, delay: "0s" },
                { label: "Mobile", pos: { bottom: 20, right: -30 }, delay: "0.5s" },
                { label: "Design", pos: { bottom: 20, left: -30 }, delay: "1s" },
                { label: "Cloud", pos: { top: 0, left: -20 }, delay: "1.5s" },
              ].map((badge, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...badge.pos,
                    padding: "8px 14px",
                    borderRadius: 50,
                    background: "rgba(15,34,64,0.9)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#60a5fa",
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    animation: `float 4s ease-in-out infinite`,
                    animationDelay: badge.delay,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO ============ */}
      <section
        id="portfolio"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px",
          borderTop: "1px solid rgba(59,130,246,0.08)",
          background: "rgba(15,34,64,0.3)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">
              <span>🏆</span>
              <span>Portfolio</span>
            </div>
            <h2 className="section-title">
              Hasil Kerja{" "}
              <span className="gradient-text">Nyata</span>
            </h2>
            <div className="gradient-divider" />
            <p className="section-desc">
              Beberapa proyek yang telah kami selesaikan dengan sukses.
            </p>
          </div>

          {portfolioItems.length === 0 ? (
            <div
              className="glass-card"
              style={{ padding: 48, textAlign: "center", maxWidth: 400 }}
            >
              <p style={{ fontSize: 36, marginBottom: 16 }}>🚀</p>
              <p style={{ color: "#94a3b8", fontSize: 14 }}>
                Portfolio sedang disiapkan. Stay tuned!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {portfolioItems.map((item) => (
                <div key={item.id} className="portfolio-card">
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 12,
                      background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.solutionType}
                  </p>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#e8edf5",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>
                    {item.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section
        id="kontak"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="section-label">
            <span>📞</span>
            <span>Kontak</span>
          </div>
          <h2 className="section-title">
            Siap Memulai{" "}
            <span className="gradient-text">Proyek Anda?</span>
          </h2>
          <div className="gradient-divider" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left: CTA */}
          <div className="contact-card">
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#e8edf5",
                marginBottom: 12,
              }}
            >
              Mari Berkolaborasi!
            </h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              Konsultasikan kebutuhan digital bisnis Anda dengan kami. Gratis,
              tanpa komitmen.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a
                href={buildWhatsappLink(
                  settings.primaryWhatsapp,
                  "Halo Mas Hendra, saya ingin konsultasi",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ justifyContent: "center" }}
              >
                <span>💬</span> Konsultasi via WhatsApp
              </a>

              {settings.secondaryWhatsapp && (
                <a
                  href={buildWhatsappLink(
                    settings.secondaryWhatsapp,
                    "Halo, saya ingin konsultasi",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: "center" }}
                >
                  WhatsApp Alternatif
                </a>
              )}
            </div>

            {/* WA Numbers */}
            <div
              style={{
                marginTop: 24,
                padding: "16px 20px",
                borderRadius: 12,
                background: "rgba(59,130,246,0.05)",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#60a5fa",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Nomor WhatsApp
              </p>
              <p style={{ fontSize: 14, color: "#94a3b8" }}>
                📱 {settings.primaryWhatsapp}
              </p>
              {settings.secondaryWhatsapp && (
                <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 6 }}>
                  📱 {settings.secondaryWhatsapp} (Alternatif)
                </p>
              )}
            </div>
          </div>

          {/* Right: Location */}
          <div>
            <div className="glass-card" style={{ padding: 32, marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#60a5fa",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                📍 Lokasi & Meeting
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {settings.locationMeetingText}
              </p>

              {settings.showGoogleMaps && settings.googleMapsUrl && (
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ marginTop: 20, fontSize: 13 }}
                >
                  🗺️ Buka di Google Maps
                </a>
              )}
            </div>

            {/* Feature pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                "💡 Konsultasi Gratis",
                "⚡ Fast Response",
                "🔒 Terpercaya",
                "🎯 Tepat Sasaran",
              ].map((pill) => (
                <span
                  key={pill}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 50,
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    color: "#94a3b8",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
            }}
          >
            {settings.businessName}
          </span>
          . All rights reserved.
        </p>
      </footer>

      {/* Modal */}
      <Suspense fallback={null}>
        <ServiceModal services={allServices} settings={settings} />
      </Suspense>
    </>
  );
}
