import React from 'react';
import { useQuery } from 'react-query';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { Alert, CircularProgress } from '@mui/material';
import { IntegranteCT } from '@modules/consejo_tutelar/types';

interface LoadCTPropsBase {
  matricula: number;
  isDirector?: boolean;
}

interface LoadCTProps extends LoadCTPropsBase {
  matricula: number;
  isDirector?: boolean;
  Component: React.FC<{ integrantes: IntegranteCT[] }>;
}

const LoadCT: React.FC<LoadCTProps> = ({
  matricula,
  isDirector = false,
  Component,
}) => {
  const { data, error, isLoading } = useQuery('integrantesCT', async () =>
    ConsejoTutelarQuerys.getIntegrantes(matricula, isDirector)
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return <Alert severity="error">No se pudo acceder a la estancia</Alert>;
  return <Component integrantes={data === undefined ? [] : data} />;
};

interface LoadCTChildremProps extends LoadCTPropsBase {
  matricula: number;
  isDirector?: boolean;
  Component: React.FC<React.PropsWithChildren<{ integrantes: IntegranteCT[] }>>;
}

export const LoadCTChildrem: React.FC<
  React.PropsWithChildren<LoadCTChildremProps>
> = ({ matricula, isDirector = false, Component, children }) => {
  const { data, error, isLoading } = useQuery('integrantesCT', async () =>
    ConsejoTutelarQuerys.getIntegrantes(matricula, isDirector)
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return <Alert severity="error">No se pudo acceder a la estancia</Alert>;
  return (
    <Component integrantes={data === undefined ? [] : data}>
      {children}
    </Component>
  );
};
export default LoadCT;
