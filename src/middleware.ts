import { type MiddlewareConfig, type NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/cadastro', whenAuthenticated: 'redirect' },
  { path: '/esqueci-senha', whenAuthenticated: 'redirect' },
  { path: '/inicio', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_USER_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(
    (route) => path === route.path || path.startsWith(`${route.path}/`)
  );
  const token = request.cookies.get('token'); //TODO: verificar aqui onde vai ser guardado o token

  if (!token && publicRoute) return NextResponse.next();

  if (!token) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_USER_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    //TODO: verificar se o token esta expirado
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)',
  ],
};
