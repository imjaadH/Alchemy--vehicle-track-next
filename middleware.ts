import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return NextResponse.redirect(new URL('/user/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/api/trips/:path*', '/'],
}
