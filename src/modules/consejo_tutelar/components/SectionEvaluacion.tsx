import React from 'react';
import { useRecoilValue } from 'recoil'
import { userStateAtom, rolStateAtom } from '@modules/auth/recoil'
import Roles from '@definitions/Roles';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import {
  EcosurSectionTitle,
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
      evaluacion: status.estatus,
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
  const currentUser = useRecoilValue(userStateAtom)
  const currentRol: Roles = useRecoilValue(rolStateAtom)
  const [comentarios, setComentario] = React.useState<EstatusIndividual[]>(integrantes.estatusIndividual)
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const info = {
    unidad: integrantes.unidad,
    'grado General': integrantes.gradoGeneral,
    correo: integrantes.correo,
    participacion: integrantes.participacion,
    insitucion: integrantes.insitucion,
    argumentacion: integrantes.argumentacion,
    'tipo Academico': integrantes.tipoAcademico,
    sNI: integrantes.datosCodirector?.sNI ?? null,
    numPubArb: integrantes.datosCodirector?.numPubArb ?? null,
    numEstMaestria: integrantes.datosCodirector?.numEstMaestria ?? null,
    numEstDoc: integrantes.datosCodirector?.numEstDoc ?? null,
  };

  const user = {
    // FIXME: @iocampo Agregar instrucciones
    instrucciones: 'Instruccciones',
    nombre: integrantes.nombre,
  };

  const handleClick = (comentario: string) => {
    const new_comentario: EstatusIndividual = {
      nombre: currentUser.personal?.nombreCompleto ?? '',
      estatus: '',
      rol: Roles[currentRol],
      fecha: 'Justo ahora',
      motivoRechazo: comentario,
    }
    setComentario([...comentarios, new_comentario])
    setDisabled(true);
    setEvaluacion({
      id: integrantes.idTutorSinodal,
      aprobo: false,
      comentario: comentario,
    });
  };
  return (
    <Card variant="outlined">
      <CardHeader title={`${integrantes.grado} ${integrantes.nombre}`} />
      <CardContent>
        <Stack spacing={2}>
          <EcosurProfileCard data={info} />
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
      <EcosurSectionTitle label={title} variant="h6" bgcolor="secondary" />
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
