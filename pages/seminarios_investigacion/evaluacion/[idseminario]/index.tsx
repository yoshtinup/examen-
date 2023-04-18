import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import Evaluacion from '@modules/seminarios_investigacion/submodules/estudiante/Evaluacion';

export default function EvaluacionSeminarioEstudiantePage() {
  const router = useRouter();
  const idseminario = router.query.idseminario;
  if (!idseminario) return <CircularProgress />;
  return <Evaluacion idseminario={Number(idseminario)} />;
}
