import { useEffect, useState } from 'react';
import {
  AlumnoDetallesItemProps,
  DocumentoItemProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';
//Utils
import { arrayDivisorByCondition } from '@moduleCEIAlumnos/helpers/arrayUtils';
import { getPropuestaAlumno } from '@moduleCEIAlumnos/helpers/apiUtils';
import { fetchQuestions } from '@moduleCEIAlumnos/store/slices/preguntas';
//Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Information from '@moduleCEIAlumnos/components/alumno/Information';
import FormStructure from '@moduleCEIAlumnos/components/FormStructure';
import TableDocuments from '@moduleCEIAlumnos/components/ListDocuments';

import { useRecoilState, useRecoilValue } from 'recoil';
import { alumnoAtom } from '@modules/cei/submodules/alumno/store/slices/alumno';

type AlumnoDetallesFetchProps = {
  loading: boolean;
  current: AlumnoDetallesItemProps;
  history: Array<AlumnoDetallesItemProps>;
};

import '@modules/cei/submodules/alumno/appGlobal';
import { EcosurAuth } from '@modules/auth/definitions';
import { userStateAtom } from '@modules/auth/recoil';
import { CircularProgress } from '@mui/material';

// Componente de inicio
const PropuestaAlumno = () => {
  const [alumnoInformation, setAlumnoInformation] =
    useState<AlumnoDetallesFetchProps>({
      loading: true,
      current: {} as AlumnoDetallesItemProps,
      history: [],
    });

  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const [alumno, setAlumno] = useRecoilState(alumnoAtom);
  const [documents, setDocuments] = useState<DocumentoItemProps[]>([]);

  // Obtener las propuestas de forma asincrona
  async function fetchAlumnoPropuesta() {
    const [propuesta, exist] = await getPropuestaAlumno(
      String(user.estudiante.matricula)
    );
    console.log('propuesta', propuesta, exist);
    if (exist) {
      // dividir entre actual y historico
      let tempDocuments: DocumentoItemProps[] = [];
      propuesta.forEach((item: AlumnoDetallesItemProps) => {
        item.documentos?.forEach((document: DocumentoItemProps) => {
          tempDocuments.push(document);
        });
      });

      setDocuments(tempDocuments);

      const [current, history] = arrayDivisorByCondition(
        (e: AlumnoDetallesItemProps) => e.historico == false,
        propuesta
      );

      const currentPropuesta = {
        matricula: current[0].matricula,
        idFormulariosRespuestas: current[0].idPropuesta,
        tesis: current[0].titulo,
        status: current[0].estatus,
      };

      setAlumno(currentPropuesta);
      setAlumnoInformation({
        loading: false,
        current: current[0],
        history: history,
      });
    } else {
      // Si no existe la propuesta se asignan genricos al despachador
      const currentPropuesta = {
        matricula: propuesta[0].matricula,
        idFormulariosRespuestas: 0,
        tesis: propuesta[0].titulo,
        status: 'Propuesta sin guardar',
      };
      setAlumno(currentPropuesta);
      setAlumnoInformation({
        loading: false,
        current: propuesta[0],
        history: [],
      });
    }
  }

  useEffect(() => {
    fetchQuestions();
    fetchAlumnoPropuesta();
  }, [setAlumno]);

  if (alumno.matricula === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      ></Box>
    );
  }

  if (alumnoInformation.loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography component="div" variant="h5">
          Información general
        </Typography>
        <Information alumnoInfo={alumnoInformation.current} />
        <FormStructure
          respuestas={alumnoInformation.current.preguntas}
          sugerencias={alumnoInformation.current.sugerencias}
          apelacion={alumnoInformation.current.apelacion}
          status={alumno.status}
          propuestasHistoricas={alumnoInformation.history}
        />
        <Box>
          <TableDocuments documents={documents} />
        </Box>
      </Box>
    </>
  );
};

export default PropuestaAlumno;
