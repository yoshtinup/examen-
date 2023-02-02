import { rolStateAtom } from '@modules/auth/recoil';
import { authAtom } from '@modules/cei/submodules/alumno/store/slices/auth';
import * as React from 'react';
import { useRecoilState } from 'recoil';

// hook pra ocultar un comonente si no es su rol
const withRole = (role: string) => (Component: React.FC) => (props: any) => {
  const [currentRole] = useRecoilState(rolStateAtom);
  console.log('role', currentRole.toString());
  // consumir un stado global
  if (currentRole.toString() === role) {
    return <Component {...props} />;
  }
  return null;
};
export default withRole;
