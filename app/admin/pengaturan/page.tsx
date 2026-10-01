import { getOrCreateSettings } from "@/lib/settings";
import { updateSettings } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const settings = await getOrCreateSettings();

  const inputClass =
    "rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Pengaturan</h1>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {saved && (
        <p className="mb-4 rounded border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          Pengaturan tersimpan.
        </p>
      )}
      <form action={updateSettings} className="max-w-xl space-y-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="businessName" className={labelClass}>
            Nama bisnis
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            defaultValue={settings.businessName}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tagline" className={labelClass}>
            Tagline
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            defaultValue={settings.tagline}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="aboutDescription" className={labelClass}>
            Deskripsi tentang
          </label>
          <textarea
            id="aboutDescription"
            name="aboutDescription"
            rows={4}
            defaultValue={settings.aboutDescription}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="primaryWhatsapp" className={labelClass}>
            WhatsApp utama
          </label>
          <input
            id="primaryWhatsapp"
            name="primaryWhatsapp"
            type="text"
            defaultValue={settings.primaryWhatsapp}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="secondaryWhatsapp" className={labelClass}>
            WhatsApp alternatif (opsional)
          </label>
          <input
            id="secondaryWhatsapp"
            name="secondaryWhatsapp"
            type="text"
            defaultValue={settings.secondaryWhatsapp ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="whatsappMessageTemplate" className={labelClass}>
            Template pesan WhatsApp
          </label>
          <textarea
            id="whatsappMessageTemplate"
            name="whatsappMessageTemplate"
            rows={3}
            defaultValue={settings.whatsappMessageTemplate}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="githubUrl" className={labelClass}>
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="text"
            defaultValue={settings.githubUrl}
            required
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="showGoogleMaps"
            name="showGoogleMaps"
            type="checkbox"
            defaultChecked={settings.showGoogleMaps}
            className="h-4 w-4"
          />
          <label htmlFor="showGoogleMaps" className="text-sm text-gray-700">
            Tampilkan Google Maps
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="googleMapsUrl" className={labelClass}>
            URL Google Maps (wajib jika diaktifkan)
          </label>
          <input
            id="googleMapsUrl"
            name="googleMapsUrl"
            type="text"
            defaultValue={settings.googleMapsUrl ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="locationMeetingText" className={labelClass}>
            Teks Lokasi & Meeting
          </label>
          <textarea
            id="locationMeetingText"
            name="locationMeetingText"
            rows={3}
            defaultValue={settings.locationMeetingText}
            required
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
