import React, { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, Alert } from '@mui/material';
import {TextContainer} from './Styles';
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

const PlanValoration = ({ id, text, required, error }) => {
  const [selectedOption, setSelectedOption] = useRecoilState(planeacionState);
  const [localError, setLocalError] = useState(true);

  const handleChange = (e, child) => {
    setSelectedOption({...selectedOption,[child.props.parent]: e.target.value});
    setLocalError(e.target.value !== 0);
  }

  return (
    <div key={id}>
      <FormControl 
      fullWidth>
      <TextContainer> {text} </TextContainer>
      <Select
        id= {id}
        value={selectedOption.text}
        onChange={handleChange}
        required={required}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {opcionesEvaluacion.map(oeval => <MenuItem parent={id} value={oeval.key}>{oeval.text}</MenuItem>)}
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
