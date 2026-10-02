type PortfolioFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaults?: {
    title: string;
    shortDescription: string;
    solutionType: string;
    isVisible: boolean;
    sortOrder: number;
  };
};

export function PortfolioForm({
  action,
  submitLabel,
  defaults,
}: PortfolioFormProps) {
  const inputClass =
    "rounded border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <form action={action} className="max-w-xl space-y-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClass}>
          Nama proyek
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaults?.title}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="shortDescription" className={labelClass}>
          Masalah yang diselesaikan (satu kalimat)
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          defaultValue={defaults?.shortDescription}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="solutionType" className={labelClass}>
          Jenis solusi (bebas, mis. kasir, gudang, penjadwalan)
        </label>
        <input
          id="solutionType"
          name="solutionType"
          type="text"
          defaultValue={defaults?.solutionType}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sortOrder" className={labelClass}>
          Urutan tampil (angka kecil tampil lebih dulu)
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={defaults?.sortOrder ?? 0}
          className={`w-32 ${inputClass}`}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isVisible"
          name="isVisible"
          type="checkbox"
          defaultChecked={defaults?.isVisible ?? true}
          className="h-4 w-4"
        />
        <label htmlFor="isVisible" className="text-sm text-gray-700">
          Tampil di website (matikan kalau izin proyek belum didapat)
        </label>
      </div>
      <button
        type="submit"
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        {submitLabel}
      </button>
    </form>
  );
}
