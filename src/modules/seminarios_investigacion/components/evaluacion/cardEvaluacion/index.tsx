import React from 'react';
import { Alert, CircularProgress, Card, Typography, Box, Grid } from '@mui/material';
import { Description } from '@mui/icons-material/';
import EcosurEvaluacionCard from './CardEvaluacion';
import { useGetEvaluacionInfo } from '../../../queries';
import { Evaluacion } from '../../../types';

export const CardEvaluacionWithoutFetch: React.FC<{ evaluacion: Evaluacion[], bgColor: string, bgBox: string, titleColor: string, textColor: string }> = ({
  evaluacion, 
  bgColor,
  bgBox,
  titleColor,
  textColor,
}) => {      
  if (evaluacion.length == 0) {
    return (null);
  } else {
    return (
      <>
        <Typography component='div'>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
            <Box sx={{ pr: 1 }}>
              <Description /> 
            </Box>
            <Box>
              <b>Evaluación del director/a</b>
            </Box>
          </Grid>
        </Typography>
        <EcosurEvaluacionCard data={evaluacion} sizeRow='all' color={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
      </>
    )
  }
}; // CardActividadWithoutFetch

export const CardEvaluacion: React.FC<{
  IdAlumnosMaterias: number;
  bgColor?: string;
  bgBox?: string;
  titleColor?: string;
  textColor?: string;
}> = ({ IdAlumnosMaterias: IdAlumnosMaterias, bgColor = 'white', bgBox = 'background.paper', textColor = 'text.secondary', titleColor = 'text.primary' }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetEvaluacionInfo(IdAlumnosMaterias);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información de la evaluación
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let evaluacion: Evaluacion[];
  if (isSuccess) {
    evaluacion = data;
  }
  return (
    <>
        <Card key={`ecosur-card-evaluacion`}>
            <CardEvaluacionWithoutFetch evaluacion={evaluacion} bgColor={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
        </Card>
    </>       
  );
}; // CardEvaluacion
