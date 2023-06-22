import * as React from 'react';
import Swal from 'sweetalert2';
import Roles from '@definitions/Roles';
import { useRecoilValue } from 'recoil';
import { rolStateAtom } from '@modules/auth/recoil';

// hook pra ocultar un comonente si no es su rol
export const WithRol =
  (rol: Roles) => (Component: React.FC) => (props: any) => {
    // consumir un stado global
    const currentRol: Roles = useRecoilValue(rolStateAtom);
    if (currentRol === rol) {
      return <Component {...props} />;
    }
    return null;
  };

// hook pra ocultar un comonente si no se encuentra dentro de un grupo de roles
export const WithRoles =
  (roles: Roles[]) => (Component: React.FC) => (props: any) => {
    // consumir un stado global
    const currentRol: Roles = useRecoilValue(rolStateAtom);
    if (roles.indexOf(currentRol) > -1) {
      return <Component {...props} />;
    }
    return null;
  };

/**
 * @param msg - mensaje para mostrar mientras se carga contenido
 */
export function showLoading(msg: string) {
  Swal.fire({
    title: 'Guardando',
    html: msg,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(null);
    },
  });
}

export const WithRolCheck =
  (rol: Roles) =>(any)=> {
    console.log('cheq')
    const currentRol: Roles = useRecoilValue(rolStateAtom);
    if (currentRol === rol) {
      return true;
    }
    return false;
  };