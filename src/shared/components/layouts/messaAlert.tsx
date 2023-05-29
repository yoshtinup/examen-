import { Alert, Snackbar } from "@mui/material";

export const MessageSnackbar=props=>{
    const open = props.onOpen;
    const duration = props.autoDuration;
    const closeSnack = props.close;
    const message = props.message;
    const severityTxt = props.txtSeverity;
  
    return (<Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={closeSnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severityTxt}>{message}</Alert>
    </Snackbar>)
  }