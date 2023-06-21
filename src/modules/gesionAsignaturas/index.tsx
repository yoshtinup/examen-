import Otros from './submodules/otros';
import ServiciosEscolares from './submodules/servicios_escolares';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

/*const OtrosPage = WithRoles([
  Roles.Estudiante,
])(Otros);
const ServiciosEscolaresPage = WithRol(Roles.Servicios_Escolares)(
  ServiciosEscolares
);*/
const OtrosPage = WithRoles([
  Roles.Servicios_Escolares,
])(Otros);
const ServiciosEscolaresPage = WithRol(Roles.Estudiante)(
  ServiciosEscolares
);

const GestionAsignaturas = () => {
  return (
    <>
      <OtrosPage />
      <ServiciosEscolaresPage />
    </>
  );
};
export default GestionAsignaturas;
