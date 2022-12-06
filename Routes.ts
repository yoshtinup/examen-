import Roles from '@definitions/Roles';

type RoutesProps = {
  path: string;
  all_math?: boolean;
  roles: Roles[];
};

const Routes: RoutesProps[] = [
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
];

export default Routes;
