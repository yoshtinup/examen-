import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  Alert,
  Typography,
} from '@mui/material';
import { planeacionState } from '@modules/evaluaciondocente/recoil/planeacionState';
import { useRecoilState } from 'recoil';
import { opcionesEvaluacion } from './Text';

const PlanValoration = ({ id, text, required }) => {
  const [selectedOption, setSelectedOption] = useRecoilState(planeacionState);
  const [localError, setLocalError] = useState(true);

  const handleChange = (e, child) => {
    setSelectedOption({
      ...selectedOption,
      [child.props.parent]: e.target.value,
    });
    setLocalError(e.target.value !== 0);
  };

  return (
    <div key={id}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Typography>
          {required ? <b style={{ color: 'red' }}>* </b> : ''}
          {text}
        </Typography>
        <Select
          id={id}
          value={selectedOption[id]}
          onChange={handleChange}
          required={required}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {opcionesEvaluacion.map(oeval => (
            <MenuItem key={oeval.key} parent={id} value={oeval.key}>
              {oeval.text}
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
