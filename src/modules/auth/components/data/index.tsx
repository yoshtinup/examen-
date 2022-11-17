import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Routes from 'Routes';
import { QueryClient } from 'react-query';
import { EcosurAuth } from '@modules/auth/definitions/usuarioPosgrado';
import { tokenValidation } from '@modules/auth/queries';
import jwt from 'jsonwebtoken';
import Roles from '@definitions/Roles';

const DataComponent = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);

  React.useEffect(() => {
    checkRol();
  }, []);

  const checkRol = async () => {
    const ecosurTokenCookie = Cookies.get('ecosurToken');
    const selectedRolCookie = Cookies.get('selectedRol');
    let userRolesCookie = Cookies.get('userRoles');
    let userCookie = Cookies.get('user');

    // Esto no debería suceder porque desde el middleware ya se hace la validación
    if (!ecosurTokenCookie || !selectedRolCookie) {
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      Cookies.remove('ecosurToken');
      return router.push(
        router.asPath !== '/login'
          ? `/login?redirect=${router.query.redirect}`
          : '/login'
      );
    }

    if (!userRolesCookie || !userCookie) {
      const queryClient = new QueryClient();

      try {
        const user: EcosurAuth = await queryClient.fetchQuery(['user'], () =>
          tokenValidation(
            `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
            ecosurTokenCookie
          )
        );
        const studentRol = ['Estudiante'];

        const dataUser: any = user?.personal?.roles || studentRol;

        const roles = dataUser.map((value: Roles) => {
          return Roles[value];
        });

        const userToken = jwt.sign({ user }, process.env.JWT_SECRET);
        Cookies.set('user', userToken, { expires: 1 });
        userCookie = userToken;

        const tokenRoles = jwt.sign(
          { userRoles: roles },
          process.env.JWT_SECRET
        );
        Cookies.set('userRoles', tokenRoles, { expires: 1 });
        userRolesCookie = tokenRoles;

        /* return router.push(
          router.query.redirect
            ? `${router.query.redirect}`
            : '/consejo_tutelar'
        ); */
      } catch (error) {
        Cookies.remove('selectedRol');
        Cookies.remove('userRoles');
        Cookies.remove('user');
        Cookies.remove('ecosurToken');
        return;
      }
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

  return <></>;
};

export default DataComponent;
