import React from 'react';
import EcosurCTCard from '.';

import { Alert, CircularProgress, Container, Box, Stack, Card } from '@mui/material';
import { IntegrantesCTElement } from '../../types';
import { useGetIntegrantesInfo } from '../../queries';
import { integranteInfo } from '../,,/../../types/integranteCT';

export const CardCTWithoutFetch: React.FC<{ integrante: IntegrantesCTElement[] }> = ({
  integrante,
}) => {    

let integrantesInfo = [];

let integranteInfo: integranteInfo = {
  nombre: '',
  participacion: '',
  evaluacion: '',
  email: '',
};

integrante.forEach(function (integrante: any) {
    const nombre_completo = integrante.Datos.Persona.Nombre + ' ' + integrante.Datos.Persona.ApellidoPaterno  + ' ' + integrante.Datos.Persona.ApellidoMaterno;
    integranteInfo.nombre = nombre_completo; 
    integranteInfo.participacion = integrante.Datos.Participacion.Value; 
    integranteInfo.evaluacion = integrante.FechaFirmaTutor; 
    integranteInfo.email = integrante.Datos.Persona.Email; 
    integrantesInfo.push(integranteInfo);
  });   
  // console.log(integrantesInfo);
  
  return <EcosurCTCard data={integrantesInfo} sizeRow='all' color='white' />;
};

export const CardCT: React.FC<{
  IdEvaluacionSeminario: number;
}> = ({ IdEvaluacionSeminario: IdEvaluacionSeminario }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetIntegrantesInfo(IdEvaluacionSeminario);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la informacion del alumno
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let integrantes: IntegrantesCTElement[];
  if (isSuccess) {
    integrantes = data;
  }
  return (
    <>
        <br />
        <b>Consejo Tutelar</b>
        <Card key={`card-integrante-ct-1`}>
            <CardCTWithoutFetch integrante={integrantes} />
        </Card>
    </>       
  );
};

