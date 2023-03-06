import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from 'react-hook-form';
import {
  FormProps,
  FormStructureProps,
  RespuestaItemProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';
import { useWatch, UseFormSetValue } from 'react-hook-form';

export interface FormRadioProps extends FormProps {
  options: Array<string>;
  value: string;
  setValue: UseFormSetValue<FormStructureProps>;
  setVisibleParent: (value: string) => void;
}

/**
 * Componente que controla la insersion de valores de un inpul text
 * @param
 * @returns
 */

const FormInputRadio: React.FC<FormRadioProps> = ({
  id,
  label,
  name,
  options,
  control,
  value,
  setValue,
  setVisibleParent,
}) => {
  const [option, setOption] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  const respuestas: RespuestaItemProps[] = useWatch({
    control,
    name: `answers`,
  });

  /**
   * Evalua si se ha respondido negativamente en las sub preguntas
   * @returns
   */
  function evaluacionRespuestasNegativas() {
    const respuestasRadio: RespuestaItemProps[] = respuestas.filter(
      (respuesta: RespuestaItemProps) =>
        respuesta.visible &&
        respuesta.tipo === 'radio' &&
        respuesta.parent > 0 &&
        respuesta.respuesta === 'No'
    );
    return respuestasRadio.length > 0;
  }

  /**
   * Evalua si se ha respondido positivamente en todas las preguntas
   * @returns
   */
  function evaluacionRespuestasPositivas() {
    const respuestasRadio: RespuestaItemProps[] = respuestas.filter(
      (respuesta: RespuestaItemProps) =>
        respuesta.visible &&
        respuesta.tipo === 'radio' &&
        respuesta.parent === 0
    );

    const respuestasPositivas: RespuestaItemProps[] = respuestasRadio.filter(
      (respuesta: RespuestaItemProps) =>
        respuesta.respuesta === 'Si' || respuesta.respuesta === 'No aplica'
    );

    return respuestasRadio.length === respuestasPositivas.length;
  }

  // http://utilitics.ecosur.mx:8087/infonomia/evaluacion-etica/frontcei/issues/102
  // Asignar visivilidad a las preguntas parent con -1
  function setVisibleEspecialQuestions() {
    const respuesta: string = evaluacionRespuestasNegativas()
      ? 'No'
      : evaluacionRespuestasPositivas()
      ? 'Si'
      : '';

    respuestas
      .filter((respuesta: RespuestaItemProps) => respuesta.parent === -1)
      .forEach((current: RespuestaItemProps) => {
        setValue(
          `answers.${current.orden - 1}.visible`,
          current.condicion === respuesta
        );
      });
  }

  useEffect(() => {
    setVisibleParent(option);
    setValue(name, option);
    setVisibleEspecialQuestions();
  }, [option]);

  // Genera los radios para cada opcion
  const generateRadioOptions = () =>
    options.map((singleOption: string) => (
      <FormControlLabel
        key={`option-${singleOption}-${id}`}
        value={singleOption}
        control={<Radio />}
        label={singleOption}
      />
    ));
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({}) => (
          <RadioGroup
            row
            aria-label={label.toLowerCase()}
            name={`row-radio-buttons-group-${id}`}
            value={option}
            onChange={handleChange}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
export default FormInputRadio;
