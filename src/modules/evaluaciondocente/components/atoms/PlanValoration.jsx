import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import {
  DropdownButton,
  DropdownContainer,
  TextContainer,
  DropdownList,
  DropdownListItem,
} from './Styles';
import { planeacionState } from '@modules/evaluaciondocente/recoil/planeacionState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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
  const [valido, setValido] = useState(true);
 
  const handleChange = (e, child) => {
    setSelectedOption({...selectedOption,[child.props.parent]: e.target.value});
    console.log(child.props.parent);
    console.log(e.target.value);
   
    setValido(e.target.value !== 0);
    console.log(valido);
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
      {!valido && (
        <Alert variant="filled" severity="warning">
          La pregunta no puede quedar vacia.
        </Alert>
      )}
    </div>
    
  );
};

export default PlanValoration;
