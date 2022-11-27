import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../recoil';
import { Stack, Container } from '@mui/material';
import { Perfil, LoadCTChildrem } from '.';
import { IntegranteCT } from '@modules/consejo_tutelar/types';
import { SeccionEvaluacion } from '@modules/consejo_tutelar/components';

export const ConsejoTutelarAlumnoBase: React.FC<
  React.PropsWithChildren<{ integrantes: IntegranteCT[] }>
> = ({ integrantes, children }) => {
  return (
    <Container
      maxWidth="lg"
      style={{ marginBottom: '20px', padding: '25px 0px 0px 0px' }}
    >
      <Stack spacing={4}>
        <h3 style={{ marginBottom: '0px' }}>Persona estudiante</h3>
        <Perfil />
        <SeccionEvaluacion
          title="Integrantes del consejo tutelar en proceso de evaluación"
          integrantes={integrantes}
          btnHide
        />
        {children}
      </Stack>
    </Container>
  );
};

export const ConsejoTutelarAlumno: React.FC<
  React.PropsWithChildren<{ isDirector?: boolean }>
> = ({ isDirector = false, children }) => {
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  return (
    <LoadCTChildrem
      matricula={matricula}
      Component={ConsejoTutelarAlumnoBase}
      isDirector={isDirector}
    >
      {children}
    </LoadCTChildrem>
  );
};
