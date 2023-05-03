import { Button, Dialog,CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';


const Modal = ({ isOpen, onClose, onData, mensaje }) => {
  const [data, setData] = useState(null);

  const handleClickTrue = () => {
    //retorno de valor False al padre
    onData(true);
  };
  const handleClickFalse = () => {
    //retorno de valor True al padre
    onData(false);
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>{mensaje}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{onClose(); handleClickFalse();}} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>{onClose(); handleClickTrue()}} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;