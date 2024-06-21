import { db } from '@/service/kysely';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// GET /api/books/{bookId}
export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {
  const bookId = params.bookId;

  const book = await db.selectFrom('books').selectAll().where('id', '=', parseInt(bookId)).executeTakeFirst();

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json({ item: book });
}

// PATCH /api/books/{bookId}
export async function PATCH(request: NextRequest, { params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const { title, author, publisher, tags, quantity, image } = await request.json();

  const updatedBook = await db
    .updateTable('books')
    .set({
      title,
      author,
      publisher,
      tags,
      quantity,
      image,
      updatedAt: new Date()
    })
    .where('id', '=', parseInt(bookId))
    .returningAll()
    .executeTakeFirst();

  if (!updatedBook) {
    return NextResponse.json({ error: 'Book not found or not updated' }, { status: 404 });
  }

  return NextResponse.json({ book: updatedBook });
}
