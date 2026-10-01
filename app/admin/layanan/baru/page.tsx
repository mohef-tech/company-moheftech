import { createService } from "../actions";

export default async function NewServicePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">
        Tambah Layanan
      </h1>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <form action={createService} className="max-w-xl space-y-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">
            Slug (kosongkan untuk otomatis dari nama)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Kategori
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="pillar" className="text-sm font-medium text-gray-700">
            Pilar
          </label>
          <input
            id="pillar"
            name="pillar"
            type="text"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="shortDescription"
            className="text-sm font-medium text-gray-700"
          >
            Deskripsi singkat
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Deskripsi detail (opsional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="internalNote"
            className="text-sm font-medium text-gray-700"
          >
            Catatan internal (opsional, hanya admin)
          </label>
          <textarea
            id="internalNote"
            name="internalNote"
            rows={3}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sortOrder"
            className="text-sm font-medium text-gray-700"
          >
            Urutan tampil
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="w-32 rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            defaultChecked
            className="h-4 w-4"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Aktif
          </label>
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
