import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

const PlanValoration = ({ id, text, required, error }) => {
  const [localError, setLocalError] = useState(error);
  const [selectedOption, setSelectedOption] = useRecoilState(planeacionState);

  const handleChange = (e, child) => {
    setSelectedOption({...selectedOption,[child.props.parent]: e.target.value});
  }

  return (
    <div>
      <TextContainer> {text} </TextContainer>
      <Select
        id= {id}
        value={''}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {opcionesEvaluacion.map(oeval => <MenuItem parent={id} value={oeval.key}>{oeval.text}</MenuItem>)}
      </Select>
      {(localError || error) && (
        <Alert variant="filled" severity="error">
          {localError}&nbsp;
          {error ? error : ''}
        </Alert>
      )}
    </div>
  );
};

export default PlanValoration;
