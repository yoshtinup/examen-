import { SeccionEvaluacionBecarios } from './components';
import { WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

const EvaluacionPage = WithRoles([Roles.Estudiante, Roles.Servicios_Escolares])(
  SeccionEvaluacionBecarios
);

const EvaluacionBecarios = () => {
  return (
    <>
      <EvaluacionPage />
    </>
  );
};
export default EvaluacionBecarios;
