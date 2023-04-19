import { atom } from 'recoil';
import { ValoracionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';

export const valoracionState = atom({
  key: 'valoracionState',
  default: {
    valoracion_P_1: '',
    valoracion_P_2: '',
  } as ValoracionDelCurso,
});
