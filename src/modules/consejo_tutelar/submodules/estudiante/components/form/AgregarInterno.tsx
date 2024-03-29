import React from 'react';
import FormAgregarProps from './FormAgregarProps';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EcosurFormAutocomplete } from 'ecosur-ui';
import { PersonalAcademico } from '@modules/consejo_tutelar/types';

const validationSchema = yup.object({
  id: yup.number().nullable(true).required('Es necesario selecionar un asesor'),
  apellidoPaterno: yup.string().required('El apellido es requerido'),
  apellidoMaterno: yup.string(),
  nombre: yup.string().required('El nombre es requerido'),
});

const initialValues: PersonalAcademico = {
  id: null,
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
};

const FormAgregarInterno: React.FC<FormAgregarProps> = ({
  personal,
  open,
  handleClose,
  onSubmit,
}) => {
  const handleSubmit = (values: PersonalAcademico) => {
    onSubmit(values);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="seleccionar-interno-dialog-description"
    >
      <DialogTitle>{'Agregar integrante interno'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText id="seleccionar-interno-dialog-description">
                Para agregar a una persona académica de ECOSUR, o bien
                comisionados a ECOSUR por el Programa Investigadores por México,
                localice su nombre en el siguiente cuadro, una vez localizado(a)
                selecciónelo y haga clic en el botón “Agregar”.
              </DialogContentText>
              <Field
                id="nombre"
                name="nombre"
                label="Asesores Internos"
                options={personal}
                getOptionLabel={({
                  id,
                  nombre,
                  apellidoPaterno,
                  apellidoMaterno,
                }) => `${nombre} ${apellidoPaterno} ${apellidoMaterno} - ${id}`}
                unstructured={[
                  { key: 'id', defaultValue: null },
                  { key: 'nombre', defaultValue: '' },
                  { key: 'apellidoPaterno', defaultValue: '' },
                  { key: 'apellidoMaterno', defaultValue: '' },
                ]}
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
