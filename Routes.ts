import Roles from '@definitions/Roles';

const Routes = [
  {
    path: '/consejo_tutelar',
    roles: [
      Roles.Academico,
      Roles.Responsable_Orientacion,
      Roles.Coordinador_Unidad,
      Roles.Coordinacion_General_Posgrado,
      Roles.Servicios_Escolares,
    ],
  },
];

export default Routes;
