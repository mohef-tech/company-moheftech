import { verifySession } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await verifySession();

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold text-gray-900">
        Dashboard Admin
      </h1>
      <p className="mb-8 text-sm text-gray-600">
        Login sebagai:{" "}
        <span className="font-medium text-gray-900">{session?.username}</span>
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/layanan"
          className="rounded border border-gray-200 bg-white p-5 hover:border-gray-400"
        >
          <p className="font-medium text-gray-900">Kelola Layanan</p>
          <p className="mt-1 text-sm text-gray-500">
            Layanan, opsi harga, riwayat harga
          </p>
        </Link>
        <Link
          href="/admin/portfolio"
          className="rounded border border-gray-200 bg-white p-5 hover:border-gray-400"
        >
          <p className="font-medium text-gray-900">Kelola Portfolio</p>
          <p className="mt-1 text-sm text-gray-500">
            Produk yang ditampilkan di publik
          </p>
        </Link>
        <Link
          href="/admin/pengaturan"
          className="rounded border border-gray-200 bg-white p-5 hover:border-gray-400"
        >
          <p className="font-medium text-gray-900">Pengaturan</p>
          <p className="mt-1 text-sm text-gray-500">
            Profil bisnis, WhatsApp, lokasi
          </p>
        </Link>
      </div>
    </div>
  );
}
