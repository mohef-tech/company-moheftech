import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { updateService, deleteService } from "../actions";
import { ConfirmButton } from "@/components/admin/confirm-button";
import {
  createPriceOption,
  updatePriceOption,
  deletePriceOption,
} from "../price-actions";
import { formatRupiah, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; priceError?: string }>;
}) {
  const { id } = await params;
  const { error, priceError } = await searchParams;

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      priceOptions: {
        orderBy: { createdAt: "asc" },
        include: { priceHistory: { orderBy: { createdAt: "desc" } } },
      },
    },
  });
  if (!service) notFound();

  const inputClass =
    "rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";
  const labelClass = "text-sm font-medium text-gray-700";
  const smallInputClass =
    "rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-gray-900 focus:outline-none";

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Edit Layanan</h1>

      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        action={updateService.bind(null, service.id)}
        className="max-w-xl space-y-5"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className={labelClass}>
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={service.name}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className={labelClass}>
            Slug (mengubahnya juga mengubah link layanan ini)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={service.slug}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className={labelClass}>
            Kategori
          </label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={service.category}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="pillar" className={labelClass}>
            Pilar
          </label>
          <input
            id="pillar"
            name="pillar"
            type="text"
            defaultValue={service.pillar}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="shortDescription" className={labelClass}>
            Deskripsi singkat
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            defaultValue={service.shortDescription}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className={labelClass}>
            Deskripsi detail (opsional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={service.description ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="internalNote" className={labelClass}>
            Catatan internal (opsional, hanya admin)
          </label>
          <textarea
            id="internalNote"
            name="internalNote"
            rows={3}
            defaultValue={service.internalNote ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="sortOrder" className={labelClass}>
            Urutan tampil
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={service.sortOrder}
            className={`w-32 ${inputClass}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            defaultChecked={service.isActive}
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
          Simpan Perubahan
        </button>
      </form>

      <hr className="my-8 border-gray-200" />

      <h2 className="mb-4 text-lg font-semibold text-gray-900">Opsi Harga</h2>
      {priceError && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {priceError}
        </p>
      )}
      {service.priceOptions.length === 0 && (
        <p className="mb-4 text-sm text-gray-500">Belum ada opsi harga.</p>
      )}

      <div className="space-y-4">
        {service.priceOptions.map((option) => (
          <div
            key={option.id}
            className="rounded border border-gray-200 bg-white p-4"
          >
            <form
              action={updatePriceOption.bind(null, service.id, option.id)}
              className="flex flex-wrap items-center gap-2"
            >
              <input
                name="label"
                type="text"
                defaultValue={option.label}
                required
                className={`flex-1 min-w-[160px] ${smallInputClass}`}
              />
              <select
                name="priceType"
                defaultValue={option.priceType}
                className={smallInputClass}
              >
                <option value="FIXED">Pasti</option>
                <option value="STARTING_FROM">Mulai dari</option>
                <option value="CUSTOM">Custom / Konsultasi</option>
              </select>
              <input
                name="price"
                type="number"
                min={0}
                defaultValue={option.price ?? ""}
                placeholder="Nominal (Rp)"
                className={`w-32 ${smallInputClass}`}
              />
              <input
                name="note"
                type="text"
                defaultValue={option.note ?? ""}
                placeholder="Catatan (opsional)"
                className={`flex-1 min-w-[140px] ${smallInputClass}`}
              />
              <button
                type="submit"
                className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Simpan
              </button>
            </form>

            <form
              action={deletePriceOption.bind(null, service.id, option.id)}
              className="mt-2"
            >
              <ConfirmButton
                message="Hapus opsi harga ini beserta riwayatnya?"
                label="Hapus"
              />
            </form>

            {option.priceHistory.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Riwayat harga ({option.priceHistory.length})
                </summary>
                <ul className="mt-2 space-y-1 border-l-2 border-gray-100 pl-3 text-xs text-gray-500">
                  {option.priceHistory.map((history) => (
                    <li key={history.id}>
                      {history.oldPrice === null
                        ? `Harga awal ${formatRupiah(history.newPrice)}`
                        : `${formatRupiah(history.oldPrice)} → ${formatRupiah(history.newPrice)}`}
                      {" — "}
                      {formatDate(history.createdAt)}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold text-gray-900">
        Tambah Opsi Harga
      </h3>
      <form
        action={createPriceOption.bind(null, service.id)}
        className="flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white p-4"
      >
        <input
          name="label"
          type="text"
          placeholder="Label (mis. Ganti RAM 8GB)"
          required
          className={`flex-1 min-w-[160px] ${smallInputClass}`}
        />
        <select
          name="priceType"
          defaultValue="FIXED"
          className={smallInputClass}
        >
          <option value="FIXED">Pasti</option>
          <option value="STARTING_FROM">Mulai dari</option>
          <option value="CUSTOM">Custom / Konsultasi</option>
        </select>
        <input
          name="price"
          type="number"
          min={0}
          placeholder="Nominal (Rp)"
          className={`w-32 ${smallInputClass}`}
        />
        <input
          name="note"
          type="text"
          placeholder="Catatan (opsional)"
          className={`flex-1 min-w-[140px] ${smallInputClass}`}
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Tambah
        </button>
      </form>

      <hr className="my-8 border-gray-200" />

      <h2 className="mb-3 text-lg font-semibold text-red-700">
        Zona Berbahaya
      </h2>
      <form action={deleteService.bind(null, service.id)}>
        <ConfirmButton
          message={`Hapus layanan "${service.name}"? Semua opsi harga dan riwayatnya ikut terhapus permanen.`}
          label="Hapus Layanan"
        />
      </form>
    </div>
  );
}
