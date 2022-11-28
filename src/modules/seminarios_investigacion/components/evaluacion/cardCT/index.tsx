import React from 'react';
import EcosurCTCard from './CardCT';

import { Alert, CircularProgress, Box, Card, Typography, Grid } from '@mui/material';
import { IntegrantesCTElement } from '../../../types';
import { useGetIntegrantesInfo } from '../../../queries';
import { Groups } from '@mui/icons-material/';

export const CardCTWithoutFetch: React.FC<{ integrante: IntegrantesCTElement[], bgColor: string }> = ({
  integrante, 
  bgColor = 'white',
}) => {    
  if (integrante.length == 0) {
    return (
      <Alert severity="error">
        No se encontró la evaluación del Consejo tutelar
      </Alert>
    );
  } else {
    return (
      <>
        <Typography component='div'>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
            <Box sx={{ pr: 1 }}>
            <Groups /> 
            </Box>
            <Box>
            <b>Consejo Tutelar</b>
            </Box>
          </Grid>
        </Typography>
        <EcosurCTCard data={integrante} sizeRow='all' color={bgColor} />
      </>
    );
  }
}; // CardCTWithoutFetch

export const CardCT: React.FC<{
  IdEvaluacionSeminario: number;
  bgColor?: string;
}> = ({ IdEvaluacionSeminario: IdEvaluacionSeminario, bgColor = 'white' }) => {
  const { data, isError, isLoading, isSuccess } = useGetIntegrantesInfo(IdEvaluacionSeminario);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información del consejo tutelar
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let integrantes: IntegrantesCTElement[];
  if (isSuccess) {
    integrantes = data;
  }
  return (
    <>
        <Card key={`ecosur-card-integrante-ct-1`}>
            <CardCTWithoutFetch integrante={integrantes} bgColor={bgColor} />
        </Card>
    </>       
  );
}; // CardCT
