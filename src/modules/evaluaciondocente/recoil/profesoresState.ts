import { atom } from 'recoil';
import { Profesor } from '@modules/evaluaciondocente/types/evaluacionState';


export const profesoresState = atom({
  key: 'profesoresState',
  default: [] as Profesor[],
});
