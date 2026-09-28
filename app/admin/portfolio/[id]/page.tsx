import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PortfolioForm } from "@/components/admin/portfolio-form";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { updatePortfolio, deletePortfolio } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const item = await prisma.portfolio.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <main>
      <h1>Edit Portfolio</h1>
      {error && <p>{error}</p>}
      <PortfolioForm
        action={updatePortfolio.bind(null, item.id)}
        submitLabel="Simpan Perubahan"
        defaults={item}
      />

      <hr />

      <form action={deletePortfolio.bind(null, item.id)}>
        <ConfirmButton
          message="Hapus kartu portfolio ini? Tidak bisa dibatalkan."
          label="Hapus Portfolio"
        />
      </form>
    </main>
  );
}
