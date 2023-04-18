import { Grid, Link } from "@mui/material";
import { CardList } from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { CursoPorIniciarGql } from "@shared/types/cursosPorIniciarGql";
import { getDataCardCursoAIniciar } from "@shared/components/cards/createDataCardCursoPorIniciar";

const CardsCursosAIniciar = (props:any) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCursos:CursoPorIniciarGql[] = props.data;
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
        <Grid item xs={8}>
          <Link href="https://">
            <h3>Oferta de cursos del año vigente</h3>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{padding:"50px"}}>
        {arrayCursos?.map((curso:CursoPorIniciarGql, i) =>
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
            <CardList data={getDataCardCursoAIniciar(curso, currentRol)} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default CardsCursosAIniciar;
