import { Box, Button, Chip, Modal } from '@mui/material';
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
      <Chip
        onClick={handleOpen}
        variant="outlined"
        size="small"
        clickable
        color="info"
        label="Ver detalles"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            src={
              'https://aplicaciones.ecosur.mx/app/funcionalidades-sip/datos-participantes-asignatura-6490b028e8023e77eb94dec9?idProfesor=' +
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
