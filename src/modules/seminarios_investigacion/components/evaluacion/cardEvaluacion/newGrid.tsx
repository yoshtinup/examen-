// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Evaluacion } from '../../../types';
import { Description } from '@mui/icons-material/';


type Color = {
  textColor: string;
  titleColor: string;
  bgBox: string
};

interface NewGridEvaluacionProps extends Color {
  startIndex: number;
  finalIndex: number;
  data: Array<Evaluacion>;
} // NewGridActividadesProps

export const NewGridEvaluacion = ({
  data = [],
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
  bgBox = '',
}: NewGridEvaluacionProps) => {
  return (
    <Grid item>
        <Box alignItems='center'>
          <Box sx={{ pb: 0.5, bgcolor: bgBox, border: 1, borderColor: 'background.default' }}>
            {
              data.map((evaluacion, index) => (
                <Box key={`ecosur-evaluacion-info-${index}`}>
                  <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5, pb: 1 }}>
                    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box>
                        {
                          evaluacion.boletaCalificacion.calificacion.value !== null ? 
                            <>
                              <b>Calificación:</b> ({evaluacion.boletaCalificacion.calificacion.value})
                            </>
                          :
                            <>
                              <b>Calificación:</b> Aún sin asignar.
                            </>
                        }                                             
                      </Box>
                    </Grid>
                  </Typography>
                  <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5, pb: 1 }}>
                    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box>
                        {
                          (evaluacion.RecomGenerales !== null && evaluacion.RecomGenerales.length > 0) ? 
                            <>
                              <b>Observaciones y recomendaciones generales:</b> {capitalizeFirstLetter(evaluacion.RecomGenerales)}
                            </>
                          :
                            <>
                              <b>Observaciones y recomendaciones generales:</b> Ninguna.
                            </>
                        }                                  
                      </Box>
                    </Grid>
                  </Typography>
                  <Typography component='div' variant='body2' color={titleColor} sx={{ pl: 1, pt: 0.5 }}>
                    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box>
                        {
                          (evaluacion.RecomParticulares !== null && evaluacion.RecomParticulares.length > 0) ? 
                            <>
                              <b>Observaciones y recomendaciones particulares:</b> {capitalizeFirstLetter(evaluacion.RecomParticulares)}
                            </>
                          :
                            <>
                              <b>Observaciones y recomendaciones particulares:</b> Ninguna.
                            </>
                        }        
                      </Box>
                    </Grid>
                  </Typography>                  
                </Box>                
              ))
            }
          </Box>                                     
        </Box>
    </Grid>
  );
}; // NewGridActividades

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; // capitalizeFirstLetter
