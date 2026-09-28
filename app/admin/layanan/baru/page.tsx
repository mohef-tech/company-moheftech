import { createService } from "../actions";

export default async function NewServicePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main>
      <h1>Tambah Layanan</h1>
      {error && <p>{error}</p>}
      <form action={createService}>
        <div>
          <label htmlFor="name">Nama</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="slug">
            Slug (kosongkan untuk otomatis dari nama)
          </label>
          <input id="slug" name="slug" type="text" />
        </div>
        <div>
          <label htmlFor="category">Kategori</label>
          <input id="category" name="category" type="text" required />
        </div>
        <div>
          <label htmlFor="pillar">Pilar</label>
          <input id="pillar" name="pillar" type="text" required />
        </div>
        <div>
          <label htmlFor="shortDescription">Deskripsi singkat</label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Deskripsi detail (opsional)</label>
          <textarea id="description" name="description" rows={4} />
        </div>
        <div>
          <label htmlFor="internalNote">
            Catatan internal (opsional, hanya admin)
          </label>
          <textarea id="internalNote" name="internalNote" rows={3} />
        </div>
        <div>
          <label htmlFor="sortOrder">Urutan tampil</label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={0}
          />
        </div>
        <div>
          <label>
            <input name="isActive" type="checkbox" defaultChecked /> Aktif
          </label>
        </div>
        <button type="submit">Simpan</button>
      </form>
    </main>
  );
}
