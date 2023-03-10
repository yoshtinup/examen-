import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  AlertMessageProps,
  RechazarProps,
} from '../../__generated__/globalTypes';
import DataService from '../../services/data';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../../store/slices/alumno';

/**
 * Curpo de confirmacion de rechazar evaluacion
 * @returns
 */
export default function BodyRechazarEvaluacion() {
  const [alumno] = useRecoilState(alumnoAtom);
  const [motivo, setMotivo] = React.useState('');
  const [alert, setAlert] = React.useState<AlertMessageProps | null>(null);

  const handleChangeMotivo = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMotivo(event.target.value as string);
  };

  // Enviar a la api el aviso que se rechazazo la evaluacion
  function handleAction() {
    const rechazar: RechazarProps = {
      idPropuesta: alumno.alumno.idFormulariosRespuestas,
      tesis: alumno.alumno.tesis,
      observacion: motivo,
    };

    DataService.setRechazar(rechazar)
      .then((response: any) => {
        setAlert({
          severity: 'success',
          message: response.data,
        });
      })
      .catch((e: any) => {
        let msg = '';
        if (e.response.status == 403) {
          msg = ', usted ya realizó una evaluación ó un rechazo anteriormente';
        }
        setAlert({
          severity: 'warning',
          message: 'No se pudo registrar el rechazo de evaluación' + msg,
        });
      });
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>¿Desea rechazar la evaluación?</DialogContentText>
        <Alert severity="warning">
          Confirme el rechazo de evaluación en caso de tener algún conflicto de
          intereses o describa la razón por la cual no desea participar en la
          evaluación de esta propuesta
        </Alert>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <FormLabel component="legend">Motivo</FormLabel>
          <TextareaAutosize
            aria-label="agregar motivo"
            minRows={3}
            placeholder="Agregar motivo"
            onChange={handleChangeMotivo} nonce={undefined} onResize={undefined} onResizeCapture={undefined}          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAction} autoFocus>
          Rechazar
        </Button>
      </DialogActions>
      {alert ? (
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}
