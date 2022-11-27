import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login, tokenValidation, resetPassword } from '@modules/auth/queries';
import { Box, Typography, Input, Button, Link } from '@mui/material';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Roles from '@definitions/Roles';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Swal from 'sweetalert2';

export const LoginExternals: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);
  const [resetPasswordForm, setResetPasswordForm] =
    React.useState<boolean>(false);
  const schema = Yup.object().shape(
    !resetPasswordForm
      ? {
          email: Yup.string()
            .required('Este campo es requerido')
            .email('Correo electrónico inválido'),
          password: Yup.string().required('Este campo es requerido'),
          //.min(8, 'La contraseña debe tener al menos 8 caracteres'),
        }
      : {
          email: Yup.string()
            .required('Este campo es requerido')
            .email('Correo electrónico inválido'),
        }
  );
  const formikValues = !resetPasswordForm
    ? { email: '', password: '' }
    : { email: '' };

  /* const sumbitForm = (user: any) => {
    const {
      isLoading: isLoadingLogin,
      error: errorLogin,
      data: dataLogin,
    } = useQuery('login', () => login(user));

    if (isLoadingLogin) return 'Loading...';

    if (errorLogin) return alert(errorLogin);

    if (dataLogin) console.log(dataLogin);

    const {
      isLoading: isLoadingToken,
      error: errorToken,
      data: dataToken,
    } = useQuery('user', () =>
      tokenValidation(
        `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
        dataLogin.access_token
      )
    );

    if (isLoadingToken) return 'Loading...';

    if (errorToken) return alert(errorToken);

    if (dataToken) console.log(dataToken);
  }; */

  const handleRequest = (user: any) => {
    if (!user.password) {
      resetPassword(
        user.email,
        `${process.env.LOGIN_API}/Autorizacion/Usuario/Externo/RecuperarPassword`
      )
        .then(result => {
          if (!result.message) throw result.title;

          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: 'Se han enviado sus datos de acceso, revise su correo electrónico',
          });
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: '¡Atención!',
            text: err,
          });
        });

      return;
    }
    //sumbitForm(user);
    login(user)
      .then(result => {
        if (result.message) {
          return Swal.fire({
            icon: 'info',
            title: '',
            text: result.message,
          });
        }
        tokenValidation(
          `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
          result.token
        )
          .then(user => {
            const today = new Date();
            const beforeOneMonth = new Date().setMonth(today.getMonth() + 1);
            const exp = beforeOneMonth - today.getTime();
            const days = Math.ceil(exp / (1000 * 3600 * 24));

            Cookies.set('ecosurToken', result.token, {
              expires: days,
              samesite: 'Strict',
              secure: true,
            });

            const userRolesToken = jwt.sign(
              { userRoles: [Roles.Externo] },
              process.env.JWT_SECRET
            );
            Cookies.set('userRoles', userRolesToken, {
              expires: 1,
              samesite: 'Strict',
              secure: true,
            });

            const userToken = jwt.sign({ user }, process.env.JWT_SECRET);
            Cookies.set('user', userToken, {
              expires: 1,
              samesite: 'Strict',
              secure: true,
            });

            const selectedRolToken = jwt.sign(
              { selectedRol: Roles.Externo },
              process.env.JWT_SECRET
            );
            Cookies.set('selectedRol', selectedRolToken, {
              expires: days,
              samesite: 'Lax',
              secure: true,
            });

            setRol(Roles.Externo);
            setUserInfo(user);
            router.push('/consejo_tutelar');
          })
          .catch();
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: '¡Atención!',
          text: err,
        });
      });
  };

  /* React.useEffect(() => {
    console.log(validation);
    console.log(resetPassword);
    if (resetPassword) {
      delete validation.password;
    } else {
      validation['password'] = Yup.string().required('Este campo es requerido');
    }
    console.log(validation);
  }, [resetPassword]); */

  return (
    <Formik
      validationSchema={schema}
      initialValues={formikValues}
      onSubmit={values => {
        handleRequest(values);
      }}
    >
      {({ values, errors, touched, resetForm, handleChange, handleSubmit }) => (
        <Box>
          {!resetPasswordForm ? (
            <div
              style={{
                position: 'relative',
                textAlign: 'center',
                width: '360px',
              }}
            >
              <form noValidate onSubmit={handleSubmit}>
                <p style={{ textAlign: 'justify', padding: '20px 0px' }}>
                  Acceda con su correo electrónico y contraseña. Si no tiene o
                  recuerda su contraseña haga clic en el enlace{' '}
                  <b>¿Haz olvidado tu contraseña?</b> para obtenerla.
                </p>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Correo electrónico"
                  style={{ width: '80%' }}
                />
                <Typography color="error" variant="caption" paragraph>
                  {errors.email && touched.email && errors.email}
                </Typography>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Contraseña"
                  style={{ width: '80%' }}
                />
                <Typography color="error" variant="caption" paragraph>
                  {errors.password && touched.password && errors.password}
                </Typography>
                <Typography
                  style={{ margin: '20px 0px', cursor: 'pointer' }}
                  onClick={() => {
                    setResetPasswordForm(true);
                    resetForm();
                  }}
                >
                  <Link>¿Haz olvidado tu contraseña?</Link>
                </Typography>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#fff', color: '#000' }}
                  variant="contained"
                >
                  Ingresar
                </Button>
              </form>
            </div>
          ) : (
            <div
              style={{
                position: 'relative',
                textAlign: 'center',
                width: '360px',
              }}
            >
              <form noValidate onSubmit={handleSubmit}>
                <p style={{ textAlign: 'justify', padding: '20px 0px' }}>
                  Para recuperar su contraseña, introduzca el correo electrónico
                  en el cual recibió alguna notificación del sistema de
                  Posgrado, en caso, de no recordarlo solicítelo a {''}
                  <Link
                    className="clink"
                    href="mailto:notificaciones@ecosur.mx"
                  >
                    notificaciones@ecosur.mx
                  </Link>
                  , envíe su nombre completo.
                </p>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Correo electrónico"
                  style={{ width: '80%' }}
                />
                <Typography color="error" variant="caption" paragraph>
                  {errors.email && touched.email && errors.email}
                </Typography>
                <Typography
                  style={{ margin: '20px 0px', cursor: 'pointer' }}
                  onClick={() => {
                    setResetPasswordForm(false);
                    resetForm();
                  }}
                >
                  <Link>Inicia sesión</Link>
                </Typography>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#fff', color: '#000' }}
                  variant="contained"
                >
                  Recuperar
                </Button>
              </form>
            </div>
          )}
        </Box>
      )}
    </Formik>
  );
};
