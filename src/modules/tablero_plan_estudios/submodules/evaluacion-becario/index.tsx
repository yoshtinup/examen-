import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import { getEvaluaciones } from "@modules/evaluacion_becarios/queries";
import { Db12EvaluacionBecario, EvaluacionGql } from "@modules/evaluacion_becarios/types";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  CircularProgressProps,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography
} from "@mui/material";
import { HeaderSection } from "@shared/components";
import { useGetEstudianteInfo } from "@shared/queries";
import { EstudianteGql } from "@shared/types";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

const style = {
  padding: '30px',
  backgroundColor:"#fff",
  marginTop:"30px"
}

const EvaluacionBecario = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(user.estudiante.matricula);
  const { data:dataCT, error, isLoading:loading } = useQuery('se-conformacion-ct', async () =>
    getEvaluaciones(/* user.matricula */ 202011026)
  );
  let userInfo:EstudianteGql = {} as EstudianteGql;
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  userInfo = data[0];
  if(userInfo.Beca && userInfo.Beca.IdTipoDeBeca == 1){
    return <></>
  }
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">No se pudo acceder</Alert>;
  const EvaluacionReciente:Db12EvaluacionBecario = dataCT?.db12_EvaluacionBecario[0];
  return (
    <Container maxWidth={false} style={{...style }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderSection label="EVALUACIÓN DE BECARIO" shadow={false} />
        </Grid>
        <Grid item xs={4}>
          <UltimaEvaluacion evaluacion={EvaluacionReciente} />
        </Grid>
        <Grid item xs={8}>
          <ListaEvaluaciones evaluaciones={dataCT} />
        </Grid>
      </Grid>
    </Container>
  );
};

const UltimaEvaluacion = (props:any) => {
  const evaluacion:Db12EvaluacionBecario = props.evaluacion || {PorcentajeAvance:0};
  return (
    <div id="progress-circle-becario" style={{width:"fit-content", margin:"auto"}}>
      <CircularProgressWithLabel value={evaluacion.PorcentajeAvance} />
      <p>Último avance reportado</p>
    </div>
  );
}

const ListaEvaluaciones = (props:any) => {
  const evaluaciones:EvaluacionGql = props.evaluaciones;
  return (
    <Paper>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {evaluaciones.db12_EvaluacionBecario.map((evaluacion, i) =>
          <div key={i} >
            <ListItem
              secondaryAction={
                <Link href={"https://serviciosposgrado.ecosur.mx/profesores/Content/EvaluacionBecarios/" + evaluacion.Acta}>Formato de evaluación</Link>
              }
            >
              <ListItemAvatar>
                <Avatar style={{color:"black", marginRight:"30px"}}>{i+1}</Avatar>
              </ListItemAvatar>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {formatoFecha(evaluacion.FechaEvaluacion)}
                </Grid>
                <Grid item xs={3}>
                  Avance<br />
                  <Typography variant="h4" gutterBottom>
                    <b>{evaluacion.PorcentajeAvance}%</b>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  Recomendación<br />
                  <Typography variant="h5" gutterBottom>
                    <b>{evaluacion.Recomendacion.Value}</b>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            {(i<evaluaciones.db12_EvaluacionBecario.length-1) && <Divider />}
          </div>
        )}
      </List>
    </Paper>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function formatoFecha(date:any){
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciaembre"
  ];
  const fecha = new Date(date);
  return fecha.getDate() + " de " + meses[fecha.getMonth()] + " del " + fecha.getFullYear();
}

export default EvaluacionBecario;
