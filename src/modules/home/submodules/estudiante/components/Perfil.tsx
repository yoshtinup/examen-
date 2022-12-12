import{ EcosurContainer, EcosurProfileCard } from 'ecosur-ui';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
  DialogTitleProps,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { EstudianteGql } from '@shared/types';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { useUpdateEmail } from '../queries/intex';
import message from '@modules/consejo_tutelar/submodules/evaluacion/pages/message';
import { useMutation } from 'react-query';

interface EcosurProfileDialogProps {
  handleClose: () => void;
  open: boolean;
  estudiante: EstudianteGql | null;
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

function validarEmail(email: string, newEmail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail) && email !== newEmail) { 
    return true;
  }
}

function updateEmail(idAlumno: number, email: string) {
  const { data, isError, isSuccess, refetch } = useUpdateEmail(idAlumno, email);
  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cambair su correo electrónico.',
    });
  }
  if (isSuccess) {
    Swal.fire({
      icon: 'success',
      title: 'El correo electrónico',
      text: 'Se guardó exitosamente',
    });
  }
}

const EcosurProfileDialog = ({
  handleClose,
  open,
  estudiante,
  titulo = 'Mi cuenta',
  instruccion: isTrue = false,
}: EcosurProfileDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [newEmail, setNewEmail] = React.useState(estudiante.Datos.Email);
  const {isError, isSuccess, refetch, isIdle } = useUpdateEmail(estudiante.Datos.IdAlumno, newEmail);
  const handleSubmit = () => {
    refetch();
    console.log(isSuccess);
    if(isIdle) {console.log(isIdle);
    }
    handleClose();
    if (isError) {
      return(
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cambair su correo electrónico.',
      }));
    }
    if (isSuccess) {
      return (
      Swal.fire({
        icon: 'success',
        title: 'El correo electrónico',
        text: 'Se guardó exitosamente',
      }));
    }
    // window.location.reload();
  };  
  let userInfo: Object;
  let flexD = 'row';
  let size = undefined;
  let align = 'center';
  if (fullScreen) isTrue = true;
  if (isTrue) {
    flexD = 'column';
    size = 'all';
    align = 'left';
  }
  if (estudiante) {
    userInfo = {
      nombre: `${estudiante.Datos.Nombre} ${estudiante.Datos.ApellidoPaterno} ${estudiante.Datos.ApellidoMaterno}`,
      programa:  `${estudiante.Programa.NombreLargo}`,
      orientacion: `${estudiante.Orientacion.Nombre}`,
      matricula: `${estudiante.Matricula}`,
      unidad: `${estudiante.UnidadAdscripcion.value}`,
      'Generación': `${estudiante.Generacion.Value}`
    }
  } else {
    userInfo = {
      Error: `No se pudo cargar su información`,
    }  
  }
  fullScreen ? isTrue = true : isTrue = false;
  const componentes = [
    {
      componente:
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="foto_perfil"
              src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"
            />
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', ml: fullScreen && 3 }}>
            <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
              Estatus:
            </Typography>
            <Typography>
              {estudiante && estudiante.Estatus}
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'column', ml: fullScreen && 3 }}>
            <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
              Correo:
            </Typography>
            <Typography>
              {estudiante && estudiante.Datos.CorreoElectronicoEcosur}
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
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid item>
            <EcosurProfileCard
              data={userInfo}
              color='background.paper'
              sizeRow={size}
              flexD={flexD}
              align={align}
            />
          </Grid>
          <Grid item sx={{ ml: 3, display: 'flex', flexDirection: fullScreen? 'column' : 'row', alignItems: fullScreen ? 'left' : 'center' }}>
            <Typography sx={{ fontWeight: 'bold', mb: fullScreen && 1 }} variant='body1'>
              Correo personal:&nbsp;
            </Typography>
            <TextField size='small' sx={{ width: 1, mb: fullScreen && 1, mr: 1 }} defaultValue={newEmail} 
              onChange={event => {
                const { value } = event.target;
                setNewEmail(value);
              }}>
            </TextField>
            {
              validarEmail(estudiante&&estudiante.Datos.Email, newEmail) && <Button size='small' variant='contained' onClick={handleSubmit}>Cambiar correo</Button>
            }
          </Grid>
        </Grid>
      ,
      alignHorizontal: 'right',
      alignVertical: 'right',
      horizontalAlign: 'right',
      verticalAlign: 'right',
    }
  ]

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
