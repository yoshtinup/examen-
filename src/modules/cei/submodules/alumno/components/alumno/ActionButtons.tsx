import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  RespuestaItemProps,
  FormStructureProps,
} from '@moduleCEIAlumnos/__generated__/globalTypes';
import DataService from '@moduleCEIAlumnos/services/data';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../../store/slices/alumno';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 1,
};

// Estatus de Activacion

const cartaAceptacion = [
  'Aprobado por CEI',
  'Aprobado por CEI con sugerencias',
  'Aprobado por evaluación',
];

// @todo: Cambie segun convenga los estatus
const buttonsSave = [
  'Pendiente de envío',
  'Propuesta sin guardar',
  'No aprobado por CEI con sugerencias',
  'Pendiente de validar con sugerencias',
  'No aprobado por CEI',
  'En revisión por CEI',
];

/**
 * Botones de accion usados por los alumnos
 * @param
 * @returns
 */
const ActionButtons = ({ onClick }: { onClick: any }) => {
  const [alumno, setAlumno] = useRecoilState(alumnoAtom);

  const [aceptacionActive, setAceptacionActive] = useState<boolean>(
    !cartaAceptacion.includes(alumno.status)
  );
  const [disabled, setDisabled] = useState<boolean>(
    !buttonsSave.includes(alumno.status)
  );
  const [msgTemp, setMsgTemp] = useState<string>(
    'Se a guardado con exito, cuando este listo, favor de confirmar el envío'
  );
  // const [documents, setDocuments] = useState<DocumentoItemProps[]>([])
  // const handleCarta = () => {
  //     if(resultadosPropuesta.estatusPropuesta == 3 || 4 || 5){
  //         setStatusPropuesta(false);
  //     }
  //     if(resultadosPropuesta.estatusPropuesta == 1){
  //         <Alert severity="warning">Aun no ha realizado su evaluación</Alert>
  //     }
  // }

  // Aplicar estado dependiendiendo del status
  const setStatus = () => {
    setAceptacionActive(!cartaAceptacion.includes(alumno.status));
    setDisabled(!buttonsSave.includes(alumno.status));
  };
  const handleShowCarta = () => {
    window.open(
      `https://apicei.web.ecosur.mx/images/cartas/${alumno.idFormulariosRespuestas}.pdf`,
      '_blank'
    );
  };

  function setData(
    send: (data: FormData) => Promise<AxiosResponse<{ status: string }>>,
    data: FormStructureProps
  ) {
    const jsonData: string = JSON.stringify({
      apelacion: data.appeal,
      documentos: data.documents,
      propuesta: {
        _18FormulariosRespuestasPlantillas: data.answers
          .filter(
            answers => answers.visible === true && answers.respuesta != ''
          )
          .map(answer => ({
            idPlantillaPreguntas: answer.idPlantillaPreguntas,
            respuesta: answer.respuesta,
          })),
      },
    });
    const formData = new FormData();
    data.documentData.forEach((file: File | undefined) => {
      if (file) formData.append('files', file);
    });
    formData.append('jsonData', jsonData);
    send(formData)
      .then(response => {
        const newAlumno = Object.assign(alumno, {
          status: response.data.status,
        });

        setAlumno(newAlumno);
        console.log(!buttonsSave.includes(response.data.status));
        setDisabled(!buttonsSave.includes(response.data.status));
        setMsgTemp(
          'Se a guardado con exito, cuando este listo, favor de confirmar el envío'
        );
      })
      .catch(() => {
        setMsgTemp('Error al intentar guardar, verifique sus respuestas');
      });
  }

  const [openEnviar, setEnviar] = React.useState(false);
  const handleOpenEnviarMod = () => setEnviar(true);
  // Envia a la api las respuestas
  // la api retorna el nuevo estatus
  const enviarEvaluacion = (data: FormStructureProps) => {
    setData(DataService.enviarEvaluacion, data);
    handleCloseEnviarMod();
  };

  const handleCloseEnviarMod = () => {
    setEnviar(false);
    setStatus();
  };

  const [openTemp, setTemp] = React.useState(false);
  const handleOpenTempMod = () => setTemp(true);
  // Guarda temporal las respuestas
  // la api retorna el nuevo estatus
  const guardarTemporal = (data: FormStructureProps) => {
    setData(DataService.guardarTemporal, data);
    handleOpenTempMod();
  };

  const handleCloseTempMod = () => {
    setTemp(false);
    setStatus();
  };

  return (
    <>
      {globalThis.SHOWINTERFACE.showButtons ? (
        <ButtonGroup
          disableElevation
          size="small"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            variant="contained"
            disabled={disabled}
            onClick={handleOpenEnviarMod}
          >
            Enviar Evaluación
          </Button>
          <Button
            variant="outlined"
            disabled={disabled}
            onClick={onClick(guardarTemporal)}
          >
            Guardado temporal
          </Button>
          <Button
            variant="outlined"
            disabled={aceptacionActive}
            onClick={handleShowCarta}
          >
            {' '}
            Generar Carta de Aceptación
          </Button>
        </ButtonGroup>
      ) : null}

      <Dialog
        open={openEnviar}
        onClose={handleCloseEnviarMod}
        aria-labelledby="enviar-dialog-title"
        aria-describedby="enviar-dialog-description"
      >
        <DialogTitle id="enviar-dialog-title">
          {'Confirmación de envío'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="enviar-dialog-description">
            ¿Desea enviar la evaluación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnviarMod}>Cancelar</Button>
          <Button onClick={onClick(enviarEvaluacion)} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openTemp}
        onClose={handleCloseTempMod}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="div">
            Guardado temporal
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {msgTemp}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default ActionButtons;
