import React, { useState } from 'react';
import { MenuItem, Select, FormControl, Alert } from '@mui/material';
import { opcionesEvaluacion } from '../atoms/Text';

const Pregunta = ({
  pregunta,
  respuestaValue,
  handleRespuestasChange,
  profesor,
}) => {
  const [valido, setValido] = useState(true);

  const handleSelectChange = event => {
    handleRespuestasChange(
      profesor.idProfesores,
      event.target.name,
      event.target.value,
      'select'
    );
    setValido(event.target.value !== 0);
  };

  const handleTextAreaChange = event => {
    handleRespuestasChange(
      profesor.idProfesores,
      event.target.name,
      event.target.value,
      'textArea'
    );
    setValido(event.target.value.trim() !== '');
  };

  return (
    <div>
      <label>{pregunta.text}</label>
      <div>
        {pregunta.type === 'textArea' ? (
          <textarea
            className="form-control"
            rows="5"
            name={pregunta.key}
            value={!respuestaValue ? '' : respuestaValue}
            onChange={handleTextAreaChange}
            key={pregunta.key}
            style={{ minWidth: '70%' }}
          ></textarea>
        ) : (
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <Select
              name={pregunta.key}
              value={!respuestaValue ? 0 : respuestaValue}
              onChange={handleSelectChange}
            >
              {opcionesEvaluacion.map(opcion => (
                <MenuItem key={opcion.key} value={opcion.key}>
                  {opcion.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      {!valido && (
        <Alert variant="filled" severity="warning">
          La pregunta no puede quedar vacia.
        </Alert>
      )}
    </div>
  );
};

export default Pregunta;
