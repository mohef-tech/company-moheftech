import Link from "next/link";
import { verifySession } from "@/lib/auth/session";
import { logout } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/admin" className="hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/admin/layanan" className="hover:text-gray-900">
            Layanan
          </Link>
          <Link href="/admin/portfolio" className="hover:text-gray-900">
            Portfolio
          </Link>
          <Link href="/admin/pengaturan" className="hover:text-gray-900">
            Pengaturan
          </Link>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </form>
      </nav>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
