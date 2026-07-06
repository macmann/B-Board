-- Ensure existing duplicate issue keys do not block the unique index.
WITH duplicate_issue_keys AS (
  SELECT
    "id",
    "key",
    ROW_NUMBER() OVER (
      PARTITION BY "projectId", "key"
      ORDER BY "createdAt", "id"
    ) AS duplicate_number
  FROM "Issue"
  WHERE "key" IS NOT NULL
)
UPDATE "Issue" AS issue
SET "key" = CONCAT(duplicate_issue_keys."key", '-DUP-', duplicate_issue_keys.duplicate_number)
FROM duplicate_issue_keys
WHERE issue."id" = duplicate_issue_keys."id"
  AND duplicate_issue_keys.duplicate_number > 1;

CREATE UNIQUE INDEX "Issue_projectId_key_key" ON "Issue"("projectId", "key");
