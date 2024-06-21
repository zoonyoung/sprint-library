import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 토큰 유효성 검사
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // 토큰이 유효하다면 응답 보내기
  res.status(200).json({ token });
}
