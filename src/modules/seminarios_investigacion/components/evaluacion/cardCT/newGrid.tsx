// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { IntegranteInfo } from '../../../types/integranteCT';

import { Box, Grid, Typography } from '@mui/material';

type Color = {
  textColor: string;
  titleColor: string;
};

interface NewGridProfileProps extends Color {
  /**
          Imágen que se mostrará en la card (opcional)
      */
  startIndex: number;
  /**
          Título que se mostrará en la parte superior de la card (opcional)
      */
  finalIndex: number;
  /**
          Lista de datos que se mostrarán en la card
      */
  data: Array<IntegranteInfo>;
} // NewGridProfileProps

interface PropiedadesProps extends Color {
  value: IntegranteInfo;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NewGridProfile = ({
  data = [],
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
}: NewGridProfileProps) => {
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
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5 }}>
                    <b>{key+1}.- </b> {integrante.nombre} 
                </Typography>
                <Typography variant='body2' display='inline' color={titleColor} sx={{ ml: 0.5 }}>
                    (<b>{integrante.participacion}</b>)
                </Typography>
                {
                  integrante.evaluacion === null ? 
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, color: "red"  }}>
                      <b>-</b> Pendiente por evaluar
                    </Typography>  
                  :                 
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5 }}>
                    <b>-</b> {integrante.evaluacion.toString()}
                    </Typography> 
                }    
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5 }}>
                  <b>-</b> {integrante.email}
                </Typography>                             
            </Box>
        ))}
    </Grid>
  );
}; // NewGridProfile

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; // capitalizeFirstLetter
