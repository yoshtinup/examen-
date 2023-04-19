import { Grid, Typography } from "@mui/material";
import { GraficaBarras } from "@shared/components/graficas";
import { NumeraliaGraficaCurso, getDataGraficaCurso } from "@shared/components/graficas/createDataGraficaCurso";
import { GraficaPastel } from "@shared/components/graficas/graficaPastel";
import { Alineacion, GraficaColor, CursosAlumnoGql, GraficaBarrasType, GraficaPastelType } from "@shared/types";

const GraficaCursos = (props:any) => {
  const arrayCursos:CursosAlumnoGql = props.data;
  if(!arrayCursos){
    return <></>;
  }
  const dataCursos:GraficaBarrasType = getDataGraficaCurso(arrayCursos);
  const dataExample:GraficaPastelType = {
    Alineacion: Alineacion.Derecha,
    Items:[
      {
        Titulo:"Bloque amarillo",
        Valor: 65,
        Color: GraficaColor.amarillo
      },
      {
        Titulo:"Bloque violeta",
        Valor: 50,
        Color: GraficaColor.violeta
      },
      {
        Titulo:"Bloque turquesa",
        Valor: 85,
        Color: GraficaColor.turquesa
      },
      {
        Titulo:"Bloque rojo",
        Valor: 25,
        Color: GraficaColor.rojo
      },
      {
        Titulo:"Bloque verde",
        Valor: 35,
        Color: GraficaColor.verde
      }
    ]
  }
  /*
    <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
        <b>Grafica</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <GraficaPastel data={dataExample} />
    </Grid>
  */
  return (
    <Grid container spacing={5} style={{marginBottom:"70px"}} alignItems="center">
      <Grid item xs={5}>
        <GraficaBarras data={dataCursos} />
      </Grid>
      <Grid item xs={5}>
        <NumeraliaGraficaCurso data={arrayCursos} />
      </Grid>
    </Grid>
  );
};
export default GraficaCursos;
