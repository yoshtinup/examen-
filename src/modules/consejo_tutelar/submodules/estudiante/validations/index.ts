export {
  validationSchemaAsesorExterno,
  initialValuesAsesorExterno,
} from './FormAguregarExternos';

export { ConformacionCT } from './conformacionCT';
export type { ValidadorCT } from './conformacionCT';

export const generos = [
  {
    value: 1,
    label: 'Masculino',
  },
  {
    value: 2,
    label: 'Femenino',
  },
];

export const grados = [
  {
    value: 'Doctorado',
    label: 'Doctorado',
  },
  {
    value: 'Maestría',
    label: 'Maestría',
  },
];

export const participacion = [
  {
    value: 2,
    label: 'Asesor',
  },
  {
    value: 33,
    label: 'Codirector',
  },
];

export const sni = [
  {
    value: 'no aplica',
    label: 'No aplica',
  },
  {
    value: 'candidato',
    label: 'Candidato',
  },
  {
    value: 'nivel 1',
    label: 'Nivel I',
  },
  {
    value: 'nivel 2',
    label: 'Nivel II',
  },
  {
    value: 'nivel 3',
    label: 'Nivel III',
  },
];
