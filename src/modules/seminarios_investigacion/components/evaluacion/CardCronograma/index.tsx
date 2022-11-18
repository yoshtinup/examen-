import React from 'react';
import EcosurActividadCard from './CardActividades';

import { Alert, CircularProgress, Card, Typography, Box, Grid } from '@mui/material';
import { ListAlt } from '@mui/icons-material/';
import { Evaluacion } from '../../../types';
import { useGetProgramaInfo } from '../../../queries';
import { ActividadInfo } from '../../../types';

export const CardProgramaWithoutFetch: React.FC<{ actividad: Evaluacion[], bgColor: string, bgBox: string, titleColor: string, textColor: string }> = ({
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
    return <EcosurActividadCard data={ActividadesInfo} sizeRow='all' color={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />;
  }
};

export const CardPrograma: React.FC<{
  IdAlumnosMaterias: number;
  bgColor?: string;
  bgBox?: string;
  titleColor?: string;
  textColor?: string;
}> = ({ IdAlumnosMaterias: IdAlumnosMaterias, bgColor = 'white', bgBox = 'background.default', textColor = 'text.secondary', titleColor = 'primary' }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetProgramaInfo(IdAlumnosMaterias);
    console.log(data);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información del cronograma de actividades estudiante
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let actividades: Evaluacion[];
  if (isSuccess) {
    actividades = data;
  }
  return (
    <>
        <br />
        <Typography component='div'>
          <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ pr: 1 }}>
            <ListAlt /> 
            </Box>
            <Box>
            <b>Actividades realizadas por el/la estudiante durante el seminario</b>
            </Box>
          </Grid>
        </Typography>
        <Card key={`card-integrante-ct-1`}>
            <CardProgramaWithoutFetch actividad={actividades} bgColor={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
        </Card>
    </>       
  );
};

