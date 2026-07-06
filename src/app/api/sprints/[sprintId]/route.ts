import { NextRequest, NextResponse } from "next/server";
import { Role } from "../../../../lib/prismaEnums";

import { getUserFromRequest } from "../../../../lib/auth";
import { jsonError } from "../../../../lib/apiResponse";
import prisma from "../../../../lib/db";
import {
  AuthorizationError,
  requireProjectRole,
} from "../../../../lib/permissions";

const parseDate = (value: string | null | undefined) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ sprintId: string }> }
) {
  const { sprintId } = await ctx.params;

  const user = await getUserFromRequest(request);

  if (!user) {
    return jsonError("Unauthorized", 401);
  }

  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
  });

  if (!sprint) {
    return jsonError("Sprint not found", 404);
  }

  try {
    await requireProjectRole(user.id, sprint.projectId, [Role.ADMIN, Role.PO]);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return jsonError(error.message, error.status);
    }

    throw error;
  }

  const body = await request.json();
  const { name, goal, startDate, endDate } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return jsonError("Name is required", 400);
  }

  const parsedStartDate = parseDate(startDate);
  const parsedEndDate = parseDate(endDate);

  if (startDate && !parsedStartDate) {
    return jsonError("Invalid start date", 400);
  }

  if (endDate && !parsedEndDate) {
    return jsonError("Invalid end date", 400);
  }

  const updatedSprint = await prisma.sprint.update({
    where: { id: sprint.id },
    data: {
      name: name.trim(),
      goal: typeof goal === "string" && goal.trim() ? goal.trim() : null,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    },
  });

  return NextResponse.json(updatedSprint);
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ sprintId: string }> }
) {
  const { sprintId } = await ctx.params;

  const user = await getUserFromRequest(request);

  if (!user) {
    return jsonError("Unauthorized", 401);
  }

  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
  });

  if (!sprint) {
    return jsonError("Sprint not found", 404);
  }

  try {
    await requireProjectRole(user.id, sprint.projectId, [Role.ADMIN]);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return jsonError(error.message, error.status);
    }

    throw error;
  }

  await prisma.sprint.delete({
    where: { id: sprint.id },
  });

  return new NextResponse(null, { status: 204 });
}
