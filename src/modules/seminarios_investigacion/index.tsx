import { Alert, CircularProgress, Container, Box, Typography, Button, Grid } from '@mui/material';
import { HeaderSection, Perfil } from '@shared/components';
import { EcosurContainer, EcosurSectionTitle } from 'ecosur-ui';
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
import { useRouter } from 'next/router';
import { Layout } from '@shared/components/layouts';

const PerfilWithStatus: React.FC<{matricula: number, status: string, seminario: number}> = ({matricula, status, seminario}) => {
  const evaluacionSeminarioComponentes = [  
    {
      componente:       
         <>
          <Box sx={{ pb: 2, mt: 4, mb: 2 }}>
            <Perfil matricula={matricula}  />
            <Typography sx={{ pl: 3 }} component='div'>
              <b>Estatus de evaluación: </b> {status}
            </Typography>
          </Box>
        </>,
      width: 8,
    },  
    {
      componente: 
        <Box sx={{ pb: 2 }}>
          <CardCT IdEvaluacionSeminario={seminario} />
        </Box>,
      width: 4,
    },  
  ]
  return (
    <EcosurContainer data={evaluacionSeminarioComponentes} />                 
  )
}

export const DetallesSeminarioWithoutFetch: React.FC<{ dataID: DataID[], idEvaluacionSeminario: number }> = ({
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
      // SEGUNDA SECCIÓs
      // ACTIVIDADES Y ARCHIVOS
      {
        componente: 
        <Box
          sx={{
            height: 1,
            width: 1,
          }}
        >
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
    ]

    return (
      <>
        <Container maxWidth="xl" sx={{ bgcolor: 'white', border: 'none', padding: '30px' }}>
            {currentRol !== Roles.Estudiante && (
              <PerfilWithStatus matricula={idMatricula} status={status} seminario={idEvaluacionSeminario} />
            )}
            {currentRol == Roles.Estudiante && (
              <Box sx={{ pb: 4 }}>
                      <CardCT IdEvaluacionSeminario={idEvaluacionSeminario} />
              </Box>
            )}          
            <EcosurContainer data={EcosurComponentesInformacion}  />    
            <Box sx={{ pb: 2, pt: 2 }}>
              <CardEvaluacion IdAlumnosMaterias={idAlumnosMaterias} />              
            </Box>
        </Container>
      </>
    );
  }
}; // CardCTWithoutFetch

const DetallesSeminarioInvestigacion: React.FC<{
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
    console.log(data);
  }
  return (
    <Layout>
      <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
        <Box key={`ecosur-evaluacion-seminario-investigacion`} sx={{ border: 0 }}>
          <HeaderSection label={'EVALUACIÓN: ' + dataID[0].alumno.MOC.MOA.Materia.NombreMateria} />
          <DetallesSeminarioWithoutFetch dataID={dataID} idEvaluacionSeminario={idEvaluacionSeminario} />
        </Box>
      </Container>
    </Layout>       
  );
};

export default DetallesSeminarioInvestigacion;
