import { atom } from 'recoil';
import { v1 } from 'uuid';

interface CurrentEvaluacion {
  idEstatus: number | string;
  observaciones: string;
}

export const initialState = {
  idEstatus: '',
  observaciones: '',
} as CurrentEvaluacion;

export const evaluacionAtom = atom({
  key: `evaluacion/${v1()}`,
  default: initialState,
});
