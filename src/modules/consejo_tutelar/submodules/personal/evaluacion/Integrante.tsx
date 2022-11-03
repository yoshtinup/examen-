import React from 'react';
import * as yup from 'yup';
import { Formik, FormikProps, Form, Field } from 'formik';
import { EcosurFormSelect, EcosurFormTextField } from '@shared/components/form';
import { Button, Stack, Container } from '@mui/material';

import { EvaluacionIntegrante } from '@modules/consejo_tutelar/types';
import { Perfil } from '../components';

const options = [
  {
    value: true,
    label: 'Aprobar',
  },
  {
    value: false,
    label: 'No aprobar',
  },
];

const initialValues: EvaluacionIntegrante = {
  aprobo: true,
  comentario: '',
};

const validationSchema = yup.object({
  aprobo: yup.boolean().nullable(false).required('Es requerida una evaluacion'),
  comentario: yup
    .string()
    .nullable(true)
    .when('aprobo', {
      is: false,
      then: yup
        .string()
        .nullable(false)
        .required('Es necesarion agregar un comentario'),
    })
    .notRequired(),
});

const Integrante = () => {
  const handleSubmit = (values: EvaluacionIntegrante) => {
    console.log('Entre');
    console.log(values);
  };

  return (
    <Container maxWidth="md">
      {/* FIXME: @iocampo agregar instrucciones */}
      <Perfil />
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
                label="Seleccionar opcion"
                options={options}
                component={EcosurFormSelect}
              />
              {!formik.values.aprobo && (
                <Field
                  fullWidth
                  id="comentario"
                  name="comentario"
                  label="Comentario"
                  multiline
                  rows={10}
                  variant="outlined"
                  placeholder="Escriba a qui su comentario"
                  component={EcosurFormTextField}
                />
              )}
              <Button variant="contained" type="submit" sx={{ width: 250 }}>
                Gruardar Evaluacion
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Integrante;
