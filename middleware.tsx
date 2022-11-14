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
  const jwtEcosurTokenCookie = request.cookies.get('ecosurToken');
  //const refreshTokenCookie = request.cookies.get('refreshToken');

  const check = {
    isPermited: false,
    index: -1,
  };

  if (request.nextUrl.pathname.includes('/login'))
    try {
      if (
        !userCookie ||
        !userRolesCookie ||
        !selectedRolCookie ||
        !jwtEcosurTokenCookie /* ||
        !refreshTokenCookie */
      )
        throw 'Error en los tokens';

      const decodeSelectedRoles = await jwtVerify(
        selectedRolCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const selectedRol = decodeSelectedRoles.payload.selectedRol as Roles;

      Routes.forEach(values => {
        check.index = values.roles.indexOf(selectedRol);
      });

      if (check.index === -1) throw 'Error en los index';

      return NextResponse.redirect(
        new URL(Routes[check.index].path, request.url) //to index
      );
    } catch (error) {
      response.cookies.set('user', '', { maxAge: 0 });
      response.cookies.set('userRoles', '', { maxAge: 0 });
      response.cookies.set('selectedRol', '', { maxAge: 0 });
      response.cookies.set('ecosurToken', '', { maxAge: 0 });
      //response.cookies.set('refreshToken', '', { maxAge: 0 });
      return;
    }

  if (
    !userCookie ||
    !userRolesCookie ||
    !selectedRolCookie ||
    !jwtEcosurTokenCookie /* ||
    !refreshTokenCookie */
  )
    return NextResponse.redirect(new URL('/login', request.url));

  if (request.nextUrl.pathname.includes('/401')) return;

  try {
    const decodeUserRoles = await jwtVerify(
      userRolesCookie,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userRoles = decodeUserRoles.payload.userRoles as Array<number>;

    Routes.forEach(values => {
      const condicion: boolean = values.all_math
        ? request.nextUrl.pathname.includes(values.path)
        : request.nextUrl.pathname === values.path;
      if (condicion) {
        userRoles.forEach(value => {
          check.isPermited = values.roles.includes(value);
        });
      }
    });

    // Si no existe la configuración en Routes.ts también retorna un falso
    if (check.isPermited === false)
      return NextResponse.redirect(new URL('/401', request.url));

    return NextResponse.next();
  } catch (error) {
    response.cookies.set('user', '', { maxAge: 0 });
    response.cookies.set('userRoles', '', { maxAge: 0 });
    response.cookies.set('selectedRol', '', { maxAge: 0 });
    response.cookies.set('ecosurToken', '', { maxAge: 0 });
    //response.cookies.set('refreshToken', '', { maxAge: 0 });
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/login/:path*',
    '/401/:path*',
    '/consejo_tutelar/:path*',
    '/academicoexterno/:path*',
    '/estudiante/:path*',
  ],
};
