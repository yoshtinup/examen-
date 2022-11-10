import React from 'react';
import { useMutation } from 'react-query';
import ConsejoTutelarQuerys from '@modules/consejo_tutelar/queries';
import { useRecoilValue } from 'recoil';
import { matriculaState } from '../recoil';
import message from './message';
import { LoadCT } from '../components';
import {
  Alert,
  Container,
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  EvaluacionComite,
  IntegranteCT,
  EstatusIndividual,
} from '@modules/consejo_tutelar/types';
import {
  EcosurProfileCard,
  EcosurCommentsCard,
  EcosurSectionTitle,
  EcosurCommentDialog,
} from 'ecosur-ui';
import { Perfil } from '../components';

const Comentario: React.FC<{ statusIndividuals: EstatusIndividual[] }> = ({
  statusIndividuals,
}) => {
  const data = statusIndividuals.map(status => ({
    foto: 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png',
    nombre: status.nombre,
    cargo: status.rol,
    evaluacion: status.estatus,
    fecha: status.fecha,
    comentario: status.motivoRechazo,
  }));
  return <EcosurCommentsCard id="ecosur-comentarios-ct" data={data} />;
};

type IntegranteEvaluacionProps = {
  data: IntegranteCT;
  setEvaluacion: (evaluacion: EvaluacionComite) => void;
};
const IntegranteEvaluacion: React.FC<IntegranteEvaluacionProps> = ({
  data,
  setEvaluacion,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const info = {
    unidad: data.unidad,
    'grado General': data.gradoGeneral,
    correo: data.correo,
    participacion: data.participacion,
    insitucion: data.insitucion,
    argumentacion: data.argumentacion,
    'tipo Academico': data.tipoAcademico,
    sNI: data.datosCodirector?.sNI,
    numPubArb: data.datosCodirector?.numPubArb,
    numEstMaestria: data.datosCodirector?.numEstMaestria,
    numEstDoc: data.datosCodirector?.numEstDoc,
  };

  const user = {
    // FIXME: @iocampo Agregar instrucciones
    instrucciones: 'Instruccciones',
    nombre: data.nombre,
  };

  const handleClick = (comentario: string) => {
    setDisabled(true);
    setEvaluacion({
      id: data.idTutorSinodal,
      aprobo: false,
      comentario: comentario,
    });
  };
  return (
    <Card variant="outlined">
      <CardHeader title={`${data.grado} ${data.nombre}`} />
      <CardContent>
        <EcosurProfileCard data={info} />
        <Comentario statusIndividuals={data.estatusIndividual} />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          disabled={disabled}
          onClick={handleOpen}
          variant="contained"
          size="small"
        >
          No aprobar
        </Button>
        <EcosurCommentDialog
          data={user}
          onClick={handleClick}
          open={open}
          handleClose={handleClose}
        />
      </CardActions>
    </Card>
  );
};

type SeccionEvaluacionProps = {
  title: string;
  integrantes: IntegranteCT[];
  setEvaluacion: (evaluacion: EvaluacionComite) => void;
};
const SeccionEvaluacion: React.FC<SeccionEvaluacionProps> = ({
  title,
  integrantes,
  setEvaluacion,
}) => {
  if (integrantes.length == 0) return;
  return (
    <div>
      <EcosurSectionTitle label={title} variant="h6" bgcolor="secondary" />
      {integrantes.map(integrante => (
        <IntegranteEvaluacion
          setEvaluacion={setEvaluacion}
          key={`integrante-evaluacion-${integrante.idTutorSinodal}`}
          data={integrante}
        />
      ))}
    </div>
  );
};

type EvaluacionData = {
  matricula: number;
  evaluaciones: EvaluacionComite[];
};

const ComiteEvaluacion: React.FC<{ integrantes: IntegranteCT[] }> = ({
  integrantes,
}) => {
  const matricula = useRecoilValue<number>(matriculaState);
  const { mutate, isLoading } = useMutation(
    async (e: EvaluacionData) =>
      await ConsejoTutelarQuerys.registrarEvaluacion(
        e.matricula,
        e.evaluaciones
      ),
    {
      onSuccess: () => message(),
      onError: () => message(true),
    }
  );
  const [evaluaciones, setEvaluaciones] = React.useState<EvaluacionComite[]>(
    integrantes.map(integrante => {
      return {
        id: integrante.idTutorSinodal,
        aprobo: true,
        comentario: null,
      };
    })
  );
  const [btnDisable, setBtnDisable] = React.useState<boolean>(false);
  if (integrantes.length == 0)
    return (
      <Alert severity="error">No tiene acceso a este consejo tutelar</Alert>
    );
  const handleSetEvaluacion = (evaluacion: EvaluacionComite) => {
    const restEvaluaciones: EvaluacionComite[] = evaluaciones.filter(
      e => e.id != evaluacion.id
    );
    setEvaluaciones([...restEvaluaciones, evaluacion]);
  };

  const handleClick = () => {
    mutate({ matricula, evaluaciones });
    setBtnDisable(true);
  };
  const internos = integrantes.filter(
    integrante => integrante.tipoAcademico === 'Interno'
  );
  const externos = integrantes.filter(
    integrante => integrante.tipoAcademico !== 'Interno'
  );
  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        {/* FIXME: @iocampo Incluir instrucciones */}
        <Perfil />
        <SeccionEvaluacion
          title="Integrantes Internos"
          integrantes={internos}
          setEvaluacion={handleSetEvaluacion}
        />
        <SeccionEvaluacion
          title="Integrantes externos"
          integrantes={externos}
          setEvaluacion={handleSetEvaluacion}
        />
        <Button
          disabled={btnDisable}
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ width: 200 }}
        >
          Guardar evaluacion
        </Button>
      </Stack>
    </Container>
  );
};

const Comite = () => {
  const matricula = useRecoilValue<number>(matriculaState);
  return <LoadCT matricula={matricula} Component={ComiteEvaluacion} />;
};

export default Comite;
