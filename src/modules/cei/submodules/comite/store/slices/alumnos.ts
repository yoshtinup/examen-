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

/*
// ambos reductores en esencia son iguales solo que gestionan a propuestas
// historicas y actuales
const alumnosSlice = createSlice({
  name: 'alumnos',
  initialState,
  reducers: {
    setAlumnosList: (state: any, action: PayloadAction<ListAlumnosSet>) => {
      if (action.payload.propuestas.length != 0){
        state.current = action.payload.propuestas;
        if (state.current_cursor.indexOf(action.payload.cursor) == -1){
          state.current_cursor.push(action.payload.cursor)
        }
      }
    },
    setAlumnosHistoryList: (state: any, action: PayloadAction<ListAlumnosSet>) => {
      if (action.payload.propuestas.length != 0){
        state.history = action.payload.propuestas;
        if (state.history_cursor.indexOf(action.payload.cursor) == -1){
          state.history_cursor.push(action.payload.cursor)
        }
      }
    },
    removeCurrentCursor: (state: any) => {
      state.current_cursor.pop()
      state.current_cursor.pop()
    },
    removeHistoryCursor: (state: any) => {
      state.history_cursor.pop()
      state.history_cursor.pop()
    }
  }
})

export default alumnosSlice.reducer
*/

export const {
  setAlumnosList,
  setAlumnosHistoryList,
  removeCurrentCursor,
  removeHistoryCursor,
} = alumnosSlice.actions;

// Obtener las propuestas dependiendo si es un presidente o revisor
export const fetchAllAlumnos = (cursor: number) => async () => {
  const current = await DataService.getPropuestasAlumnos(cursor);
  const [alumnos, setAlumnos] = useRecoilState(alumnosSelector);
  const cursors = alumnos.current_cursor.concat(current.data.cursor);
  setAlumnos(alumnos => ({
    ...alumnos,
    current: current.data.data,
    current_cursor: cursors,
  }));
};

// Obtener las propuestas historicas dependiendo si es un presidente o revisor
export const fetchAllAlumnosHistorico = (cursor: number) => async () => {
  const history = await DataService.getPropuestasAlumnos(cursor, true);
  const [alumnosHistory, setAlumnosHistory] = useRecoilState(alumnosSelector);
  const cursors = alumnosHistory.history_cursor.concat(history.data.cursor);

  setAlumnosHistory(alumnosHistory => ({
    ...alumnosHistory,
    history: history.data.data,
    history_cursor: cursors,
  }));
};

// eliminar un cursor de navegacion
export const removeCursor = (history: boolean) => (dispatch: any) => {
  if (history) {
    dispatch(removeHistoryCursor());
  } else {
    dispatch(removeCurrentCursor());
  }
};

export const alumnosSelector = atom({
  key: `alumnos/${v1()}`,
  default: initialState,
});
