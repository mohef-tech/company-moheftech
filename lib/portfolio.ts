import { prisma } from "@/lib/db/prisma";

export async function getVisiblePortfolio() {
  return prisma.portfolio.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });
}