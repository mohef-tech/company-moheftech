import { verifySession } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await verifySession();

  return (
    <main>
      <h1>Dashboard Admin</h1>
      <p>Login berhasil sebagai: {session?.username}</p>
      <p>
        (Halaman ini placeholder — dashboard beneran dibikin di langkah 6-8)
      </p>
      <Link href="/admin/layanan">Kelola Layanan</Link>
      <Link href="/admin/portfolio">Kelola Portfolio</Link>
    </main>
  );
}
