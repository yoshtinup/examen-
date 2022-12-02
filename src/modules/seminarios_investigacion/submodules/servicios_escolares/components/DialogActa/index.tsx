// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { EcosurProfileCard, EcosurFormSelect } from 'ecosur-ui';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface EcosurCommentDialogProps {
  data: any;
  handleClose: () => void;
  open: boolean;
  onClick: (comentario: string) => void;
  titulo?: string;
  label?: string;
  instruccion?: boolean;
}

const EcosurCommentDialog = ({
  data = {},
  handleClose,
  open,
  onClick,
  titulo = 'Inserte un comentario',
  label = 'Observación',
  instruccion: isTrue = false,
}: EcosurCommentDialogProps) => {
  let flexD = 'row';
  let size = undefined;
  let align = 'center';
  if (isTrue) {
    flexD = 'column';
    size = 'all';
    align = 'left';
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let textComentario = '';
  const [confirm, setConfirm] = React.useState(true);

  const handleSubmit = () => {
    onClick(textComentario);
    handleClose();
    setConfirm(true);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle> {titulo} </DialogTitle>
        <DialogContent dividers>
          <EcosurProfileCard
            data={data}
            color='background.paper'
            sizeRow={size}
            flexD={flexD}
            align={align}
          />
          <EcosurFormSelect field={undefined} form={undefined} meta={undefined} options={[]} />
          <p />
          <Typography gutterBottom>
            <b> {label} </b>
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            placeholder='Ingresar comentario(s)'
            multiline
            rows={5}
            onChange={(newValue) => {
              textComentario = newValue.target.value;
              textComentario.replace(/ /g, '').length >= 10 ? setConfirm(false) : setConfirm(true);
            }}
          />
        </DialogContent>
        <p />
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>
            Cancelar
          </Button>
          <Button disabled={confirm} variant='contained' color='primary' onClick={handleSubmit}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EcosurCommentDialog;
