import { atom } from 'recoil';
import { DatosMateria } from '@modules/evaluaciondocente/types/evaluacionState';

export const materiaState = atom({
  key: 'materiaState',
  default: {} as DatosMateria,
});
