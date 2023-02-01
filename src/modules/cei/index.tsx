import Roles from '@definitions/Roles';
import { WithRol } from '@shared/hooks';
import DashboardPresidente from './components/DashboardPresidente';
import DashboardRevisor from './components/DashboardRevisor';
import PropuestaAlumno from './components/PropuestaAlumno';
import DashboardCoordinacionGeneralPosgrado from './components/CoordinacionGeneralPosgrado';
import SettingsCEI from './components/SettingsCEI';

const EstudiantePage = WithRol(Roles.Estudiante)(PropuestaAlumno);
const RevisorPage = WithRol(Roles.Revisor_CEI)(DashboardRevisor);
const PresidentePage = WithRol(Roles.Presidente_CEI)(DashboardPresidente);
const CoordinacionGeneralPosgradoPage = WithRol(
  Roles.Coordinacion_General_Posgrado
)(DashboardCoordinacionGeneralPosgrado);
const SettingsCEIPage = WithRol(Roles.Presidente_CEI)(SettingsCEI);

const CEI = () => {
  return (
    <>
      <EstudiantePage />
      <RevisorPage />
      <PresidentePage />
      <CoordinacionGeneralPosgradoPage />
    </>
  );
};

export const DashboardCEI = () => {
  return (
    <>
      <SettingsCEIPage />
    </>
  );
};

export default CEI;
