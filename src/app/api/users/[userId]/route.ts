import { NextRequest, NextResponse } from "next/server";

import { db } from "@/utils/kysely";

// TODO: userConditional(GET) adminConditional(PATCH)
//
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = parseInt(params.userId);

  const user = await db.selectFrom("users").selectAll().where("id", "=", userId).executeTakeFirst();
  const favoriteBooks = await db
    .selectFrom("favorites")
    .innerJoin("books", "favorites.bookId", "books.id")
    .select(["books.id", "books.title", "books.author", "books.image", "books.publisher"])
    .where("favorites.userId", "=", userId)
    .execute();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ list: { user, favoriteBooks } });
}

export async function PATCH(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = parseInt(params.userId);
  const { name, image, course, cohort } = await request.json();

  const updatedUser = await db
    .updateTable("users")
    .set({
      name,
      image,
      course,
      cohort,
      updatedAt: new Date(),
    })
    .where("id", "=", userId)
    .returningAll()
    .executeTakeFirst();

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found or not updated" }, { status: 404 });
  }

  return NextResponse.json(updatedUser);
}
