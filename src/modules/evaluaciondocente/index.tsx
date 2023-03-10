import { Home } from './components';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

const HomePage = WithRol(Roles.Estudiante)(Home);

const EvaluacionDocente = () => {
  return (
    <>
      <HomePage />
    </>
  );
};
export default EvaluacionDocente;
