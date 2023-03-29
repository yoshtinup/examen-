import React from 'react';
import Pregunta from '../atoms/Pregunta';

const SeccionEvaluacionProfesor = ({
  seccion,
  profesor,
  handleRespuestasChange,
}) => {
  return (
    <div>
      <h3>{seccion.seccion}</h3>
      <p>{seccion.descripcion}</p>
      {seccion.preguntas &&
        seccion.preguntas.map(pregunta => (
          <Pregunta
            key={pregunta.key}
            pregunta={pregunta}
            respuestaValue={profesor.respuestas.selects[pregunta.key]}
            handleRespuestasChange={handleRespuestasChange}
            profesor={profesor}
          />
        ))}
      {seccion.subsection &&
        seccion.subsection.map(subseccion => {
          return (
            <>
              <p>
                <b>{subseccion.descripcion}</b>
              </p>
              <div>
                {subseccion.preguntas.map(pregunta => (
                  <Pregunta
                    key={pregunta.key}
                    pregunta={pregunta}
                    respuestaValue={
                      pregunta.type === 'textArea'
                        ? profesor.respuestas?.textAreas?.[pregunta.key]
                        : profesor.respuestas?.selects?.[pregunta.key]
                    }
                    handleRespuestasChange={handleRespuestasChange}
                    profesor={profesor}
                  />
                ))}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default SeccionEvaluacionProfesor;
