import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AlumnoDetallesItemProps } from '@moduleCEIAlumnos/__generated__/globalTypes';

type CardProps = {
  alumnoInfo: AlumnoDetallesItemProps;
};

/**
 * Componente que muestra en un grid la informacion del alumno
 * @param
 * @returns
 */
const Information: React.FC<CardProps> = ({ alumnoInfo }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <List>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>Nombre:</Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.nombre}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>Programa de estudios:</Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.programa}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>Orientación:</Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.orientacion}
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>Unidad:</Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.unidad}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>Director de tesis:</Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.director}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography component="span" sx={{ mr: 1 }}>
              <Box sx={{ fontWeight: 'bold', m: 1 }}>
                Título de protocolo de tesis:
              </Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {alumnoInfo.titulo}
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Information;
