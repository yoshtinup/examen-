import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid, Container } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const Enlaces = () => {
  return (
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
  );
};

const CoordinadorUnidad = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado podrá revisar la información del estudiante, así como
          las personas propuestas para conformar el consejo tutelar. Por favor,
          revise que cumplan con los requisitos para participar (ver enlaces
          importantes: Lineamientos para la integración de CT).
          <br />
          <br />
          Las personas integrantes que no cumplan con los requisitos haga clic
          en el botón <b>No aprobar</b> correspondiente y registre las razones
          de no aprobación.
        </p>
      </Grid>
      <Enlaces />
    </Grid>
  );
};

const ResponsableOrientacion = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado podrá revisar la información del estudiante, así como
          las personas propuestas para conformar el consejo tutelar. Por favor,
          revise que cumplan con los requisitos para participar (ver enlaces
          importantes: Lineamientos para la integración de CT).
          <br />
          <br />
          Las personas integrantes que no cumplan con los requisitos haga clic
          en el botón <b>No aprobar</b> correspondiente y registre las razones
          de no aprobación.
        </p>
      </Grid>
      <Enlaces />
    </Grid>
  );
};
const Posgrado = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado podrá revisar la información del estudiante, así como
          las personas propuestas para conformar el consejo tutelar. Por favor,
          revise que cumplan con los requisitos para participar (ver enlaces
          importantes: Lineamientos para la integración de CT).
          <br />
          <br />
          Las personas integrantes que no cumplan con los requisitos haga clic
          en el botón <b>No aprobar</b> correspondiente y registre las razones
          de no aprobación.
        </p>
      </Grid>
      <Enlaces />
    </Grid>
  );
};

const Instrucciones = ({ rol }) => {
  const TiposInstrucciones = [
    '',
    '',
    ResponsableOrientacion,
    CoordinadorUnidad,
    Posgrado,
  ];
  const Contentinstrucciones = TiposInstrucciones[rol];
  return (
    <Container maxWidth="lg" style={{ padding: '25px 0px 0px 0px' }}>
      <Grid container>
        <Grid item xs={12}>
          <Contentinstrucciones />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Instrucciones;
