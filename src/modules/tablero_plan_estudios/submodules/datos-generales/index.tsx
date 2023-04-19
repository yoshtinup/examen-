import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import { useGetEstudianteInfo } from "@shared/queries";
import { EstudianteGql } from "@shared/types";
import { useRecoilValue } from "recoil";

const DatosGenerales = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(user.estudiante.matricula);
  let userInfo:EstudianteGql = {} as EstudianteGql;
  const currentDate = Date.now();
  const fecha = new Date(currentDate);
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  userInfo = data[0];
  return (
    <Grid container spacing={2}>
      <Paper elevation={0} style={{padding:"20px"}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={
                  userInfo.Datos.Nombre + " " +
                  userInfo.Datos.ApellidoPaterno + " " + 
                  userInfo.Datos.ApellidoMaterno
                }
                src="https://"
                sx={{ width: 70, height: 70, margin:"auto" }}
              />
            </ListItemAvatar>
            <ListItemText
              style={{marginLeft: "20px"}}
              primary={
                "Bienvenido, " +
                userInfo.Datos.Nombre + " " +
                userInfo.Datos.ApellidoPaterno + " " + 
                userInfo.Datos.ApellidoMaterno
              }
              secondary={"Datos actualizados, " + fecha.toDateString()}
            />
          </ListItem>
        </List>
      </Paper>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};
export default DatosGenerales;
