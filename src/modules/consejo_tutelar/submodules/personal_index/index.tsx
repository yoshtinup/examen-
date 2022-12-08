import React from 'react';
import { useQuery } from 'react-query';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { Alumno } from '@modules/consejo_tutelar/types';
import Roles from '@definitions/Roles';
import { useRecoilValue } from 'recoil';
import { rolStateAtom } from '@modules/auth/recoil';
import { Alert, CircularProgress } from '@mui/material';
import Table from './components';
import { EcosurTabs } from 'ecosur-ui';
import Instrucciones from './components/Instrucciones';
import { WithRol } from '@shared/hooks';

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
      titulo: 'Pendientes de evaluar',
      componente: <Table key="ct-table-list-1" rows={rows_pendiente} />,
    },
    {
      titulo: 'Evaluados',
      componente: <Table key="ct-table-list-2" rows={rows_historico} />,
    },
  ];

  return <EcosurTabs align="left" data={tabs} />;
};

const PersonalFetch: React.FC<PersonalProps> = ({ isDirector = false }) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const { data, error, isLoading } = useQuery(
    `ct-alumnos-list-${currentRol}-${isDirector}`,
    async () => ConsejoTutelarQuerys.getAlumnos(isDirector)
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">No se pudo acceder al consejo tutelar</Alert>
    );
  return <PersonalIndex rows={data} isDirector={isDirector} />;
};

const Personal = () => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  return (
    <>
      <Instrucciones rol={currentRol} />
      {currentRol == Roles.Academico && <h1>Asesor/a</h1>}
      <PersonalFetch />
      {currentRol == Roles.Academico && (
        <>
          <h1>Director/a de tesis</h1>
          <PersonalFetch isDirector />
        </>
      )}
    </>
  );
};

export default Personal;
