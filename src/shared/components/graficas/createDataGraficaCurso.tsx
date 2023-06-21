import { Grid, Paper, Typography } from "@mui/material";
import { GraficaColor, CursoGql, CursosAlumnoGql, GraficaBarrasType } from "@shared/types";

export function getDataGraficaCurso(cursos:CursosAlumnoGql){
  const MaxNumber = 1 + Math.max(
    cursos.Finalizados.length,
    cursos.Pendientes.length,
    cursos.EnProceso.length
  );
  const data:GraficaBarrasType = {
    NoData: "No se ha registrado un plan de estudios",
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
  const {TotalDeCreditosCubiertos, TotalDeCreditos} = props.dataCredit[0]?props.dataCredit[0]:0;
  const creditosPendientes = TotalDeCreditos-TotalDeCreditosCubiertos;
  console.log(props.data2)
  let sumatoria = 0;
  let elementos = 0;
  let creditosCub = 0;
  let creditosPen = 0;
  let creditosTot = 0;
  cursos.Finalizados.forEach(element => {
    if(element.BoletaCalificaciones && element.BoletaCalificaciones[0] &&
      element.BoletaCalificaciones[0].IDMOC == element.IdMateriasOfertaClave &&
      element.BoletaCalificaciones[0].NombreArchivoBoletaMateria &&
      element.BoletaCalificaciones[0].NombreArchivoBoletaMateria != ""
    ){
      sumatoria += element.CalificacionNumerico;
      elementos += 1;
    }
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

  return (
    <Grid container spacing={7} style={{textAlign:"center"}}>
      {promedio > 0 &&
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
      }
      {creditosCub > 0 &&
        <Grid item xs={12}>
          <Paper elevation={5} style={{borderBottom:"solid 3px #1ab394", padding:"10px 0 0"}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextLine variant="h5" text={<b>Créditos cubiertos</b>}/>
                <TextLine variant="h4" text={TotalDeCreditosCubiertos!=null && TotalDeCreditosCubiertos}/>
              </Grid>
              <Grid item xs={6}>
                <TextLine variant="h4" text={TotalDeCreditos!=null && TotalDeCreditos!=0 ?(TotalDeCreditosCubiertos*100/TotalDeCreditos).toFixed(2) + "%": ""}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      }
      {creditosPen > 0 &&
        <Grid item xs={12}>
          <Paper elevation={5} style={{borderBottom:"solid 3px #c56b16", padding:"10px 0 0"}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextLine variant="h5" text={<b>Créditos pendientes</b>}/>
                <TextLine variant="h4" text={TotalDeCreditos!=null && TotalDeCreditos!=0 ?(creditosPendientes).toFixed(2): ''}/>
              </Grid>
              <Grid item xs={6}>
                <TextLine variant="h4" text={TotalDeCreditos!=null && TotalDeCreditos!=0 ?(creditosPendientes*100/TotalDeCreditos).toFixed(2) + "%": ""}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      }
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