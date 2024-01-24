import { getBooks } from '@/service/book';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return getBooks().then((res) => NextResponse.json(res));
}
