import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { togglePortfolioVisible } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolio.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main>
      <h1>Portfolio</h1>
      <Link href="/admin/portfolio/baru">Tambah Portfolio</Link>
      {items.length === 0 ? (
        <p>Belum ada portfolio.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama Proyek</th>
              <th>Jenis Solusi</th>
              <th>Urutan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.solutionType}</td>
                <td>{item.sortOrder}</td>
                <td>{item.isVisible ? "Tampil" : "Sembunyi"}</td>
                <td>
                  <Link href={`/admin/portfolio/${item.id}`}>Edit</Link>
                  {" | "}
                  <form
                    action={togglePortfolioVisible.bind(
                      null,
                      item.id,
                      !item.isVisible,
                    )}
                    style={{ display: "inline" }}
                  >
                    <button type="submit">
                      {item.isVisible ? "Sembunyikan" : "Tampilkan"}
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
