import { Grid, Typography } from "@mui/material";
import { CursoGql, CursosAlumnoGql } from "@shared/types";
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso
} from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";

const CardsCursos = (props:any) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCursos:CursosAlumnoGql = props.data;
  if(!arrayCursos){
    return <></>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>Cursos en proceso y por iniciar</b>
        </Typography>
      </Grid>
      {arrayCursos?.EnProceso?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
          <CardList data={getDataCardCursoEnProceso(curso, currentRol)} />
        </Grid>
      )}
      {arrayCursos?.Pendientes?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
          <CardList data={getDataCardCursoPendiente(curso, currentRol)} />
        </Grid>
      )}
      <Grid item xs={12} style={{marginTop:"50px"}}>
        <Typography variant="body1" gutterBottom>
          <b>Cursos finalizados</b>
        </Typography>
      </Grid>
      {arrayCursos?.Finalizados?.map((curso:CursoGql, i) =>
        <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
          <CardList data={getDataCardCursoFinalizado(curso, currentRol)} />
        </Grid>
      )}
    </Grid>
  );
};
export default CardsCursos;
