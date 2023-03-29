import EvaluacionProfesor from './EvaluacionProfesor';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ProfesoresContainer = () => {
  const profesores = useRecoilValue(profesoresState);
  console.log(profesores);
  return (
    <div>
      {profesores.map(profesor => (
        <EvaluacionProfesor
          key={profesor.idProfesores}
          profesor={{
            ...profesor,
            respuestas: profesor.respuestas || { selects: {}, textAreas: {} },
          }}
        />
      ))}
    </div>
  );
};

export default ProfesoresContainer;
