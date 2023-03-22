import { atom } from 'recoil';
import { PlaneacionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';

export const planeacionState = atom({
  key: 'planeacionState',
  default: {} as PlaneacionDelCurso,
});
