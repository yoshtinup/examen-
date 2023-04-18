import React, { useState } from 'react';
import { valoracionState } from '@modules/evaluaciondocente/recoil/valoracionState';
import { Alert, TextField, Typography, FormControl } from '@mui/material';
import { useRecoilState } from 'recoil';

const TextValoration = ({ id, text, required, error }) => {
  const [valoracion, setValoracion] = useRecoilState(valoracionState);
  const [localError, setLocalError] = useState(error);
  const handleChange = e => {
    if (e.target.value === '' && e.target.hasAttribute('required')) {
      setLocalError('Respuesta requerida');
    }
    setValoracion({ ...valoracion, [e.target.id]: e.target.value });
  };

  return (
    <FormControl key={id} fullWidth sx={{ m: 1 }}>
      <Typography>
        {required ? <b style={{ color: 'red' }}>* </b> : ''}
        {text}
      </Typography>
      <TextField
        id={id}
        multiline
        rows={3}
        onChange={handleChange}
        fullWidth
        required={required}
      />
      {(localError || error) && (
        <Alert variant="filled" severity="warning">
          {localError}&nbsp;
          {error ? error : ''}
        </Alert>
      )}
    </FormControl>
  );
};

export default TextValoration;
