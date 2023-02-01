import { useEffect, useState, FC } from 'react';
import {
  AlumnoDetallesItemProps,
  PreguntaItemProps,
  SugerenciaItemProps,
  DocumentoItemProps,
  EvaluadorItemProps,
} from '../__generated__/globalTypes';
//Utils
//import { useParams } from 'react-router-dom'
import { arrayDivisorByCondition } from '../helpers/arrayUtils';
import DataService from '../services/data';
//import { useAppDispatch, useAppSelector } from '../hooks';
//import { setAlumno } from '../store/slices/alumno'
//Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {
  withPresidenteRole,
  withEvaluadorRole,
} from '../components/role/helpers';
import Information from '../components/Alumno/Information';
import Sugerencias from '../components/Alumno/Sugerencias';
import ActionButtonsEvaluador from '../components/evaluador/ActionButtonsEvaluador';
import ActionButtonsPresidente from '../components/presidente/ActionButtonsPresidente';
import { FormDetalles } from '../components/form/FormDetalles';
import HeaderTitle from '../components/HeaderTitle';
import HistorialAccordion from '../components/HistorialAccordion';
import TwoTabs from '../components/TwoTabs';
import TableDocuments from '../components/ListDocuments';
import Chip from '@mui/material/Chip';
import StatusIcon from '../components/EtatusIcon';
import { ListItem } from '@mui/material';

const AbPresidente = withPresidenteRole(ActionButtonsPresidente);
const AbEvaluador = withEvaluadorRole(ActionButtonsEvaluador);

type PropuestaProps = {
  preguntas?: Array<PreguntaItemProps>;
  sugerencias?: Array<SugerenciaItemProps>;
  apelacion?: string;
  evaluadores?: Array<EvaluadorItemProps>;
};

/**
 * Coponente que estructura la presentacion de cada propuesta
 * @param
 * @returns
 */
const Propuesta: FC<PropuestaProps> = ({
  preguntas,
  sugerencias,
  apelacion,
  evaluadores,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        {evaluadores && evaluadores.length > 0 && (
          <Typography variant="h6">Evaluadores</Typography>
        )}
        {evaluadores &&
          evaluadores.map((evaluador, index) => (
            <ListItem>
              <Chip
                key={evaluador.nombre}
                icon={<StatusIcon status={evaluador.estatus} />}
                label={
                  evaluador.nombre.slice(0, 10) + ' - ' + evaluador.estatus
                }
              />
            </ListItem>
          ))}
      </Grid>
      <Grid item xs={12} sm={8}>
        <FormDetalles questions={preguntas} />
      </Grid>
      <Grid item xs={12} sm={4}>
        {apelacion !== '' && (
          <>
            <HeaderTitle label={'Apelacion'} />
            <Paper elevation={4} sx={{ padding: 2, mb: 3 }}>
              <Typography variant="body1">{apelacion}</Typography>
            </Paper>
          </>
        )}
        {sugerencias.length > 0 && <Sugerencias sugerencias={sugerencias} />}
      </Grid>
    </Grid>
  );
};

/**
 * generar la estrucrura para los acordiones
 * @param {array} alumnosinfo
 * @returns
 */
const getHistoryFormat = (alumnosInfo: Array<AlumnoDetallesItemProps>) => {
  const revisiones = alumnosInfo.map((info: AlumnoDetallesItemProps) => ({
    date: info.fechaEnvio?.toString() ?? '',
    component: (
      <Propuesta
        preguntas={info.preguntas}
        sugerencias={info.sugerencias}
        apelacion={info.apelacion}
        evaluadores={info.evaluadores}
      />
    ),
  }));
  return {
    prefix: 'Revision de ',
    revisiones: revisiones,
  };
};

type DetallesParams = {
  matricula: string;
};

type AlumnoDetallesFetchProps = {
  loading: boolean;
  current: AlumnoDetallesItemProps;
  history: Array<AlumnoDetallesItemProps>;
};

/**
 * Estructura la presentacion de la propuesta
 * Cada componente tiene su descripcion
 * @returns
 */
function Detalles() {
  const { alumno } = useAppSelector(state => state.alumno);
  //const { matricula } = useParams<keyof DetallesParams>() as DetallesParams
  const [alumnoInformation, setAlumnoInformation] =
    useState<AlumnoDetallesFetchProps>({
      loading: true,
      current: {} as AlumnoDetallesItemProps,
      history: [],
    });

  const [documents, setDocuments] = useState<DocumentoItemProps[]>([]);
  const [empty, setEmpty] = useState<boolean>(true);
  //const dispatch = useAppDispatch();

  useEffect(() => {
    // obtener una propuesta por matricula del alumno
    setDocuments([]);
    DataService.getPropuestaAlumno(matricula).then(response => {
      const propuestas: Array<AlumnoDetallesItemProps> = response.data;
      if (propuestas.length != 0) {
        setEmpty(false);

        let tempDocuments: DocumentoItemProps[] = [];
        propuestas.forEach((item: AlumnoDetallesItemProps) => {
          item.documentos?.forEach((document: DocumentoItemProps) => {
            tempDocuments.push(document);
          });
        });

        setDocuments(tempDocuments);

        // dividir entre preguntas historicas y actuales
        const [current, history] = arrayDivisorByCondition(
          (e: AlumnoDetallesItemProps) => e.historico == false,
          propuestas
        );

        const currentPropuesta = {
          matricula: current[0].matricula,
          idFormulariosRespuestas: current[0].idPropuesta,
          tesis: current[0].titulo,
          estatus: current[0].estatus,
          evaluadores: current[0].evaluadores,
        };
        // Enviar a redux el actual alumno
        //dispatch(setAlumno({alumno: currentPropuesta}))
        setAlumnoInformation({
          loading: false,
          current: current[0],
          history: history,
        });
      }
    });
  }, [dispatch]);

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
        <LinearProgress />
      </Box>
    );
  }

  if (empty)
    return <h1>Usted no esta autorizado para visualizar esta propuesta</h1>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="div" variant="h5">
        Información general
      </Typography>
      <Information alumnoInfo={alumnoInformation.current} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <AbPresidente />
        <AbEvaluador />
      </Box>
      <Typography component="div" variant="h5">
        Detalles de la propuesta
      </Typography>
      <Typography component="div" variant="h6">
        {alumno.estatus}
      </Typography>
      <TwoTabs
        tab1={{
          label: 'Propuesta Actual',
          component: (
            <Propuesta
              preguntas={alumnoInformation.current.preguntas}
              sugerencias={alumnoInformation.current.sugerencias}
              apelacion={alumnoInformation.current.apelacion}
              evaluadores={alumnoInformation.current.evaluadores}
            />
          ),
        }}
        tab2={{
          label: 'Historico de propuestas',
          component: (
            <HistorialAccordion
              history={getHistoryFormat(alumnoInformation.history)}
            />
          ),
        }}
      />
      <TableDocuments documents={documents} />
    </Box>
  );
}

export default Detalles;
