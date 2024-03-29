import * as React from 'react';
import Roles from '@definitions/Roles';

// hook pra ocultar un comonente si no es su rol
export const WithRol =
  (rol: Roles) => (Component: React.FC) => (props: any) => {
    // consumir un stado global
    /* const currentRol = useAppSelector((state) => state.auth.role) */
    const currentRol = Roles.Coordinacion_General_Posgrado;
    if (currentRol === rol) {
      return <Component {...props} />;
    }
    return null;
  };

// hook pra ocultar un comonente si no se encuentra dentro de un grupo de roles
export const WithRoles =
  (roles: Roles[]) => (Component: React.FC) => (props: any) => {
    // consumir un stado global
    /* const currentRol = useAppSelector((state) => state.auth.role) */
    const currentRol = Roles.Coordinacion_General_Posgrado;
    if (roles.indexOf(currentRol) > -1) {
      return <Component {...props} />;
    }
    return null;
  };
