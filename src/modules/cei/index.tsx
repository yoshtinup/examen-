import Roles from '@definitions/Roles';
import { WithRol } from '@shared/hooks';
import DashboardPresidente from './components/DashboardPresidente';
import DashboardRevisor from './components/DashboardRevisor';
import PropuestaAlumno from './components/PropuestaAlumno';

const EstudiantePage = WithRol(Roles.Estudiante)(PropuestaAlumno);
const RevisorPage = WithRol(Roles.RevisorCEI)(DashboardRevisor);
const PresidentePage = WithRol(Roles.PresidenteCEI)(DashboardPresidente);

const CEI = () => {
  return (
    <>
      <EstudiantePage />
      <RevisorPage />
      <PresidentePage />
    </>
  );
};

export default CEI;
