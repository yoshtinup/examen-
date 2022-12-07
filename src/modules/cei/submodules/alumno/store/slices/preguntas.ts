import { PreguntaItemProps } from '@moduleCEIAlumnos/__generated__/globalTypes';
import DataService from '@moduleCEIAlumnos/services/data';
import { atom, selector, useRecoilValue } from 'recoil';

export interface Preguntas {
  listPreguntas: Array<PreguntaItemProps>;
}

export const initialState = { listPreguntas: [] } as Preguntas;

/**
 * Ordenar las preguntas por orden
 * @param {PreguntaItemProps} currentQuestion
 * @param {PreguntaItemProps} previousQuestion
 * @returns
 */
function SortByOrder(
  currentQuestion: PreguntaItemProps,
  previousQuestion: PreguntaItemProps
) {
  if (currentQuestion.orden > previousQuestion.orden) {
    return 1;
  }
  if (currentQuestion.orden < previousQuestion.orden) {
    return -1;
  }
  return 0;
}

// Obtener las preguntas
export const fetchQuestions = () => async (dispatch: any) => {
  const response = useRecoilValue(preguntasSelector);
};

/*export const preguntasAtom = atom({
  key: 'preguntas',
  default: initialState,
});*/

export const preguntasSelector = selector({
  key: 'preguntas',
  get: async ({ get }) => {
    const response = await DataService.getPreguntas();
    return { listPreguntas: [...response.data].sort(SortByOrder) } as Preguntas;
  },
});
