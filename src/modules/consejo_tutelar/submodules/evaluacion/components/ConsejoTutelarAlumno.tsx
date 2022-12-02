import { useQuery } from 'react-query';
import { useGetIntegrantesCTRechazados } from '../queries';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../recoil';
import {
  Card,
  CardHeader,
  CardContent,
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
import { Rechazado } from '../types';
import { EcosurProfileCard } from 'ecosur-ui';

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
  if (error)
    return (
      <Alert severity="error">
        Error al cargar el status del proceso actual
      </Alert>
    );
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

const SeccionRechazados = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  const { data, isLoading, error } = useGetIntegrantesCTRechazados(matricula);
  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        Error al cargar la seccion de integrantes rechazados
      </Alert>
    );
  const cantidad = data.length;
  if (cantidad == 0) return <></>;
  return (
    <div>
      <h3 style={{ color: 'rgb(197, 107, 22) !important' }}>
        Integrantes rechazados
      </h3>

      {data[0].Rechazados.map((integrante: Rechazado, index: number) => (
        <Card
          key={`ct-rechazado-${index}`}
          variant="outlined"
          style={{ marginBottom: '20px' }}
        >
          <CardHeader
            title={`${integrante.Academico.Grado} ${integrante.Academico.Nombre} ${integrante.Academico.ApellidoPaterno} ${integrante.Academico.ApellidoMaterno}`}
            subheader={`Rechazado por el ${integrante.RolQueRechazo}`}
          />

          <CardContent>
            <EcosurProfileCard
              data={{
                'Razon de rechazo': integrante.RazonRechazo,
                Ronda: integrante.Ronda,
              }}
              color="#fff"
              titleColor="#555555"
            />
          </CardContent>
        </Card>
      ))}
    </div>
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
        <SeccionRechazados />
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
