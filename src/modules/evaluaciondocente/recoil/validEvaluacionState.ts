import { atom } from 'recoil';
import { ErroresEvaluacion } from '@modules/evaluaciondocente/types/evaluacionState';

export const validEvaluacionState = atom({
  key: 'validEvaluacionState',
  default: {} as ErroresEvaluacion,
});
