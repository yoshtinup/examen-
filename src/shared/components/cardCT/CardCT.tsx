import React from 'react';

import { Alert, CircularProgress, Container, Box, Stack, Card } from '@mui/material';
import { EcosurProfileCard } from 'ecosur-ui';
import { IntegrantesCTElement } from '../../types';
import { useGetIntegrantesInfo } from '../../queries';

export const CardCTWithoutFetch: React.FC<{ integrante: IntegrantesCTElement[] }> = ({
  integrante,
}) => {    

let integrantesInfo = [];
let integranteInfo = {
  nombre: '',
  participacion: '',
  evaluacion: '',
  // email: '',
};

console.log(integrante);


integrante.forEach(function (integrante: any) {
    const nombre_completo = integrante.Datos.Persona.Nombre + ' ' + integrante.Datos.Persona.ApellidoPaterno  + ' ' + integrante.Datos.Persona.ApellidoMaterno;
    const participacion = integrante.Datos.Participacion.Value;
    const evaluacion = integrante.FechaFirmaTutor === null ? 'Pendiente por evaluar' : '- Evaluó el ' + integrante.FechaFirmaTutor;
    // integrantesInfo[contador] = nombre_completo + ' (' + participacion + ') ' + evaluacion;
    // contador++;
    integranteInfo.nombre = nombre_completo; 
    integranteInfo.participacion = participacion; 
    integranteInfo.evaluacion = evaluacion; 
    // integranteInfo.email = email; 
    integrantesInfo.push(integranteInfo);
  });   
  // console.log(integrantesInfo);
  
  return <EcosurProfileCard data={integrantesInfo} sizeRow='all' color='white' />;
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

