import React, { useState, useEffect } from 'react';
import { valoracionState } from '@modules/evaluaciondocente/recoil/valoracionState';
import { Alert, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { TextContainer } from '../atoms/Styles';

const TextValoration = ({ id, text, required, error }) => {
  const [valoracion, setValoracion] = useRecoilState(valoracionState);
  const [localError, setLocalError] = useState(error);
  const handleChange = e => {
    if (e.target.value === '' && e.target.hasAttribute('required')) {
      setLocalError('Dato requeridos');
    }
    setValoracion({ ...valoracion, [e.target.id]: e.target.value });
  };

  return (
    <div key={id}>
      <TextContainer> {text} </TextContainer>
      <TextField
        id={id}
        multiline
        rows={3}
        onChange={handleChange}
        fullWidth
        required={required}
      />
      {(localError || error) && (
        <Alert variant="filled" severity="error">
          {localError}&nbsp;
          {error ? error : ''}
        </Alert>
      )}
    </div>
  );
};

export default TextValoration;
