import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Roles from '@definitions/Roles';
import { jwtVerify } from 'jose';
import Routes from './Routes';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const userCookie = request.cookies.get('user');
  const userRolesCookie = request.cookies.get('userRoles');
  const selectedRolCookie = request.cookies.get('selectedRol');
  const ecosurTokenCookie = request.cookies.get('ecosurToken');

  const check = {
    isPermited: false,
    index: -1,
  };

  const redirect = request.nextUrl.searchParams.get('redirect');
  let selectedRol = null;

  try {
    const decodeSelectedRoles = await jwtVerify(
      selectedRolCookie,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    selectedRol = decodeSelectedRoles.payload.selectedRol as Roles;
  } catch {
    return;
  }

  if (request.nextUrl.pathname.includes('/login'))
    try {
      if (!ecosurTokenCookie || !selectedRolCookie) throw 'Error en los tokens';

      Routes.forEach(values => {
        if (values.roles.includes(selectedRol)) {
          check.index = Routes.indexOf(values);
        }
      });

      if (check.index === -1) throw 'Error en los index';

      return NextResponse.redirect(
        new URL(Routes[check.index].path, request.url) //to index
      );
    } catch (error) {
      return;
    }

  if (!ecosurTokenCookie || !selectedRolCookie)
    return NextResponse.redirect(
      new URL(
        !redirect && redirect !== '/401' && request.nextUrl.pathname !== '/401'
          ? `/login?redirect=${request.nextUrl.pathname}`
          : '/login',
        request.url
      )
    );

  if (request.nextUrl.pathname.includes('/401')) return;

  try {
    if (!userCookie || !userRolesCookie)
      throw {
        message: 'Sin roles de usuario',
        code: 4,
        data: { roles: userRolesCookie },
      };

    const decodeUserRoles = await jwtVerify(
      userRolesCookie,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userRoles = decodeUserRoles.payload.userRoles as Array<number>;

    Routes.forEach(route => {
      const condicion: boolean = route.all_math
        ? request.nextUrl.pathname.includes(route.path)
        : request.nextUrl.pathname === route.path;
      if (condicion) {
        const existRoleInRoute = route.roles.some(r => userRoles.includes(r));
        const selectedRoleExistInRoute = route.roles.includes(selectedRol);
        check.isPermited =
          existRoleInRoute && selectedRoleExistInRoute ? true : false;
      }
    });

    // Si no existe la configuración en Routes.ts también retorna un falso
    if (check.isPermited === false)
      return NextResponse.redirect(new URL('/401', request.url));

    return NextResponse.next();
  } catch (error) {
    if (!error.code) {
      return NextResponse.redirect(
        new URL(
          !redirect &&
          redirect !== '/401' &&
          request.nextUrl.pathname !== '/401'
            ? `/login?redirect=${request.nextUrl.pathname}`
            : '/login',
          request.url
        )
      );
    }
  }
}

export const config = {
  matcher: [
    '/login/:path*',
    '/401/:path*',
    '/consejo_tutelar/:path*',
    '/academicoexterno/:path*',
    '/estudiante/:path*',
    '/cei/:path*',
  ],
};
