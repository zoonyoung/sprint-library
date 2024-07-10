import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/kysely";

export async function PATCH(request: NextRequest, { params }: { params: { rentalId: string } }) {
  const rentalId = parseInt(params.rentalId);

  const rental = await db.selectFrom("rentals").selectAll().where("id", "=", rentalId).executeTakeFirst();

  if (!rental) {
    return NextResponse.json({ error: "Rental not found" }, { status: 404 });
  }

  const updatedRental = await db.transaction().execute(async trx => {
    const [updated] = await trx
      .updateTable("rentals")
      .set({
        returnedAt: new Date(),
        isRented: false,
        updatedAt: new Date(),
      })
      .where("id", "=", rentalId)
      .returning(["id", "userId", "bookId", "rentedAt", "returnedAt", "dueDate", "isRented", "isOverdue"])
      .execute();

    await trx
      .updateTable("books")
      .set(eb => ({ rent: eb("rent", "-", 1) }))
      .where("id", "=", rental.bookId)
      .execute();

    return updated;
  });

  return NextResponse.json(updatedRental);
}
