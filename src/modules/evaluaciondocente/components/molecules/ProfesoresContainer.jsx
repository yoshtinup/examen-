import EvaluacionProfesor from './EvaluacionProfesor';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import React from 'react';
import { useRecoilState } from 'recoil';

const ProfesoresContainer = () => {
  const [profesores, setProfesores] = useRecoilState(profesoresState);

  const handleRespuestasChange = (
    idProfesor,
    respuestaKey,
    respuestaValue,
    type
  ) => {
    type == 'select'
      ? setProfesores(prevProfesores =>
          prevProfesores.map(profesor => {
            if (profesor.idProfesores === idProfesor) {
              return {
                ...profesor,
                respuestas: {
                  ...profesor.respuestas,
                  selects: {
                    ...profesor.respuestas?.selects,
                    [respuestaKey]: respuestaValue,
                  },
                },
              };
            }
            return profesor;
          })
        )
      : setProfesores(prevProfesores =>
          prevProfesores.map(profesor => {
            if (profesor.idProfesores === idProfesor) {
              return {
                ...profesor,
                respuestas: {
                  ...profesor.respuestas,
                  textAreas: {
                    ...profesor.respuestas?.textAreas,
                    [respuestaKey]: respuestaValue,
                  },
                },
              };
            }
            return profesor;
          })
        );
  };

  return (
    <div>
      {profesores.map(profesor => (
        <EvaluacionProfesor
          key={profesor.idProfesores}
          profesor={{
            ...profesor,
            respuestas: profesor.respuestas || { selects: {}, textAreas: {} },
          }}
          handleRespuestasChange={handleRespuestasChange}
        />
      ))}
    </div>
  );
};

export default ProfesoresContainer;
