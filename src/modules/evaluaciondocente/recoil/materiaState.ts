import { atom } from 'recoil';
import { PlaneacionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';

export const materiaState = atom({
  key: 'materiaState',
  default: {} as PlaneacionDelCurso,
});
