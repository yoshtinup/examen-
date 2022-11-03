import { EcosurSectionTitle } from '@shared/components';
import Estudiante from './submodules/estudiante';
import Personal from './submodules/personal';
import { WithRol, WithRoles } from '@shared/hooks/WithRol';
import Roles from '@definitions/Roles';

const EstudiantePage = WithRol(Roles.Estudiante)(Estudiante);
const PersonalPage = WithRoles([
  Roles.Academico,
  Roles.Responsable_Orientacion,
  Roles.Coordinador_Unidad,
  Roles.Coordinacion_General_Posgrado
])(Personal);

const ConsejoTutelar = () => {
  return (
    <>
      <EcosurSectionTitle label="Consejo Tutelar" variant="h5" />
      <EstudiantePage />
      <PersonalPage />
    </>
  );
};
export default ConsejoTutelar;
