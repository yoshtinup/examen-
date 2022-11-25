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
      <Grid item xs={12}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          A continuación, se presenta la información del consejo tutelar
          seleccionado por la persona estudiante, todos han aceptado, revise la
          información y si esta de acuerdo haga clic en el botón{' '}
          <b>Aprobar consejo tutelar </b>.
        </p>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
