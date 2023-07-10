import { Box, Chip, Modal } from '@mui/material';
import { useState } from 'react';
import MessageGenerarConstanciaDocente from './messageGenerarConstanciaDocente';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '600px',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: '450px',
};

const ModalDatosParticipante = ({
  idParticipante,
  IdcatalogoEstatusRegistroDocentesPorcentajes,
}: {
  idParticipante: number;
  IdcatalogoEstatusRegistroDocentesPorcentajes: number;
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
        style={{ zIndex: '1050' }}
      >
        <Box sx={style}>
          <iframe
            src={
              process.env.APPSMITH_URL + '/app/funcionalidades-sip/datos-participantes-asignatura-6490b028e8023e77eb94dec9?idProfesor=' +
              idParticipante +
              '&embed=true'
            }
            width="100%"
            height="90%"
            style={{ border: 'none' }}
          ></iframe>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDatosParticipante;
