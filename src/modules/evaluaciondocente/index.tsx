import { Home } from './components';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import Introduction from './components/atoms/Introduction';
import Plan from './components/atoms/Plan';
import SubjectInf from './components/atoms/SubjectInf'
import Title from './components/atoms/Title';
import DocContainer from './components/molecules/DocContainer';
import QuestContainer from './components/molecules/QuestContainer';
import ValdocContainer from './components/molecules/ValdocContainer';
import ValorationContainer from './components/molecules/ValorationContainer';
import { SubmitButton } from './components/atoms/Styles';
const HomePage = WithRol(Roles.Estudiante)(Home);

const EvaluacionDocente = () => {
  return (
    <>
      <HomePage />
      <Title/>
      <br/>
      <SubjectInf/>
      <Introduction/>
      <Plan/>
      <QuestContainer/>
      <ValorationContainer/>
      <ValdocContainer/>
      <DocContainer/>
      <br/>
      <SubmitButton>Enviar evaluación</SubmitButton>
    </>
  );
};
export default EvaluacionDocente;
