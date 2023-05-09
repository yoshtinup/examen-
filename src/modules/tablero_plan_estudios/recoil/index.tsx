import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import { useGetCursosAlumno } from "@shared/queries";
import { atom, useRecoilValue } from "recoil";

const listaCursosEffect =
  () =>
  ({ trigger, onSet, setSelf }) => {
    const user: EcosurAuth = useRecoilValue(userStateAtom);
    const listaCursos = useGetCursosAlumno(user.estudiante.matricula);
    if (trigger === 'get' && listaCursos) {
      setSelf(listaCursos);
    }
    onSet((newValue: any) => {
      setSelf(listaCursos);
    });
  };

export const listaCursosState = atom({
  key: 'listaCursosState',
  default: [],
  effects: [listaCursosEffect()],
});