import { AlumnoItemProps } from '../../__generated__/globalTypes';
import DataService from '../../services/data';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

interface ListAlumnosCursors {
  current_cursor: number[];
  history_cursor: number[];
  current: Array<AlumnoItemProps>;
  history: Array<AlumnoItemProps>;
}

interface ListAlumnosSet {
  propuestas: Array<AlumnoItemProps>;
  cursor: number;
}

// estado de la lista de propuestas de un ciclo
export const initialState = {
  current: [],
  history: [],
  current_cursor: [0],
  history_cursor: [0],
} as ListAlumnosCursors;

// Obtener las propuestas dependiendo si es un presidente o revisor
export const fetchAllAlumnos =
  (cursor: number, isPresidente: boolean) => async () => {
    const current = await DataService.getPropuestasAlumnos(cursor);
    return current.data;
  };

// Obtener las propuestas historicas dependiendo si es un presidente o revisor
export const fetchAllAlumnosHistorico =
  (cursor: number, isPresidente: boolean) => async () => {
    const history = await DataService.getPropuestasAlumnos(
      cursor,
      isPresidente
    );
    return history.data;
  };

// eliminar un cursor de navegacion
export const removeCursor = (history: boolean) => (dispatch: any) => {
  const [alumnosState, setAlumnosState] = useRecoilState(alumnosAtom);
  if (history) {
    setAlumnosState(alumnosState => ({
      ...alumnosState,
      history_cursor: alumnosState.history_cursor.filter(
        (value, index) => index !== alumnosState.history_cursor.length - 1
      ),
    }));
  } else {
    setAlumnosState(alumnosState => ({
      ...alumnosState,
      current_cursor: alumnosState.current_cursor.filter(
        (value, index) => index !== alumnosState.current_cursor.length - 1
      ),
    }));
  }
};

export const alumnosAtom = atom({
  key: `alumnos/${v1()}`,
  default: initialState,
});
