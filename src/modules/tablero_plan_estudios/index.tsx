import GraficaCursos from './submodules/grafica';
import CardsCursos from './submodules/cards-cursos';
import CardsCuaSem from './submodules/cards-cuatrimestres-semestres';
import CardsCursosAIniciar from './submodules/cards-cursos-por-iniciar';
import { EcosurTabs } from 'ecosur-ui';
import { EcosurAuth } from '@modules/auth/definitions';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import ProductosActividadesRealizadas from './submodules/productos_actividades_realizadas';
import { Container, padding } from '@mui/system';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { HeaderSection } from '@shared/components';
import EvaluacionEtica from './submodules/evaluacion-etica';
import { useGetCursosAlumno } from '@shared/queries';
import { useGetProcesoCambioPlanEstudios } from '@shared/queries/procesoCambioPlan';
import { WithRolCheck} from '@shared/hooks';
import Roles from '@definitions/Roles';
const style = {
  padding: '30px',
  backgroundColor: '#fff',
  marginTop: '30px',
};

const TableroPlanEstudios = (props) => {
  const matricula = props.matricula;
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  let registrationUser;
  //checar si el rol es el adecuado
  const rol = WithRolCheck(Roles.Estudiante);
  const show = rol(null);
  console.log(show)

  if(matricula!=undefined){
    registrationUser=Number(matricula);
  }else{
    registrationUser=user.estudiante.matricula;
  }
  const { data, error, isLoading } = useGetCursosAlumno(
    registrationUser
  );
  const procesoCambio = useGetProcesoCambioPlanEstudios(registrationUser);
  const cursos = data?.Cursos;
  const dataResponse = useGetCursosAlumno(202221003);
  let proceso = true;

  if (isLoading) {
    return <>Cargando</>;
  }
  if (error) {
    return <>Error</>;
  }
  if (procesoCambio.data?.length > 0) {
    proceso = false;
   
  }

  

  const tabCursos = [
    {
      titulo: 'Asignaturas',
      componente: <CardsCursos data={cursos} proceso={proceso} show={show}/>,
    },
    {
      titulo: 'Periodos lectivos',
      componente: <CardsCuaSem data={cursos} show={show}/>,
    },
    {
      titulo: 'Alta de asignaturas',
      componente: <CardsCursosAIniciar show={show}/>,
    },
  ];
  return (
    <>
      <Container maxWidth={false} style={{ ...style }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderSection label="PLAN DE ESTUDIOS" shadow={false} />
          </Grid>
          <Grid item xs={12}>
            <GraficaCursos matricula={registrationUser}/>
            {!proceso && <MyCard data={procesoCambio.data} />}

            {/* <a className="tab">Pendiente de que su director/a de tesis revise los siguientes cambios en su plan de estudios: <br/>
            {procesoCambio.data[0].Estatus?.Descripcion}<br/>{procesoCambio.data[0].Estatus?.Descripcion}<br/>{procesoCambio.data[0].Estatus?.Descripcion}<br/></a> */}
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
      
      <EvaluacionEtica matricula={registrationUser} />
      <Container maxWidth={false} style={{ ...style }}>
        <ProductosActividadesRealizadas matricula={registrationUser} />
      </Container>
    </>
  );
};

const MyCard = props => {
  const data = props.data;
  return (
    <Card
      id="mycard"
      sx={{
        bgcolor: '#FFC266',
        border: '1px solid #ccc',
        color: 'dark',
        maxWidth: 450,
        minHeight:50,
        float: 'right',
        marginRight: 2,
        overflowX: 'auto',
        paddingBottom: 0,
        zIndex: 1,
      }}
    >
      <CardContent sx={{ padding: 0.5, paddingBottom: 0 }}>
        <Typography
          sx={{ mb: 0.1, fontSize: 10, padding: 0 }}
          color="dark"
          gutterBottom
        >
          Pendiente de que su director/a de tesis revise los siguientes cambios
          en su plan de estudios:
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.1, fontSize: 9, padding: 0 }}>
        {data.map(element => (
          '*'+element.Materia.curso.CursoSeminario+' ('+element.Estatus.Descripcion+')' 
        ))}<br/> 
        </Typography>
          
      </CardContent>
    </Card>
  );
};

export default TableroPlanEstudios;
