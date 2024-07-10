import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/kysely";

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const pageSize = 10;

  const books = await db
    .selectFrom("books")
    .select(["id", "title", "image", "rent", "quantity"])
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .execute();

  const totalCount = await db.selectFrom("books").select(db.fn.count("id").as("count")).executeTakeFirstOrThrow();

  const totalPages = Math.ceil(Number(totalCount.count) / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return NextResponse.json({
    list: books.map(book => ({
      ...book,
      isRent: book.quantity - (book?.rent || 0) > 0,
    })),
    page,
    totalPages,
    nextPage,
  });
}

export async function POST(request: NextRequest) {
  const { title, author, publisher, tags, quantity, image } = await request.json();

  // Validate required fields
  if (!title || !author || !publisher || !tags || !quantity || !image) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newBook = await db
    .insertInto("books")
    .values({
      title,
      author,
      publisher,
      tags,
      quantity,
      image,
      favoriteCount: 0,
      rent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  return NextResponse.json({ newBook });
}
