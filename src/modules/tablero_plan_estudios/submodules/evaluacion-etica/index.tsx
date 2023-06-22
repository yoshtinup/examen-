import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { HeaderSection } from '@shared/components';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SchoolIcon from '@mui/icons-material/School';
import { EcosurAuth } from '@modules/auth/definitions';
import { useGetEstudianteInfo, useGetEvaluacionEtica } from '@shared/queries';
import { userStateAtom } from '@modules/auth/recoil';
import { useRecoilValue } from 'recoil';
import { EstudianteGql, EvaluacionEticaGql } from '@shared/types';
import { WithRolCheck } from '@shared/hooks';
import Roles from '@definitions/Roles';

const style = {
  padding: '30px',
  backgroundColor: '#fff',
  marginTop: '30px',
};

const EvaluacionEtica = (props: any) => {
  const matriculaEstudiante=props.matricula;
  const rol = WithRolCheck(Roles.Estudiante);
  const show = rol(null);
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(
    matriculaEstudiante
  );
  const evaluacionEtica = useGetEvaluacionEtica(matriculaEstudiante);
  
  if (isLoading || evaluacionEtica.isLoading) {
    return <>Cargando</>;
  }
  if (isError || evaluacionEtica.isError) {
    return <>Error</>;
  }
  let userInfo: EstudianteGql = data[0];
  let evaluacionInfo: EvaluacionEticaGql = evaluacionEtica.data[0];

  return (
    <Container maxWidth={false} style={{ ...style }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <HeaderSection
            label="EVALUACIÓN ÉTICA DE LA INVESTIGACIÓN"
            shadow={false}
          />
        </Grid>
        <Grid item xs={8}>
          <List
            sx={{  bgcolor: '#ecf0f5', height: 'fit-content', display:'flex', flexDirection: "column",
            justifyContent: "space-between",width: 'fit-content' }}
          >
            <ListItem>
              <Paper
                elevation={1}
                style={{ width: 'fit-content', padding: '13px' }}
              >
                <SchoolIcon style={{ fontSize: '40px' }} />
              </Paper>
              <ListItemText
                style={{ marginLeft: '20px' }}
                primary="Protócolo"
                secondary={
                  <span style={{ width: '80%', display: 'block' }}>
                    {userInfo.Tesis}
                  </span>
                }
              />
              
            </ListItem>
            <ListItem
            style={{position:'relative', left:'0', paddingTop:'0px',height: "fit-content",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between", 
            width: "100%",}}
            >
              {evaluacionInfo.haveestatus == 0 && 
              <Paper
                elevation={2}
                style={{
                  width: '40%',
                  height: '10vh',
                  padding: '5px',
                  textAlign: 'center',
                }}
              >
                Estatus
                <br />
                
                  <>
                    <b style={{ color: 'green' }}>⬤ </b>pendiente de
                    evaluacion{evaluacionInfo.Descripcion}
                  </>
               
              </Paper>}
              {show && evaluacionInfo.PuedeRegistrarProtocolo_CEI===false && evaluacionInfo.idFormulariosRespuestas===null &&
              <ListItemText
                style={{ textAlign:'center',  }}
                primary="Realizar registro de propuesta"
                secondary={
                   <Button variant="contained" href='https://ecosur365p.sharepoint.com/sites/CEI' target="_blank">
                    <InsertLinkIcon />
                  </Button>
                  
                }
              />}
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1} style={{ position: 'relative' }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem
              
                secondaryAction={
                  <Button variant="contained">
                    <InsertLinkIcon />
                  </Button>
                }
              >
                <ListItemText
                  primary={
                    <p style={{ width: '80%', margin: '0' }}>
                      Conocer más sobre la evaluación ética
                    </p>
                  }
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
