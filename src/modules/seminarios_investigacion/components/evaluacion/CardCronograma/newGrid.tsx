// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { ActividadInfo } from '../../../types';

import { Box, Grid, Typography } from '@mui/material';
import { AdjustOutlined, Login } from '@mui/icons-material';

type Color = {
  textColor: string;
  titleColor: string;
  bgBox: string
};

interface NewGridProfileProps extends Color {
  startIndex: number;
  finalIndex: number;
  data: Array<ActividadInfo>;
} // NewGridProfileProps

interface PropiedadesProps extends Color {
  value: ActividadInfo;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NewGridProfile = ({
  data = [],
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
  bgBox = '',
}: NewGridProfileProps) => {
  return (
    <Grid item>
            <Box alignItems='center'>
              <Box sx={{ pb: 0.5, mb: 1, bgcolor: bgBox }}>
                <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5 }}>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ pr: 1 }}>
                      <AdjustOutlined fontSize='small' /> 
                    </Box>
                    <Box>
                      <b>Publicaciones</b>
                    </Box>
                  </Grid>
                </Typography>
                {
                  data[0].publicaciones.length !== 0 ? data[0].publicaciones.map(publicacion => (
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° <b>{publicacion.titulo}</b>, {publicacion.tipoarbitrado} publicado en {publicacion.publicadoen}. {publicacion.Annio}. {publicacion.tipoparticipacion}
                    </Typography>
                  )) : 
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                    ° No realizó publicaciones
                    </Typography>
                }
              </Box>
              <Box sx={{ pb: 0.5, mb: 1, bgcolor: bgBox }}>
                <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5 }}>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ pr: 1 }}>
                      <AdjustOutlined fontSize='small' /> 
                    </Box>
                    <Box>
                      <b>Congresos</b>
                    </Box>
                  </Grid>
                </Typography>
                {
                  data[0].congresos.length !== 0 ? data[0].congresos.map(congreso => (
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° <b>{congreso.titulo}</b>, realizado en {congreso.lugar}, el {congreso.fecha}. {congreso.tipoparticipacion}
                    </Typography>
                  )) : 
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° No realizó congresos
                    </Typography>
                }
              </Box>   
              <Box sx={{ pb: 0.5, mb: 1, bgcolor: bgBox }}>
                <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5 }}>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ pr: 1 }}>
                      <AdjustOutlined fontSize='small' /> 
                    </Box>
                    <Box>
                      <b>Estancias</b>
                    </Box>
                  </Grid>
                </Typography>
                {
                  data[0].estancias.length !== 0 ? data[0].estancias.map(estancia => (
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° <b>{estancia.centro}</b>, en el área {estancia.area}, del {estancia.fechainicio} al {estancia.fechaconclusion}. {estancia.ambito}
                    </Typography>
                  )) : 
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° No realizó estancias
                    </Typography>
                }
              </Box>    
              <Box sx={{ pb: 0.5, bgcolor: bgBox }}>
                <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5 }}>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ pr: 1 }}>
                      <AdjustOutlined fontSize='small' /> 
                    </Box>
                    <Box>
                      <b>Cursos fuera de Ecosur</b>
                    </Box>
                  </Grid>
                </Typography>
                {
                  data[0].cursos.length !== 0 ? data[0].cursos.map(curso => (
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° <b>{curso.nombrecurso}</b>, en la institución {curso.institucion}, en el periodo {curso.fechainicio} al {curso.Fechaconclusion}
                    </Typography>
                  )) : 
                    <Typography variant='body2' color={textColor} sx={{ pl: 5, mb: 0.5, fontSize: '80%' }}>
                      ° No realizó cursos fuera de Ecosur
                    </Typography>
                }
              </Box>                                        
            </Box>
    </Grid>
  );
}; // NewGridProfile

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; // capitalizeFirstLetter