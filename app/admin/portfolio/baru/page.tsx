import { PortfolioForm } from "@/components/admin/portfolio-form";
import { createPortfolio } from "../actions";

export default async function NewPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main>
      <h1>Tambah Portfolio</h1>
      {error && <p>{error}</p>}
      <PortfolioForm action={createPortfolio} submitLabel="Simpan" />
    </main>
  );
}
