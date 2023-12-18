import { JWT } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { AuthUser } from './app/api/auth/[...nextauth]/route';
import navigationPath from './app/common/navigation/navigationPath';

export { default } from 'next-auth/middleware';

interface CustomToken extends JWT {
  user: AuthUser;
}

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req })) as CustomToken | null;

  const { origin, pathname } = req.nextUrl;

  if (token && token.user.accessToken) {
    if (!hasQueryParams(req, 'step') && pathname === navigationPath.로그인_퍼널.로그인) {
      return NextResponse.redirect(`${origin}${navigationPath.로그인_퍼널.닉네임_설정}`);
    }
  }

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/login')) {
      console.log('Authentication Error');
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/login`, origin);
    signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};

const hasQueryParams = (url: NextRequest, paramName: string) => {
  const params = new URLSearchParams(url.nextUrl.search);
  return params.has(paramName);
};
