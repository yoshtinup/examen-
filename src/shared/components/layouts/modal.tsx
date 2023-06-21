import {Dialog, DialogActions, DialogTitle, Button, DialogContent} from '@mui/material';


const Modal = props => {
    const open = props.open;
    const titulo = props.titulo;
    const elemento = props.elemento;
    const clickClose = props.clickClose;
    const clickFunction = props.clickFunction;
    const btnAcept = props.btnTextAcept;
    const btnCancel = props.btnTextCancel;
    return (<>
        <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        onClose={clickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>{elemento}</DialogContent>
        <DialogActions>
          <Button onClick={clickClose}>{btnCancel}</Button>
          <Button onClick={clickFunction} autoFocus>
            {btnAcept}
          </Button>
        </DialogActions>
      </Dialog>
      
      </>
    );    
  };
  export default Modal;