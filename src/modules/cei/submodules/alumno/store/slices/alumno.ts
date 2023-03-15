import { v1 } from 'uuid';

interface CurrentAlumnoItem {
  matricula: number;
  idFormulariosRespuestas: number;
  tesis: string;
  status: string;
}

/*interface CurrentAlumno {
  alumno: CurrentAlumnoItem;
}*/

import { atom } from 'recoil';
export const alumnoAtom = atom({
  key: `alumno/${v1()}`,
  default: {} as CurrentAlumnoItem,
});
