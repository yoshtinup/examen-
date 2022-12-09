import { SeccionEvaluacionBecarios } from './components';
import { WithRol } from '@shared/hooks';
import Roles from '@definitions/Roles';

const EvaluacionPage = WithRol(Roles.Estudiante)(SeccionEvaluacionBecarios);

const EvaluacionBecarios = () => {
  return (
    <>
      <EvaluacionPage />
    </>
  );
};
export default EvaluacionBecarios;
