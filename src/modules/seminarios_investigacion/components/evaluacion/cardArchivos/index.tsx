import React from 'react';
import EcosurCardArchivos from './CardArchivos';

import { Alert, CircularProgress, Box, Card, Typography, Grid } from '@mui/material';
import { Evaluacion } from '../../../types';
import { useGetArchivosInfo } from '../../../queries';
import { PictureAsPdf } from '@mui/icons-material/';

export const CardArchivosWithoutFetch: React.FC<{ archivos: Evaluacion[], bgColor: string }> = ({
  archivos, 
  bgColor = 'white',
}) => {    
  if (archivos.length == 0 || (archivos[0].NombreArchivo_Acta == null && archivos[0].boletaCalificacion.url == null)) {
    return (null);
  } else {
    return (
      <>
        <Typography component='div'>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
            <Box sx={{ pr: 1 }}>
            <PictureAsPdf /> 
            </Box>
            <Box>
            <b>Archivos</b>
            </Box>
          </Grid>
        </Typography>
        <EcosurCardArchivos data={archivos} sizeRow='all' color={bgColor} />
      </>
    );
  }
}; // CardArchivosWithoutFetch

export const CardArchivos: React.FC<{
  IdAlumnoMateria: number;
  bgColor?: string;
}> = ({ IdAlumnoMateria: IdAlumnoMateria, bgColor = 'white' }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetArchivosInfo(IdAlumnoMateria);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información de los archivos.
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let archivosInfo: Evaluacion[];
  if (isSuccess) {
    archivosInfo = data;
  }
  return (
    <>
      <Card key={`ecosur-card-archivos-1`}>
          <CardArchivosWithoutFetch archivos={archivosInfo} bgColor={bgColor} />
      </Card>
    </>       
  );
}; // CardArchivos
