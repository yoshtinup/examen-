import React from 'react';
import {
  PreguntaRespuestaItemProps,
  PreguntaItemProps,
  FormStructureProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';
import { useWatch, Control, UseFormSetValue } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import FormInputCheckbox from './FormInputCheckBox';
import FormInputText from './FormInputText';
import FormInputRadio from './FormInputRadio';
import FormInputFile from './FormInputFile';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Preguntas,
  preguntasAtom,
  preguntasSelector,
} from '../../store/slices/preguntas';

interface parameterQuestion {
  formItem: PreguntaRespuestaItemProps;
  index: number;
  control: Control<FormStructureProps>;
  setValue: UseFormSetValue<FormStructureProps>;
}
// let render =  1

/**
 * Retorna el componente deacuerdo al tipo
 * A si como asignar controlador para la pregunta que lo requiera
 * @param
 * @returns
 */
export const GenericQuestionItem: React.FC<parameterQuestion> = ({
  formItem,
  index,
  control,
  setValue,
}) => {
  const questions: Preguntas = useRecoilValue(preguntasSelector);
  // render++
  // console.log(render)

  /**
   * Algoritmo recursivo que recorre en forma de albol las subpreguntas
   * determina si deben o no estar activas
   * Este es un enfoque mejor que recorres de abajo hacia arriba
   * @param {string} value
   * @param {int} id
   */
  function setVisible(value: string, id: number = 0) {
    // Si es la primera llamada el id es el del componente en caso contrario es
    // el id mandado como pramatro en la llamda recursiva
    const currentId = id == 0 ? formItem.id : id;
    // Obtener todas las subpreguntas
    const parents = questions.listPreguntas.filter(
      question => question.parent === currentId
    );
    // Si no tiene subpreguntas termina el ciclo
    if (parents.length === 0) return;
    // Recorrer todas las subpreguntas
    parents.forEach(question => {
      // Insertar si una pregunta es visible o no
      setValue(
        `answers.${question.orden - 1}.visible`,
        question.condition === value
      );
      // llamada revursiva
      setVisible('', question.id);
    });
  }

  const radioComponent = () => (
    <FormInputRadio
      id={formItem.id}
      label={`${formItem.label}`}
      name={`answers.${index}.respuesta`}
      options={formItem.options.split(',')}
      control={control}
      value={formItem.current_value}
      setValue={setValue}
      setVisibleParent={setVisible}
    />
  );

  const inputComponent = () => (
    <FormInputText
      id={formItem.id}
      name={`answers.${index}.respuesta`}
      control={control}
      label={`${formItem.label}`}
    />
  );

  const checkComponent = () => (
    <FormInputCheckbox
      name={`answers.${index}.respuesta`}
      value={formItem.current_value}
      label={`${formItem.label}`}
      control={control}
      setValue={setValue}
    />
  );

  const labelComponent = () => (
    <FormLabel component="legend">{formItem.label}</FormLabel>
  );

  const fileComponent = () => (
    <FormInputFile
      label={formItem.label}
      id={formItem.id}
      type={parseInt(formItem.options)} // tipo de archivo
      control={control}
      setValue={setValue}
    />
  );

  const component: any = {
    radio: radioComponent,
    textarea: inputComponent,
    check: checkComponent,
    label: labelComponent,
    file: fileComponent,
  };

  // Ver el estado de la pregunta
  const visible: boolean = useWatch({
    control,
    name: `answers.${index}.visible`,
  });

  return (
    <React.Fragment key={`question-item-${formItem.id}`}>
      {visible && component[formItem.type]?.()}
    </React.Fragment>
  );
};
