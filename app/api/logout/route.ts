import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'User logged out successfully!' });

  response.cookies.set({
    name: 'session',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
  });

  return response;
}
