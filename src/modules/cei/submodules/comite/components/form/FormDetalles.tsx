import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { GenericQuestionItem } from "./GenericQuestionItem";
import HeaderTitle from '../HeaderTitle'
import { PreguntaItemProps } from '../../__generated__/globalTypes'

type FormDetallesProps = {
  questions?: Array<PreguntaItemProps>
}

/**
 * Ordenar preguntas por orden
 * @param {PreguntaItemProps} currentQuestion
 * @param {PreguntaItemProps} previousQuestion
 * @returns {}
 */
function SortByOrder(currentQuestion: PreguntaItemProps, previousQuestion: PreguntaItemProps){
  if (currentQuestion.orden > previousQuestion.orden) {
    return 1;
  }
  if (currentQuestion.orden < previousQuestion.orden) {
    return -1;
  }
  return 0;
}

/**
 * Generar margen de las preguntas
 * @param
 * @returns
 */
function getMarginLeft(level: number | null){
  if (level === 1) return 0
  return level ? level * 1.5 : 6
}


/**
 * Generar el listado de preguntas
* @param
* @returns
*/
export const FormDetalles: FC<FormDetallesProps> = ({questions}) => {

  questions?.sort(SortByOrder)

  // Crar un componente por pregunta
  const createForm = () => (
    questions.map((question: PreguntaItemProps) => (
        <Box key={`Form-Box-${uuidv4()}-${question.id}`} sx={{ml: getMarginLeft(question.level)}}>
          <GenericQuestionItem
            label={question.label}
            options={question.options}
            value={question.current_value}
            type={question.type}
          />
        </Box>
  )))

  return (
    <Paper elevation={4}>
      <HeaderTitle elevation={0} label={history ? "Respuestas historica" : "Respuestas actuales"} />
      <Box sx={{padding: 3}}>
        {createForm()}
      </Box>
    </Paper>
  );
};
