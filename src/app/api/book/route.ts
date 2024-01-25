import { getBooks } from '@/service/book';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  return getBooks().then((res) => {
    return NextResponse.json(res);
  });
}
