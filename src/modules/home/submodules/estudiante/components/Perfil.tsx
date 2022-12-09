import React from 'react';
import{ EcosurContainer, EcosurProfileCard } from 'ecosur-ui';
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
  DialogTitleProps,
  IconButton,
  Box,
  Grid
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface EcosurProfileDialogProps {
  handleClose: () => void;
  open: boolean;
  titulo?: string;
  instruccion?: boolean;
}

export interface CustomDialogTitleProps extends DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: CustomDialogTitleProps) {
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
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const EcosurProfileDialog = ({
  handleClose,
  open,
  titulo = 'Mi cuenta',
  instruccion: isTrue = false,
}: EcosurProfileDialogProps) => {
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
  const userInfo = {
    nombre: 'Nombre ejemplo',
    programa: 'Programa ejemplo',
    orientacion: 'Orientación ejemplo',
    matricula: 'Matricula ejemplo',
    unidaD: 'Unidad ejemplo',
    'Generación': 'Generación ejemplo'
  }
  const componentes = [
    {
      componente:
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid item>
            <Box
              component="img"
              sx={{
                mb: 1,
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Grid>
          <Grid item sx={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
              Estatus:
            </Typography>
            <Typography>
              Activo
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
              Correo:
            </Typography>
            <Typography>
              Correo ejemplo
            </Typography>
          </Grid>
        </Grid>
      ,
      width: 3,  
      alignHorizontal: 'right',
      alignVertical: 'right',
      horizontalAlign: 'right',
      verticalAlign: 'right',
    },
    {
      componente:
        <Box>
          <EcosurProfileCard
            data={userInfo}
            color='background.paper'
            sizeRow={size}
            flexD={flexD}
            align={align}
          />
        </Box>,
      alignHorizontal: 'right',
      alignVertical: 'right',
      horizontalAlign: 'right',
      verticalAlign: 'right',
    }
  ]
  let textComentario = '';
  const [confirm, setConfirm] = React.useState(true);

  const handleSubmit = () => {
    // onClick(textComentario);
    handleClose();
    setConfirm(true);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth='lg'
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <CustomDialogTitle id='ecosur-perfil' onClose={handleClose}>{titulo}</CustomDialogTitle>
        <DialogContent dividers>
          <EcosurContainer data={componentes} />
          <p />
        </DialogContent>
        <p />
      </Dialog>
    </div>
  );
};

export default EcosurProfileDialog;
