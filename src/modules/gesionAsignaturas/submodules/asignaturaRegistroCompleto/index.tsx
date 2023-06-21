import Roles from "@definitions/Roles";
import { rolStateAtom } from "@modules/auth/recoil";
import { Container, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const AsignaturaRegistroCompleto = ({idMOA}:{idMOA:number}) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  if(currentRol != Roles.Servicios_Escolares){
    return <>Sin permisos de acceso</>
  }
  return (
    <Container maxWidth={false} style={{...style}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>Asignatura con id = {idMOA}</b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AsignaturaRegistroCompleto;
