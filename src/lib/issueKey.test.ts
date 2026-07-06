import { describe, expect, it, vi } from "vitest";

import { getNextIssueKey, isUniqueIssueKeyConflict } from "./issueKey";

describe("issueKey", () => {
  it("uses the highest existing numeric suffix instead of issue count", async () => {
    const prisma = {
      project: { findUnique: vi.fn() },
      issue: {
        findMany: vi.fn().mockResolvedValue([
          { key: "BB-1" },
          { key: "BB-4" },
          { key: "BB-2-DUP-2" },
          { key: "OTHER-99" },
          { key: null },
        ]),
      },
    };

    await expect(getNextIssueKey(prisma as any, "project-1", "B Board")).resolves.toBe("BB-5");
    expect(prisma.issue.findMany).toHaveBeenCalledWith({
      where: { projectId: "project-1", key: { startsWith: "BB-", mode: "insensitive" } },
      select: { key: true },
    });
  });

  it("identifies unique constraint conflicts", () => {
    expect(isUniqueIssueKeyConflict({ code: "P2002" })).toBe(true);
    expect(isUniqueIssueKeyConflict({ code: "P2025" })).toBe(false);
    expect(isUniqueIssueKeyConflict(new Error("boom"))).toBe(false);
  });
});
