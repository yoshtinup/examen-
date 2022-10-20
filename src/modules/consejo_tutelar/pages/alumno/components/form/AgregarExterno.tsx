import React from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {
  EcosurFormSelect,
  EcosurFormTextField,
  EcosurFormAutocomplete,
} from '@shared/components/form';
import { EcosurFullDialog } from '@shared/components';

import {
  AsesorExterno,
  PersonalAcademico,
} from '@modules/consejo_tutelar/types';

import {
  validationSchemaAsesorExterno,
  initialValuesAsesorExterno,
  grados,
  participacion,
} from '@modules/consejo_tutelar/pages/alumno/validations';

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

const FormAgregarExterno: React.FC<Props> = ({ open, handleClose }) => {
  const [noExiste, setNoExiste] = React.useState(false);
  const handleSubmit = (values: AsesorExterno) => {
    console.log(values);
    setNoExiste(false);
    handleClose();
  };
  const handleChange = () => {
    setNoExiste(!noExiste);
  };

  return (
    <EcosurFullDialog
      title="Selecciona a tu integrante externo"
      open={open}
      handleClose={handleClose}
    >
      {/* FIXME: @iocampo incluir instrucciones  */}
      <Formik
        initialValues={initialValuesAsesorExterno}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaAsesorExterno}
      >
        {(formik: FormikProps<AsesorExterno>) => (
          <Form>
            <Stack spacing={2} sx={{ p: 5 }}>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChange} checked={noExiste} />
                }
                label="No existe"
              />
              {!noExiste && (
                <Field
                  id="nombre"
                  name="nombre"
                  label="Asesores Externos"
                  options={ejemploData}
                  getOptionLabel={({
                    id,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                  }) =>
                    `${id} - ${nombre} ${apellidoPaterno} ${apellidoMaterno}`
                  }
                  unstructured={[
                    { key: 'id', defaultValue: null },
                    { key: 'nombre', defaultValue: '' },
                    { key: 'apellidoPaterno', defaultValue: '' },
                    { key: 'apellidoMaterno', defaultValue: '' },
                  ]}
                  component={EcosurFormAutocomplete}
                />
              )}
              {noExiste && (
                <Stack
                  display="flex"
                  justifyContent="space-around"
                  direction="row"
                  spacing={2}
                >
                  <Field
                    style={{ width: '40vw' }}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    component={EcosurFormTextField}
                  />
                  <Field
                    style={{ width: '40vw' }}
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    label="Apellido Paterno"
                    component={EcosurFormTextField}
                  />
                  <Field
                    style={{ width: '40vw' }}
                    id="apellidoMaterno"
                    name="apellidoMaterno"
                    label="Apellido Materno"
                    component={EcosurFormTextField}
                  />
                </Stack>
              )}
              <Field
                style={{ width: '40vw' }}
                id="email"
                name="email"
                label="Correo Electronico"
                component={EcosurFormTextField}
              />
              <Field
                fullWidth
                id="institucion"
                name="institucion"
                label="Institución"
                component={EcosurFormTextField}
              />
              <Stack
                display="flex"
                justifyContent="space-around"
                direction="row"
                spacing={4}
              >
                <Field
                  label="Grado"
                  name="grado"
                  options={grados}
                  component={EcosurFormSelect}
                />
                <Field
                  label="Participacion"
                  name="idParticipacion"
                  options={participacion}
                  component={EcosurFormSelect}
                />
              </Stack>
              {formik.values.idParticipacion == 33 && (
                <Stack
                  display="flex"
                  justifyContent="space-around"
                  direction="row"
                >
                  <Field
                    style={{ width: '20vw' }}
                    id="codirectorInfo.sNI"
                    name="codirectorInfo.sNI"
                    label="SNI"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={EcosurFormTextField}
                  />
                  <Field
                    style={{ width: '20vw' }}
                    id="codirectorInfo.numPubArb"
                    name="codirectorInfo.numPubArb"
                    label="Numero Pub Arb"
                    type="number"
                    component={EcosurFormTextField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Field
                    style={{ width: '20vw' }}
                    id="codirectorInfo.numEstMaestria"
                    name="codirectorInfo.numEstMaestria"
                    label="Numero Est Maestria"
                    type="number"
                    component={EcosurFormTextField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Field
                    style={{ width: '20vw' }}
                    id="codirectorInfo.numEstDoc"
                    name="codirectorInfo.numEstDoc"
                    label="Numero Est Doc"
                    type="number"
                    component={EcosurFormTextField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
              )}
              <Field
                fullWidth
                id="argumentacion"
                name="argumentacion"
                label="Argumentacion"
                multiline
                rows={10}
                variant="outlined"
                placeholder="Escriba a qui su argumentacion"
                component={EcosurFormTextField}
              />
              {/* FIXME: Incluir filechoser */}
            </Stack>
            <Button variant="contained" type="submit" sx={{ ml: 5 }}>
              Agregar
            </Button>
          </Form>
        )}
      </Formik>
    </EcosurFullDialog>
  );
};

export default FormAgregarExterno;
