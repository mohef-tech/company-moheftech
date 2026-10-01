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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Layanan</h1>
        <Link
          href="/admin/layanan/baru"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Tambah Layanan
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada layanan.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Pilar</th>
                <th className="px-4 py-3 font-medium">Opsi Harga</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {service.category}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{service.pillar}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {service._count.priceOptions}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        service.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {service.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/layanan/${service.id}`}
                        className="text-gray-600 underline hover:text-gray-900"
                      >
                        Edit
                      </Link>
                      <form
                        action={toggleServiceActive.bind(
                          null,
                          service.id,
                          !service.isActive,
                        )}
                      >
                        <button
                          type="submit"
                          className="text-gray-600 underline hover:text-gray-900"
                        >
                          {service.isActive ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
