import { Grid, Paper, Typography } from "@mui/material";
import { GraficaColor, CursoGql, CursosAlumnoGql, GraficaBarrasType } from "@shared/types";

export function getDataGraficaCurso(cursos:CursosAlumnoGql){
  const MaxNumber = 1 + Math.max(
    cursos.Finalizados.length,
    cursos.Pendientes.length,
    cursos.EnProceso.length
  );
  const data:GraficaBarrasType = {
    Footer: <FooterGraficaCurso />,
    Graduacion:{
      Min: 0,
      Max: MaxNumber,
      Step: MaxNumber>7 ? 2 : 1
    },
    Items:[
      {
        Titulo:"Cursadas",
        Valor: cursos.Finalizados.length,
        Color: GraficaColor.rojo
      },
      {
        Titulo:"Pendientes",
        Valor: cursos.Pendientes.length,
        Color: GraficaColor.verde
      },
      {
        Titulo:"En curso",
        Valor: cursos.EnProceso.length,
        Color: GraficaColor.azul
      }
    ]
  };
  return data;
}

export function NumeraliaGraficaCurso(props:any){
  const cursos:CursosAlumnoGql = props.data;
  let sumatoria = 0;
  let elementos = 0;
  let creditosCub = 0;
  let creditosPen = 0;
  let creditosTot = 0;
  cursos.Finalizados.forEach(element => {
    sumatoria += element.CalificacionNumerico;
    elementos += 1;
    creditosCub += element.Creditos;
    creditosTot += element.Creditos;
  });
  cursos.EnProceso.forEach(element => {
    creditosPen += element.Creditos;
    creditosTot += element.Creditos;
  });
  cursos.Pendientes.forEach(element => {
    creditosPen += element.Creditos;
    creditosTot += element.Creditos;
  });
  const promedio = sumatoria/elementos;
  /*
      <Grid item xs={5}>
        <TextLine variant="h5" text={<b>Promedio global</b>}/>
        <TextLine variant="h4" text={promedio.toFixed(2)}/>
      </Grid>
      <Grid item xs={7}>
        <TextLine variant="h5" text={<b>Créditos</b>}/>
        <Grid container spacing={2} style={{textAlign:"center"}}>
          <Grid item xs={6}>
            <TextLine variant="h5" text="Cubiertos"/>
            <TextLine variant="h4" text={creditosCub}/>
          </Grid>
          <Grid item xs={6}>
            <TextLine variant="h5" text="Pendientes"/>
            <TextLine variant="h4" text={creditosPen}/>
          </Grid>
        </Grid>
      </Grid>
  */
  return (
    <Grid container spacing={7} style={{textAlign:"center"}}>
      <Grid item xs={12}>
        <Paper elevation={5} style={{borderBottom:"solid 3px #1ab394", padding:"15px 0 5px"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextLine variant="h4" text={<b>Promedio global</b>}/>
            </Grid>
            <Grid item xs={6}>
              <TextLine variant="h3" text={promedio.toFixed(2)}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={5} style={{borderBottom:"solid 3px #1ab394", padding:"10px 0 0"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextLine variant="h5" text={<b>Créditos cubiertos</b>}/>
              <TextLine variant="h4" text={creditosCub}/>
            </Grid>
            <Grid item xs={6}>
              <TextLine variant="h4" text={(creditosCub*100/creditosTot).toFixed(2) + "%"}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={5} style={{borderBottom:"solid 3px #c56b16", padding:"10px 0 0"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextLine variant="h5" text={<b>Créditos pendientes</b>}/>
              <TextLine variant="h4" text={creditosPen}/>
            </Grid>
            <Grid item xs={6}>
              <TextLine variant="h4" text={(creditosPen*100/creditosTot).toFixed(2) + "%"}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const TextLine = (props:any) => {
  return(
    <Typography variant={props.variant} gutterBottom>
      {props.text}
    </Typography>
  );
}

function FooterGraficaCurso(){
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{textAlign:"center", padding: '0'}}>
        <Typography variant="subtitle1" gutterBottom>
          <b>Asignaturas</b>
        </Typography>
      </Grid>
    </Grid>
  );
}