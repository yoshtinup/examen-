import Roles from '@definitions/Roles';

type RoutesProps = {
  title: string;
  path: string;
  all_math?: boolean;
  roles: Roles[];
};

const Routes: RoutesProps[] = [
  {
    title: "Página principal",
    path: '/home',
    all_math: true,
    roles: [
      Roles.Estudiante,
      Roles.Academico,
      Roles.Externo,
      Roles.Responsable_Orientacion,
      Roles.Coordinador_Unidad,
      Roles.Coordinacion_General_Posgrado,
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Consejo tutelar",
    path: '/consejo_tutelar',
    all_math: true,
    roles: [
      Roles.Estudiante,
      Roles.Academico,
      Roles.Externo,
      Roles.Responsable_Orientacion,
      Roles.Coordinador_Unidad,
      Roles.Coordinacion_General_Posgrado,
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Evaluación ética de protocolos de investigación",
    path: '/cei',
    all_math: true,
    roles: [
      Roles.Coordinacion_General_Posgrado,
      Roles.Presidente_CEI,
      Roles.Revisor_CEI,
      Roles.Estudiante,
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Evaluación docente",
    path: '/evaluaciondocente',
    all_math: true,
    roles: [
      Roles.Estudiante,
    ],
  },
  {
    title: "Evaluación de seminarios de investigación",
    path: '/seminarios_investigacion',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Inscripciones",
    path: '/inscripciones',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Asignaturas",
    path: '/estudiantes',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Servicios escolares",
    path: '/servicios_escolares',
    all_math: true,
    roles: [
      Roles.Estudiante,
      Roles.Servicios_Escolares,
    ],
  },
  {
    title: "Gestion de asignaturas",
    path: '/gestionAsignaturas',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ]
  },
  {
    title: "Altas y bajas de asignaturas",
    path: '/seguimientoAltasYBajas',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ]
  },
  {
    title: "Seguimiento de evaluación docente",
    path: '/seguimientoEvaluacionDocente',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ]
  },
  {
    title: "Registro de docentes",
    path: '/seguimientoRegistroDocentes',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ]
  },
  {
    title: "Asignación de calificaciones",
    path: '/seguimientoRegistroCalificaciones',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ]
  }

];

export default Routes;