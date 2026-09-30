import { prisma } from "@/lib/db/prisma";

export async function getActiveServicesGroupedByPillar() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ pillar: "asc" }, { sortOrder: "asc" }],
    include: { priceOptions: true },
  });

  const grouped = new Map<string, typeof services>();
  for (const service of services) {
    const list = grouped.get(service.pillar) ?? [];
    list.push(service);
    grouped.set(service.pillar, list);
  }

  return Array.from(grouped.entries()).map(([pillar, services]) => ({
    pillar,
    services,
  }));
}