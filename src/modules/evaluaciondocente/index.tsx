import { Home } from './components';
import { WithRol } from '@shared/hooks';
import Roles from '@definitions/Roles';
import Introduction from './components/atoms/Introduction';
import Plan from './components/atoms/Plan';
import SubjectInf from './components/atoms/SubjectInf';
import Title from './components/atoms/Title';
import DocContainer from './components/molecules/DocContainer';
import QuestContainer from './components/molecules/QuestContainer';
import ValdocContainer from './components/molecules/ValdocContainer';
import ValorationContainer from './components/molecules/ValorationContainer';
import { SubmitButton } from './components/atoms/Styles';
const HomePage = WithRol(Roles.Estudiante)(Home);
import EvaluacionDocenteQuerys from './queries/apiRest';
import { Actividades } from './types/evaluacionState';
import { useRecoilValue } from 'recoil';
import { materiaState } from './recoil/materiaState';
import { planeacionState } from './recoil/planeacionState';
import { valoracionState } from './recoil/valoracionState';
import { profesoresState } from './recoil/profesoresState';

const EvaluacionDocente = ({ docentes }) => {
  const materia = useRecoilValue(materiaState);
  const planeacionDelCurso = useRecoilValue(planeacionState);
  const valoracionDelCurso = useRecoilValue(valoracionState);
  const profesores = useRecoilValue(profesoresState);

  const handleSend = async () => {
    const data: Actividades = {
      idMateriasOfertaAnual: materia.idMateriasOfertaAnual,
      planeacionDelCurso,
      valoracionDelCurso,
      profesores,
    };

    const resultado = await EvaluacionDocenteQuerys.sendEvaluacion(data);
    console.log(resultado);
  };

  return (
    <>
      <HomePage />
      <Title />
      <br />
      <SubjectInf />
      <Introduction />
      <Plan />
      <QuestContainer />
      <ValorationContainer />
      <ValdocContainer />
      <DocContainer />
      <br />
      <SubmitButton onClick={handleSend}>Enviar evaluación</SubmitButton>
    </>
  );
};
export default EvaluacionDocente;
