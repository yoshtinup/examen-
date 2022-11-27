import React from 'react';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Stack,
  Typography,
  Link,
} from '@mui/material';

import {
  EcosurProfileCard,
  EcosurCommentsCard,
  EcosurCommentDialog,
} from 'ecosur-ui';

import {
  EvaluacionComite,
  IntegranteCT,
  EstatusIndividual,
} from '@modules/consejo_tutelar/types';

const Comentario: React.FC<{ statusIndividuals: EstatusIndividual[] }> = ({
  statusIndividuals,
}) => {
  const data = statusIndividuals
    .filter(status => status.motivoRechazo)
    .map(status => ({
      /* foto: 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png', */
      nombre: status.nombre,
      cargo: status.rol,
      //evaluacion: status.estatus,
      fecha: status.fecha,
      comentario: status.motivoRechazo,
    }));
  return (
    <>
      {data.length > 0 && (
        <Typography>
          <b>Evaluación</b>
        </Typography>
      )}
      <EcosurCommentsCard id="ecosur-comentarios-ct" data={data} />
    </>
  );
};

type IntegranteEvaluacionProps = {
  integrantes: IntegranteCT;
  btnHide?: boolean;
  setEvaluacion?: (evaluacion: EvaluacionComite) => void;
};
const IntegranteEvaluacion: React.FC<IntegranteEvaluacionProps> = ({
  integrantes,
  btnHide = false,
  setEvaluacion,
}) => {
  const currentUser = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const [comentarios, setComentario] = React.useState<EstatusIndividual[]>(
    integrantes.estatusIndividual
  );
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const info = {
    participación: integrantes.participacion,
    grado: integrantes.gradoGeneral,
    institución: integrantes.insitucion,
    argumentación: integrantes.argumentacion,
    tipo: integrantes.tipoAcademico,
    'Nivel SNI': integrantes.datosCodirector?.sNI ?? null,
    'Número de publicaciones arbitradas':
      integrantes.datosCodirector?.numPubArb ?? null,
    'Número de estudiantes de maestría':
      integrantes.datosCodirector?.numEstMaestria ?? null,
    'Número de estudiantes de doctorado':
      integrantes.datosCodirector?.numEstDoc ?? null,
    unidad: integrantes.unidad,
    correo: integrantes.correo,
  };

  const user = {
    // FIXME: @iocampo Agregar instrucciones
    instrucciones:
      'Registre en el cuadro de texto las razones por las que sugiere no aprobar a la persona propuesta el estudiante.',
  };

  const handleClick = (comentario: string) => {
    const new_comentario: EstatusIndividual = {
      nombre: currentUser.personal?.nombreCompleto ?? '',
      estatus: '',
      rol: Roles[currentRol],
      fecha: Date.now().toString(),
      motivoRechazo: comentario,
    };
    setComentario([...comentarios, new_comentario]);
    setDisabled(true);
    setEvaluacion({
      id: integrantes.idTutorSinodal,
      aprobo: false,
      comentario: comentario,
    });
  };
  const estatusAprobacionIntegrante = !integrantes.estatusIndividual
    ? 'Pendiente de aceptar/rechazar ser integrante del CT'
    : 'Aceptó ser integrante del CT el ' +
      moment(integrantes.estatusIndividual[0].fecha).format('D/MM/YYYY');
  return (
    <Card variant="outlined" style={{ marginBottom: '20px' }}>
      <CardHeader
        title={`${integrantes.grado} ${integrantes.nombre} `}
        subheader={`${estatusAprobacionIntegrante}`}
      />

      <EcosurProfileCard data={info} color="#fff" titleColor="#555555" />
      {integrantes.url && (
        <Link ml={4} target="_blank" href={`${integrantes.url}`}>
          Ver{' '}
          {integrantes.tipoAcademico == 'Interno'
            ? 'página WEB académica'
            : 'curriculum vitae'}
        </Link>
      )}
      <CardContent>
        <Stack spacing={2}>
          <Comentario statusIndividuals={comentarios} />
        </Stack>
      </CardContent>
      {!btnHide && (
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
            titulo={`Evaluación de integrante: ${integrantes.nombre}`}
            label="Comentario de no aprobación"
          />
        </CardActions>
      )}
    </Card>
  );
};

type SeccionEvaluacionProps = {
  title: string;
  btnHide?: boolean;
  integrantes: IntegranteCT[];
  setEvaluacion?: (evaluacion: EvaluacionComite) => void;
};

const SeccionEvaluacion: React.FC<SeccionEvaluacionProps> = ({
  title,
  btnHide = false,
  integrantes,
  setEvaluacion = (_: EvaluacionComite) => {},
}) => {
  if (integrantes.length == 0) return;
  return (
    <div>
      <h3 style={{ color: 'rgb(197, 107, 22) !important' }}>{title}</h3>

      {integrantes.map(integrante => (
        <IntegranteEvaluacion
          key={`integrante-evaluacion-${integrante.idTutorSinodal}`}
          btnHide={btnHide}
          integrantes={integrante}
          setEvaluacion={setEvaluacion}
        />
      ))}
    </div>
  );
};
export default SeccionEvaluacion;
