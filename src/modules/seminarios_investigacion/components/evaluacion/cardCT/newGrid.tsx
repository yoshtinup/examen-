import * as React from 'react';

import { IntegranteInfo } from '../../../types/integranteCT';
import { Box, Grid, Typography } from '@mui/material';

type Color = {
  textColor: string;
  titleColor: string;
};

interface NewGridCTProps extends Color {
  startIndex: number;
  finalIndex: number;
  data: Array<IntegranteInfo>;
} // NewGridCTProps

export const NewGridCT = ({
  data = [],
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
}: NewGridCTProps) => {
  let date: Date;
  data.slice(startIndex, finalIndex)
        .map((integrante, key) => {
    date = new Date(integrante.evaluacion);
    integrante.evaluacion = date.toDateString();
  })
  return (
    <Grid item>
      {data.slice(startIndex, finalIndex)
        .map((integrante, key) => (
            <Box key={`ecosur-ct-card-${key}`} alignItems='center' sx={{ mb: 1 }}>
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                    <b>{key+1}.- </b> {integrante.nombre} 
                </Typography>
                <Typography variant='body2' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                    (<b>{integrante.participacion}</b>)
                </Typography>
                {
                  integrante.evaluacion === null ? 
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, color: "red", fontSize: '80%'  }}>
                      <b>-</b> Pendiente por evaluar
                    </Typography>  
                  :                 
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                    <b>-</b> {integrante.evaluacion.toString()}
                    </Typography> 
                }    
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                  <b>-</b> {integrante.email}
                </Typography>                             
            </Box>
        ))}
    </Grid>
  );
}; // NewGridCT
