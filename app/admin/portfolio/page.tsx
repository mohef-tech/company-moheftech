import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { togglePortfolioVisible } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolio.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Portfolio</h1>
        <Link
          href="/admin/portfolio/baru"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Tambah Portfolio
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada portfolio.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Proyek</th>
                <th className="px-4 py-3 font-medium">Jenis Solusi</th>
                <th className="px-4 py-3 font-medium">Urutan</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.solutionType}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.sortOrder}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        item.isVisible
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isVisible ? "Tampil" : "Sembunyi"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/portfolio/${item.id}`}
                        className="text-gray-600 underline hover:text-gray-900"
                      >
                        Edit
                      </Link>
                      <form
                        action={togglePortfolioVisible.bind(
                          null,
                          item.id,
                          !item.isVisible,
                        )}
                      >
                        <button
                          type="submit"
                          className="text-gray-600 underline hover:text-gray-900"
                        >
                          {item.isVisible ? "Sembunyikan" : "Tampilkan"}
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
