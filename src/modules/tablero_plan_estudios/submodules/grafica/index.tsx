import { Grid, Typography } from "@mui/material";
import { GraficaBarras } from "@shared/components/graficas";
import { getDataGraficaCurso } from "@shared/components/graficas/createDataGraficaCurso";
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
        Valor: 95,
        Color: GraficaColor.turquesa
      },
      {
        Titulo:"Bloque rojo",
        Valor: 2500,
        Color: GraficaColor.rojo
      },
      {
        Titulo:"Bloque verde",
        Valor: 35,
        Color: GraficaColor.verde
      }
    ]
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>Grafica</b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <GraficaPastel data={dataExample} />
      </Grid>
      <Grid item xs={6}>
        <GraficaBarras data={dataCursos} />
      </Grid>
    </Grid>
  );
};
export default GraficaCursos;
