export const Text_Instruction = `1. Lee atentamente los enunciados y selecciona la opcion de  
evaluacion que consideres correspondiente a la asignatura y al desempeño del personal docente `;

// export const Text_Instruction2 = `2. Haga clic en el boton "Enviar evaluacion". Una vez
// enviada no podra modificarla. Todos los campos deben ser contestados para enviar su evaluacion`;

export const Text_Planing = `Habilidad para preparar y ejecutar la asignatura. Con base
en los contenidos, participación del personal docente, y características del grupo de 
estudiantes.`;

export const PlaneacionQuestions = [
  {
    id: 'p_I_1',
    text: 'El programa de la asignatura (objetivos, contenidos, organización, actividades de aprendizaje, criterios de evaluación del aprendizaje, fuentes de información) se presenta, acuerda y entrega, en la primera sesión',
    required: true,
  },
  {
    id: 'p_I_2',
    text: 'La participación del personal docente es coordinada y oportuna para la asignatura',
    required: true,
  },
  {
    id: 'p_I_3',
    text: 'Las sesiones inician y finalizan en el tiempo convenido',
    required: true,
  },
  {
    id: 'p_I_4',
    text: 'Las calificaciones, son informativas en el tiempo acordado',
    required: true,
  },
];

export const ValoracionQuestions = [
  {
    id: 'valoracion_P_1',
    text: 'Emite una opinión general sobre la asignatura y da una recomendación para su mejora',
    required: true,
  },
  {
    id: 'valoracion_P_2',
    text: '¿Qué fue lo que más te gustó de la asignatura?',
    required: true,
  },
  {
    id: 'valoracion_P_3',
    text: '¿Qué aspecto de la asignatura cambiarías?',
    required: false,
  },
];

export const preguntasEvaluacionADocentes = [
  {
    seccion: 'Estrategias de enseñanza-aprendizaje',
    key: 'II',
    descripcion:
      'Técnicas y métodos para facilitar la adquisición de conocimientos, habilidades y actitudes. ',
    preguntas: [
      {
        id: 'p_II_5',
        text: '1.- La persona docente colabora en el desarrollo de mis habilidades de investigar o plantear y resolver problemas',
        required: true,
      },
      {
        id: 'p_II_6',
        text: '2.- La persona docente a través de la asignatura, busca que reflexione sobre las necesidades sociales o ambientales de mi entorno. ',
        required: true,
      },
      {
        id: 'p_II_7',
        text: '3.- La persona docente enriquece el aprendizaje al realimentar actividades grupales, tareas, exámenes o exposiciones y, sus comentarios me han apoyado en la reflexión sobre aciertos y desaciertos. ',
        required: true,
      },
      {
        id: 'p_II_8',
        text: '4.- La persona docente propicia que relacione la teoría con ejemplos, experiencias o situaciones prácticas.',
        required: true,
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
        id: 'p_III_9',
        text: '5.- La persona docente crea ambientes de aprendizaje variados. ',
        required: true,
      },
      {
        id: 'p_III_10',
        text: '6.- La forma en que la persona docente imparte la asignatura me ha estimulado a generar ideas, soluciones y aserciones propias. ',
        required: true,
      },
      {
        id: 'p_III_11',
        text: '7.- La persona docente genera un ambiente adecuado para la libre expresión de las ideas. ',
        required: true,
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
        id: 'p_IV_12',
        text: '8.- La persona docente proporciona criterios específicos para realizar las actividades de aprendizaje. ',
        required: true,
      },
      {
        id: 'p_IV_13',
        text: '9.- Los productos generados por las actividades de aprendizaje realizadas son considerados como parte de la acreditación de la asignatura. ',
        required: true,
      },
      {
        id: 'p_IV_14',
        text: '10.- Las evaluaciones de las actividades de aprendizaje se desarrollan acorde a los criterios proporcionados ',
        required: true,
      },
      {
        id: 'p_IV_15',
        text: '11.- La persona docente muestra apertura para la corrección de errores de apreciación en la evaluación. ',
        required: true,
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
        id: 'p_V_16',
        text: '12.- La persona docente utiliza las tecnologías de información y comunicación de acuerdo con las necesidades de los estudiantes y el programa de la asignatura.',
        required: true,
      },
      {
        id: 'p_V_17',
        text: '13.- La persona docente promueve el uso de las tecnologías de información y comunicación para la realización de las actividades académicas.',
        required: true,
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
          {
            id: 'p_VI_18_1',
            text: 'Su formación disciplinaria',
            required: true,
          },
          { id: 'p_VI_18_2', text: 'Su origen étnico', required: true },
          { id: 'p_VI_18_3', text: 'Su estado civil', required: true },
          { id: 'p_VI_18_4', text: 'Su edad', required: true },
          { id: 'p_VI_18_5', text: 'Su orientación sexual', required: true },
          { id: 'p_VI_18_6', text: 'Su condición de salud', required: true },
          { id: 'p_VI_18_7', text: 'Su nacionalidad', required: true },
          { id: 'p_VI_18_8', text: 'Su forma de vida', required: true },
        ],
      },
      {
        key: 'aula',
        descripcion: 'La persona docente dentro y fuera del aula:',
        preguntas: [
          {
            id: 'p_VI_19_1',
            text: 'Utiliza un lenguaje respetuoso',
            required: true,
          },
          { id: 'p_VI_19_2', text: 'Evita hacer burlas', required: true },
          {
            id: 'p_VI_19_3',
            text: 'Evita hacer comentarios o preguntas incómodas de contenido sexual',
            required: true,
          },
          {
            id: 'p_VI_19_4',
            text: 'Evita hacer comentarios o preguntas relacionadas con la vida privada de las y los estudiantes',
            required: true,
          },
          {
            id: 'p_VI_20',
            text: 'Fomenta, reconoce y valora el trabajo y las aportaciones de los y las estudiantes dentro y fuera del aula',
            required: true,
          },
          {
            id: 'p_VI_21',
            text: 'Respeta las diferencias de opinión y privilegia el diálogo en situaciones de conflicto',
            required: true,
          },
        ],
      },
      {
        key: 'sugerencia',
        descripcion: '',
        preguntas: [
          {
            id: 'valoracion_P_3',
            text: '¿Qué sugieres al personal docente para mejorar la asignatura?',
            type: 'textArea',
            required: true,
          },
          {
            id: 'valoracion_P_4',
            text: 'Utiliza este espacio para ampliar tus respuestas a las preguntas de la sección de Ética y valores',
            type: 'textArea',
            required: true,
          },
        ],
      },
    ],
  },
];

export const opcionesEvaluacion = [
  { key: 0, text: 'Seleccionar una opción' },
  { key: 5, text: 'Bastante bien, Muy satisfecho/a' },
  { key: 4, text: 'Bien, Bastante satisfecho/a' },
  { key: 3, text: 'Regular, Satisfecho/a' },
  { key: 2, text: 'Mal, Poco satisfecho/a' },
  { key: 1, text: 'Muy mal, Muy insatisfecho/a' },
];

export const totalPreguntasEvaluacionDocente =
  preguntasEvaluacionADocentes.reduce(
    (acumulador, seccion) => {
      if (seccion.preguntas) {
        acumulador.totalTextArea += seccion.preguntas.filter(
          pregunta => pregunta.type === 'textArea'
        ).length;
        acumulador.totalSelect += seccion.preguntas.filter(
          pregunta => !pregunta.type || pregunta.type !== 'textArea'
        ).length;
      }
      if (seccion.subsection) {
        seccion.subsection.forEach(subseccion => {
          if (subseccion.preguntas) {
            acumulador.totalTextArea += subseccion.preguntas.filter(
              pregunta => pregunta.type === 'textArea'
            ).length;
            acumulador.totalSelect += subseccion.preguntas.filter(
              pregunta => !pregunta.type || pregunta.type !== 'textArea'
            ).length;
          }
        });
      }
      return acumulador;
    },
    { totalTextArea: 0, totalSelect: 0 }
  );
