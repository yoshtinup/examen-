import { atom } from 'recoil';
import Roles from '@definitions/Roles';
import { EcosurAuth } from '../definitions/usuarioPosgrado'
import { v1 } from 'uuid';

export const userStateAtom = atom({
  key: `userState/${v1()}`,
  default: {} as EcosurAuth,
});

export const rolStateAtom = atom({
  key: `rolState/${v1()}`,
  default: null as Roles,
});
