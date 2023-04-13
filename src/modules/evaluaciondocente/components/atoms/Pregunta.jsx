import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  Alert,
  Typography,
} from '@mui/material';
import { opcionesEvaluacion } from '../atoms/Text';
import { useRecoilState } from 'recoil';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';

const Pregunta = ({ pregunta, respuestaValue, profesor }) => {
  const [_, setProfesores] = useRecoilState(profesoresState);
  const [valido, setValido] = useState(true);

  const handleSelectChange = event => {
    setProfesores(prevProfesores =>
      prevProfesores.map(prof => {
        if (prof.idProfesores === profesor.idProfesores) {
          return {
            ...prof,
            respuestas: {
              ...prof.respuestas,
              selects: {
                ...prof.respuestas?.selects,
                [event.target.name]: event.target.value,
              },
            },
          };
        }
        return prof;
      })
    );
    setValido(event.target.value !== 0);
  };

  const handleTextAreaChange = event => {
    setProfesores(prevProfesores =>
      prevProfesores.map(prof => {
        if (prof.idProfesores === profesor.idProfesores) {
          return {
            ...prof,
            respuestas: {
              ...prof.respuestas,
              textAreas: {
                ...prof.respuestas?.textAreas,
                [event.target.name]: event.target.value,
              },
            },
          };
        }
        return prof;
      })
    );
    setValido(event.target.value.trim() !== '');
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Typography>
        {pregunta.required ? <b style={{ color: 'red' }}>* </b> : ''}
        {pregunta.text}
      </Typography>
      <div>
        {pregunta.type === 'textArea' ? (
          <textarea
            className="form-control"
            rows="5"
            name={pregunta.id}
            value={!respuestaValue ? '' : respuestaValue}
            onChange={handleTextAreaChange}
            key={pregunta.id}
            style={{ minWidth: '70%' }}
            required={pregunta.required}
          ></textarea>
        ) : (
          <FormControl key={pregunta.id} sx={{ m: 1, minWidth: 300 }}>
            <Select
              name={pregunta.id}
              value={!respuestaValue ? 0 : respuestaValue}
              onChange={handleSelectChange}
              required={pregunta.required}
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
    </FormControl>
  );
};

export default Pregunta;
