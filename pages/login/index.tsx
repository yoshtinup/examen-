import {
  BasicTabs,
  LoginInternals,
  LoginExternals,
} from '@modules/auth/components';
import { authCode, tokenValidation } from '@modules/auth/queries';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import {
  EcosurAuth,
  AuthCode,
} from '@modules/auth/definitions/usuarioPosgrado';
import { QueryClient } from 'react-query';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

type TabsProperties = {
  title: string;
  component: React.ReactElement;
};

function Auth({ user }: { user: EcosurAuth }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);
  const [loginComponent, setLoginComponent] = React.useState<TabsProperties[]>(
    []
  );

  React.useEffect(() => {
    setLoginComponent([
      {
        title: 'Internos',
        component: <LoginInternals rolesActive={true} />,
      },
      {
        title: 'Externos',
        component: <LoginExternals />,
      },
      {
        title: 'Estudiantes',
        component: <LoginInternals rolesActive={false} />,
      },
    ]);

    if (user) {
      setData(user);
    }
  }, [setUserInfo, setRol, setLoginComponent]);

  const setData = async (user: EcosurAuth) => {
    try {
      const roles: any = user?.personal?.roles.map((value: Roles) => {
        return Roles[value];
      });
      const selectedRolToken = Cookies.get('selectedRol');

      const decodeselectedRolToken = await jwtVerify(
        selectedRolToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const selectedRol = decodeselectedRolToken.payload.selectedRol as number;
      if (roles.indexOf(selectedRol) > -1) {
        setRol(selectedRol);
        setUserInfo(user);
      } else {
        throw 'Usuario con rol no permitido';
      }
      setRol(roles);
    } catch (error) {
      console.log(error);
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      router.push('/login');
    }
  };

  return (
    <section id="login">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BasicTabs tabs={loginComponent} />
      </div>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  let isError = {
    message: '',
    check: false,
  };
  let auth: AuthCode;
  let user: EcosurAuth;

  if (context.query.code) {
    const data = {
      client_id: process.env.LOGIN_CLIENT_ID,
      scope: process.env.LOGIN_SCOPE,
      redirect_uri: `${process.env.LOGIN_REDIRECT_URI}/login`,
      grant_type: process.env.LOGIN_GRANT_TYPE,
      client_secret: process.env.LOGIN_CLIENT_SECRET,
      code: context.query.code,
    };

    try {
      auth = await queryClient.fetchQuery(['auth', context.query.code], () =>
        authCode(data)
      );
    } catch (error) {
      isError.message = error;
      isError.check = true;
    }

    if (!isError.check) {
      try {
        user = await queryClient.fetchQuery(['user'], () =>
          tokenValidation(
            `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
            auth.access_token
          )
        );
        const roles: any = user?.personal?.roles.map((value: Roles) => {
          return Roles[value];
        });
        const tokenRoles = jwt.sign(
          { userRoles: roles },
          process.env.JWT_SECRET
        );
        const tokenUser = jwt.sign({ user: user }, process.env.JWT_SECRET);
        context.res.setHeader('set-cookie', [
          `userRoles=${tokenRoles}; Max-Age=86400000`,
          `user=${tokenUser}; Max-Age=86400000`,
          `ecosurToken=${auth.access_token}; Max-Age=86400000`,
        ]);

        const selectedRolToken = context.req.cookies.selectedRol;

        const decodeSelected = await jwtVerify(
          selectedRolToken,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const selectedRol = decodeSelected.payload.selectedRol as number;

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
          return {
            redirect: {
              permanent: false,
              destination: '/consejo_tutelar',
            },
          };
        if (path[1])
          return {
            redirect: {
              permanent: false,
              destination: '/academicoexterno',
            },
          };
        if (path[2])
          return {
            redirect: {
              permanent: false,
              destination: '/estudiante',
            },
          };
      } catch (error) {
        isError.check = true;
      }
    }
  }

  if (isError.check) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      user: user || null,
    },
  };
}

export default Auth;
