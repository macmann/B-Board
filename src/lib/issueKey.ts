import type { Prisma, PrismaClient } from "@prisma/client";

const getProjectPrefix = (projectName: string) => {
  const words = projectName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "PR";
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type IssueKeyPrismaClient = PrismaClient | Prisma.TransactionClient;

export async function getNextIssueKey(
  prisma: IssueKeyPrismaClient,
  projectId: string,
  projectName?: string | null
): Promise<string> {
  let resolvedProjectName = projectName;

  if (!resolvedProjectName) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { name: true },
    });

    resolvedProjectName = project?.name ?? null;
  }

  const projectPrefix = resolvedProjectName ? getProjectPrefix(resolvedProjectName) : "PR";
  const prefixMatcher = new RegExp(`^${escapeRegex(projectPrefix)}-(\\d+)$`, "i");
  const existingKeys = await prisma.issue.findMany({
    where: { projectId, key: { startsWith: `${projectPrefix}-`, mode: "insensitive" } },
    select: { key: true },
  });

  const nextNumber = existingKeys.reduce((max, { key }) => {
    if (!key) return max;
    const match = key.match(prefixMatcher);
    const value = match ? Number.parseInt(match[1], 10) : Number.NEGATIVE_INFINITY;
    return Number.isFinite(value) && value > max ? value : max;
  }, 0);

  return `${projectPrefix}-${nextNumber + 1}`;
}

export const isUniqueIssueKeyConflict = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: string }).code === "P2002";
