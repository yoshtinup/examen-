import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { EcosurTabs } from 'ecosur-ui';
import AsignaturasConcluidas from './components/asignaturasConcluidas';
import AsignaturasCanceladas from './components/asignaturasCanceladas';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import AsignaturasEnProceso from './components/asignaturasEnProceso';
import AsignaturasPorIniciar from './components/asignaturasPorIniciar';

const style = {
  padding: '30px',
  backgroundColor: '#fff',
};

const ServiciosEscolares = () => {
  const tablas = [
    {
      titulo: 'En proceso',
      componente: <AsignaturasEnProceso />,
    },
    {
      titulo: 'Por iniciar',
      componente: <AsignaturasPorIniciar />,
    },
    {
      titulo: 'Concluidas',
      componente: <AsignaturasConcluidas />,
    },
    {
      titulo: 'Canceladas',
      componente: <AsignaturasCanceladas />,
    },
  ];

  return (
    <Container maxWidth={false} style={{ ...style }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: '20px' }}>
          <Typography variant="h5">Procesos</Typography>
          <Grid
            container
            spacing={2}
            style={{ marginTop: '10px', backgroundColor: '#e7e7e7' }}
          >
            <ItemProcesos
              url="/seguimientoAltasYBajas"
              texto="Altas y bajas de asignaturas"
            />
            <ItemProcesos url="/inscripciones" texto="Inscripciones" />
            <ItemProcesos
              url="/seguimientoRegistroDocentes"
              texto="Registro de docentes"
            />
            <ItemProcesos
              url="/seminarios_investigacion"
              texto="Evaluación de seminario de investigación"
            />
            <ItemProcesos
              url="/seguimientoEvaluacionDocente"
              texto="Evaluación docente"
            />
            <ItemProcesos
              url="/seguimientoRegistroCalificaciones"
              texto="Asignación de calificaciones"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ margin: '20px' }}>
            Lista de asignaturas
          </Typography>
          <EcosurTabs
            data={tablas}
            align="left"
            activeColor="#ecf0f5"
            activeTextColor="black"
            key="ecosur-tabs-asig"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

function ItemProcesos({ url, texto }: { url: string; texto: string }) {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} style={{ padding: '10px' }}>
      <Paper
        style={{
          padding: '5px',
          height: '100%',
          display: 'grid',
          alignContent: 'center',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton href={url}>
              <ListItemIcon
                style={{
                  backgroundColor: '#1ab394',
                  borderRadius: '10px',
                  marginRight: '10px',
                  minWidth: 'auto',
                  padding: '7px',
                }}
              >
                <PollOutlinedIcon
                  style={{
                    color: 'white',
                    fontSize: '35px',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={texto} />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}

export default ServiciosEscolares;
