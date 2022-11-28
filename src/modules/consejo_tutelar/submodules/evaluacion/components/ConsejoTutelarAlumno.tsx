import { useQuery } from 'react-query';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../recoil';
import {
  Stack,
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Perfil, LoadCTChildrem } from '.';
import { IntegranteCT } from '@modules/consejo_tutelar/types';
import { SeccionEvaluacion } from '@modules/consejo_tutelar/components';

function getStep(status: number): number {
  if (status > 4) return status - 2;
  return status - 1;
}

const ProcesoCT = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const {
    data: steps,
    error,
    isLoading,
  } = useQuery(
    'ct-catalago-estatus-general',
    async () => await ConsejoTutelarQuerys.getStatusGeneral(),
    {
      staleTime: Infinity,
    }
  );
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert>Error al cargar el status del proceso actual</Alert>;
  const step = getStep(estudiante.IdEstatusCT);
  return (
    <Box sx={{ width: '100%' }}>
      <h3>Estatus del proceso de evaluación</h3>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

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
        <ProcesoCT />
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
