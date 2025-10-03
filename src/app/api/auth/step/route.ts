import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { step } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set('step', String(step), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return res;
}
