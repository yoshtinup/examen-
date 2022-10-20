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
  codirector: yup
    .object()
    .nullable(true)
    .when('idParticipacion', {
      is: 33,
      then: yup
        .object({
          sNI: yup.string().required('hola mundo'),
          numPubArb: yup.number().required('hola mundo'),
          numEstMaestria: yup.number().required('hola mundo'),
          numEstDoc: yup.number().required('hola mundo'),
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
    sNI: 'hola',
    numPubArb: 0,
    numEstMaestria: 0,
    numEstDoc: 0,
  },
  fileName: '',
};

export { validationSchemaAsesorExterno, initialValuesAsesorExterno };
