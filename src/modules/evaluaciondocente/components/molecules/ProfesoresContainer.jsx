import EvaluacionProfesor from './EvaluacionProfesor';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';
const ProfesoresContainer = () => {
  const profesores = useRecoilValue(profesoresState);
  return (
    <Grid container spacing={2}>
      {profesores.map(profesor => (
        <EvaluacionProfesor
          key={profesor.idProfesores}
          profesor={{
            ...profesor,
            respuestas: profesor.respuestas || { selects: {}, textAreas: {} },
          }}
        />
      ))}
    </Grid>
  );
};

export default ProfesoresContainer;
