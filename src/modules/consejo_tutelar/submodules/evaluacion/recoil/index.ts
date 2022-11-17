import { atom } from 'recoil';
import { v1 } from 'uuid';
import { EstudianteCT } from '../types';

export const estudianteCTState = atom({
  key: `estudianteCTState/${v1()}`,
  default: {} as EstudianteCT,
});
