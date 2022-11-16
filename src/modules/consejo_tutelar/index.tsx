import HeaderSection from '../../shared/components/HeaderSection';
import Estudiante from './submodules/estudiante';
import Personal from './submodules/personal_index';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import { Box, Container } from '@mui/material';

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
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="CONFORMACIÓN DE CONSEJO TUTELAR (CT)" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <EstudiantePage />
        <PersonalPage />
      </Box>
    </Container>
  );
};
export default ConsejoTutelar;
