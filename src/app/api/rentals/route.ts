import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { db } from "@/utils/kysely";

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const pageSize = 10;

  const rentals = await db
    .selectFrom("rentals")
    .selectAll()
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy("createdAt", "desc")
    .execute();

  const totalCount = await db.selectFrom("rentals").select(db.fn.count("id").as("count")).executeTakeFirstOrThrow();

  const totalPages = Math.ceil(Number(totalCount.count) / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return NextResponse.json({
    list: rentals,
    page,
    totalPages,
    nextPage,
  });
}

export async function POST(request: NextRequest) {
  const { bookId } = await request.json();
  const session = await auth();
  const userId = session?.user.id || null;
  if (!userId) {
    return NextResponse.json({ error: "Permission denied" }, { status: 404 });
  }

  const book = await db
    .selectFrom("books")
    .select(["id", "quantity", "rent"])
    .where("id", "=", bookId)
    .executeTakeFirst();

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  if (book.quantity <= book.rent) {
    return NextResponse.json({ error: "Book is not available for rent" }, { status: 400 });
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 2주 후

  const newRental = await db.transaction().execute(async trx => {
    const [rental] = await trx
      .insertInto("rentals")
      .values({
        userId,
        bookId,
        rentedAt: new Date(),
        dueDate,
        isRented: true,
        isOverdue: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning(["id", "userId", "bookId", "rentedAt", "dueDate", "isRented", "isOverdue"])
      .execute();

    await trx
      .updateTable("books")
      .set(eb => ({ rent: eb("rent", "+", 1) }))
      .where("id", "=", bookId)
      .execute();

    return rental;
  });

  return NextResponse.json(newRental);
}
