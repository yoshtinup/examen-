import React, { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, Alert } from '@mui/material';
import {
  DropdownButton,
  DropdownContainer,
  TextContainer,
  DropdownList,
  DropdownListItem,
} from './Styles';
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
  const [localError, setLocalError] = useState(true);
 
  const handleChange = (e, child) => {
    // if (e.target.value === 0) {
    //   setLocalError('Respuesta requerida');
    // }
    setSelectedOption({...selectedOption,[child.props.parent]: e.target.value});
    //console.log(child.props.parent);
    //console.log(e.target.value);
   
    setLocalError(e.target.value !== 0);
    //console.log(localError);
  }

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
      {!localError && (
        <Alert variant="filled" severity="warning">
          {' '}
          La pregunta no puede quedar vacia.
        </Alert>
      )}
    </div>
  );
};

export default PlanValoration;
