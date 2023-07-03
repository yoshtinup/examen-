import Otros from './submodules/otros';
import ServiciosEscolares from './submodules/servicios_escolares';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import { HeaderSection } from '@shared/components';

const OtrosPage = WithRoles([
  Roles.Estudiante,
])(Otros);
const ServiciosEscolaresPage = WithRol(Roles.Servicios_Escolares)(
  ServiciosEscolares
);

const GestionAsignaturas = () => {
  return (
    <>
      <HeaderSection label="GESTIÓN DE ASIGNATURAS" />
      <OtrosPage />
      <ServiciosEscolaresPage />
    </>
  );
};
export default GestionAsignaturas;
