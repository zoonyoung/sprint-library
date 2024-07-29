import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

// TODO: Admin-Conditional(GET) User-Conditional(POST)

export async function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get("filter");
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const pageSize = parseInt(request.nextUrl.searchParams.get("limit") || "1000");

  let query = db.selectFrom("users").selectAll();

  if (filter === "registered") {
    query = query.where("isRegister", "=", true);
  } else if (filter === "unregistered") {
    query = query.where("isRegister", "=", false);
  } else if (filter === "admins") {
    query = query.where("course", "=", "admin");
  }

  const users = await query
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .execute();

  const countQuery = db.selectFrom("users").select(db.fn.count("id").as("count"));

  if (filter === "registered") {
    countQuery.where("isRegister", "=", true);
  } else if (filter === "unregistered") {
    countQuery.where("isRegister", "=", false);
  } else if (filter === "admins") {
    countQuery.where("isAdmin", "=", true);
  }

  const totalCountResult = await countQuery.executeTakeFirstOrThrow();
  const totalCount = Number(totalCountResult.count);
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return NextResponse.json({
    list: users,
    page,
    totalPages,
    nextPage,
  });
}

export async function POST(request: NextRequest) {
  const { name, course, cohort, isAdmin, isRegister } = await request.json();
  const session = await auth();
  if (session)
    try {
      await db
        .updateTable("users")
        .set({
          name,
          course,
          cohort,
          isSignUp: true,
          isRegister,
          isAdmin,
        })
        .where("id", "=", session.user.id)
        .execute();
      return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  return NextResponse.json({ error: "Permission Denied" }, { status: 403 });
}
