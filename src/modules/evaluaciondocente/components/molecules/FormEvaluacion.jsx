import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import PreguntaTextArea from './PreguntaTextArea';
import SelectControl from './SelectControl';

export const opcionesEvaluacion = [
  { key: 0, text: '' },
  { key: 5, text: 'Bastante bien, Muy satisfecho/a' },
  { key: 4, text: 'Bien, Bastante satisfecho/a' },
  { key: 3, text: 'Regular, Satisfecho/a' },
  { key: 2, text: 'Mal, Poco satisfecho/a' },
  { key: 1, text: 'Muy mal, Muy insatisfecho/a' },
];

const preguntasEvaluacionADocentes = [
  {
    seccion: 'Estrategias de enseñanza-aprendizaje',
    key: 'II',
    descripcion:
      'Técnicas y métodos para facilitar la adquisición de conocimientos, habilidades y actitudes. ',
    preguntas: [
      {
        key: 'P_II_5',
        text: '1.- La persona docente colabora en el desarrollo de mis habilidades de investigar o plantear y resolver problemas',
      },
      {
        key: 'P_II_6',
        text: '2.- La persona docente a través de la asignatura, busca que reflexione sobre las necesidades sociales o ambientales de mi entorno. ',
      },
      {
        key: 'P_II_7',
        text: '3.- La persona docente enriquece el aprendizaje al realimentar actividades grupales, tareas, exámenes o exposiciones y, sus comentarios me han apoyado en la reflexión sobre aciertos y desaciertos. ',
      },
      {
        key: 'P_II_8',
        text: '4.- La persona docente propicia que relacione la teoría con ejemplos, experiencias o situaciones prácticas.',
      },
    ],
  },
  {
    seccion: 'Ambiente de aprendizaje',
    key: 'III',
    descripcion:
      'Interacción académica entre estudiantes y el personal docente ',
    preguntas: [
      {
        key: 'P_III_9',
        text: '5.- La persona docente crea ambientes de aprendizaje variados. ',
      },
      {
        key: 'P_III_10',
        text: '6.- La forma en que la persona docente imparte la asignatura me ha estimulado a generar ideas, soluciones y aserciones propias. ',
      },
      {
        key: 'P_III_11',
        text: '7.- La persona docente genera un ambiente adecuado para la libre expresión de las ideas. ',
      },
    ],
  },
  {
    seccion: 'Evaluación del aprendizaje',
    key: 'IV',
    descripcion:
      'Claridad y coherencia en las estrategias y criterios de evaluación, éstas apoyan y favorecen el aprendizaje. ',
    preguntas: [
      {
        key: 'P_IV_12',
        text: '8.- La persona docente proporciona criterios específicos para realizar las actividades de aprendizaje. ',
      },
      {
        key: 'P_IV_13',
        text: '9.- Los productos generados por las actividades de aprendizaje realizadas son considerados como parte de la acreditación de la asignatura. ',
      },
      {
        key: 'P_IV_14',
        text: '10.- Las evaluaciones de las actividades de aprendizaje se desarrollan acorde a los criterios proporcionados ',
      },
      {
        key: 'P_IV_15',
        text: '11.- La persona docente muestra apertura para la corrección de errores de apreciación en la evaluación. ',
      },
    ],
  },
  {
    seccion: 'Tecnologías de información y comunicación',
    key: 'V',
    descripcion:
      'Manejo de las tecnologías de información y comunicación como herramienta cognitiva. ',
    preguntas: [
      {
        key: 'P_V_16',
        text: '12.- La persona docente utiliza las tecnologías de información y comunicación de acuerdo con las necesidades de los estudiantes y el programa de la asignatura.',
      },
      {
        key: 'P_V_17',
        text: '13.- La persona docente promueve el uso de las tecnologías de información y comunicación para la realización de las actividades académicas.',
      },
    ],
  },
  {
    seccion: 'Ética y valores',
    key: 'VI',
    descripcion: 'Con base en el Código de conducta de ECOSUR. ',
    subsection: [
      {
        key: 'etica',
        descripcion:
          'La persona docente trata con respeto a los y las estudiantes, sin importar:',
        preguntas: [
          { key: 'P_VI_18_1', text: 'Su formación disciplinaria' },
          { key: 'P_VI_18_2', text: 'Su origen étnico' },
          { key: 'P_VI_18_3', text: 'Su estado civil' },
          { key: 'P_VI_18_4', text: 'Su edad' },
          { key: 'P_VI_18_5', text: 'Su orientación sexual' },
          { key: 'P_VI_18_6', text: 'Su condición de salud' },
          { key: 'P_VI_18_7', text: 'Su nacionalidad' },
          { key: 'P_VI_18_8', text: 'Su forma de vida' },
        ],
      },
      {
        key: 'aula',
        descripcion: 'La persona docente dentro y fuera del aula:',
        preguntas: [
          { key: 'P_VI_19_1', text: 'Utiliza un lenguaje respetuoso' },
          { key: 'P_VI_19_2', text: 'Evita hacer burlas' },
          {
            key: 'P_VI_19_3',
            text: 'Evita hacer comentarios o preguntas incómodas de contenido sexual',
          },
          {
            key: 'P_VI_19_4',
            text: 'Evita hacer comentarios o preguntas relacionadas con la vida privada de las y los estudiantes',
          },
          {
            key: 'P_VI_20',
            text: 'Fomenta, reconoce y valora el trabajo y las aportaciones de los y las estudiantes dentro y fuera del aula',
          },
          {
            key: 'P_VI_21',
            text: 'Respeta las diferencias de opinión y privilegia el diálogo en situaciones de conflicto',
          },
        ],
      },
      {
        key: 'sugerencia',
        descripcion: '',
        preguntas: [
          {
            key: 'Valoracion_P_3',
            text: '¿Qué sugieres al personal docente para mejorar la asignatura?',
            type: 'textArea',
          },
          {
            key: 'Valoracion_P_4',
            text: 'Utiliza este espacio para ampliar tus respuestas a las preguntas de la sección de Ética y valores',
            type: 'textArea',
          },
        ],
      },
    ],
  },
];

const FormEvaluacion = ({ profesor }) => {
  const [profesores, setProfesores] = useRecoilState(profesoresState);
  const handleChange = e => {
    console.log('piipiy', e.target.id, e.target.getAttribute('name'));
  };

  return (
    <>
      <div>Profesor: {profesor.name}</div>
      <br />
      {preguntasEvaluacionADocentes.map((elm, i) => (
        <div key={i}>
          {console.log(elm)}
          <p className="title">{elm.seccion}</p>
          <p className="subtitle">{elm.descripcion}</p>
          {elm.preguntas &&
            elm.preguntas.map((item, i) => (
              <>
                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                  {' '}
                  <b>{item.text}</b>{' '}
                </Typography>
                {item.type ? (
                  <Grid item xs={9}>
                    <PreguntaTextArea
                      item={item}
                      state={prof.respuestas.textAreas[item.key]}
                      id={i}
                      handleChange={handleChange}
                      msgError={msgError}
                      leyenda={prof.name}
                    />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={6}>
                      <SelectControl
                        item={item}
                        state={''}
                        id={i}
                        handleChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
              </>
            ))}
        </div>
      ))}
    </>
  );
};

export default FormEvaluacion;
