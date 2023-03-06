import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Componente personalizado de dialogo no hace falta documentar fue sacado de
// la documentacion oficial de mui

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type ModalStructProps = {
  title: string,
  open: boolean,
  onClose: () => void,
  children?: React.ReactNode;
}

const CustomDialog = (props: ModalStructProps) =>{
  const { title, open, onClose, children } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      fullScreen={fullScreen}
			fullWidth={true}
			maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </BootstrapDialogTitle>
      {children}
    </BootstrapDialog>
  );
}
export default CustomDialog
