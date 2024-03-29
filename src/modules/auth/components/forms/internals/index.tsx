import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
} from '@mui/material';
import Roles from '@definitions/Roles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

type Props = {
  rolesActive: boolean;
  instructions: React.ReactNode;
};

export const LoginInternals: React.FC<React.PropsWithChildren<Props>> = ({
  rolesActive,
  instructions,
}) => {
  const schema = Yup.object().shape({
    rol: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });
  const router = useRouter();
  const params =
    `client_id=${process.env.LOGIN_CLIENT_ID}&` +
    'response_type=code&' +
    `redirect_uri=${process.env.LOGIN_REDIRECT_URI}/login&` +
    `scope=${process.env.LOGIN_SCOPE}&` +
    `state=${router.query.redirect}&` +
    'response_mode=query';

  const handleRequest = (data: any) => {
    const today = new Date();
    const beforeOneMonth = new Date().setMonth(today.getMonth() + 1);
    const exp = beforeOneMonth - today.getTime();
    const days = Math.ceil(exp / (1000 * 3600 * 24));
    const token = jwt.sign({ selectedRol: data.rol }, process.env.JWT_SECRET);
    Cookies.set('selectedRol', token, {
      expires: days,
      samesite: 'Lax',
      secure: true,
    });
    router.push(`${process.env.LOGIN_MICROSOFT}/authorize?${params}`);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={!rolesActive ? { rol: Roles.Estudiante } : { rol: -1 }}
      onSubmit={values => {
        handleRequest(values);
      }}
    >
      {({ values, errors, touched, handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Box>
            <div
              style={{
                position: 'relative',
                textAlign: 'center',
                width: '85vw',
                maxWidth: '360px',
                padding: '38px 0px 5px 0px',
                borderRadius: '2px',
                margin: 'auto'
              }}
            >
              {instructions}
              <div
                style={
                  rolesActive
                    ? { margin: '0px 0px 10px 0px' }
                    : { display: 'none' }
                }
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    labelId="rol-label"
                    id="rol-select"
                    autoWidth
                    label="Rol"
                    defaultValue={0}
                    name="rol-select"
                  >
                    <MenuItem value={0} disabled>
                      Seleccione un rol
                    </MenuItem>
                    <MenuItem
                      value={Roles.Academico}
                      onClick={() => {
                        values.rol = Roles.Academico;
                      }}
                    >
                      Académico
                    </MenuItem>
                    <MenuItem
                      value={Roles.Coordinacion_General_Posgrado}
                      onClick={() => {
                        values.rol = Roles.Coordinacion_General_Posgrado;
                      }}
                    >
                      Coordinación general posgrado
                    </MenuItem>
                    <MenuItem
                      value={Roles.Coordinador_Unidad}
                      onClick={() => {
                        values.rol = Roles.Coordinador_Unidad;
                      }}
                    >
                      Coordinación unidad
                    </MenuItem>
                    <MenuItem
                      value={Roles.Responsable_Orientacion}
                      onClick={() => {
                        values.rol = Roles.Responsable_Orientacion;
                      }}
                    >
                      Responsable Orientación
                    </MenuItem>
                    <MenuItem
                      value={Roles.Servicios_Escolares}
                      onClick={() => {
                        values.rol = Roles.Servicios_Escolares;
                      }}
                    >
                      Servicios escolares
                    </MenuItem>
                    <MenuItem
                      value={Roles.Presidente_CEI}
                      onClick={() => {
                        values.rol = Roles.Presidente_CEI;
                      }}
                    >
                      Coordinador(a) CEI
                    </MenuItem>
                    <MenuItem
                      value={Roles.Revisor_CEI}
                      onClick={() => {
                        values.rol = Roles.Revisor_CEI;
                      }}
                    >
                      Revisor CEI
                    </MenuItem>
                  </Select>
                </FormControl>
                <Typography color="error" variant="caption" paragraph>
                  {errors.rol && touched.rol && errors.rol}
                </Typography>
              </div>
              <Button type="submit">
                <Image
                  src="/icons/MicrosoftLogo.png"
                  alt="LOGIN"
                  width={100}
                  height={40}
                  style={{
                    background: '#fff',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    cursor: 'pointer',
                  }}
                />
              </Button>
            </div>
          </Box>
        </form>
      )}
    </Formik>
  );
};
