import React from 'react';
import { useQuery } from 'react-query';
import ConsejoTutelarQuerys from '@modules/consejo_tutelar/queries';
import { Alert, CircularProgress } from '@mui/material';
import { IntegranteCT } from '@modules/consejo_tutelar/types';

type LoadCTProps = {
  matricula: number;
  Component: React.FC<{ integrantes: IntegranteCT[] }>;
};

const LoadCT: React.FC<LoadCTProps> = ({ matricula, Component }) => {
  const { data, error, isLoading } = useQuery('integrantesCT', async () =>
    ConsejoTutelarQuerys.getIntegrantes(matricula)
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return <Alert severity="error">No se pudo acceder a la estancia</Alert>;
  return <Component integrantes={data === undefined ? [] : data} />;
};
export default LoadCT;
