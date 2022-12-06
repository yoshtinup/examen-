import { Grid, Typography } from "@mui/material";
import { CursoGql, CursosAlumnoGql, Estatus } from "@shared/types";
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso
} from "@shared/components/cards";
import { useGetCursosAlumno } from "@shared/queries";

function getCursosEstudiantes(matricula:number){
  const listaCursos = useGetCursosAlumno(matricula);
  let arrayCursos:CursosAlumnoGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: []
  };
  listaCursos?.data?.forEach((curso:CursoGql) => {
    if(Date.now() > Date.parse(curso.FechaFin)){
      curso.Estatus = Estatus.Finalizado;
      arrayCursos.Finalizados.push(curso);
    }else if(Date.now() < Date.parse(curso.FechaIni)){
      curso.Estatus = Estatus.Pendiente;
      arrayCursos.Pendientes.push(curso);
    }else{
      curso.Estatus = Estatus.EnProceso;
      arrayCursos.EnProceso.push(curso);
    }
  });
  return arrayCursos;
}

const Estudiante = () => {
  const arrayCursos:CursosAlumnoGql = getCursosEstudiantes(202221005/*202122015*/);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>HOME ESTUDIANTE.</b>
        </Typography>
      </Grid>
      {arrayCursos?.Finalizados?.map((curso:CursoGql, i) =>
        <Grid item xs={3}>
          <CardList key={i} data={getDataCardCursoFinalizado(curso)} />
        </Grid>
      )}
      {arrayCursos?.Pendientes?.map((curso:CursoGql, i) =>
        <Grid item xs={3}>
          <CardList key={i} data={getDataCardCursoPendiente(curso)} />
        </Grid>
      )}
      {arrayCursos?.EnProceso?.map((curso:CursoGql, i) =>
        <Grid item xs={3}>
          <CardList key={i} data={getDataCardCursoEnProceso(curso)} />
        </Grid>
      )}
    </Grid>
  );
};
export default Estudiante;
