import { useState } from 'react';
import Swal from 'sweetalert2';
import { TextDocContainer } from '../atoms/Styles';
import FormEvaluacion from './FormEvaluacion';
import { useRecoilState } from 'recoil';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';
import { Button, Paper, Modal } from '@mui/material';
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 600,
  overflow: 'scroll',
  display: 'block',
};

const ProfesoresContainer = () => {
  const [profesores, setProfesores] = useRecoilState(profesoresState);
  const [open, setOpen] = useState(false);
  const [profesor, setProfesor] = useState({});
  const handleClick = profesor => {
    setOpen(true);
    setProfesor(profesor);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {profesores.map((elm, i) => (
        <>
          <Paper elevation={2} square>
            <TextDocContainer key={i}>{elm.name} </TextDocContainer>
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleClick(elm)}
            >
              Evaluar
            </Button>
          </Paper>
          <br></br>
        </>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormEvaluacion profesor={profesor} />
        </Box>
      </Modal>
    </>
  );
};

export default ProfesoresContainer;
