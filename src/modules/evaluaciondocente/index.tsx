import { Home } from './components';
import { WithRol } from '@shared/hooks';
import Roles from '@definitions/Roles';
import ProfesoresContainer from './components/molecules/ProfesoresContainer';
import PlaningContainer from './components/molecules/PlaningContainer';
import ValdocContainer from './components/molecules/ValdocContainer';
import ValorationContainer from './components/molecules/ValorationContainer';
import EvaluacionDocenteQuerys from './queries/apiRest';
import {
  Actividades,
  PlaneacionDelCurso,
  Profesor,
  ValoracionDelCurso,
} from './types/evaluacionState';
import { useRecoilValue } from 'recoil';
import { materiaState } from './recoil/materiaState';
import { planeacionState } from './recoil/planeacionState';
import { valoracionState } from './recoil/valoracionState';
import { profesoresState } from './recoil/profesoresState';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { preguntasEvaluacionADocentes } from './components/atoms/Text';

const HomePage = WithRol(Roles.Estudiante)(Home);

const EvaluacionDocente = () => {
  const router = useRouter();
  const planeacionDelCurso = useRecoilValue(planeacionState);
  const valoracionDelCurso = useRecoilValue(valoracionState);
  const profesores = useRecoilValue(profesoresState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [successSending, setSuccessSending] = useState(false);

  const idMateria = router.query.idMateriasOfertaAnual;

  const handleSend = async () => {
    setIsLoading(true);

    if (
      checkIfPlenacionHasEmptyValues(planeacionDelCurso) ||
      checkIfValoracionHasEmptyValues(valoracionDelCurso) ||
      profesoresHasEmptyFields(profesores)
    ) {
      Swal.fire(
        'La solicitud no puede ser procesada ya que debe completar información'
      );
      setIsLoading(false);
      return;
    }
    const data: Actividades = {
      idMateriasOfertaAnual: parseInt(idMateria.toString()),
      planeacionDelCurso,
      valoracionDelCurso,
      profesores,
    };

    const resultado = await EvaluacionDocenteQuerys.sendEvaluacion(data);
    if (resultado.status == 400) {
      const mapError = Object.entries(resultado.errors).map(([key, val]) => {
        return { error: key, message: val[0] };
      });
      setError(mapError);
    }
    resultado.message
      ? Swal.fire(resultado.message)
      : Swal.fire(resultado.errors[0]);

    resultado.message ? setIsLoading(true) : setIsLoading(false);

    resultado.message ? setSuccessSending(true) : setSuccessSending(false);
  };

  const checkIfPlenacionHasEmptyValues = (
    planeacionObjects: PlaneacionDelCurso
  ): boolean => {
    const totalEmpty = Object.values(planeacionObjects).reduce(
      (acc, val) => acc + (val === 0),
      0
    );
    if (totalEmpty > 0) {
      return true;
    }
    return false;
  };

  const checkIfValoracionHasEmptyValues = (
    valoracionObject: ValoracionDelCurso
  ): boolean => {
    const totalEmpty = Object.values(valoracionObject).reduce(
      (acc, val) => acc + (val === ''),
      0
    );
    if (totalEmpty > 0) {
      return true;
    }
    return false;
  };

  const profesoresHasEmptyFields = (profesores: Profesor[]): boolean => {
    const SELECTS_KEYS = preguntasEvaluacionADocentes
      .flatMap(seccion => seccion.preguntas || [])
      .filter(pregunta => pregunta.required && !pregunta.type)
      .map(pregunta => pregunta.id);

    const TEXTAREAS_KEYS = preguntasEvaluacionADocentes
      .flatMap(seccion => seccion.subsection || [])
      .flatMap(subseccion => subseccion.preguntas || [])
      .filter(pregunta => pregunta.required && pregunta.type === 'textArea')
      .map(pregunta => pregunta.id);

    return profesores.some(profesor => {
      if (profesor.respuestas) {
        const selects = profesor.respuestas.selects
          ? Object.values(profesor.respuestas.selects)
          : [];
        const textAreas = profesor.respuestas.textAreas
          ? Object.values(profesor.respuestas.textAreas)
          : [];
        const hasAllSelects = SELECTS_KEYS.every(
          key => key in (profesor.respuestas.selects || {})
        );
        const hasAllTextAreas = TEXTAREAS_KEYS.every(
          key => key in (profesor.respuestas.textAreas || {})
        );
        return (
          !hasAllSelects ||
          !hasAllTextAreas ||
          selects.some(val => val === 0) ||
          textAreas.some(val => val === '')
        );
      }
      return true;
    });
  };

  return (
    <>
      <HomePage />
      <PlaningContainer />
      <ValorationContainer error={error} />
      <ValdocContainer />
      <ProfesoresContainer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ height: 15 }}></div>
        {!isLoading && (
          <Button
            size="large"
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            <span>Enviar evaluación</span>
          </Button>
        )}
        {successSending && (
          <Alert variant="filled" severity="warning">
            Su evaluación ha sido enviada
          </Alert>
        )}
      </Box>
    </>
  );
};
export default EvaluacionDocente;
