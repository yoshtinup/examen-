import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import { TextContainer } from './Styles';
import { planeacionState } from '@modules/evaluaciondocente/recoil/planeacionState';
import { useRecoilState } from 'recoil';

const opcionesEvaluacion = [
  { key: 0, text: '' },
  { key: 5, text: 'Bastante bien, Muy satisfecho/a' },
  { key: 4, text: 'Bien, Bastante satisfecho/a' },
  { key: 3, text: 'Regular, Satisfecho/a' },
  { key: 2, text: 'Mal, Poco satisfecho/a' },
  { key: 1, text: 'Muy mal, Muy insatisfecho/a' },
];

const PlanValoration = ({ pregunta, respuestaValue }) => {
  const [selectedOption, setSelectedOption] = useRecoilState(planeacionState);
  const [valido, setValido] = useState(true);

  const handleChange = e => {
    setSelectedOption({
      ...selectedOption,
      [e.target.name]: e.target.value,
    });
    setValido(e.target.value !== 0);
  };

  return (
    <div key={pregunta.id}>
      <FormControl fullWidth>
        <TextContainer> {pregunta.text} </TextContainer>
        <Select
          name={pregunta.id}
          value={!respuestaValue ? 0 : respuestaValue}
          onChange={handleChange}
          required={pregunta.required}
        >
          {opcionesEvaluacion.map(opcion => (
            <MenuItem key={opcion.key} value={opcion.key}>
              {opcion.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!valido && (
        <Alert variant="filled" severity="warning">
          La pregunta no puede quedar vacia.
        </Alert>
      )}
    </div>
  );
};

export default PlanValoration;
