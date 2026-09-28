import { prisma } from "@/lib/db/prisma";
import { toggleServiceActive } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { priceOptions: true } } },
  });

  return (
    <main>
      <h1>Layanan</h1>
      <Link href="/admin/layanan/baru">Tambah Layanan</Link>
      {services.length === 0 ? (
        <p>Belum ada layanan.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Pilar</th>
              <th>Opsi Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.pillar}</td>
                <td>{service._count.priceOptions}</td>
                <td>{service.isActive ? "Aktif" : "Nonaktif"}</td>
                <td>
                  <Link href={`/admin/layanan/${service.id}`}>Edit</Link>
                  {" | "}
                  <form
                    action={toggleServiceActive.bind(
                      null,
                      service.id,
                      !service.isActive,
                    )}
                    style={{ display: "inline" }}
                  >
                    <button type="submit">
                      {service.isActive ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
