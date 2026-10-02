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
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">
        Edit Portfolio
      </h1>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <PortfolioForm
        action={updatePortfolio.bind(null, item.id)}
        submitLabel="Simpan Perubahan"
        defaults={item}
      />

      <hr className="my-8 border-gray-200" />

      <h2 className="mb-3 text-lg font-semibold text-red-700">
        Zona Berbahaya
      </h2>
      <form action={deletePortfolio.bind(null, item.id)}>
        <ConfirmButton
          message={`Hapus kartu portfolio "${item.title}"? Tidak bisa dibatalkan.`}
          label="Hapus Portfolio"
        />
      </form>
    </div>
  );
}
