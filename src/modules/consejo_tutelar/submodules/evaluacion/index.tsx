import React from 'react';
import { useRouter } from 'next/router';
import { EstudianteCT } from './types';
import { useGetEstudianteInfo } from '@shared/queries';
import { useGetEstudianteCTExtraInfo } from './queries';
import { Alert, CircularProgress } from '@mui/material';
import { Academico, Comite, Estudiante } from './pages';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import { useSetRecoilState } from 'recoil';
import { estudianteCTState } from './recoil';
import { ConsejoTutelarAlumno } from './components';

const ComitePage = WithRoles([
  Roles.Responsable_Orientacion,
  Roles.Coordinador_Unidad,
  Roles.Coordinacion_General_Posgrado,
])(Comite);
const EstudiantePage = WithRol(Roles.Estudiante)(Estudiante);
const ServicioEscolaresPage = WithRol(Roles.Servicios_Escolares)(
  ConsejoTutelarAlumno
);
const AcademicoPage = WithRoles([Roles.Academico, Roles.Externo])(Academico);

const Evaluacion: React.FC<{ matricula: number }> = ({ matricula }) => {
  const router = useRouter();
  const setEstudiante = useSetRecoilState(estudianteCTState);
  const queryEstudianteInfo = useGetEstudianteInfo(matricula);
  const queryStatus = useGetEstudianteCTExtraInfo(matricula);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    function setState() {
      if (queryEstudianteInfo.isSuccess && queryStatus.isSuccess) {
        if (
          queryEstudianteInfo.data.length === 0 ||
          queryStatus.data.length === 0
        ) {
          router.push(`/consejo_tutelar`);
          return;
        }
        const estudiante: EstudianteCT = {
          ...queryEstudianteInfo.data[0],
          IdEstatusCT: queryStatus.data[0].EstatusGeneral,
          LeyendaEstatusCT: queryStatus.data[0].LeyendaEstatusGeneral,
          CartaAceptacion: queryStatus.data[0].CartaAceptacion,
        };
        setEstudiante(estudiante);
        setLoaded(true);
      }
    }
    setState();
  }, [queryEstudianteInfo, queryStatus]);
  return (
    <div style={{ paddingBottom: '20px' }}>
      {(queryEstudianteInfo.isLoading || queryStatus.isLoading) && (
        <CircularProgress />
      )}
      {loaded && (
        <>
          <EstudiantePage />
          <ComitePage />
          <AcademicoPage />
          <ServicioEscolaresPage />
        </>
      )}
      {(queryEstudianteInfo.isError || queryStatus.isError) && (
        <Alert severity="error">
          No se pudo cargar la informacion del alumno
        </Alert>
      )}
    </div>
  );
};
export default Evaluacion;
