import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import Evaluacion from '@modules/consejo_tutelar/submodules/evaluacion';

export default function ConsejoTutelarAlumnoPage() {
  const router = useRouter();
  const matricula = router.query.matricula;
  if (!matricula) return <CircularProgress />;
  return <Evaluacion matricula={Number(matricula)} />;
}
