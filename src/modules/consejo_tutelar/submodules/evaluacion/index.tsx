import React from 'react';
import { useGetEstudianteInfo } from '@shared/queries';
import { Alert, CircularProgress } from '@mui/material';
import { EcosurSectionTitle } from 'ecosur-ui';
import { Academico, Comite, Estudiante } from './pages';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import { useSetRecoilState } from 'recoil';
import { matriculaState, estudianteState } from './recoil';
const ComitePage = WithRoles([
  Roles.Responsable_Orientacion,
  Roles.Coordinador_Unidad,
  Roles.Coordinacion_General_Posgrado,
])(Comite);
const EstudiantePage = WithRol(Roles.Estudiante)(Estudiante);
const AcademicoPage = WithRoles([Roles.Academico, Roles.Externo])(Academico);

const Evaluacion: React.FC<{ matricula: number }> = ({ matricula }) => {
  const setMatricula = useSetRecoilState(matriculaState);
  const setEstudiante = useSetRecoilState(estudianteState);

  setMatricula(matricula);
  const { data, isError, isLoading, isSuccess } =
    useGetEstudianteInfo(matricula);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la informacion del alumno
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  if (isSuccess) {
    setEstudiante(data[0]);
  }
  return (
    <div>
      <EcosurSectionTitle label="Consejo Tutelar" variant="h5" />
      <EstudiantePage />
      <ComitePage />
      <AcademicoPage />
    </div>
  );
};
export default Evaluacion;
