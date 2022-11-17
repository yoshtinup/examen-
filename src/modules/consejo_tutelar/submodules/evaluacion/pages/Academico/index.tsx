import { useRecoilValue } from 'recoil';
import { EstudianteCT } from '../../types';
import { estudianteCTState } from '../../recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import Integrante from './Integrante';
import DirectorTesis from './DirectorTesis';

const Academico = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const estudiante: EstudianteCT = useRecoilValue(estudianteCTState);
  const isDirector: boolean =
    estudiante.DirectorTesis[0].Persona.id ===
    user.personal?.identificadorPosgrado;
  if (isDirector) return <DirectorTesis />;
  return <Integrante />;
};

export default Academico;
