import { useRecoilValue } from 'recoil';
import { Alert } from '@mui/material';
import { estudianteCTState } from '../recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { ConsejoTutelarAlumno } from '../components';

const Estudiante = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  if (matricula == user.estudiante?.matricula) {
    return <ConsejoTutelarAlumno />;
  }
  return <Alert>Solo puedes consultar tu propia informacion</Alert>;
};
export default Estudiante;
