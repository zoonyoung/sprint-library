import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {

  try {
    const session = await auth();
    const userId = session?.user.id;
    const bookId = Number(params.bookId);

    const book = await db
      .selectFrom("books")
      .where("id", "=", bookId)
      .select(["id", "title", "author", "publisher", "tags", "quantity", "rent", "createdAt", "updatedAt"])
      .executeTakeFirst();

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    let isFavorite = false;
    if (userId) {
      const favorite = await db
        .selectFrom("favorites")
        .where("userId", "=", userId)
        .where("bookId", "=", bookId)
        .executeTakeFirst();

      isFavorite = !!favorite;
    }

    return NextResponse.json({ ...book, isFavorite });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const { title, author, publisher, tags, quantity, image } = await request.json();

  const updatedBook = await db
    .updateTable("books")
    .set({
      title,
      author,
      publisher,
      tags,
      quantity,
      image,
      updatedAt: new Date(),
    })
    .where("id", "=", parseInt(bookId))
    .returningAll()
    .executeTakeFirst();

  if (!updatedBook) {
    return NextResponse.json({ error: "Book not found or not updated" }, { status: 404 });
  }

  return NextResponse.json({ updatedBook });
}
