import React, { useState } from 'react';
import SeccionEvaluacionProfesor from './SeccionEvaluacionProfesor';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Modal,
  Alert,
} from '@mui/material';
import {
  preguntasEvaluacionADocentes,
  totalPreguntasEvaluacionDocente,
} from '../atoms/Text';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: 600,
  overflow: 'scroll',
  display: 'block',
};

const EvaluacionProfesor = ({ profesor }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleEvaluarClick = () => {
    setMostrarModal(true);
  };
  const handleClose = () => setMostrarModal(false);

  const profesorEvaluado =
    profesor.respuestas.selects &&
    profesor.respuestas.textAreas &&
    Object.keys(profesor.respuestas.selects).length ==
      totalPreguntasEvaluacionDocente.totalSelect &&
    Object.keys(profesor.respuestas.textAreas).length ==
      totalPreguntasEvaluacionDocente.totalTextArea
      ? true
      : false;

  return (
    <div>
      <p>{profesor.name}</p>
      <Button onClick={handleEvaluarClick} variant="outlined" color="info">
        Evaluar
      </Button>
      {!profesorEvaluado && (
        <Alert variant="filled" severity="warning">
          {' '}
          Es necesario evaluar por completo al profesor
        </Alert>
      )}
      <Modal
        open={mostrarModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h3>
                <b>Evaluación a:</b> {profesor.name}
              </h3>
              {preguntasEvaluacionADocentes.map(seccion => (
                <SeccionEvaluacionProfesor
                  key={seccion.key}
                  seccion={seccion}
                  profesor={profesor}
                />
              ))}
            </CardContent>
            <CardActions>
              <Button position="right" onClick={handleClose} size="small">
                Terminar evaluación
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default EvaluacionProfesor;
