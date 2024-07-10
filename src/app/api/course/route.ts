import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

export async function GET() {
  const course = await db.selectFrom("course").selectAll().execute();
  if (course) return NextResponse.json({ list: course });
  return NextResponse.json({ error: "don't have any course" }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.isAdmin) {
    const { name, startDate, endDate } = await request.json();

    const newCourse = db.insertInto("course").values({ name, startDate, endDate }).execute();
    return NextResponse.json({ newCourse });
  }
  return NextResponse.json({ error: "permission denied" }, { status: 403 });
}
