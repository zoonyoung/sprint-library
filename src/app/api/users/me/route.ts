import { NextResponse } from "next/server";

import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

// TODO: user Conditional

export async function GET() {
  const session = await auth();
  const userId = session?.user.id || null;

  const user = await db.selectFrom("users").selectAll().where("id", "=", userId).executeTakeFirst();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
