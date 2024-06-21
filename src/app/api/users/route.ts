import { NextResponse } from 'next/server';
import { USERS } from '../mock';

export async function GET() {
  return NextResponse.json({ data: USERS });
}
