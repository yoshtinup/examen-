import Otros from './submodules/otros';
import ServiciosEscolares from './submodules/servicios_escolares';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

const OtrosPage = WithRoles([
  Roles.Estudiante,
])(Otros);
const ServiciosEscolaresPage = WithRol(Roles.Servicios_Escolares)(
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
