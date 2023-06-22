import { FC, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Control, UseFormSetValue } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GenericQuestionItem } from './GenericQuestionItem';
import { GenericQuestionItemHistory } from './GenericQuestionItemHistory';
import HeaderTitle from '../HeaderTitle';
import {
  PreguntaItemProps,
  PreguntaRespuestaItemProps,
  FormQuestionProps,
  RespuestaItemProps,
  FormStructureProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Preguntas, preguntasSelector } from '../../store/slices/preguntas';

interface FormProps extends FormQuestionProps {
  fields?: any;
  control?: Control<FormStructureProps>;
  setValue?: UseFormSetValue<FormStructureProps>;
}

/**
 * Generar margen de las preguntas
 * @param
 * @returns
 */
function getMarginLeft(level: number | null) {
  if (level === 1) return 0;
  return level ? level * 1.5 : 6;
}

/**
 * Generar el listado de preguntas
 * @param
 * @returns
 */
export const FormDetalles: FC<FormProps> = ({
  answers,
  history,
  fields,
  control,
  setValue,
}) => {
  const questions: Preguntas = useRecoilValue(preguntasSelector);
  const uuid = uuidv4();

  // Crar un componente por pregunta historica
  const createFormHistory = () =>
    answers.map((question: PreguntaRespuestaItemProps) => (
      <Box
        key={`Form-Box-${uuid}-${question.id}`}
        sx={{ ml: getMarginLeft(question.level), mb: 3 }}
      >
        <GenericQuestionItemHistory
          label={question.label}
          options={question.options}
          value={question.current_value}
          type={question.type}
        />
      </Box>
    ));

  // Crar un componente por pregunta
  const createForm = () => {
    return fields?.map(
      (question: RespuestaItemProps & { id: string }, index: number) => (
        <Fragment key={`Form-Current-${question.id}`}>
          <Box
            sx={{
              ml: getMarginLeft(questions.listPreguntas[index].level),
              mb: 3,
            }}
          >
            <GenericQuestionItem
              formItem={{
                ...questions.listPreguntas[index],
                current_value: question.respuesta,
              }}
              index={index}
              control={control as Control<FormStructureProps>}
              setValue={setValue as UseFormSetValue<FormStructureProps>}
            />
          </Box>
        </Fragment>
      )
    );
  };

  return (
    <Paper elevation={4}>
      <HeaderTitle
        elevation={0}
        label={
          history ? 'Respuestas historica' : 'Preguntas de aspectos éticos'
        }
      />
      <Box sx={{ padding: 3 }}>
        {!history && (
          <Typography align="justify" component="div" variant="h6" mb={4}>
            {' '}
            Por favor, a continuación responde con veracidad las siguientes
            preguntas que se relacionan con aspectos éticos que están
            involucrados directa o indirectamente en el desarrollo de tu
            investigación:
          </Typography>
        )}
        {history ? createFormHistory() : createForm()}
      </Box>
    </Paper>
  );
};
