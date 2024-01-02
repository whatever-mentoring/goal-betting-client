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
  const { origin, pathname, searchParams } = req.nextUrl;

  const callbackUrl = searchParams.get('callback');

  // 로그인 상태
  if (token) {
    if (pathname.includes('/add')) {
      if (!token.user.nicknameIsModified) {
        return NextResponse.redirect(
          `${origin}${navigationPath.로그인_퍼널.닉네임_설정}` + '&callback=' + pathname,
        );
      }
      if (callbackUrl?.length) {
        return NextResponse.redirect(`${origin}${callbackUrl}`);
      }
    }
    if (pathname.includes('/share')) {
      if (!token.user.nicknameIsModified) {
        return NextResponse.redirect(
          `${origin}${navigationPath.로그인_퍼널.닉네임_설정}` + '&callback=' + pathname,
        );
      }
    }
    // 로그인 페이지 접근
    if (pathname === '/login') {
      if (token.user.nicknameIsModified) {
        if (callbackUrl?.length) {
          return NextResponse.redirect(`${origin}${callbackUrl}`);
        } else {
          return NextResponse.redirect(`${origin}/`);
        }
      }
      // 닉네임 설정 페이지 접근
      if (req.nextUrl.searchParams.has('step')) {
        return NextResponse.next();
      }
      // 로그인 후 접근
      return NextResponse.redirect(`${origin}${navigationPath.로그인_퍼널.닉네임_설정}`);
    }
    return NextResponse.next();
  }

  // 비로그인 상태
  if (!token) {
    // 로그인 페이지 접근
    if (pathname === '/login') {
      return NextResponse.next();
    }
    // 유저 설정 페이지 접근
    if (pathname.includes('/user')) {
      return NextResponse.redirect(`${origin}/login`);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/login', '/login/:path*', '/user/:path*', '/share/:path*', '/add'],
};
