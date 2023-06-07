import Roles from '@definitions/Roles';

type RoutesProps = {
  path: string;
  all_math?: boolean;
  roles: Roles[];
};

const Routes: RoutesProps[] = [
  {
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
    path: '/evaluaciondocente',
    all_math: true,
    roles: [
      Roles.Estudiante,
      
    ],
  },
  {
    path: '/seminarios_investigacion',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ],
  },
  {
    path: '/inscripciones',
    all_math: true,
    roles: [
      Roles.Servicios_Escolares,
    ],
  },  
  {
    path: '/servicios_escolares',
    all_math: true,
    roles: [
      Roles.Estudiante,
      Roles.Servicios_Escolares,
    ],
  } 
];

export default Routes;

