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
  Alert,
  CircularProgress,
} from '@mui/material';
import { useGetEstatus } from '../../queries/index';
import { EstatusElement, Persona } from '../../types';

interface EcosurCommentDialogProps {
  handleClose: () => void;
  open: boolean;
  onClick: (id: Number) => void;
  titulo?: string;
  label?: string;
  instruccion?: boolean;
  selectTitle: string;
  estatusDescription: Persona;
}

const menuItems = (estatusDescription: Persona, setEstatus) => {
  const { data, isError, isLoading, isSuccess } = useGetEstatus();
  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los seminarios.
      </Alert>
    );
  }
  if (isLoading) { return <CircularProgress />; }
  let estatusLista: EstatusElement[];
  if (isSuccess) {
    estatusLista = data;
  }
  let menuItem = [];      
  estatusLista.map((estatusInfo, index) => {
    estatusInfo.Descripcion != estatusDescription.estatus && menuItem.push(<MenuItem key={`ecosur-menu-item-${index}`} value={`${estatusInfo.ID}`}>{`${estatusInfo.Descripcion}`}</MenuItem>)
  });
  return menuItem;
}

const EcosurCommentDialog = ({
  handleClose,
  open,
  onClick,
  titulo = 'Inserte un comentario',
  label = 'Observación',
  instruccion: isTrue = false,
  selectTitle,
  estatusDescription,
}: EcosurCommentDialogProps) => {
  const data = {
    curso: estatusDescription.seminario,
    estudiante: estatusDescription.nombre,
    'Estatus actual': estatusDescription.estatus
  }
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
  const [confirm, setConfirm] = React.useState(true);
  const [textComentario, setTextComentario] = React.useState('');
  const handleSubmit = () => {
    onClick(Number(estatus));
    handleClose();
    setConfirm(true);
  };
  const [estatus, setEstatus] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setEstatus(event.target.value as string);
    (textComentario.replace(/ /g, '').length >= 10 && estatus != '') ? setConfirm(false) : setConfirm(true);
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
                <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                <Select
                size='small'
                  labelId="ecosur-select-estatus"
                  id="ecosur-select-estatus"
                  value={estatus}
                  label={selectTitle}
                  onChange={handleChange}
                >
                  {menuItems(estatusDescription, setEstatus)}
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
              setTextComentario(newValue.target.value);
              (textComentario.replace(/ /g, '').length >= 10 && estatus != '') ? setConfirm(false) : setConfirm(true);
            }}
          />
        </DialogContent>
        <p />
        <DialogActions>
          <Button variant='outlined' color='error' onClick={() => { setEstatus(''); handleClose(); }}>
            Cancelar
          </Button>
          <Button disabled={confirm} variant='contained' color='primary' onClick={() => { setEstatus(''), handleSubmit(); }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EcosurCommentDialog;
