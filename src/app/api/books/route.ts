import { db } from '@/service/kysely';
import { NextResponse } from 'next/server';

// GET /api/books
export async function GET() {
  const books = await db.selectFrom('books').selectAll().execute();
  return NextResponse.json({ books });
}

// POST /api/books
export async function POST(request: Request) {
  const { title, author, publisher, tags, quantity, image } = await request.json();
  const newBook = await db
    .insertInto('books')
    .values({
      title,
      author,
      publisher,
      tags,
      quantity,
      image,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .returningAll()
    .executeTakeFirst();

  return NextResponse.json({ book: newBook });
}
