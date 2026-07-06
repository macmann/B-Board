import { NextRequest, NextResponse } from "next/server";

import {
  AuditActorType,
  AuditEntityType,
  IssuePriority,
  IssueStatus,
  IssueType,
  Role,
} from "../../../../../lib/prismaEnums";
import { safeLogAudit } from "../../../../../lib/auditLogger";
import { setRequestContextUser, withRequestContext } from "../../../../../lib/requestContext";

import { getUserFromRequest } from "../../../../../lib/auth";
import prisma from "../../../../../lib/db";
import {
  AuthorizationError,
  requireProjectRole,
} from "../../../../../lib/permissions";
import { jsonError } from "../../../../../lib/apiResponse";
import { getNextIssuePosition } from "../../../../../lib/issuePosition";
import { resolveProjectId, type ProjectParams } from "../../../../../lib/params";
import { logError } from "../../../../../lib/logger";
import { sendAssigneeNotification } from "../../../../../lib/issueNotifications";
import { getNextIssueKey, isUniqueIssueKeyConflict } from "../../../../../lib/issueKey";

const fetchSecondaryAssignee = async (secondaryAssigneeId: string | null) => {
  if (!secondaryAssigneeId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: secondaryAssigneeId },
    select: { id: true, name: true },
  });
};

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<Awaited<ProjectParams>> }
) {
  const params = await ctx.params;
  return withRequestContext(request, async () => {
    const projectId = await resolveProjectId(params);

    if (!projectId) {
      return jsonError("projectId is required", 400);
    }

    const user = await getUserFromRequest(request);

    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    setRequestContextUser(user.id, [user.role]);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { settings: true },
    });

    if (!project) {
      return jsonError("Project not found", 404);
    }

    try {
      await requireProjectRole(user.id, project.id, [
        Role.ADMIN,
        Role.PO,
        Role.DEV,
        Role.QA,
      ]);
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return jsonError(error.message, error.status);
      }

      throw error;
    }

    const body = await request.json();

    const {
      title,
      type = IssueType.STORY,
      priority = IssuePriority.MEDIUM,
      storyPoints,
      assigneeId,
      secondaryAssigneeId,
      epicId,
      description,
      sprintId,
      position,
    } = body;

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const validatedType = Object.values(IssueType).includes(type as IssueType)
      ? (type as IssueType)
      : IssueType.STORY;

    const validatedPriority = Object.values(IssuePriority).includes(
      priority as IssuePriority
    )
      ? (priority as IssuePriority)
      : IssuePriority.MEDIUM;

    const parsedStoryPoints =
      storyPoints === undefined || storyPoints === null || storyPoints === ""
        ? null
        : Number(storyPoints);

    const issueStatus = IssueStatus.TODO;
    const sprintIdValue = sprintId || null;
    const parsedPosition =
      position === undefined || position === null ? null : Number(position);
    let issuePosition: number | null = null;

    if (parsedPosition !== null && !Number.isNaN(parsedPosition)) {
      issuePosition = parsedPosition;
    } else if (sprintIdValue) {
      issuePosition = await getNextIssuePosition(
        projectId,
        sprintIdValue,
        issueStatus
      );
    }

    if (assigneeId) {
      const assigneeMembership = await prisma.projectMember.findUnique({
        where: { projectId_userId: { projectId, userId: assigneeId } },
        select: { userId: true },
      });

      if (!assigneeMembership) {
        return jsonError("Assignee must be a member of this project", 400);
      }
    }

    if (secondaryAssigneeId) {
      const secondaryAssigneeMembership = await prisma.projectMember.findUnique({
        where: { projectId_userId: { projectId, userId: secondaryAssigneeId } },
        select: { userId: true },
      });

      if (!secondaryAssigneeMembership) {
        return jsonError("Secondary assignee must be a member of this project", 400);
      }
    }

    const createIssue = async () => {
      const key = await getNextIssueKey(prisma, projectId, project.name);

      return prisma.issue.create({
        data: {
          projectId,
          key,
          title,
          type: validatedType,
          priority: validatedPriority,
          storyPoints: parsedStoryPoints,
          assigneeId: assigneeId ?? null,
          secondaryAssigneeId: secondaryAssigneeId ?? null,
          epicId: epicId ?? null,
          description: description ?? null,
          status: issueStatus,
          sprintId: sprintIdValue,
          ...(issuePosition !== null ? { position: issuePosition } : {}),
          reporterId: user.id,
        },
        include: {
          epic: true,
          assignee: true,
        },
      });
    };

    let issue: Awaited<ReturnType<typeof createIssue>> | null = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        issue = await createIssue();
        break;
      } catch (error) {
        if (!isUniqueIssueKeyConflict(error) || attempt === 4) {
          throw error;
        }
      }
    }

    if (!issue) {
      return jsonError("Failed to create issue", 500);
    }

    const secondaryAssignee = await fetchSecondaryAssignee(issue.secondaryAssigneeId);

    try {
      await safeLogAudit({
        projectId,
        actorType: AuditActorType.USER,
        actorId: user.id,
        action: "ISSUE_CREATED",
        entityType: AuditEntityType.ISSUE,
        entityId: issue.id,
        summary: `Issue ${issue.key ?? issue.title} created`,
        after: {
          title: issue.title,
          status: issue.status,
          priority: issue.priority,
          type: issue.type,
          storyPoints: issue.storyPoints,
          assigneeId: issue.assigneeId,
          secondaryAssigneeId: issue.secondaryAssigneeId,
          epicId: issue.epicId,
          sprintId: issue.sprintId,
          position: issue.position,
        },
      });
    } catch (auditError) {
      logError("Failed to record audit log for issue creation", auditError);
    }

    if (issue.assignee) {
      try {
        await sendAssigneeNotification({
          project,
          issue: {
            id: issue.id,
            key: issue.key ?? null,
            title: issue.title,
            status: issue.status,
          },
          assignee: {
            name: issue.assignee.name ?? null,
            email: issue.assignee.email ?? null,
          },
        });
      } catch (emailError) {
        logError("Failed to send assignee notification", emailError);
      }
    }

    return NextResponse.json({ ...issue, secondaryAssignee }, { status: 201 });
  });
}
