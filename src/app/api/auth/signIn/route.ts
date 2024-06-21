import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request
  });
  console.log(token);
  return NextResponse.json({});
}

export async function POST(request: NextRequest) {
  console.log(request.headers.get('Authorization'));
  return NextResponse.json('return');
}
