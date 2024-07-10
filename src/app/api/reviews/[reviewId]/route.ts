import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/kysely";

export async function PATCH(request: NextRequest, { params }: { params: { reviewId: string } }) {
  const reviewId = parseInt(params.reviewId);
  const { rating, title, review } = await request.json();

  const updatedReview = await db
    .updateTable("reviews")
    .set({
      rating,
      title,
      review,
      updatedAt: new Date(),
    })
    .where("id", "=", reviewId)
    .returningAll()
    .executeTakeFirst();

  if (!updatedReview) {
    return NextResponse.json({ error: "Review not found or not updated" }, { status: 404 });
  }

  return NextResponse.json(updatedReview);
}

export async function DELETE(request: NextRequest, { params }: { params: { reviewId: string } }) {
  const reviewId = parseInt(params.reviewId);

  const deletedReview = await db.deleteFrom("reviews").where("id", "=", reviewId).returningAll().executeTakeFirst();

  if (!deletedReview) {
    return NextResponse.json({ error: "Review not found or not deleted" }, { status: 404 });
  }

  return NextResponse.json({ message: "Review deleted successfully" });
}
