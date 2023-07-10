import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: '80vh',
};

const ModalDatosParticipante = ({
  idParticipante,
}: {
  idParticipante: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Ver detalles
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            src={
              process.env.APPSMITH_URL + 'datos-participantes-asignatura-6490b028e8023e77eb94dec9?idProfesor=' +
              idParticipante +
              '&embed=true'
            }
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          ></iframe>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDatosParticipante;
