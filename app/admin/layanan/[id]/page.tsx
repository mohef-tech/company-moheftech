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

  return (
    <main>
      <h1>Edit Layanan</h1>
      {error && <p>{error}</p>}
      <form action={updateService.bind(null, service.id)}>
        <div>
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={service.name}
            required
          />
        </div>
        <div>
          <label htmlFor="slug">
            Slug (mengubahnya juga mengubah link layanan ini)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={service.slug}
          />
        </div>
        <div>
          <label htmlFor="category">Kategori</label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={service.category}
            required
          />
        </div>
        <div>
          <label htmlFor="pillar">Pilar</label>
          <input
            id="pillar"
            name="pillar"
            type="text"
            defaultValue={service.pillar}
            required
          />
        </div>
        <div>
          <label htmlFor="shortDescription">Deskripsi singkat</label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            defaultValue={service.shortDescription}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Deskripsi detail (opsional)</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={service.description ?? ""}
          />
        </div>
        <div>
          <label htmlFor="internalNote">
            Catatan internal (opsional, hanya admin)
          </label>
          <textarea
            id="internalNote"
            name="internalNote"
            rows={3}
            defaultValue={service.internalNote ?? ""}
          />
        </div>
        <div>
          <label htmlFor="sortOrder">Urutan tampil</label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={service.sortOrder}
          />
        </div>
        <div>
          <label>
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={service.isActive}
            />{" "}
            Aktif
          </label>
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>

      <hr />

      <h2>Opsi Harga</h2>
      {priceError && <p>{priceError}</p>}
      {service.priceOptions.length === 0 && <p>Belum ada opsi harga.</p>}

      {service.priceOptions.map((option) => (
        <div key={option.id}>
          <form action={updatePriceOption.bind(null, service.id, option.id)}>
            <input
              name="label"
              type="text"
              defaultValue={option.label}
              required
            />
            <select name="priceType" defaultValue={option.priceType}>
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
            />
            <input
              name="note"
              type="text"
              defaultValue={option.note ?? ""}
              placeholder="Catatan (opsional)"
            />
            <button type="submit">Simpan</button>
          </form>
          <form action={deletePriceOption.bind(null, service.id, option.id)}>
            <ConfirmButton
              message="Hapus opsi harga ini beserta riwayatnya?"
              label="Hapus"
            />
          </form>

          {option.priceHistory.length > 0 && (
            <details>
              <summary>Riwayat harga ({option.priceHistory.length})</summary>
              <ul>
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

      <h3>Tambah Opsi Harga</h3>
      <form action={createPriceOption.bind(null, service.id)}>
        <input
          name="label"
          type="text"
          placeholder="Label (mis. Ganti RAM 8GB)"
          required
        />
        <select name="priceType" defaultValue="FIXED">
          <option value="FIXED">Pasti</option>
          <option value="STARTING_FROM">Mulai dari</option>
          <option value="CUSTOM">Custom / Konsultasi</option>
        </select>
        <input name="price" type="number" min={0} placeholder="Nominal (Rp)" />
        <input name="note" type="text" placeholder="Catatan (opsional)" />
        <button type="submit">Tambah</button>
      </form>

      <hr />

      <form action={deleteService.bind(null, service.id)}></form>
    </main>
  );
}
