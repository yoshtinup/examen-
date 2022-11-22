import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { Alumno } from '@modules/consejo_tutelar/types';
import Roles from '@definitions/Roles';
import { useRecoilValue } from 'recoil';
import { rolStateAtom } from '@modules/auth/recoil';
import { Alert, CircularProgress } from '@mui/material';
import Table from './components';
import { EcosurTabs } from 'ecosur-ui';
import InstruccionesEnlacesIndex from './InstruccionesEnlacesIndex';

const filters = (rol: Roles, isDirector: boolean) => {
  if (isDirector) return (alumno: Alumno) => alumno.estatusGeneral > 3;
  switch (rol) {
    case Roles.Academico:
      return (alumno: Alumno) =>
        alumno.evaluadoPorIntegrantesCT || alumno.evaluadoPorIntegranteCT;
    case Roles.Externo:
      return (alumno: Alumno) =>
        alumno.evaluadoPorIntegrantesCT || alumno.evaluadoPorIntegranteCT;
    case Roles.Responsable_Orientacion:
      return (alumno: Alumno) => alumno.evaluadoPorResponsableOrientacion;
    case Roles.Coordinador_Unidad:
      return (alumno: Alumno) => alumno.evaluadoPorCordinacionUnidad;
    case Roles.Coordinacion_General_Posgrado:
      return (alumno: Alumno) => alumno.estatusGeneral > 6;
    default:
      return (_: Alumno) => true;
  }
};

type PersonalProps = {
  isDirector?: boolean;
};

const PersonalIndex: React.FC<{ rows: Alumno[] } & PersonalProps> = ({
  rows,
  isDirector = false,
}) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const filter: (alumnun: Alumno) => boolean = filters(currentRol, isDirector);
  const rows_historico = rows.filter(filter);
  const rows_pendiente = rows.filter(alumno => !filter(alumno));
  const tabs = [
    {
      titulo: 'Pendientes',
      componente: (
        <Table
          key="ct-table-list-1"
          rows={rows_pendiente}
          actionColumn={true}
        />
      ),
    },
    {
      titulo: 'Evaluadas',
      componente: (
        <Table
          key="ct-table-list-2"
          rows={rows_historico}
          actionColumn={false}
        />
      ),
    },
  ];

  return <EcosurTabs align="left" data={tabs} />;
};

const PersonalFetch: React.FC<PersonalProps> = ({ isDirector = false }) => {
  const { data, error, isLoading } = useQuery('ct-alumnos-list', async () =>
    ConsejoTutelarQuerys.getAlumnos(isDirector)
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">No se pudo acceder al consejo tutelar</Alert>
    );

  return (
    <PersonalIndex
      rows={data === undefined ? [] : data}
      isDirector={isDirector}
    />
  );
};

const Personal = () => {
  const tabs = [
    {
      titulo: 'Academico',
      componente: <PersonalFetch />,
    },
    {
      titulo: 'Director tesis',
      componente: <PersonalFetch isDirector />,
    },
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        id="SectionLogin"
        style={{ padding: '15px 50px' }}
      >
        <InstruccionesEnlacesIndex />
      </Grid>
      <EcosurTabs data={tabs} />
    </>
  );
};

export default Personal;
