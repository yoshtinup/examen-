import {Button, Container, Grid, List, ListItem, ListItemText, Paper } from "@mui/material";
import { HeaderSection } from "@shared/components";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SchoolIcon from '@mui/icons-material/School';
import { EcosurAuth } from "@modules/auth/definitions";
import { useGetEstudianteInfo } from "@shared/queries";
import { userStateAtom } from "@modules/auth/recoil";
import { useRecoilValue } from "recoil";
import { EstudianteGql } from "@shared/types";

const style = {
  padding: '30px',
  backgroundColor:"#fff",
  marginTop:"30px"
}

const EvaluacionEtica = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(user.estudiante.matricula);
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  let userInfo:EstudianteGql = data[0];
  return (
    <Container maxWidth={false} style={{...style }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <HeaderSection label="EVALUACIÓN ÉTICA DE LA INVESTIGACIÓN" shadow={false} />
        </Grid>
        <Grid item xs={8}>
          <List sx={{ width: '100%', bgcolor: '#ecf0f5' }}>
            <ListItem
              secondaryAction={
                <Paper elevation={1} style={{width:"fit-content", padding:"13px", textAlign:"center"}}>
                  Estatus<br />
                  <b style={{color:"green"}}>⬤ </b>
                  Pendiente de revisión
                </Paper>
              }
            >
              <Paper elevation={1} style={{width:"fit-content",padding:"13px"}}>
                <SchoolIcon style={{fontSize:"40px"}} />
              </Paper>
              <ListItemText
                style={{marginLeft:"20px"}}
                primary="Protócolo"
                secondary={<span style={{width:"80%", display:"block"}}>{userInfo.Tesis}</span>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1} style={{position:"relative"}}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem secondaryAction={<Button variant="contained"><InsertLinkIcon/></Button>}>
                <ListItemText
                  primary={<p style={{width:"80%", margin:"0"}}>Conocer más sobre la evaluación ética</p>}
                  secondary="Acceso a documentos y fechas importantes"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EvaluacionEtica;
