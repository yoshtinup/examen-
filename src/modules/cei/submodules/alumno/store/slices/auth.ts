interface Auth {
  user: number;
  isAuthenticated: boolean;
  loading: boolean;
}

// informacion de sesion
const alumnoLogin = null; //localStorage.getItem('alumno');
let init;
init = alumnoLogin ? JSON.parse(alumnoLogin) : {};
export const initialState = init as Auth;

import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  default: initialState,
});
