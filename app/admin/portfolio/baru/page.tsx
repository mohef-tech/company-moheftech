import { PortfolioForm } from "@/components/admin/portfolio-form";
import { createPortfolio } from "../actions";

export default async function NewPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">
        Tambah Portfolio
      </h1>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <PortfolioForm action={createPortfolio} submitLabel="Simpan" />
    </div>
  );
}
