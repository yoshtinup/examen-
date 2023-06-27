import Estudiante from './submodules/estudiante';
import Personal from './submodules/personal_index';
import ServiciosEscolares from './submodules/servicios_escolares';
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
const ServiciosEscolaresPage = WithRol(Roles.Servicios_Escolares)(
  ServiciosEscolares
);

const Home = ({matricula}) => {
  
  return (
    <>
      <EstudiantePage /> 
      <PersonalPage />     
      {matricula==undefined ? (
        <ServiciosEscolaresPage />
      ) : (
        <Estudiante matricula={matricula} />
      )}
    </>
  );
};

export default Home;
