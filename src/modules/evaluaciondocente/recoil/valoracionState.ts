import { atom } from 'recoil';
import { ValoracionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';

export const valoracionState = atom({
  key: 'valoracionState',
  default: {} as ValoracionDelCurso,
});
