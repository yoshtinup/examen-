import GraficaCursos from './submodules/grafica';
import CardsCursos from './submodules/cards-cursos';
import CardsCuaSem from './submodules/cards-cuatrimestres-semestres';
import CardsCursosAIniciar from './submodules/cards-cursos-por-iniciar';
import { EcosurTabs } from 'ecosur-ui';
import { EcosurAuth } from '@modules/auth/definitions';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import ProductosActividadesRealizadas from './submodules/productos_actividades_realizadas';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { HeaderSection } from '@shared/components';
import EvaluacionBecario from './submodules/evaluacion-becario';
import EvaluacionEtica from './submodules/evaluacion-etica';
import { useGetCursosAlumno } from '@shared/queries';

const style = {
  padding: '30px',
  backgroundColor:"#fff",
  marginTop:"30px"
}

const TableroPlanEstudios = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const {data, error, isLoading}= useGetCursosAlumno(user.estudiante.matricula);
  const dataResponse = useGetCursosAlumno(user.estudiante.matricula);
  if(isLoading){
    return <>Cargando</>;
  }
  if(error){
    return <>Error</>;
  }
  const tabCursos = [
    {
      titulo: 'Asignaturas',
      componente: <CardsCursos data={data} />,
    },
    {
      titulo: 'Periodos lectivos',
      componente: <CardsCuaSem data={data} />,
    },
    {
      titulo: 'Alta de asignaturas',
      componente: <CardsCursosAIniciar />,
    },
  ];
  return (
    <>
      <Container maxWidth={false} style={{...style }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderSection label="PLAN DE ESTUDIOS" shadow={false} />
          </Grid>
          <Grid item xs={12}>
            <GraficaCursos />
            <EcosurTabs
              data={tabCursos}
              align="left"
              activeColor="#ecf0f5"
              activeTextColor="black"
              key="ecosur-tabs-cursos"
            />
          </Grid>
        </Grid>
      </Container>
      <EvaluacionBecario />
      <EvaluacionEtica />
      <Container maxWidth={false} style={{...style }}>
        <ProductosActividadesRealizadas matricula={user.estudiante.matricula} />
      </Container>
    </>
  );
};

export default TableroPlanEstudios;