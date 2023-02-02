// Slice con la informacion basica de un alumno util para realizar llamados

import { atom } from 'recoil';
import { v1 } from 'uuid';

// a la api y pasar solo a que propuesta se le realiza una accion
interface CurrentAlumnoItem {
  matricula: number;
  idFormulariosRespuestas: number;
  tesis: string;
  estatus: string;
}

interface CurrentAlumno {
  alumno: CurrentAlumnoItem;
}

export const initialState = { alumno: {} } as CurrentAlumno;

/*
const alumnoSlice = createSlice({
  name: 'alumno',
  initialState,
  reducers: {
    setAlumnoInfo: (state: any, action: PayloadAction<CurrentAlumno>) => {
      state.alumno = action.payload.alumno;
    },
    setEstatus: (state: any, action: PayloadAction<string>) => {
      state.alumno.estatus = action.payload;
    },
  }
})


export const { setAlumnoInfo, setEstatus } = alumnoSlice.actions

export const setAlumno = (alumno: CurrentAlumno) => (dispatch: any) => {
  dispatch(setAlumnoInfo(alumno))
}

export default alumnoSlice.reducer
*/
export const alumnoAtom = atom({
  key: `alumno/${v1()}`,
  default: initialState,
});
