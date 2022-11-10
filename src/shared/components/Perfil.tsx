import React from 'react';

import { Alert, CircularProgress } from '@mui/material';
import { EcosurProfileCard } from 'ecosur-ui';
import { EstudianteGql } from '../types';
import { useGetEstudianteInfo } from '../queries';

export const PerfilWithoutFetch: React.FC<{ estudiante: EstudianteGql }> = ({
  estudiante,
}) => {
  const estudianteInfo = {
    matricula: estudiante.Matricula,
    nombre: `${estudiante.Datos.Nombre}, ${estudiante.Datos.ApellidoPaterno} ${estudiante.Datos.ApellidoMaterno}`,
    'Año de estudio actual': estudiante.AnioDeEstudiosActual.value,
    tesis: estudiante.Tesis,
    unidad: estudiante.UnidadAdscripcion.value,
    orientacion: estudiante.Orientacion.Nombre,
    generacion: estudiante.Generacion.Value,
    programa: estudiante.Programa.NombreLargo,
    correo: estudiante.Datos.Email,
    'Director de tesis': `${estudiante[0].Persona.Nombre}, ${estudiante[0].Persona.ApellidoPaterno} ${estudiante[0].Persona.ApellidoMaterno}`,
    Estatus: estudiante.Estatus,
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
