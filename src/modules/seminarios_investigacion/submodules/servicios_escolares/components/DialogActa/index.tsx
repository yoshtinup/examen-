// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { EcosurProfileCard } from 'ecosur-ui';
import { SelectChangeEvent } from '@mui/material/Select';
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
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

interface EcosurCommentDialogProps {
  data: any;
  handleClose: () => void;
  open: boolean;
  onClick: (comentario: string) => void;
  titulo?: string;
  label?: string;
  instruccion?: boolean;
  selectTitle: string;
}

const MenuItems = () => {
  return (
    <p>sadas</p>
  );
}

const EcosurCommentDialog = ({
  data = {},
  handleClose,
  open,
  onClick,
  titulo = 'Inserte un comentario',
  label = 'Observación',
  instruccion: isTrue = false,
  selectTitle,
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
  const [age, setAge] = React.useState('10');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
          <Grid sx={{ display: 'flex', flexDirection: 'row', pl: 3, alignItems: 'center' }}>
            <Typography gutterBottom sx={{ pr: 1 }}>
              <b> Cambiar a: </b>
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                size='small'
                  labelId="ecosur-select-estatus"
                  id="ecosur-select-estatus"
                  value={age}
                  label={selectTitle}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
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
