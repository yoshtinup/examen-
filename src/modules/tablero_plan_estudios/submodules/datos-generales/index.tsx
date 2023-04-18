import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import { Avatar, Grid, Paper } from "@mui/material";
import { useGetEstudianteInfo } from "@shared/queries";
import { EstudianteGql } from "@shared/types";
import { useRecoilValue } from "recoil";

const DatosGenerales = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(user.estudiante.matricula);
  let userInfo:EstudianteGql = {} as EstudianteGql;
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  userInfo = data[0];
  return (
    <Paper style={{padding:"20px"}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            alt={
              userInfo.Datos.Nombre + " " +
              userInfo.Datos.ApellidoPaterno + " " + 
              userInfo.Datos.ApellidoMaterno
            }
            src="https://"
            sx={{ width: 70, height: 70 }}
          />
        </Grid>
        <Grid item xs={10}>
          <>Bienvenido, {userInfo.Datos.Nombre + " " + userInfo.Datos.ApellidoPaterno + " " +  userInfo.Datos.ApellidoMaterno}</>
          <br />
          <>Example data</>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default DatosGenerales;
