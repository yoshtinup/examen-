import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import { getCursosEstudiante } from "@modules/tablero_plan_estudios/hooks";
import { Grid } from "@mui/material";
import { GraficaBarras } from "@shared/components/graficas";
import { NumeraliaGraficaCurso, getDataGraficaCurso } from "@shared/components/graficas/createDataGraficaCurso";
import { GraficaPastel } from "@shared/components/graficas/graficaPastel";
import { useGetCursosAlumno } from "@shared/queries";
import { Alineacion, GraficaColor, CursosAlumnoGql, GraficaBarrasType, GraficaPastelType } from "@shared/types";
import { useRecoilValue } from "recoil";

const GraficaCursos = (props) => {
  const matriculaEstudiante=props.matricula;
  const user: EcosurAuth = useRecoilValue(userStateAtom);
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
  /*
    <Grid item xs={12}>
      <GraficaPastel data={dataExample} />
    </Grid>
  */
  return (
    <Grid container spacing={5} style={{marginBottom:"70px"}} alignItems="center">
      <Grid item xs={5}>
        <GraficaBarras data={dataCursos} />
      </Grid>
      <Grid item xs={5}>
        <NumeraliaGraficaCurso data={arrayCursos} dataCredit={data?.CreditosAsignatura}/>
      </Grid>
    </Grid>
  );
};
export default GraficaCursos;
