import { Grid, Typography } from "@mui/material";
import { CursoGql, CursosAlumnoGql } from "@shared/types";
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso
} from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom, userStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { EcosurAuth } from "@modules/auth/definitions";

const CardsCursos = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCursos:CursosAlumnoGql = props.data;
  if(!arrayCursos){
    return <></>;
  }
  return (
    <>
      <Grid container spacing={2} style={{padding:"10px 50px 0"}}>
        <Grid item xs={8}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{padding:"50px"}}>
        {(arrayCursos?.EnProceso?.length > 0 || arrayCursos?.Pendientes?.length > 0) &&
          <>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <b>En proceso y por iniciar</b>
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
          </>
        }
        {arrayCursos?.Finalizados?.length > 0 &&
          <>
            <Grid item xs={12} style={(arrayCursos?.EnProceso?.length > 0 || arrayCursos?.Pendientes?.length > 0) ? {marginTop:"50px"} : {}}>
              <Typography variant="body1" gutterBottom>
                <b>Finalizados</b>
              </Typography>
            </Grid>
            {arrayCursos?.Finalizados?.map((curso:CursoGql, i) =>
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                <CardList data={getDataCardCursoFinalizado(curso, currentRol, user.estudiante.matricula)} />
              </Grid>
            )}
          </>
        }
      </Grid>
    </>
  );
};
export default CardsCursos;
