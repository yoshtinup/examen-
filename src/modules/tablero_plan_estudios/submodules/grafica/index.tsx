import { getCursosEstudiante } from "@modules/tablero_plan_estudios/hooks";
import { Grid } from "@mui/material";
import { GraficaBarras } from "@shared/components/graficas";
import { NumeraliaGraficaCurso, getDataGraficaCurso } from "@shared/components/graficas/createDataGraficaCurso";
import { useGetCursosAlumno } from "@shared/queries";
import { Alineacion, GraficaColor, CursosAlumnoGql, GraficaBarrasType, GraficaPastelType } from "@shared/types";

const GraficaCursos = (props) => {
  const matriculaEstudiante=props.matricula;
  const {data, error, isLoading}= useGetCursosAlumno(matriculaEstudiante);
  const arrayCursos: CursosAlumnoGql = getCursosEstudiante(data?.Cursos);
  if(isLoading){
    return <>Cargando</>;
  }
  if(error){
    return <>Error</>;
  }
  const dataCursos:GraficaBarrasType = getDataGraficaCurso(arrayCursos);
  const dataExample:GraficaPastelType = {
    Alineacion: Alineacion.Derecha,
    Porcentajes: true,
    Items:[
      {
        Titulo:"Bloque azul",
        Valor: 5,
        Color: GraficaColor.azul
      },
      {
        Titulo:"Bloque violeta",
        Valor: 10,
        Color: GraficaColor.violeta
      },
      {
        Titulo:"Bloque turquesa",
        Valor: 15,
        Color: GraficaColor.turquesa
      },
      {
        Titulo:"Bloque rojo",
        Valor: 20,
        Color: GraficaColor.rojo
      },
      {
        Titulo:"Bloque verde",
        Valor: 25,
        Color: GraficaColor.verde
      }
    ]
  }
  return (
    <Grid container spacing={5} style={{marginBottom:"70px"}} alignItems="center">
      <Grid item xl={6} lg={7} md={9} sm={11} xs={12} style={{margin:"auto"}}>
        <GraficaBarras data={dataCursos} />
      </Grid>
      <Grid item lg={5} md={9} xs={11} style={{margin:"auto"}}>
        <NumeraliaGraficaCurso data={arrayCursos} dataCredit={data?.CreditosAsignatura}/>
      </Grid>
    </Grid>
  );
};
export default GraficaCursos;
