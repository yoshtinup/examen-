import { Grid, Typography } from "@mui/material";
import { GraficaColor, CursoGql, CursosAlumnoGql, GraficaBarrasType } from "@shared/types";

export function getDataGraficaCurso(cursos:CursosAlumnoGql){
  const MaxNumber = 1 + Math.max(
    cursos.Finalizados.length,
    cursos.Pendientes.length,
    cursos.EnProceso.length
  );
  const data:GraficaBarrasType = {
    Header: <HeaderGraficaCurso data={cursos.Finalizados} />,
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

function HeaderGraficaCurso(props:any){
  const cursos:CursoGql[] = props.data;
  let sumatoria = 0;
  let elementos = 0;
  let creditos = 0;
  cursos.forEach(element => {
    sumatoria += element.CalificacionNumerico;
    elementos += 1;
    creditos += element.Creditos;
  });
  const promedio = sumatoria/elementos;
  return (
    <Grid container spacing={2} style={{textAlign:"center"}}>
      <Grid item xs={6}>
        <Typography variant="h5" gutterBottom>
          <b>Promedio global</b>
        </Typography>
        <Typography variant="h4" gutterBottom>
          {promedio.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" gutterBottom>
          <b>Créditos cubiertos</b>
        </Typography>
        <Typography variant="h4" gutterBottom>
          {creditos}
        </Typography>
      </Grid>
    </Grid>
  );
}

function FooterGraficaCurso(){
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant="subtitle1" gutterBottom>
          <b>Asignaturas</b>
        </Typography>
      </Grid>
    </Grid>
  );
}