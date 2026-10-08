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
    <div className="admin-shell flex min-h-screen bg-gray-50">
      <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <span className="text-lg font-semibold text-gray-900">
            Mohef Tech
          </span>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4 text-sm font-medium text-gray-600">
          <Link
            href="/admin"
            className="rounded px-3 py-2 hover:bg-gray-100 hover:text-gray-900"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/layanan"
            className="rounded px-3 py-2 hover:bg-gray-100 hover:text-gray-900"
          >
            Layanan
          </Link>
          <Link
            href="/admin/portfolio"
            className="rounded px-3 py-2 hover:bg-gray-100 hover:text-gray-900"
          >
            Portfolio
          </Link>
          <Link
            href="/admin/pengaturan"
            className="rounded px-3 py-2 hover:bg-gray-100 hover:text-gray-900"
          >
            Pengaturan
          </Link>
        </nav>
        <div className="border-t border-gray-200 p-4">
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
