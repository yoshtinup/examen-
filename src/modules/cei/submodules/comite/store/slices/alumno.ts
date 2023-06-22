// Slice con la informacion basica de un alumno util para realizar llamados

import { atom } from 'recoil';
import { v1 } from 'uuid';
import { EvaluadorItemProps } from '../../__generated__/globalTypes';

// a la api y pasar solo a que propuesta se le realiza una accion
interface CurrentAlumnoItem {
  matricula: number;
  idFormulariosRespuestas: number;
  tesis: string;
  estatus: string;
  evaluadores: Array<EvaluadorItemProps>;
}

interface CurrentAlumno {
  alumno: CurrentAlumnoItem;
}

export const initialState = { alumno: {} } as CurrentAlumno;

export const alumnoAtom = atom({
  key: `alumno/${v1()}`,
  default: initialState,
});
