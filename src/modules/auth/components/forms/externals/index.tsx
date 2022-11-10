import Cookies from 'js-cookie';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { login, tokenValidation } from '@modules/auth/queries';
import { useQuery } from 'react-query';
import { Box, Typography, Input, Button } from '@mui/material';

export const LoginExternals: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Este campo es requerido')
      .email('Correo electrónico inválido'),
    password: Yup.string().required('Este campo es requerido'),
    //.min(8, 'La contraseña debe tener al menos 8 caracteres'),
  });

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
    //sumbitForm(user);
    login(user)
      .then(result => {
        if (result.message) {
          return alert(result.message);
        }
        tokenValidation(
          `${process.env.LOGIN_API}/Autorizacion/Usuario/Externo/Posgrado`,
          result.token
        )
          .then(() => {
            Cookies.set('ecosurToken', result.token, { expires: 1 });
          })
          .catch();
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={values => {
        handleRequest(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box>
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              width: '360px',
            }}
          >
            <form noValidate onSubmit={handleSubmit}>
              <Image
                src="/icons/ecosur.svg"
                alt="ECOSUR"
                width={110}
                height={150}
              />
              <p style={{ margin: '0px 0px 20px 0px', textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum quis est ex. Quisque non maximus elit, in malesuada
                lacus. Curabitur non ornare lacus. Ut id arcu a augue eleifend
                molestie ut sed erat. Donec et pharetra neque, a imperdiet
                dolor. Sed at elit eget nibh malesuada dignissim quis et odio.
                Suspendisse vehicula justo id felis tempor, et efficitur orci
                condimentum.
              </p>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Correo electrónico"
              />
              <Typography color="error" variant="caption" paragraph>
                {errors.email && touched.email && errors.email}
              </Typography>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Contraseña"
              />
              <Typography color="error" variant="caption" paragraph>
                {errors.password && touched.password && errors.password}
              </Typography>
              <Button type="submit" color="success" variant="contained">
                Login
              </Button>
            </form>
          </div>
        </Box>
      )}
    </Formik>
  );
};
