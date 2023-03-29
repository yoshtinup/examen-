//export const Evaluation = "EVALUACION DOCENTE";

// export const ThemeEvaluation = "Evolución y biosfera";

// export const DOCENTES_TEXT =
//   "Eduardo Suares Morales, Manuel Elias Gutierrez, Martha Elena Valdez Moreno";

// export const Text_Introduction = `El cuestionario esta configurado por seis dimeciones
// cuantitativas, que se realacionan con competencias docentes y al final una dimencion
// cualitativa adicional para verter comentarios que completan la evaluacion. Las respuestas
// son confidenciales y los resultados seran utilizados para fines de evaluacion por parte del
// Comite de Evaluacion Docente. por lo tanto, el profesor o profesora evaluada no recivira los
// resultados direactamente. solo el resultado por dimensiones, las respuestas a las valoraciones
// y las recomendaciones que realice el comite. Toda la informacion y datos de aqui se presentan son
// confidenciales y no podran ser difundidos en ningun medio ya sea impreso o digital de conformidad
// a la Ley General de Proteccion de Datos en posesion de Sujetos Obligados vigente. Si esta de acuerdo
// inicia el formulario  `;

export const Text_Instruction = `1. Lee atentamente los enunciados y selecciona la opcion de  
evaluacion que consideres correspondiente a la asignatura y al desempeño del personal docente `;

export const Text_Instruction2 = `2. Haga clic en el boton "Enviar evaluacion". Una vez
enviada no podra modificarla. Todos los campos deben ser contestados para enviar su evaluacion`;

export const Text_Planing = `Habilidad para preparar y ejecutar la asignatura. Con base
en los contenidos, participacion del personal docente, y características del grupo de 
estudiantes.`;

export const PlaneacionQuestions = [
  {
    id: 'p_I_1',
    text: 'El programa de la asignatura (objetivos, contenidos, organizacion, actividadesde aprendizaje, criterios de evaluacion del aprendizaje, fuentes de informacion) se presenta, acuerda y entrega, en la primera sesion',
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
    text: 'Emite una opinion general sobre la asignatura y da una recomendacion para su mejora',
    required: true,
  },
  {
    id: 'valoracion_P_2',
    text: '¿Qué fue lo que mas te gusto de la asignatura?',
    required: true,
  },
  {
    id: 'valoracion_P_3',
    text: '¿Qué aspecto de la asignatura cambiarias?',
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
        key: 'p_II_5',
        text: '1.- La persona docente colabora en el desarrollo de mis habilidades de investigar o plantear y resolver problemas',
      },
      {
        key: 'p_II_6',
        text: '2.- La persona docente a través de la asignatura, busca que reflexione sobre las necesidades sociales o ambientales de mi entorno. ',
      },
      {
        key: 'p_II_7',
        text: '3.- La persona docente enriquece el aprendizaje al realimentar actividades grupales, tareas, exámenes o exposiciones y, sus comentarios me han apoyado en la reflexión sobre aciertos y desaciertos. ',
      },
      {
        key: 'p_II_8',
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
        key: 'p_III_9',
        text: '5.- La persona docente crea ambientes de aprendizaje variados. ',
      },
      {
        key: 'p_III_10',
        text: '6.- La forma en que la persona docente imparte la asignatura me ha estimulado a generar ideas, soluciones y aserciones propias. ',
      },
      {
        key: 'p_III_11',
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
        key: 'p_IV_12',
        text: '8.- La persona docente proporciona criterios específicos para realizar las actividades de aprendizaje. ',
      },
      {
        key: 'p_IV_13',
        text: '9.- Los productos generados por las actividades de aprendizaje realizadas son considerados como parte de la acreditación de la asignatura. ',
      },
      {
        key: 'p_IV_14',
        text: '10.- Las evaluaciones de las actividades de aprendizaje se desarrollan acorde a los criterios proporcionados ',
      },
      {
        key: 'p_IV_15',
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
        key: 'p_V_16',
        text: '12.- La persona docente utiliza las tecnologías de información y comunicación de acuerdo con las necesidades de los estudiantes y el programa de la asignatura.',
      },
      {
        key: 'p_V_17',
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
          { key: 'p_VI_18_1', text: 'Su formación disciplinaria' },
          { key: 'p_VI_18_2', text: 'Su origen étnico' },
          { key: 'p_VI_18_3', text: 'Su estado civil' },
          { key: 'p_VI_18_4', text: 'Su edad' },
          { key: 'p_VI_18_5', text: 'Su orientación sexual' },
          { key: 'p_VI_18_6', text: 'Su condición de salud' },
          { key: 'p_VI_18_7', text: 'Su nacionalidad' },
          { key: 'p_VI_18_8', text: 'Su forma de vida' },
        ],
      },
      {
        key: 'aula',
        descripcion: 'La persona docente dentro y fuera del aula:',
        preguntas: [
          { key: 'p_VI_19_1', text: 'Utiliza un lenguaje respetuoso' },
          { key: 'p_VI_19_2', text: 'Evita hacer burlas' },
          {
            key: 'p_VI_19_3',
            text: 'Evita hacer comentarios o preguntas incómodas de contenido sexual',
          },
          {
            key: 'p_VI_19_4',
            text: 'Evita hacer comentarios o preguntas relacionadas con la vida privada de las y los estudiantes',
          },
          {
            key: 'p_VI_20',
            text: 'Fomenta, reconoce y valora el trabajo y las aportaciones de los y las estudiantes dentro y fuera del aula',
          },
          {
            key: 'p_VI_21',
            text: 'Respeta las diferencias de opinión y privilegia el diálogo en situaciones de conflicto',
          },
        ],
      },
      {
        key: 'sugerencia',
        descripcion: '',
        preguntas: [
          {
            key: 'valoracion_P_3',
            text: '¿Qué sugieres al personal docente para mejorar la asignatura?',
            type: 'textArea',
          },
          {
            key: 'valoracion_P_4',
            text: 'Utiliza este espacio para ampliar tus respuestas a las preguntas de la sección de Ética y valores',
            type: 'textArea',
          },
        ],
      },
    ],
  },
];

export const opcionesEvaluacion = [
  { key: 0, text: '' },
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
