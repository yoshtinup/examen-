import { Grid, Typography } from "@mui/material";
import { CursoGql, CursosAlumnoGql, Estatus } from "@shared/types";
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso
} from "@shared/components/cards";
import { useGetCursosAlumno } from "@shared/queries";
import { useRecoilValue } from "recoil";
import { rolStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";

function getCursosEstudiante(matricula:number){
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

const CardsCursos = () => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCursos:CursosAlumnoGql = getCursosEstudiante(202221005/*202122015*/);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>Cursos en proceso y por iniciar</b>
        </Typography>
      </Grid>
      {arrayCursos?.EnProceso?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={3}>
          <CardList data={getDataCardCursoEnProceso(curso, currentRol)} />
        </Grid>
      )}
      {arrayCursos?.Pendientes?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={3}>
          <CardList data={getDataCardCursoPendiente(curso, currentRol)} />
        </Grid>
      )}
      <Grid item xs={12} style={{marginTop:"50px"}}>
        <Typography variant="body1" gutterBottom>
          <b>Cursos finalizados</b>
        </Typography>
      </Grid>
      {arrayCursos?.Finalizados?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={3}>
          <CardList data={getDataCardCursoFinalizado(curso, currentRol)} />
        </Grid>
      )}
    </Grid>
  );
};
export default CardsCursos;
