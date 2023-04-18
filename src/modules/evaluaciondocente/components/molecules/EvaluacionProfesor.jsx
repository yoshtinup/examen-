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
  Grid,
  styled,
} from '@mui/material';
import {
  preguntasEvaluacionADocentes,
  totalPreguntasEvaluacionDocente,
} from '../atoms/Text';
import { useRecoilState } from 'recoil';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import Swal from 'sweetalert2';

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

const ButtonEvaluar = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 20px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#2277BD',
  borderColor: '#2277BD',
  fontFamily: [
    'Arial',
    'sans-serif',
  ]
});

const ButtonDelete = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  color: '#FF1915',
  fontSize: 16,
  padding: '6px 20px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFFF',
  borderColor: '#FF1915',
  fontFamily: [
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ]
});

const textStyle = {
  color: '#FF2626'
};

const EvaluacionProfesor = ({ profesor }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [profesores, setProfesores] = useRecoilState(profesoresState);
  const [buttonName, setButtonName] = useState(false);
  const [buttonEliminar, setButtonEliminar] = useState(false);

  const handleEvaluarClick = () => {
    setMostrarModal(true);
  };

  const handleEliminarEvaluacion = () => {
    Swal.fire({
      title: '¿Quiere eliminar la Evaluación?',
      text: 'No podrá recuperar la Evaluación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, quiero eliminarlo',
    }).then(async result => {
      if (result.isConfirmed) {
        console.log(profesor.idProfesores);
        const profesoresFilter = profesores.map(profe => {
          if (profe.idProfesores == profesor.idProfesores) {
            const { respuestas, ...newProfesor } = profesor;
            return newProfesor;
          }
          return profe;
        });
        setProfesores(profesoresFilter);
        setButtonEliminar(false);
        setButtonName(false);
        console.log(profesoresFilter);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La Evaluación fue eliminada',
          showConfirmButton: true,
        });
      }
    });
  };

  const handleClose = () => {
    setMostrarModal(false);
    setButtonEliminar(true);
    setButtonName(true);
  }

  const profesorEvaluado =
    profesor.respuestas.selects &&
    profesor.respuestas.textAreas &&
    Object.keys(profesor.respuestas.selects).length ==
      totalPreguntasEvaluacionDocente.totalSelect &&
    Object.keys(profesor.respuestas.textAreas).length ==
      totalPreguntasEvaluacionDocente.totalTextArea &&
    Object.values(profesor.respuestas.selects).filter(val => val !== 0)
      .length == totalPreguntasEvaluacionDocente.totalSelect &&
    Object.values(profesor.respuestas.textAreas).filter(val => val !== '')
      .length == totalPreguntasEvaluacionDocente.totalTextArea
      ? true
      : false;

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <p>{profesor.name}</p>
        </CardContent>
        <CardActions>
          <ButtonEvaluar onClick={handleEvaluarClick} variant="contained" color="info">{buttonName ? 'Evaluado' : 'Evaluar'}
          </ButtonEvaluar>
          { buttonEliminar &&
            <ButtonDelete
              onClick={handleEliminarEvaluacion}
              variant="outlined"
              color="error"
            >
              Eliminar evaluación
            </ButtonDelete>
          }
          {!profesorEvaluado && (
            <Alert sx={{ m: 2 }} style={textStyle} variant="text" severity="warning"> 
              {' '}
              <strong>Pendiente de concluir evaluación</strong>
            </Alert>
          )}
        </CardActions>
      </Card>
      <Modal
        open={mostrarModal}
        onClose={handleClose}
        BackdropProps = {{
          onClick: null,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h3>
                <b>Evaluación a:</b>
              </h3>
              <p>{profesor.name}</p>
              <h4>
              {preguntasEvaluacionADocentes.map(seccion => (
                <SeccionEvaluacionProfesor
                  key={seccion.key}
                  seccion={seccion}
                  profesor={profesor}
                />
              ))}
              </h4>
            </CardContent>
            <CardActions>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Button variant="contained" onClick={handleClose}>
                  Guardar
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Grid>
  );
};

export default EvaluacionProfesor;
