import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Roles from '@definitions/Roles';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get('user');
  const userRolesToken = request.cookies.get('userRoles');
  const selectedRolToken = request.cookies.get('selectedRol');

  const check = {
    isUser: false,
  };

  if (request.nextUrl.pathname.includes('/login'))
    try {
      if (!userToken || !userRolesToken || !selectedRolToken)
        throw 'Error en los tokens';

      const decodeSelectedRoles = await jwtVerify(
        selectedRolToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const selectedRol = decodeSelectedRoles.payload.selectedRol as Roles;
      const path = [
        selectedRol === Roles.Academico ||
          selectedRol === Roles.Responsable_Orientacion ||
          selectedRol === Roles.Coordinador_Unidad ||
          selectedRol === Roles.Coordinacion_General_Posgrado ||
          selectedRol === Roles.Servicios_Escolares,
        selectedRol === Roles.Externo,
        selectedRol === Roles.Estudiante,
      ];
      if (path[0])
        return NextResponse.redirect(new URL('/consejo_tutelar', request.url));
      if (path[1])
        return NextResponse.redirect(new URL('/academicoexterno', request.url));
      if (path[2])
        return NextResponse.redirect(new URL('/estudiante', request.url));
    } catch (error) {
      // console.log('/login ' + error);
      request.cookies.delete('user');
      request.cookies.delete('userRoles');
      request.cookies.delete('selectedRol');
      return;
    }

  if (!userToken || !userRolesToken || !selectedRolToken)
    return NextResponse.redirect(new URL('/login', request.url));

  if (request.nextUrl.pathname.includes('/401')) return;

  try {
    const decodeUser = await jwtVerify(
      userToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const decodeUserRoles = await jwtVerify(
      userRolesToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const decodeSelected = await jwtVerify(
      selectedRolToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const user = decodeUser.payload.user as object;
    const userRoles = decodeUserRoles.payload.userRoles as Array<number>;
    const selectedRol = decodeSelected.payload.selectedRol as number;

    if (userRoles.includes(selectedRol)) check.isUser = true;

    if (request.nextUrl.pathname.includes('/consejo_tutelar'))
      check.isUser =
        userRoles.includes(Roles.Academico) ||
        userRoles.includes(Roles.Responsable_Orientacion) ||
        userRoles.includes(Roles.Coordinador_Unidad) ||
        userRoles.includes(Roles.Coordinacion_General_Posgrado) ||
        userRoles.includes(Roles.Servicios_Escolares);

    if (request.nextUrl.pathname.includes('/academicoexterno'))
      check.isUser = userRoles.includes(Roles.Externo);

    if (request.nextUrl.pathname.includes('/estudiante'))
      check.isUser = userRoles.includes(Roles.Estudiante);

    if (check.isUser === false)
      return NextResponse.redirect(new URL('/401', request.url));

    return NextResponse.next();
  } catch (error) {
    // console.log('/all ' + error);
    request.cookies.delete('user');
    request.cookies.delete('userRoles');
    request.cookies.delete('selectedRol');
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
