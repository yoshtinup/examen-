import { Alert, CircularProgress, Container, Box, Grid, Typography } from '@mui/material';
import { Perfil } from '@shared/components';
import { EcosurSectionTitle } from 'ecosur-ui';
import { EcosurContainer } from 'ecosur-ui';
import { CardCT } from './components/evaluacion';
import { CardActividades } from './components/evaluacion';
import { CardPrograma } from './components/evaluacion';
import { CardArchivos } from './components/evaluacion';
import { CardEvaluacion } from './components/evaluacion';

import { useGetDataInfo } from './queries';
import { DataID } from './types';

export const EvaluacionSeminarioWithoutFetch: React.FC<{ dataID: DataID[], idEvaluacionSeminario: number }> = ({
  dataID, 
  idEvaluacionSeminario,
}) => {    
  if (dataID.length == 0 ) {
    return (
      <Alert severity="error">
        No se encontró el seminario de invetigación.
      </Alert>
    );
  } else {
    const idAlumnosMaterias = dataID[0].IdAlumnosMaterias;
    const idMatricula = dataID[0].alumno.Matricula;

    const evaluacionSeminarioComponentes = [  
      // PRIMERA SECCION
      // PERFIL Y CONSEJO TUTELAR
      {
        componente: 
          <Box>
            <Perfil matricula={idMatricula} />
            <Typography sx={{ pl: 2 }} component='div'>
              <b>Estatus de evaluación: </b> {dataID[0].estatus.value}
            </Typography>
            <br />
          </Box>,
        width: 7,
      },  
      {
        componente: 
          <Box>
          <CardCT IdEvaluacionSeminario={idEvaluacionSeminario} />
          <br />
          </Box>,
          
        width: 5,
      },  
      // SEGUNDA SECCIÓN
      // EVALUACION
      {
        componente: <CardEvaluacion IdAlumnosMaterias={idAlumnosMaterias} />,
        width: 12,
      },   
      // TERCERA SECCIÓN
      // ACTIVIDADES Y ARCHIVOS
      {
        componente: <CardActividades IdAlumnosMaterias={idAlumnosMaterias} />,
        width: 8,
      },  
      {
        componente: 
          <Box
          sx={{
            height: 1,
            width: 1,
          }}
          >
            <CardArchivos IdAlumnoMateria={idAlumnosMaterias} />
          </Box>,
        width: 4,
      },        
      // CUARTA SECCIÓN
      // PROGRAMA 
      {
        componente:  <CardPrograma IdAlumnosMaterias={idAlumnosMaterias} />,
        width: 12,
      },  
    ]

    return (
      <>
        <EcosurSectionTitle label="Evaluación Seminario Investigación" variant="h5" />
        <Container maxWidth="xl" sx={{ bgcolor: 'background.default', border: 'none' }}>
          <Box
            display="column"
            alignItems="center"
            justifyContent="center"
          >       
            <EcosurContainer data={evaluacionSeminarioComponentes} />                  
          </Box>
        </Container>
      </>
    );
  }
}; // CardCTWithoutFetch

const EvaluacionSeminarioInvestigacion: React.FC<{
  idEvaluacionSeminario: number;
}> = ({ idEvaluacionSeminario: idEvaluacionSeminario }) => {
  const { data, isError, isLoading, isSuccess } = useGetDataInfo(idEvaluacionSeminario);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información del seminario de invesrtigacion.
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let dataID: DataID[];
  if (isSuccess) {
    dataID = data;
  }
  return (
    <>
        <Box key={`ecosur-evaluacion-seminario-investigacion`} sx={{ border: 0 }}>
            <EvaluacionSeminarioWithoutFetch dataID={dataID} idEvaluacionSeminario={idEvaluacionSeminario} />
        </Box>
    </>       
  );
};

export default EvaluacionSeminarioInvestigacion;
