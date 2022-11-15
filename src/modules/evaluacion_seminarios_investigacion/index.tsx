import { EcosurSectionTitle } from 'ecosur-ui';

import { useGetIntegrantesInfo } from '@shared/queries';


import EvaluacionSeminarioInvestigacionQuerys from '@modules/evaluacion_seminarios_investigacion/queries';
import matriculaState, { estudianteState } from '@modules/consejo_tutelar/submodules/evaluacion/recoil';
import { Alert, CircularProgress } from '@mui/material';
import { useSetRecoilState } from 'recoil';

const EvaluacionSeminarioInvestigacion = () => {
  // console.log( EvaluacionSeminarioInvestigacionQuerys.getAlumnos(91) );
  const setMatricula = useSetRecoilState(matriculaState);
  const setEstudiante = useSetRecoilState(estudianteState);

  const IdEvaluacionSeminario = 91;

  setMatricula(IdEvaluacionSeminario);
  const { data, isError, isLoading, isSuccess } =
  useGetIntegrantesInfo(IdEvaluacionSeminario);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la informacion del alumno
      </Alert>
    );
    console.log(isError);
  if (isLoading) return <CircularProgress />;
  if (isSuccess) {
    setEstudiante(data);
    console.log(data);
  }
  
  return (
    <>
      <EcosurSectionTitle label="Evaluación Seminario Investigación" variant="h5" />
    </>
  );
};
export default EvaluacionSeminarioInvestigacion;
