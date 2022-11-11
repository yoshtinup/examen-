import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { AuthCode } from '@modules/auth/definitions/usuarioPosgrado';
import { QueryClient } from 'react-query';
import { authCode } from '@modules/auth/queries';

const DataComponent = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);

  React.useEffect(() => {
    checkRol();
    //checkExpires();
  }, []);

  const checkRol = async () => {
    const selectedRolCookie = Cookies.get('selectedRol');
    const userRolesCookie = Cookies.get('userRoles');
    const userCookie = Cookies.get('user');
    const jwtEcosurCookie = Cookies.get('ecosurToken');

    // Esto no debería suceder porque desde el middleware ya se hace la validación
    if (
      !selectedRolCookie ||
      !userRolesCookie ||
      !userCookie ||
      !jwtEcosurCookie
    ) {
      return router.push('/login');
    }

    try {
      const decodeSelectedRolToken = await jwtVerify(
        selectedRolCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const decodeUserRoles = await jwtVerify(
        userRolesCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const decodeUser = await jwtVerify(
        userCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const user = decodeUser.payload.user as object;
      const userRoles = decodeUserRoles.payload.userRoles as Array<number>;
      const selectedRol = decodeSelectedRolToken.payload.selectedRol as number;
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
      Cookies.remove('ecosurToken');
      //Cookies.remove('refreshToken');
      router.push('/login');
      // console.log('REMOVED');
    }
  };

  const checkExpires = async () => {
    /* const queryClient = new QueryClient();
    const refreshTokenCookie = Cookies.get('refreshToken');
    const isError = {
      message: '',
      check: false,
    };
    let auth: AuthCode;

    // Esto no debería suceder porque desde el middleware ya se hace la validación
    if (!refreshTokenCookie) {
      return router.push('/login');
    }

    try {
      const decodeRefreshToken = await jwtVerify(
        refreshTokenCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const refreshToken = decodeRefreshToken.payload.refreshToken as string;
      const expires_in = decodeRefreshToken.payload.expires_in as number;

      //if (expires_in < Date.now()) {
      if (1 < Date.now()) {
        const data = {
          client_id: process.env.LOGIN_CLIENT_ID,
          scope: process.env.LOGIN_SCOPE,
          refresh_token: refreshToken,
          grant_type: process.env.LOGIN_GRANT_TYPE_REFRESH,
          client_secret: process.env.LOGIN_CLIENT_SECRET,
        };

        try {
          auth = await queryClient.fetchQuery(['auth_refresh'], () =>
            authCode(data)
          );
          console.log(auth);
          const refreshToken = jwt.sign(
            {
              refreshToken: auth.refresh_token,
              expires_in: Date.now() + auth.expires_in * 1000,
            },
            process.env.JWT_SECRET
          );
          Cookies.remove('ecosurToken');
          Cookies.remove('refreshToken');
          Cookies.set('ecosurToken', auth.access_token, {
            expires: (1 / 86400) * auth.expires_in,
          });
          Cookies.set('refreshToken', refreshToken, {
            expires: (1 / 86400) * auth.expires_in,
          });
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      isError.message = error;
      isError.check = true;
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      Cookies.remove('ecosurToken');
      //Cookies.remove('refreshToken');
      router.push('/login');
    } */
  };

  return <></>;
};

export default DataComponent;
