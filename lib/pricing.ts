import type { PriceOption } from "@prisma/client";

const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

export function formatRupiah(amount: number) {
  return `Rp ${numberFormatter.format(amount)}`;
}

export function getCheapestPriceLabel(
  priceOptions: Pick<PriceOption, "price" | "priceType">[]
): string {
  const withPrice = priceOptions.filter(
    (option) => option.price !== null && option.price !== undefined
  );

  if (withPrice.length === 0) {
    return "Harga bersaing";
  }

  const cheapest = withPrice.reduce((min, option) =>
    (option.price as number) < (min.price as number) ? option : min
  );

  const formatted = formatRupiah(cheapest.price as number);

  return cheapest.priceType === "STARTING_FROM"
    ? `Mulai dari ${formatted}`
    : formatted;
}