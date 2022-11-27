import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
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

const AcademicoInterno = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado se visualiza la información relacionada con la
          conformación de consejo tutelar, Organo Colegiado que supervisará el
          desempeño académico de estudiantes y colaborará en la definición y
          desarrollo de sus tema de investigación. <br />
          <br />
          Los estudiantes se organizan en dos pestañas principales:
        </p>
        <ul>
          <li>
            <b>INTEGRANTE DE CONSEJO TUTELAR</b> <br />
            Contiene a las personas estudiantes que le postularon para ser{' '}
            <b>asesor/a</b>. Acceda a esta pestaña para aceptar o declinar su
            participación.
          </li>
          <li>
            <b>DIRECTOR/A DE TESIS</b> <br />
            Contiene a las personas estudiantes que es <b>director/a</b> de
            tesis. Acceda a esta pestaña para revisar y aprobar la conformación
            de consejo tutelar. Visualizará a los estudiantes en el listado
            hasta que todos los integrantes hayan aprobado su partipación en el
            consejo tutelar.
          </li>
        </ul>
      </Grid>
      <Enlaces />
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
          En este apartado se visualiza la información de consejos tutelares
          propuestos de estudiantes adscritos a su unidad. En{' '}
          <b>enlaces importantes</b> puede revisar los lineamientos para la
          integración de los consejos tutelares. <br />
          <br />
        </p>
        <ul>
          <li>
            <b>Pendientes de evaluar</b> <br />
            Se visualiza la relación de estudiantes que están pendientes de su
            evaluación. Por favor ingrese a los registros dando clic en el botón{' '}
            <b>evaluar</b>.
          </li>
          <li>
            <b>Evaluados</b> <br />
            se visualiza la información de los consejos tutelares que ya fueron
            evaluados. Puede visualizar el estatus haciendo clic en <b>Ver</b>
          </li>
        </ul>
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
          En este apartado se visualiza la información de consejos tutelares
          propuestos de estudiantes en proceso de evaluación. En{' '}
          <b>enlaces importantes</b> puede revisar los lineamientos para la
          integración de los consejos tutelares. <br />
          <br />
        </p>
        <ul>
          <li>
            <b>Pendientes de evaluar</b> <br />
            Se visualiza la relación de estudiantes que están pendientes de su
            evaluación. Por favor ingrese a los registros dando clic en el botón{' '}
            <b>evaluar</b>.
          </li>
          <li>
            <b>Evaluados</b> <br />
            se visualiza la información de los consejos tutelares que ya fueron
            evaluados. Puede visualizar el estatus haciendo clic en <b>Ver</b>
          </li>
        </ul>
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
          En este apartado se visualiza la información de consejos tutelares
          propuestos que pertenecen a las orientaciones de las cuales usted es
          responsable para su evaluación. En <b>enlaces importantes</b> puede
          revisar los lineamientos para la integración de los consejos
          tutelares. <br />
          <br />
        </p>
        <ul>
          <li>
            <b>Pendientes de evaluar</b> <br />
            Se visualiza la relación de estudiantes que están pendientes de su
            evaluación. Por favor ingrese a los registros dando clic en el botón
            <b>evaluar</b>.
          </li>
          <li>
            <b>Evaluados</b> <br />
            se visualiza la información de los consejos tutelares que ya fueron
            evaluados. Puede visualizar el estatus haciendo clic en <b>Ver</b>.
          </li>
        </ul>
      </Grid>
      <Enlaces />
    </Grid>
  );
};

const Externos = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
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
          pasos:
        </p>
        <ul>
          <li>
            En la primer pestaña <b>PENDIENTES</b> se visualizan las solicitudes
            pendientes de revisar. Por favor de clic en el botón <b>Evaluar</b>{' '}
            para confirmar o declinar su participación.
          </li>
          <li>
            En la segunda pestaña <b>ACEPTADAS</b> se visualizan las solicitudes
            en las que ya ha confirmado su participación.
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

const Instrucciones = ({ rol }) => {
  const TiposInstrucciones = [
    Externos,
    AcademicoInterno,
    ResponsableOrientacion,
    CoordinadorUnidad,
    Posgrado,
  ];
  const Contentinstrucciones = TiposInstrucciones[rol];
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      id="SectionLogin"
      style={{ padding: '15px 50px' }}
    >
      <Contentinstrucciones />
    </Grid>
  );
};

export default Instrucciones;
