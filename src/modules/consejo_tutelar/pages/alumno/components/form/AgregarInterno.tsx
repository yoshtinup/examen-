import React from 'react';
import * as yup from 'yup';
import { Formik, FormikProps, Form, Field } from 'formik';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EcosurFormAutocomplete } from '@shared/components/form';
import { PersonalAcademico } from '@modules/consejo_tutelar/types';

interface Interno {
  id: number;
}

const validationSchema = yup.object({
  id: yup.number().nullable(true).required('Es necesario selecionar un asesor'),
});

const initialValues: Interno = {
  id: null,
};

const ejemploData: PersonalAcademico[] = [
  {
    id: 1,
    nombre: 'Eduardo',
    apellidoPaterno: 'Lara',
    apellidoMaterno: 'Ramos',
  },
  {
    id: 2,
    nombre: 'Miguel',
    apellidoPaterno: 'Santa',
    apellidoMaterno: 'Marina',
  },
];

type Props = {
  open: boolean;
  handleClose: () => void;
};

const FormAgregarInterno: React.FC<Props> = ({ open, handleClose }) => {
  const handleSubmit = (values: Interno) => {
    console.log(values);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="seleccionar-interno-dialog-description"
    >
      <DialogTitle>{'Selecciona tu asesor interno'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText id="seleccionar-interno-dialog-description">
                hola mundo
              </DialogContentText>
              <Field
                id="id"
                name="id"
                label="Asesores Internos"
                style={{ width: '50vw' }}
                options={ejemploData}
                getOptionLabel={({
                  id,
                  nombre,
                  apellidoPaterno,
                  apellidoMaterno,
                }) => `${id} - ${nombre} ${apellidoPaterno} ${apellidoMaterno}`}
                unstructured={[{ key: 'id', defaultValue: null }]}
                component={EcosurFormAutocomplete}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancelar</Button>
            <Button variant="contained" type="submit">
              Agregar
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default FormAgregarInterno;
