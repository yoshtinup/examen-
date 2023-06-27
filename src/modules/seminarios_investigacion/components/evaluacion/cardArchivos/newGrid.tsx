import * as React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link } from '@mui/icons-material';
import { Evaluacion } from '../../../types';

type Color = {
  textColor: string;
  titleColor: string;
};

interface NewGridCTProps extends Color {
  data: Array<Evaluacion>;
} // NewGridCTProps

export const NewGridCardArchivos = ({
  data = [],
  textColor = '',
  titleColor = '',
}: NewGridCTProps) => {
  return (
    <Grid item>
      {data.map((archivo, key) => (
            <Grid container key={`ecosur-archivos-card-${key}`} alignItems='center'>
              <Box sx={{ pb: 1 }}>
                <Typography variant='body2' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                  {
                    (archivo.NombreArchivo_Acta !== null) ?
                      archivo.NombreArchivo_Acta.includes('ecosur365p-my.sharepoint') ?
                        <Button target='_blank' sx={{ textTransform: 'none' }} color='info' variant="outlined" startIcon={<Link />}
                        href={`${archivo.NombreArchivo_Acta}`}>
                          Acta del seminario
                        </Button>
                        :
                        <Button target='_blank' sx={{ textTransform: 'none' }} color='info' variant="outlined" startIcon={<Link />}
                        href={`https://serviciosposgrado.ecosur.mx/apiwebposgradoalumnos/Content/Cursos/EvaluacionSeminarios/${archivo.NombreArchivo_Acta}`}>
                        Acta del seminario
                        </Button>
                      :
                        ''
                  }                  
                </Typography>
              </Box>
              <Box sx={{ pb: 1 }}>
                <Typography variant='body2' display='inline' color={titleColor} sx={{ ml: 0.5, fontSize: '80%' }}>
                  {
                    (archivo.boletaCalificacion.url !== null) ?
                      <Button target='_blank' sx={{ textTransform: 'none' }} color='info' variant="outlined" startIcon={<Link />}
                      href={`https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/Calificaciones/BoletasEstudiantesMaterias/${archivo.boletaCalificacion.url}`}>
                        Boleta de calificaciones
                      </Button>
                      :
                        ''
                  }
                </Typography>   
              </Box>                          
            </Grid>
        ))}
    </Grid>
  );
}; // NewGridCT
