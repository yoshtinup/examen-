import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
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
  integrantes: IntegranteCT;
  btnHide?: boolean;
  setEvaluacion?: (evaluacion: EvaluacionComite) => void;
};
const IntegranteEvaluacion: React.FC<IntegranteEvaluacionProps> = ({
  integrantes,
  btnHide = false,
  setEvaluacion,
}) => {
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
    sNI: integrantes.datosCodirector?.sNI,
    numPubArb: integrantes.datosCodirector?.numPubArb,
    numEstMaestria: integrantes.datosCodirector?.numEstMaestria,
    numEstDoc: integrantes.datosCodirector?.numEstDoc,
  };

  const user = {
    // FIXME: @iocampo Agregar instrucciones
    instrucciones: 'Instruccciones',
    nombre: integrantes.nombre,
  };

  const handleClick = (comentario: string) => {
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
        <EcosurProfileCard data={info} />
        <Comentario statusIndividuals={integrantes.estatusIndividual} />
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
export default IntegranteEvaluacion;
