import React from 'react';

import { Alert, CircularProgress } from '@mui/material';
import { EcosurProfileCard } from 'ecosur-ui';
import { EstudianteGql } from '../types';
import { useGetEstudianteInfo } from '../queries';

type PerfilWithoutFetchProps = {
  estudiante: EstudianteGql;
  infoExtra?: object;
};

export const PerfilWithoutFetch: React.FC<PerfilWithoutFetchProps> = ({
  estudiante,
  infoExtra = {},
}) => {
  const estudianteInfo = {
    nombre: `${estudiante.Datos.Nombre}, ${estudiante.Datos.ApellidoPaterno} ${estudiante.Datos.ApellidoMaterno}`,
    programa: estudiante.Programa.NombreLargo,
    orientación: estudiante.Orientacion.Nombre,
    'Unidad de adscripción': estudiante.UnidadAdscripcion.value,
    'Año de estudio actual': estudiante.AnioDeEstudiosActual.value,
    'Director/a de tesis': `${estudiante.DirectorTesis[0].Persona.Nombre}, ${estudiante.DirectorTesis[0].Persona.ApellidoPaterno} ${estudiante.DirectorTesis[0].Persona.ApellidoMaterno}`,
    tesis: estudiante.Tesis,
    generación: estudiante.Generacion.Value,
    correo: estudiante.Datos.Email,
    Estatus: estudiante.Estatus,
    ...infoExtra,
  };
  return <EcosurProfileCard data={estudianteInfo} />;
};

export const Perfil: React.FC<{
  matricula: number;
}> = ({ matricula }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetEstudianteInfo(matricula);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la informacion del alumno
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let estudiante: EstudianteGql;
  if (isSuccess) {
    estudiante = data[0];
  }
  return <PerfilWithoutFetch estudiante={estudiante} />;
};
