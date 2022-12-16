import React from 'react';
import { EcosurContainer } from 'ecosur-ui';
import { Alert, CircularProgress, Card, Typography, Box, Grid } from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import EcosurCronogramaCard from './CardCronograma';
import { useGetCronogramaInfo } from '../../../queries';
import { Evaluacion } from '../../../types';

export const CardProgramaWithoutFetch: React.FC<{ cronograma: Evaluacion[], bgColor: string, bgBox: string, titleColor: string, textColor: string }> = ({
  cronograma, 
  bgColor,
  bgBox,
  titleColor,
  textColor,
}) => {      
  if (cronograma[0].programaactividades.length == 0) {
    return (null);
  } else {
    const CronogramaActividades = () => {
      return (
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ bgcolor: 'background.paper' }}>
            <Typography component='div' variant='body2' sx={{ pl: 2, pt: 1 }}>
              <b>Cronograma de actividades propuestas</b>
            </Typography>
          </Box>
          <Box>
            <EcosurCronogramaCard data={cronograma[0].programaactividades} sizeRow='all' color={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
          </Box>
        </Grid>
      );
    };
    const programa = [
      {
        componente: 
          <Box
            sx={{
              height: 1,
              width: 1,
            }}
          >
            <CronogramaActividades />
          </Box>,
        width: 7,
      },
      {
        componente: 
          <Box
            component="img"
            sx={{
              height: 1,
              width: 1,
            }}
            alt="The house from the offer."
            src="https://serviciosposgrado.ecosur.mx/Profesores/Content/img/CronogramaDeActividades.png"
          />,
      }
    ]
    return (
      <Box>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
           <Typography component='div'>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
              <Box sx={{ p: 0 }}>
                <ListAlt /> 
              </Box>
              <Box>
                <b>Cronograma de actividades a realizar el siguiente semestre</b>
              </Box>
            </Grid>
          </Typography>
          <EcosurContainer data={programa} />
        </Grid>
      </Box>
    );
  }
}; // CardProgramaWithoutFetch

export const CardPrograma: React.FC<{
  IdAlumnosMaterias: number;
  bgColor?: string;
  bgBox?: string;
  titleColor?: string;
  textColor?: string;
}> = ({ IdAlumnosMaterias: IdAlumnosMaterias, bgColor = 'white', bgBox = 'background.default', textColor = 'text.secondary', titleColor = 'primary' }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetCronogramaInfo(IdAlumnosMaterias);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información del cronograma de actividades
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let cronograma: Evaluacion[];
  if (isSuccess) {
    cronograma = data;
  }
  return (
    <Box key={`ecosur-card-cronograma-actividades`}>
        <CardProgramaWithoutFetch cronograma={cronograma} bgColor={bgColor} bgBox={bgBox} textColor={textColor} titleColor={titleColor} />
    </Box>    
  );
}; // CardPrograma

