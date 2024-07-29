import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

// TODO: BookId-Conditional(GET) Admin-Conditional(POST)

export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {
  const bookId = parseInt(params.bookId);
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const pageSize = 10;

  const reviews = await db
    .selectFrom("reviews")
    .selectAll()
    .where("bookId", "=", bookId)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy("createdAt", "desc")
    .execute();

  const totalCount = await db
    .selectFrom("reviews")
    .select(db.fn.count("id").as("count"))
    .where("bookId", "=", bookId)
    .executeTakeFirstOrThrow();

  const totalPages = Math.ceil(Number(totalCount.count) / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return NextResponse.json({
    list: reviews,
    page,
    totalPages,
    nextPage,
  });
}

export async function POST(request: NextRequest, { params }: { params: { bookId: string } }) {
  const bookId = parseInt(params.bookId);
  const { rating, title, review } = await request.json();
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return NextResponse.json({ error: "Permision denied" }, { status: 403 });

  const newReview = await db
    .insertInto("reviews")
    .values({
      userId,
      bookId,
      rating,
      title,
      review,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  return NextResponse.json(newReview);
}
