import React from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { rolStateAtom } from '@modules/auth/recoil';
import { estudianteCTState } from '../../recoil';
import Roles from '@definitions/Roles';
import message from '../message';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import * as yup from 'yup';
import { Formik, FormikProps, Form, Field } from 'formik';
import { EcosurFormSelect, EcosurFormTextField } from 'ecosur-ui';
import { Button, Stack, Container, CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
import { EvaluacionIntegrante } from '@modules/consejo_tutelar/types';
import { Perfil } from '../../components';
import InstruccionesEnlaces from './InstruccionesEnlacesIntegrante';

const options = [
  {
    value: true,
    label: 'ACEPTAR ser parte del consejo tutelar',
  },
  {
    value: false,
    label: 'NO ACEPTAR ser parte del consejo tutelar',
  },
];

const initialValues: EvaluacionIntegrante = {
  aprobo: true,
  comentario: '',
};

const validationSchema = yup.object({
  aprobo: yup.boolean().nullable(false).required('Es requerida su evaluación'),
  comentario: yup
    .string()
    .nullable(true)
    .when('aprobo', {
      is: false,
      then: yup
        .string()
        .nullable(false)
        .required('Es necesario agregar un comentario'),
    })
    .notRequired(),
});

type EvaluacionIntegranteData = {
  matricula: number;
  evaluacion: EvaluacionIntegrante;
};

const Integrante = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  const [disabled, setDisabled] = React.useState<boolean>(
    estudiante.IdEstatusCT != 2
  );
  const { mutate, isLoading } = useMutation(
    async (e: EvaluacionIntegranteData) =>
      await ConsejoTutelarQuerys.integranteRevisar(e.matricula, e.evaluacion),
    {
      onSuccess: () => {
        message();
        setDisabled(true);
      },
      onError: () => message(true),
    }
  );
  const handleSubmit = (evaluacion: EvaluacionIntegrante) => {
    mutate({ matricula, evaluacion });
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        id="SectionLogin"
        style={{ padding: '15px 50px' }}
      >
        <InstruccionesEnlaces />
        <h4>Datos del/la estudiante</h4>
        <Perfil />
        {!disabled && (
          <>
            <h4>Aceptar/declinar ser parte del CT</h4>
            <Grid container>
              <Grid item xs={5}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {(formik: FormikProps<EvaluacionIntegrante>) => (
                    <Form>
                      <Stack spacing={2} sx={{ p: 5 }}>
                        <Field
                          fullWidth
                          name="aprobo"
                          label="Seleccione una opción"
                          options={options}
                          component={EcosurFormSelect}
                        />
                        {!formik.values.aprobo && (
                          <Field
                            fullWidth
                            id="comentario"
                            name="comentario"
                            label="Razón de no aceptación"
                            multiline
                            rows={10}
                            variant="outlined"
                            placeholder="Escriba la razón por la que no acepta ser parte del consejo tutelar del estudiante"
                            component={EcosurFormTextField}
                          />
                        )}
                        <Button
                          variant="contained"
                          style={{ marginTop: '60px' }}
                          type="submit"
                          disabled={disabled}
                          sx={{ width: 250 }}
                        >
                          Guardar
                        </Button>
                        {isLoading && <CircularProgress />}
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Integrante;
