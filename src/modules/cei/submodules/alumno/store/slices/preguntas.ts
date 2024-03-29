import { PreguntaItemProps } from '@moduleCEIAlumnos/__generated__/globalTypes';
import DataService from '@moduleCEIAlumnos/services/data';
import { selector, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

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
export const fetchQuestions = () => async () => {
  useRecoilValue(preguntasSelector);
};

export const preguntasSelector = selector({
  key: `preguntas/${v1()}`,
  get: async () => {
    const response = await DataService.getPreguntas();
    return response
      ? ({ listPreguntas: [...response.data].sort(SortByOrder) } as Preguntas)
      : initialState;
  },
});
