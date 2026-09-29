import { getOrCreateSettings } from "@/lib/settings";
import { updateSettings } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const settings = await getOrCreateSettings();

  return (
    <main>
      <h1>Pengaturan</h1>
      {error ? <p>Error: {error}</p> : null}
      {saved && <p>Pengaturan tersimpan.</p>}
      <form action={updateSettings}>
        <div>
          <label htmlFor="businessName">Nama bisnis</label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            defaultValue={settings.businessName}
            required
          />
        </div>
        <div>
          <label htmlFor="tagline">Tagline</label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            defaultValue={settings.tagline}
            required
          />
        </div>
        <div>
          <label htmlFor="aboutDescription">Deskripsi tentang</label>
          <textarea
            id="aboutDescription"
            name="aboutDescription"
            rows={4}
            defaultValue={settings.aboutDescription}
            required
          />
        </div>
        <div>
          <label htmlFor="primaryWhatsapp">WhatsApp utama</label>
          <input
            id="primaryWhatsapp"
            name="primaryWhatsapp"
            type="text"
            defaultValue={settings.primaryWhatsapp}
            required
          />
        </div>
        <div>
          <label htmlFor="secondaryWhatsapp">
            WhatsApp alternatif (opsional)
          </label>
          <input
            id="secondaryWhatsapp"
            name="secondaryWhatsapp"
            type="text"
            defaultValue={settings.secondaryWhatsapp ?? ""}
          />
        </div>
        <div>
          <label htmlFor="whatsappMessageTemplate">
            Template pesan WhatsApp
          </label>
          <textarea
            id="whatsappMessageTemplate"
            name="whatsappMessageTemplate"
            rows={3}
            defaultValue={settings.whatsappMessageTemplate}
            required
          />
        </div>
        <div>
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="text"
            defaultValue={settings.githubUrl}
            required
          />
        </div>
        <div>
          <label>
            <input
              name="showGoogleMaps"
              type="checkbox"
              defaultChecked={settings.showGoogleMaps}
            />{" "}
            Tampilkan Google Maps
          </label>
        </div>
        <div>
          <label htmlFor="googleMapsUrl">
            URL Google Maps (wajib jika diaktifkan)
          </label>
          <input
            id="googleMapsUrl"
            name="googleMapsUrl"
            type="text"
            defaultValue={settings.googleMapsUrl ?? ""}
          />
        </div>
        <div>
          <label htmlFor="locationMeetingText">Teks Lokasi & Meeting</label>
          <textarea
            id="locationMeetingText"
            name="locationMeetingText"
            rows={3}
            defaultValue={settings.locationMeetingText}
            required
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </main>
  );
}
