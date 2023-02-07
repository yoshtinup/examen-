import { useEffect, useState, FC } from 'react';
import {
  AlumnoDetallesItemProps,
  PreguntaItemProps,
  SugerenciaItemProps,
  DocumentoItemProps,
  EvaluadorItemProps,
  AlertMessageProps,
} from '../__generated__/globalTypes';
//Utils
import { arrayDivisorByCondition } from '../helpers/arrayUtils';
import DataService from '../services/data';
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
import { Alert, ListItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../store/slices/alumno';
import { Delete } from '@mui/icons-material';

const AbPresidente = withPresidenteRole(ActionButtonsPresidente);
const AbEvaluador = withEvaluadorRole(ActionButtonsEvaluador);
const ChipPresidenteRole = withPresidenteRole(Chip);
const ChipEvaluadorRole = withEvaluadorRole(Chip);

type PropuestaProps = {
  idFormularioRespuesta?: number;
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
  idFormularioRespuesta,
  preguntas,
  sugerencias,
  apelacion,
  evaluadores,
}) => {
  const [alumno, setAlumno] = useRecoilState(alumnoAtom);
  const [alert, setAlert] = useState<AlertMessageProps | null>(null);

  const handleDelete = (idFormularioRespuesta, idPersonalAcademico) => {
    console.log('delete', idPersonalAcademico, idFormularioRespuesta);
    DataService.setEliminarEvaluador({
      idFormularioRespuesta,
      idPersonalAcademico,
    })
      .then(res => {
        const { data } = res;
        console.log(data);
        setAlumno(current => ({
          ...current,
          alumno: {
            ...current.alumno,
            evaluadores: [
              ...current.alumno.evaluadores.filter(ele => {
                return ele.id != idPersonalAcademico;
              }),
            ],
          },
        }));
        setAlert({
          severity: 'success',
          message: 'El evaluador se elimino con exito',
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      })
      .catch((e: any) => {
        setAlert({
          severity: 'warning',
          message: 'No se pudo eliminar al evaluador, intentelo nuevamente',
        });
      });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        {evaluadores && evaluadores.length > 0 && (
          <Typography variant="h6">Evaluadores</Typography>
        )}
        {evaluadores &&
          evaluadores.map((evaluador, index) => (
            <ListItem key={index}>
              <ChipEvaluadorRole
                icon={<StatusIcon status={evaluador.estatus} />}
                label={
                  evaluador.nombre.slice(0, 10) + ' - ' + evaluador.estatus
                }
              />
              <ChipPresidenteRole
                icon={<StatusIcon status={evaluador.estatus} />}
                label={
                  evaluador.nombre.slice(0, 10) + ' - ' + evaluador.estatus
                }
                deleteIcon={<Delete />}
                onDelete={() =>
                  handleDelete(idFormularioRespuesta, evaluador.id)
                }
              />
            </ListItem>
          ))}
        {alert ? (
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        ) : (
          <></>
        )}
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
        key={info.idPropuesta}
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
  const [alumno, setAlumno] = useRecoilState(alumnoAtom);
  const router = useRouter();
  const matricula = router.query.matricula.toString();
  const [alumnoInformation, setAlumnoInformation] =
    useState<AlumnoDetallesFetchProps>({
      loading: true,
      current: {} as AlumnoDetallesItemProps,
      history: [],
    });

  const [documents, setDocuments] = useState<DocumentoItemProps[]>([]);
  const [empty, setEmpty] = useState<boolean>(true);

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
        setAlumno({ alumno: currentPropuesta });
        setAlumnoInformation({
          loading: false,
          current: current[0],
          history: history,
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(alumno);
    setAlumnoInformation(item => ({
      ...item,
      current: {
        ...item.current,
        evaluadores: alumno.alumno.evaluadores,
      },
    }));
  }, [alumno]);

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
        {alumno.alumno.estatus}
      </Typography>
      <TwoTabs
        tab1={{
          label: 'Propuesta Actual',
          component: (
            <Propuesta
              key={alumnoInformation.current.idPropuesta}
              idFormularioRespuesta={alumnoInformation.current.idPropuesta}
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
