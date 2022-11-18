import {
  BasicTabs,
  LoginInternals,
  LoginExternals,
} from '@modules/auth/components';
import { Grid, Box, Container } from '@mui/material';
import { authCode, tokenValidation } from '@modules/auth/queries';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import {
  EcosurAuth,
  AuthCode,
  AuthToken,
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
        component: (
          <LoginInternals
            rolesActive={true}
            instructions={
              <div>
                <p
                  style={{
                    margin: '0px 0px 10px 0px',
                    textAlign: 'justify',
                  }}
                >
                  Para acceder debe ser:
                </p>
                <ul>
                  <li>Personal académico activo de ECOSUR</li>
                  <li>Contar con una cuenta de correo de ECOSUR</li>
                </ul>
                <p>
                  Primero seleccione el rol de acuerdo al proceso de Posgrado
                  que desea realizar y haga clic en el botón <b>"Microsoft"</b>
                </p>
              </div>
            }
          />
        ),
      },
      {
        title: 'Externos',
        component: <LoginExternals />,
      },
      {
        title: 'Estudiantes',
        component: (
          <LoginInternals rolesActive={false} instructions={<div></div>} />
        ),
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
      //router.push('/login'); //Check
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ padding: '5px 0px' }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            id="SectionLogin"
          >
            <Grid item xs={6} lg={2} sm={2}>
              <a>
                <img
                  id="logoEcosur"
                  src="https://estancias-estudiantes-externos.ecosur.mx/static/media/logo-ecosur.1e134fb2163d7df4654a.png"
                  alt="logo"
                />
              </a>
            </Grid>
            <Grid item xs={6} lg={10} sm={10}>
              <h1 style={{ color: 'rgb(197, 107, 22) !important' }}>
                Sistema de Información de Posgrado (SIP)
              </h1>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ backgroundColor: '#fff', padding: '80px 0px' }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item xs={6} lg={6} sm={6} style={{ paddingRight: '60px' }}>
              <h3>Acerca de SIP</h3>
              <p style={{ color: '#4a4a4a' }}>
                SIP es el sistema de información de Posgrado el cual permite a
                estudiantes activos, personal académico interno y externo,
                personal de servicios escolares y a la coordinación de Posgrado
                realizar la gestión de los procesos relacionados con el
                Posgrado.
              </p>
              <p style={{ color: '#4a4a4a' }}>
                El sistema da soporte a procesos como: inscripciones, evaluación
                de cursos, asignación de calificaciones, evaluación de becarios
                CONACYT, entre otros.
              </p>
            </Grid>
            <Grid item xs={6} lg={6} sm={6}>
              <section id="login">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(243, 245, 247)',
                    padding: '20px 0px',
                  }}
                >
                  <BasicTabs tabs={loginComponent} />
                </div>
              </section>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ flexGrow: 1 }} style={{ padding: '20px 0px 0px' }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item xs={6} lg={4} sm={4}>
              <h3 style={{ color: '#6a6a6a' }}>
                El Colegio de la Frontera Sur
              </h3>
            </Grid>
            <Grid item xs={6} lg={8} sm={8}>
              <p style={{ color: '#6a6a6a' }}>
                <b>Soporte técnico:</b> notificaciones.posgrado@ecosur.mx.{' '}
                <b>Tel.</b> 967 67 49000 <b>Ext.</b> 1771 y 1772
              </p>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
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
  let authC: AuthCode;
  let authT: AuthToken;
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
      authC = await queryClient.fetchQuery(['auth', context.query.code], () =>
        authCode(data)
      );
    } catch (error) {
      isError.message = error;
      isError.check = true;
    }

    if (!isError.check) {
      try {
        authT = await queryClient.fetchQuery(['token'], () =>
          tokenValidation(
            `${process.env.LOGIN_API}/Autorizacion/Usuario/login`,
            authC.access_token
          )
        );
        user = await queryClient.fetchQuery(['user'], () =>
          tokenValidation(
            `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
            authT.token
          )
        );

        const studentRol = ['Estudiante'];

        const dataUser: any = user?.personal?.roles || studentRol;

        const roles = dataUser.map((value: Roles) => {
          return Roles[value];
        });

        const tokenRoles = jwt.sign(
          { userRoles: roles },
          process.env.JWT_SECRET
        );

        const tokenUser = jwt.sign({ user: user }, process.env.JWT_SECRET);
        const today = new Date();
        const beforeOneMonth = new Date().setMonth(today.getMonth() + 1);
        const exp = (beforeOneMonth - today.getTime()) / 1000;

        context.res.setHeader('Set-Cookie', [
          `userRoles=${tokenRoles}; Max-Age=${86400}; SameSite: Strict; Secure: true;`,
          `user=${tokenUser}; Max-Age=${86400}; SameSite: Strict; Secure: true;`,
          `ecosurToken=${authT.token}; Max-Age=${exp}; SameSite: Strict; Secure: true;`,
        ]);

        const selectedRolToken = context.req.cookies.selectedRol;

        const decodeSelected = await jwtVerify(
          selectedRolToken,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const selectedRol = decodeSelected.payload.selectedRol as Roles;

        check.index = Routes.findIndex(data => {
          const index = data.roles.indexOf(selectedRol);
          return data.roles[index] === selectedRol;
        });

        if (check.index === -1) throw 'Error en la redirección'; // Si no existe la configuración en Routes.ts también retorna un -1

        const redirect = context.query.state;

        return {
          redirect: {
            permanent: false,
            destination:
              redirect !== 'undefined' && redirect !== '/401'
                ? redirect
                : Routes[check.index].path,
          },
        };
      } catch (error) {
        isError.check = true;
        context.res.setHeader('Set-Cookie', [
          `userRoles=; Max-Age=0`,
          `user=; Max-Age=0`,
          `selectedRol=; Max-Age=0`,
          `ecosurToken=; Max-Age=0`,
        ]);
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
