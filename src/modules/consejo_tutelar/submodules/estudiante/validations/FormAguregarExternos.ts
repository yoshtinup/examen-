import { AsesorExterno } from '@modules/consejo_tutelar/types';
import * as yup from 'yup';

const validationSchemaAsesorExterno = yup.object({
  id: yup.number().nullable(true).notRequired(),
  apellidoPaterno: yup
    .string()
    .required('El apellido es requerido')
    .matches(/^[aA-zZ\s]+$/, 'Solo se aceptan letras del alfabeto'),
  apellidoMaterno: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'Solo se aceptan letras del alfabeto'),
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .matches(/^[aA-zZ\s]+$/, 'Solo se aceptan letras del alfabeto'),
  email: yup
    .string()
    .email('No es valido el correo electrónico')
    .required('El correo electrónico es requerido'),
  institucion: yup.string().required('El institución es requerida'),
  grado: yup.string().required('El grado es requerido'),
  idParticipacion: yup.number().required('la participación es requerida'),
  argumentacion: yup.string().required('La argumentación es requerida'),
  codirectorInfo: yup
    .object()
    .nullable(true)
    .when('idParticipacion', {
      is: 33,
      then: yup
        .object({
          sNI: yup.string().required('Este campo es requerido'),
          numPubArb: yup.number().required('Este campo es requerido'),
          numEstMaestria: yup.number().required('Este campo es requerido'),
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
  grado: 'Maestría',
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
