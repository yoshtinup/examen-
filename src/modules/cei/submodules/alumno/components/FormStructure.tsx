import { FC, useState, useEffect } from 'react';

import {
  AlumnoDetallesItemProps,
  PreguntaRespuestaItemProps,
  SugerenciaItemProps,
  PreguntaItemProps,
  DocumentProps,
  FormStructureProps,
  DocumentoItemProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';

//import { useAppSelector } from '@moduleCEIAlumnos/hooks';
import {
  useForm,
  useFieldArray,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Sugerencias from './alumno/Sugerencias';
import { FormDetalles } from './form/FormDetalles';
import FormInputText from './form/FormInputText';
import HistorialAccordion from './HistorialAccordion';
import TwoTabs from './TwoTabs';
import ActionButtons from './alumno/ActionButtons';
import HeaderTitle from './HeaderTitle';
import Alert from '@mui/material/Alert';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alumnoAtom } from '../store/slices/alumno';
import { Preguntas, preguntasSelector } from '../store/slices/preguntas';
import TableDocuments from './ListDocuments';
import { interfaceRule } from '../store/slices/interface-rules';
import Apelacion from './alumno/Apelacion';

interface PropuestaProps {
  respuestas: Array<PreguntaRespuestaItemProps>;
  apelacion: string;
  sugerencias: Array<SugerenciaItemProps>;
  documentos: Array<DocumentoItemProps>;
}

interface PropuestaFormProps extends PropuestaProps {
  propuestasHistoricas: Array<AlumnoDetallesItemProps>;
  status: string;
}

interface PropuestaGridProps extends PropuestaProps {
  historico?: boolean;
  fields?: any;
  control?: Control<FormStructureProps>;
  setValue?: UseFormSetValue<FormStructureProps>;
}

const estatusWarning = [
  'Pendiente de envío',
  'Propuesta sin guardar',
  'No aprobado por el CEI con sugerencias',
  'Pendiente de validar con sugerencias',
];

const estatusSuccess = [
  'Aprobado por el CEI',
  'Aprobado por el CEI con sugerencias',
  'Aprobado por evaluación',
];

/**
 * Coponente que estructura la presentacion de cada propuesta
 * @param
 * @returns
 */
const statusActive: string[] = [
  'Pendiente de envío',
  'No aprobado por el CEI con sugerencias',
  'En revisión por el CEI',
  'Pendiente de validar con sugerencias',
];

const Propuesta: FC<PropuestaGridProps> = ({
  respuestas,
  sugerencias,
  apelacion,
  fields,
  control,
  setValue,
  historico = false,
  documentos,
}) => {
  const alumno = useRecoilValue(alumnoAtom);
  const [apelacionActive, setApelacionActive] = useState<boolean>(
    statusActive.includes(alumno.status) && sugerencias.length > 0
  );
  const showInterfece = useRecoilValue(interfaceRule);

  useEffect(() => {
    setApelacionActive(
      statusActive.includes(alumno.status) && sugerencias.length > 0
    );
  }, [alumno.status]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        {historico ? (
          <>
            <FormDetalles answers={respuestas} history={historico} />
            <TableDocuments documents={documentos} />
          </>
        ) : (
          <>
            <FormDetalles
              answers={respuestas}
              history={historico}
              fields={fields}
              control={control}
              setValue={setValue}
            />
            <TableDocuments documents={documentos} />
          </>
        )}
      </Grid>

      <Grid item xs={12} sm={4}>
        {showInterfece.showAppeal && apelacionActive && (
          <>
            <HeaderTitle
              label={
                'Respuesta a las observaciones y/o sugerencias hechas por el CEI'
              }
            />
            <Paper elevation={4} sx={{ padding: 2, mb: 3 }}>
              <FormInputText
                id={333}
                name={`appeal`}
                control={control as Control<FormStructureProps>}
                label={
                  'En esta apartado puedes describir si incorporas o no las observaciones realizadas por el CEI y justificar el porque'
                }
              />
            </Paper>
          </>
        )}
        {showInterfece.showSuggestions ? (
          <Sugerencias sugerencias={sugerencias} />
        ) : null}
        {apelacion && <Apelacion apelacion={apelacion} />}
      </Grid>
    </Grid>
  );
};

/**
 * Coponente que estructura la presentacion de cada propuesta
 * @param
 * @returns
 */
const getHistoryFormat = (alumnosInfo: Array<AlumnoDetallesItemProps>) => {
  const revisiones = alumnosInfo.map((info: AlumnoDetallesItemProps) => ({
    date: info.fechaEnvio?.toString() ?? '',
    component: (
      <Propuesta
        respuestas={info.preguntas}
        sugerencias={info.sugerencias}
        apelacion={info.apelacion}
        historico={true}
        documentos={info.documentos}
      />
    ),
  }));
  return {
    prefix: 'Revision de ',
    revisiones: revisiones,
  };
};

/**
 * Estructura principas del formulario y pestañas
 * @param
 * @returns
 */
const FormStructure: FC<PropuestaFormProps> = ({
  respuestas,
  sugerencias,
  apelacion,
  propuestasHistoricas,
  status,
  documentos,
}) => {
  const questions: Preguntas = useRecoilValue(preguntasSelector);
  const showInterfece = useRecoilValue(interfaceRule);
  function getAnswer(id: number): string {
    return respuestas.find(answer => answer.id === id)?.current_value ?? '';
  }

  // uso del hook para el procesamiento del formulario
  const { handleSubmit, control, setValue } = useForm<FormStructureProps>({
    defaultValues: {
      appeal: '',
      documents: [],
      documentData: [],
      answers: questions.listPreguntas.map((question: PreguntaItemProps) => ({
        idPlantillaPreguntas: question.id,
        respuesta: getAnswer(question.id),
        tipo: question.type,
        orden: question.orden,
        condicion: question.condition,
        parent: question.parent,
        visible: true,
      })),
    },
  });

  const infoEstatus =
    status && estatusWarning.includes(status)
      ? 'warning'
      : status && estatusSuccess.includes(status)
      ? 'success'
      : 'info';

  // hook para usar un formulario como array
  const { fields } = useFieldArray({
    control,
    name: 'answers',
  });
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <ActionButtons onClick={handleSubmit} />
      </Box>
      <Typography sx={{ mt: 2 }} component="div" variant="h5">
        Formulario de Propuesta
      </Typography>

      {!showInterfece.showAppeal &&
      !showInterfece.showButtons &&
      !showInterfece.showRealStatus &&
      !showInterfece.showSuggestions ? (
        <Alert variant="outlined" severity={infoEstatus}>
          <Typography component="div" variant="h6">
            No se puede mostrar estatus en este momento
          </Typography>
        </Alert>
      ) : showInterfece.showRealStatus ? (
        <Alert variant="outlined" severity={infoEstatus}>
          <Typography component="div" variant="h6">
            Estatus de su propuesta: {status}{' '}
          </Typography>
        </Alert>
      ) : (
        <Alert variant="outlined" severity="warning">
          <Typography component="div" variant="h6">
            Estatus de su propuesta: En periodo de Evaluación por CEI{' '}
          </Typography>
        </Alert>
      )}

      <TwoTabs
        tab1={{
          label: 'Propuesta Actual',
          component: (
            <Propuesta
              respuestas={respuestas}
              sugerencias={sugerencias}
              apelacion={apelacion}
              fields={fields}
              control={control}
              setValue={setValue}
              documentos={documentos}
            />
          ),
        }}
        tab2={{
          label: 'Historico de propuestas',
          component: (
            <HistorialAccordion
              history={getHistoryFormat(propuestasHistoricas)}
            />
          ),
        }}
      />
    </>
  );
};

export default FormStructure;
