export function formatRupiah(value: number | null) {
  if (value === null) return "Custom";
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}