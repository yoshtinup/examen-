import * as React from 'react';
import { EstatusProcesoCT } from '@modules/consejo_tutelar/components';
import { useGetEstudianteCTEstatus } from '@modules/consejo_tutelar/queries';
import { CircularProgress, Alert } from '@mui/material';

export default function Estatus({ matricula }: { matricula: number }) {
  const { isLoading, isSuccess, error, data } =
    useGetEstudianteCTEstatus(matricula);
  if (isLoading) <CircularProgress />;
  if (error) <Alert severity="error">No se pudo cargar el estatus</Alert>;
  return (
    <>{isSuccess && <EstatusProcesoCT estatus={data[0].Estatus.Leyenda} />}</>
  );
}
