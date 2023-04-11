import { Home } from './components';
import { WithRol } from '@shared/hooks';
import Roles from '@definitions/Roles';
import Introduction from './components/atoms/Introduction';
import SubjectInf from './components/atoms/SubjectInf';
import Title from './components/atoms/Title';
import ProfesoresContainer from './components/molecules/ProfesoresContainer';
import PlaningContainer from './components/molecules/PlaningContainer';
import ValdocContainer from './components/molecules/ValdocContainer';
import ValorationContainer from './components/molecules/ValorationContainer';
import EvaluacionDocenteQuerys from './queries/apiRest';
import { Actividades } from './types/evaluacionState';
import { useRecoilValue } from 'recoil';
import { materiaState } from './recoil/materiaState';
import { planeacionState } from './recoil/planeacionState';
import { valoracionState } from './recoil/valoracionState';
import { profesoresState } from './recoil/profesoresState';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const HomePage = WithRol(Roles.Estudiante)(Home);

const EvaluacionDocente = () => {
  const router = useRouter();
  //console.log(router.query.idMateriasOfertaAnual);
  const materia = useRecoilValue(materiaState);
  const planeacionDelCurso = useRecoilValue(planeacionState);
  const valoracionDelCurso = useRecoilValue(valoracionState);
  const profesores = useRecoilValue(profesoresState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const idMateria = router.query.idMateriasOfertaAnual;

  const handleSend = async () => {
    setIsLoading(true);
    const data: Actividades = {
      idMateriasOfertaAnual: parseInt(idMateria.toString()),
      planeacionDelCurso,
      valoracionDelCurso,
      profesores,
    };
    console.log(data);
    //console.log(materia);

    const resultado = await EvaluacionDocenteQuerys.sendEvaluacion(data);
    if (resultado.status == 400) {
      const mapError = Object.entries(resultado.errors).map(([key, val]) => {
        return { error: key, message: val[0] };
      });
      setError(mapError);
    }
    setIsLoading(false);
  };

  return (
    <>
      <HomePage />
      <Title />
      <br />
      <SubjectInf />
      <Introduction />
      <PlaningContainer error={error} />
      <ValorationContainer error={error} />
      <ValdocContainer />
      <ProfesoresContainer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ height: 15 }}></div>
        {!isLoading && (
          <Button
            size="large"
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            <span>Enviar evaluación</span>
          </Button>
        )}
      </Box>
    </>
  );
};
export default EvaluacionDocente;
