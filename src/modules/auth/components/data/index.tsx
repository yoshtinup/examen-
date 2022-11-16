import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Routes from 'Routes';

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
      return router.push(`/login?redirect=${router.query.redirect}`);
    }

    try {
      const decodeSelectedRol = await jwtVerify(
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
      const selectedRol = decodeSelectedRol.payload.selectedRol as number;
      /* const roles: any = userRoles.map((value: Roles) => {
        return Roles[value];
      }); */

      if (userRoles.indexOf(selectedRol) > -1) {
        const index = Routes.findIndex(data => {
          const index = data.roles.indexOf(selectedRol);
          return data.roles[index] === selectedRol;
        });

        if (index === -1)
          throw {
            message: 'Error en el index',
            code: 1,
            data: { selectedRol: selectedRol },
          };

        setRol(selectedRol);
        setUserInfo(user);

        /* if (router.asPath !== Routes[index].path) { //Check
          setTimeout(() => {
            router.push(Routes[index].path);
          }, 10000);
        } */
      } else {
        throw {
          message: 'Usuario con rol no permitido',
          code: 2,
          data: { userRoles: userRoles },
        };
      }
    } catch (error) {
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      Cookies.remove('ecosurToken');
      if (error?.code) {
        setTimeout(() => {
          router.push(`/login?redirect=${router.query.redirect}`);
        }, 10000);
        return;
      }
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
