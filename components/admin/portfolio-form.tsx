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
  return (
    <form action={action}>
      <div>
        <label htmlFor="title">Nama proyek</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaults?.title}
          required
        />
      </div>
      <div>
        <label htmlFor="shortDescription">
          Masalah yang diselesaikan (satu kalimat)
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          defaultValue={defaults?.shortDescription}
          required
        />
      </div>
      <div>
        <label htmlFor="solutionType">
          Jenis solusi (bebas, mis. kasir, gudang, penjadwalan)
        </label>
        <input
          id="solutionType"
          name="solutionType"
          type="text"
          defaultValue={defaults?.solutionType}
          required
        />
      </div>
      <div>
        <label htmlFor="sortOrder">
          Urutan tampil (angka kecil tampil lebih dulu)
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={defaults?.sortOrder ?? 0}
        />
      </div>
      <div>
        <label>
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={defaults?.isVisible ?? true}
          />{" "}
          Tampil di website (matikan kalau izin proyek belum didapat)
        </label>
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
