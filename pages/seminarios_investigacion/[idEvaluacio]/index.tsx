import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import DetallesSeminarioInvestigacion from '@modules/seminarios_investigacion';

export default function ConsejoTutelarAlumnoPage() {
  const router = useRouter();
  const idEvaluacio = router.query.idEvaluacio;
  if (!idEvaluacio) return <CircularProgress />;
  return <DetallesSeminarioInvestigacion idEvaluacionSeminario={Number(idEvaluacio)} />;
}
