import Estudiante from './submodules/estudiante';
import Personal from './submodules/personal_index';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

const EstudiantePage = WithRol(Roles.Estudiante)(Estudiante);
const PersonalPage = WithRoles([
  Roles.Externo,
  Roles.Academico,
  Roles.Responsable_Orientacion,
  Roles.Coordinador_Unidad,
  Roles.Coordinacion_General_Posgrado,
])(Personal);

const ConsejoTutelar = () => {
  return (
    <>
      <EstudiantePage />
      <PersonalPage />
    </>
  );
};
export default ConsejoTutelar;
