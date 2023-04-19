import { atom } from 'recoil';
import { PlaneacionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';

export const planeacionState = atom({
  key: 'planeacionState',
  default: {
    p_I_1: 0,
    p_I_2: 0,
    p_I_3: 0,
    p_I_4: 0,
  } as PlaneacionDelCurso,
});
