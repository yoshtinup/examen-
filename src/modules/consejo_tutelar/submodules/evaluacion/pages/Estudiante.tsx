import { useRecoilValue } from 'recoil';
import { Alert } from '@mui/material';
import { matriculaState } from '../recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { Perfil } from '../components';
import { useRouter } from 'next/router';

const Estudiante = () => {
  const router = useRouter();
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const matricula: number = useRecoilValue(matriculaState);
  if (matricula == user.estudiante?.matricula) {
    return <Perfil />;
  }
  return <Alert>Solo puedes consultar tu propia informacion</Alert>;
};
export default Estudiante;
