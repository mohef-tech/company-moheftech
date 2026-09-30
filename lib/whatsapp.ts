export function normalizeWhatsappNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return `62${digits}`;
}

export function buildWhatsappLink(
  number: string,
  message: string
): string {
  const normalized = normalizeWhatsappNumber(number);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}

export function buildServiceWhatsappMessage(
  template: string,
  serviceName: string
): string {
  return template.replace("[layanan]", serviceName);
}