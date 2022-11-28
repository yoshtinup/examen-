import * as React from 'react';

import { IntegrantesCTElement } from '../../../types/integranteCT';
import { Box, Grid, Typography } from '@mui/material';

type Color = {
  textColor: string;
  titleColor: string;
};

interface NewGridCTProps extends Color {
  data: Array<IntegrantesCTElement>;
} // NewGridCTProps

export const NewGridCT = ({
  data = [],
  textColor = '',
  titleColor = '',
}: NewGridCTProps) => {
  return (
    <Grid item>
      {data.map((integrante, key) => (
            <Box key={`ecosur-ct-card-${key}`} alignItems='center' sx={{ mb: 1 }}>
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                    <b>{key+1}.- </b> {integrante.Datos.Persona.Nombre + ' ' + integrante.Datos.Persona.ApellidoPaterno + ' ' + integrante.Datos.Persona.ApellidoMaterno} 
                </Typography>
                <Typography variant='body2' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                    (<b>{integrante.Datos.Participacion.Value}</b>)
                </Typography>
                {
                  (integrante.FechaFirmaTutor === null  && integrante.Datos.Participacion.Value == 'Tutor')  ? 
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, color: "red", fontSize: '80%'  }}>
                      <b>-</b> Pendiente de asignar calificación y firmar
                    </Typography>  
                  : (integrante.FechaFirmaTutor === null  && integrante.Datos.Participacion.Value !== 'Tutor')  ?  
                      <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, color: "red", fontSize: '80%'  }}>
                        <b>-</b> Pendiente de firmar
                      </Typography>            
                    :
                    <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                      <b>-</b> {integrante.FechaFirmaTutor.toString()}
                    </Typography> 
                }    
                <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                  <b>-</b> {integrante.Datos.Persona.Email}
                </Typography>                             
            </Box>
        ))}
    </Grid>
  );
}; // NewGridCT
