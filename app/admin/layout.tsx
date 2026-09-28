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
    <div>
      <nav>
        <Link href="/admin">Dashboard</Link>
        {" | "}
        <Link href="/admin/layanan">Layanan</Link>
        {" | "}
        <Link href="/admin/portfolio">Portfolio</Link>
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </nav>
      {children}
    </div>
  );
}
