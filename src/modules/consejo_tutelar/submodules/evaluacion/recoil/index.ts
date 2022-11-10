import { atom } from 'recoil';
import { v1 } from 'uuid';
import { EstudianteGql } from '@shared/types';

export const matriculaState = atom({
  key: `matriculaState/${v1()}`,
  default: 0 as number,
});

export const estudianteState = atom({
  key: `estudiante/${v1()}`,
  default: {} as EstudianteGql,
});

export default matriculaState;
