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
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Para la conformación de su consejo tutelar realice los siguientes
          pasos:
        </p>
        <ul>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium
          </li>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium
          </li>
        </ul>
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
              <ListItem className="itemDeLista">
                <ListItemAvatar>
                  <Avatar className="IconoDeLista">
                    <InsertLinkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Preguntas frecuentes" secondary="" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
