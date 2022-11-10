import React from 'react';
import Swal from 'sweetalert2';
import FormAgregarProps from './FormAgregarProps';
import { Formik, FormikProps, Form, Field } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { AsesorExterno } from '@modules/consejo_tutelar/types';
import {
  EcosurFullDialog,
  EcosurFormSelect,
  EcosurFormTextField,
  EcosurFormAutocomplete,
  EcosurButtonFilePicker,
} from 'ecosur-ui';
import {
  validationSchemaAsesorExterno,
  initialValuesAsesorExterno,
  grados,
  participacion,
  sni,
} from '@modules/consejo_tutelar/submodules/estudiante/validations';

const btnLabelFilePicker = 'Seleccionar curriculum vitae';
const formAgregarExternoId = 'ecosur-full-dialog-ct-integrante-externo';

const FormAgregarExterno: React.FC<FormAgregarProps> = ({
  personal,
  open,
  handleClose,
  onSubmit,
}) => {
  const [noExiste, setNoExiste] = React.useState<boolean>(false);
  const [cv, setCv] = React.useState<File>(null);
  const [fileName, setFileName] = React.useState<string>(btnLabelFilePicker);
  const [isSelect, setIsSelect] = React.useState<boolean>(false);

  const BtnIcon = isSelect ? PictureAsPdfIcon : DriveFolderUploadIcon;
  const handleSubmit = (values: AsesorExterno) => {
    if (cv !== null) {
      setNoExiste(false);
      values.fileName = cv.name;
      onSubmit(values, cv);
      setFileName(btnLabelFilePicker);
      setCv(null);
      setIsSelect(false);
      handleClose();
      return;
    }
    Swal.fire({
      target: document.getElementById(formAgregarExternoId),
      icon: 'error',
      title: 'No se selecciono curriculum',
      text: 'Deve seleccionar un curriculum',
    });
  };
  const handleChange = () => {
    setNoExiste(!noExiste);
  };

  const handleChangeFile = (file: File) => {
    setFileName(`CV: ${file.name}`);
    setCv(file);
    setIsSelect(true);
  };

  return (
    <EcosurFullDialog
      id={formAgregarExternoId}
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
                  options={personal}
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
                    fullWidth
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    component={EcosurFormTextField}
                  />
                  <Field
                    fullWidth
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    label="Apellido Paterno"
                    component={EcosurFormTextField}
                  />
                  <Field
                    fullWidth
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
                spacing={2}
              >
                <Field
                  fullWidth
                  label="Grado"
                  name="grado"
                  options={grados}
                  component={EcosurFormSelect}
                />
                <Field
                  fullWidth
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
                  spacing={2}
                >
                  <Field
                    fullWidth
                    name="codirectorInfo.sNI"
                    label="SNI"
                    options={sni}
                    component={EcosurFormSelect}
                  />
                  <Field
                    fullWidth
                    id="codirectorInfo.numPubArb"
                    name="codirectorInfo.numPubArb"
                    label="Numero Pub Arb"
                    type="number"
                    component={EcosurFormTextField}
                  />
                  <Field
                    fullWidth
                    id="codirectorInfo.numEstMaestria"
                    name="codirectorInfo.numEstMaestria"
                    label="Numero Est Maestria"
                    type="number"
                    component={EcosurFormTextField}
                  />
                  <Field
                    fullWidth
                    id="codirectorInfo.numEstDoc"
                    name="codirectorInfo.numEstDoc"
                    label="Numero Est Doc"
                    type="number"
                    component={EcosurFormTextField}
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
              <EcosurButtonFilePicker
                variant="contained"
                sx={{ width: '25vw' }}
                fileType={['.pdf']}
                startIcon={<BtnIcon />}
                onChange={(e: Event) =>
                  handleChangeFile((e.target as HTMLInputElement).files[0])
                }
              >
                {fileName}
              </EcosurButtonFilePicker>
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
