import { AsesorExterno } from '@modules/consejo_tutelar/types';
import * as yup from 'yup';

const validationSchemaAsesorExterno = yup.object({
  id: yup.number().nullable(true).notRequired(),
  apellidoPaterno: yup.string().required('El apellido es requerido'),
  apellidoMaterno: yup.string().required('El apellido es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  email: yup
    .string()
    .email('No es un email valido')
    .required('El email es requerido'),
  institucion: yup.string().required('El institucion es requerida'),
  grado: yup.string().required('El grado es requerido'),
  idParticipacion: yup.number().required('la participacion es requerida'),
  argumentacion: yup.string().required('La argumentacion es requerida'),
  codirectorInfo: yup
    .object()
    .nullable(true)
    .when('idParticipacion', {
      is: 33,
      then: yup
        .object({
          sNI: yup.string().required('Este campo es requerido'),
          numPubArb: yup.number().required('Este campo es requerido'),
          numEstMaestria: yup.number().required('Este campo es requirido'),
          numEstDoc: yup.number().required('Este campo es requerido'),
        })
        .required(),
    }),
});

const initialValuesAsesorExterno: AsesorExterno = {
  id: null,
  apellidoPaterno: '',
  apellidoMaterno: '',
  nombre: '',
  email: '',
  institucion: '',
  grado: 'maestria',
  idParticipacion: 2,
  argumentacion: '',
  codirectorInfo: {
    sNI: 'candidato',
    numPubArb: 0,
    numEstMaestria: 0,
    numEstDoc: 0,
  },
  fileName: '',
};

export { validationSchemaAsesorExterno, initialValuesAsesorExterno };
