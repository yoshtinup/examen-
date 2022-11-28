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
import Roles from '@definitions/Roles';

import { useRecoilValue } from 'recoil';
import { rolStateAtom } from '@modules/auth/recoil';

const PerfilWithStatus: React.FC<{matricula: number, status: string, seminario: number}> = ({matricula, status, seminario}) => {
  const evaluacionSeminarioComponentes = [  
    {
      componente:       
         <>
          <Box sx={{ pb: 2 }}>
            <Perfil matricula={matricula} />
            <Typography sx={{ pl: 3 }} component='div'>
              <b>Estatus de evaluación: </b> {status}
            </Typography>
          </Box>
        </>,
      width: 7,
    },  
    {
      componente: 
        <Box sx={{ pb: 2 }}>
          <CardCT IdEvaluacionSeminario={seminario} />
        </Box>,
      width: 5,
    },  
  ]
  return (
    <EcosurContainer data={evaluacionSeminarioComponentes} />                 
  )
}

export const EvaluacionSeminarioWithoutFetch: React.FC<{ dataID: DataID[], idEvaluacionSeminario: number }> = ({
  dataID, 
  idEvaluacionSeminario,
}) => {    
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  if (dataID.length == 0 ) {
    return (
      <Alert severity="error">
        No se encontró el seminario de invetigación.
      </Alert>
    );
  } else {
    const idAlumnosMaterias = dataID[0].IdAlumnosMaterias;
    const idMatricula = dataID[0].alumno.Matricula;
    const status = dataID[0].estatus.value;


    const EcosurComponentesInformacion = [  
      // SEGUNDA SECCIÓN
      // ACTIVIDADES Y ARCHIVOS
      {
        componente: 
        <Box sx={{ pb: 2 }}>
          <CardActividades IdAlumnosMaterias={idAlumnosMaterias} />
        </Box>,
        width: 8,
      },  
      {
        componente: 
          <Box 
          sx={{
            height: 1,
            width: 1,
            pb: 2,
          }}
          >
            <CardArchivos IdAlumnoMateria={idAlumnosMaterias} />
          </Box>,
        width: 4,
      },        
      // TERCERA SECCIÓN
      // PROGRAMA 
      {
        componente:  
        <Box sx={{ pb: 2 }}>
          <CardPrograma IdAlumnosMaterias={idAlumnosMaterias} />
        </Box>,
        width: 12,
      },  
      // CUARTA SECCIÓN
      // EVALUACION
      {
        componente: 
        <Box sx={{ pb: 2 }}>
          <CardEvaluacion IdAlumnosMaterias={idAlumnosMaterias} />
        </Box>,
        width: 12,
      },         
    ]

    return (
      <>
        <EcosurSectionTitle label="Evaluación Seminario Investigación" variant="h5" />
        <br />
        <Container maxWidth="xl" sx={{ bgcolor: 'background.default', border: 'none' }}>
          {currentRol !== Roles.Estudiante && (
            <PerfilWithStatus matricula={idMatricula} status={status} seminario={idEvaluacionSeminario} />
          )}
          {currentRol == Roles.Estudiante && (
            <Box sx={{ pb: 2 }}>
                    <CardCT IdEvaluacionSeminario={idEvaluacionSeminario} />
            </Box>
          )}          
            <EcosurContainer data={EcosurComponentesInformacion}  />                  
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
