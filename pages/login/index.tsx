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
import Routes from '../../Routes';

type TabsProperties = {
  title: string;
  component: React.ReactElement;
};

const Auth = ({ user }: { user: EcosurAuth }) => {
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
      Cookies.remove('selectedRol');
      Cookies.remove('userRoles');
      Cookies.remove('user');
      Cookies.remove('ecosurToken');
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
};

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  const isError = {
    message: '',
    check: false,
  };
  const check = {
    isPermited: false,
    index: -1,
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
        context.res.setHeader('Set-Cookie', [
          `userRoles=${tokenRoles}; Max-Age=86400000`,
          `user=${tokenUser}; Max-Age=86400000`,
          `ecosurToken=${auth.access_token}; Max-Age=${auth.expires_in}`, //The new token
        ]);

        const selectedRolToken = context.req.cookies.selectedRol;

        const decodeSelected = await jwtVerify(
          selectedRolToken,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const selectedRol = decodeSelected.payload.selectedRol as Roles;

        Routes.forEach(values => {
          check.index = values.roles.indexOf(selectedRol);
        });

        if (check.index === -1) throw 'Error en la redirección';

        return {
          redirect: {
            permanent: false,
            destination: Routes[check.index].path,
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
