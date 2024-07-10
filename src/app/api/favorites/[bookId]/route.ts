import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

export async function POST(request: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookId = Number(params.bookId);

    const result = await db.transaction().execute(async trx => {
      const existingFavorite = await trx
        .selectFrom("favorites")
        .where("userId", "=", userId)
        .where("bookId", "=", bookId)
        .executeTakeFirst();

      if (existingFavorite) {
        return { error: "Book already in favorites" };
      }

      await trx
        .insertInto("favorites")
        .values({
          userId,
          bookId,
          createdAt: new Date(),
        })
        .execute();

      return { message: "Book added to favorites successfully" };
    });

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bookId = Number(params.bookId);
    const result = await db
      .deleteFrom("favorites")
      .where("userId", "=", userId)
      .where("bookId", "=", bookId)
      .executeTakeFirst();
    if (Number(result.numDeletedRows) === 0) {
      return NextResponse.json({ error: "Favorite not found" });
    }
    return NextResponse.json({ message: "Book removed from favorites successfully" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
