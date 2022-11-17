import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const enlacesImportantes = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado se visualiza la información de estudiantes que la/lo
          postularon para formar parte de su Consejo Tutelar, Organo Colegiado
          que supervisará el desempeño académico del estudiante y colaborará en
          la definición y desarrollo de su tema de investigación.
        </p>
        <p>
          Para la conformación de su consejo tutelar realice los siguientes
          pasos:En la primer pestaña <b>“PENDIENTES”</b> se visualizan las
          solicitudes pendientes de revisar. Por favor de clic en el botón
          “Evaluar” para confirmar o declinar su participación.
        </p>
        <p>
          En la segunda pestaña <b>“ACEPTADAS”</b> se visualizan las solicitudes
          en las que ya ha confirmado su participación.
        </p>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Enlaces importantes</h3>
          </Grid>
          <Grid item xs={12}>
            <List
              style={{ paddingTop: '0px' }}
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              {' '}
              <ListItem className="itemDeLista">
                <ListItemAvatar>
                  <Avatar className="IconoDeLista">
                    <InsertLinkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Lineamientos para la integración de CT"
                  secondary=""
                />
              </ListItem>
              <ListItem className="itemDeLista">
                <ListItemAvatar>
                  <Avatar className="IconoDeLista">
                    <InsertLinkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Proceso de registro y evaluación"
                  secondary=""
                />
              </ListItem>            
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
