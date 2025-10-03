import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { step } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set('step', String(step), {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return res;
}
