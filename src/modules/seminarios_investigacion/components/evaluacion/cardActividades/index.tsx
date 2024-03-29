import React from 'react';
import EcosurActividadCard from './CardActividades';

import { Alert, CircularProgress, Card, Typography, Box, Grid } from '@mui/material';
import { ListAlt } from '@mui/icons-material/';
import { Evaluacion } from '../../../types';
import { useGetActividadesInfo } from '../../../queries';
import { ActividadInfo } from '../../../types';

export const CardActividadWithoutFetch: React.FC<{ actividad: Evaluacion[], bgColor: string, bgBox: string, titleColor: string, textColor: string }> = ({
  actividad, 
  bgColor,
  bgBox,
  titleColor,
  textColor,
}) => {      
  if (actividad.length == 0) {
    return (
      <Alert severity="error">
        No se encontró la evaluación del Consejo tutelar
      </Alert>
    );
  } else {
    let ActividadesInfo = [];
    let actividadInfo: ActividadInfo = {
      publicaciones: [],
      congresos: [],
      estancias: [],
      cursos: [],
    };
    actividadInfo.publicaciones = actividad[0].publicaciones; 
    actividadInfo.congresos = actividad[0].congresos; 
    actividadInfo.estancias = actividad[0].estancias; 
    actividadInfo.cursos = actividad[0].cursos; 
    ActividadesInfo.push(actividadInfo);
    return (
      <>
        <Typography component='div'>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
            <Box sx={{ pr: 1 }}>
            <ListAlt /> 
            </Box>
            <Box>
            <b>Actividades realizadas por el/la estudiante durante el seminario</b>
            </Box>
          </Grid>
        </Typography>
        <EcosurActividadCard data={ActividadesInfo} sizeRow='all' color={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
      </>
    )
  }
}; // CardActividadWithoutFetch

export const CardActividades: React.FC<{
  IdAlumnosMaterias: number;
  bgColor?: string;
  bgBox?: string;
  titleColor?: string;
  textColor?: string;
}> = ({ IdAlumnosMaterias: IdAlumnosMaterias, bgColor = 'white', bgBox = 'background.default', textColor = 'text.secondary', titleColor = 'primary' }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetActividadesInfo(IdAlumnosMaterias);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información de las actividades del estudiante
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let actividades: Evaluacion[];
  if (isSuccess) {
    actividades = data;
  }
  return (
    <>
        <Card key={`card-integrante-ct-1`}>
            <CardActividadWithoutFetch actividad={actividades} bgColor={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
        </Card>
    </>       
  );
}; // CardActividades
