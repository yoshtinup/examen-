import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useRouter } from 'next/router';

export const DataComponent: React.FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);

  React.useEffect(() => {
    checkRol();
  }, []);

  const checkRol = async () => {
    const selectedRolToken = Cookies.get('selectedRol');
    const userRolesToken = Cookies.get('userRoles');
    const userToken = Cookies.get('user');
    // Esto no debería suceder porque desde el middleware ya se hace la validación
    if (!userRolesToken || !userToken || !selectedRolToken) {
      return Router.push('/login');
    }

    try {
      const decodeselectedRolToken = await jwtVerify(
        selectedRolToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const decodeUserRoles = await jwtVerify(
        userRolesToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const decodeUser = await jwtVerify(
        userToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const user = decodeUser.payload.user as object;
      const userRoles = decodeUserRoles.payload.userRoles as Array<number>;
      const selectedRol = decodeselectedRolToken.payload.selectedRol as number;
      /* const roles: any = userRoles.map((value: Roles) => {
        return Roles[value];
      }); */
      if (userRoles.indexOf(selectedRol) > -1) {
        setRol(selectedRol);
        setUserInfo(user);
      } else {
        throw 'Usuario con rol no permitido';
      }
    } catch (error) {
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      router.push('/login');
      // console.log('REMOVED');
    }
  };

  return <></>;
};
