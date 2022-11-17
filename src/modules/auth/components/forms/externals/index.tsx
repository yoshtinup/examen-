import { Formik } from 'formik';
import * as Yup from 'yup';
import { login, tokenValidation } from '@modules/auth/queries';
import { Box, Typography, Input, Button } from '@mui/material';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Roles from '@definitions/Roles';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';

export const LoginExternals: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Este campo es requerido')
      .email('Correo electrónico inválido'),
    password: Yup.string().required('Este campo es requerido'),
    //.min(8, 'La contraseña debe tener al menos 8 caracteres'),
  });
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [rol, setRol] = useRecoilState(rolStateAtom);

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
          `${process.env.LOGIN_API}/Autorizacion/Usuario/Posgrado`,
          result.token
        )
          .then(user => {
            const today = new Date();
            const beforeOneMonth = new Date().setMonth(today.getMonth() + 1);
            const exp = beforeOneMonth - today.getTime();
            const days = Math.ceil(exp / (1000 * 3600 * 24));

            Cookies.set('ecosurToken', result.token, { expires: days });

            const userRolesToken = jwt.sign(
              { userRoles: [Roles.Externo] },
              process.env.JWT_SECRET
            );
            Cookies.set('userRoles', userRolesToken, { expires: 1 });

            const userToken = jwt.sign({ user }, process.env.JWT_SECRET);
            Cookies.set('user', userToken, { expires: 1 });

            const selectedRolToken = jwt.sign(
              { selectedRol: Roles.Externo },
              process.env.JWT_SECRET
            );
            Cookies.set('selectedRol', selectedRolToken, { expires: days });

            setRol(Roles.Externo);
            setUserInfo(user);
            router.push('/consejo_tutelar');
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
              <p style={{ textAlign: 'justify', padding: '20px 0px' }}>
                Para acceder debe contar con un usuario y contraseña provisto
                por el Posgrado de ECOSUR. Escríbalos en los siguientes
                recuadros.
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
              <Button
                type="submit"
                style={{ backgroundColor: '#fff', color: '#000' }}
                variant="contained"
              >
                Ingresar
              </Button>
            </form>
          </div>
        </Box>
      )}
    </Formik>
  );
};
