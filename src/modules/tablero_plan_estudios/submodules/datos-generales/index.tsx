import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useGetEstudianteInfo } from "@shared/queries";
import { useGetTutoresSinodales } from "@shared/queries/tutoresSinodales";
import { EstudianteGql } from "@shared/types";
import { useRecoilValue } from "recoil";
import { People } from "@mui/icons-material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TutoresSinodalesGql } from "@shared/types/tutoresSinodales";
import { useEffect, useState } from "react";
import { useUpdateEmail } from "@modules/home/submodules/estudiante/queries/intex";
import Swal from "sweetalert2";

const DatosGenerales = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading } = useGetEstudianteInfo(user.estudiante.matricula);
  const dataTS = useGetTutoresSinodales(199411001);
  //const dataTS = useGetTutoresSinodales(user.estudiante.matricula);
  let userInfo:EstudianteGql = {} as EstudianteGql;
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  userInfo = data[0];
  const datosGenerales = [
    {key:"Matricula", value:userInfo.Matricula},
    {key:"Programa", value:userInfo.Programa.NombreLargo},
    {key:"Orientación", value:userInfo.Orientacion.Nombre},
    {key:"Generación", value:userInfo.Generacion.Value},
    {key:"Unidad", value:userInfo.UnidadAdscripcion.value},
    {key:"Tesis", value:userInfo.Tesis},
    //{key:"Estatus", value:userInfo.Estatus},
    {key:"Correo institucional", value:userInfo.Datos.CorreoElectronicoEcosur},
    {key:"Correo personal", value:userInfo.Datos.Email}
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{padding:"20px"}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={
                  userInfo.Datos.Nombre + " " +
                  userInfo.Datos.ApellidoPaterno + " " + 
                  userInfo.Datos.ApellidoMaterno
                }
                src="https://"
                sx={{ width: 90, height: 90, margin:"auto", fontSize:"37px" }}
              />
            </ListItemAvatar>
            <ListItemText
              style={{marginLeft: "20px", color:"#c56b16"}}
              primary={
                <Typography variant="h4" gutterBottom>
                  {
                    "Bienvenido, " +
                    userInfo.Datos.Nombre + " " +
                    userInfo.Datos.ApellidoPaterno + " " + 
                    userInfo.Datos.ApellidoMaterno
                  }
                </Typography>
              }
              secondary={<>Ingresó al Posgrado el {formatoFecha(userInfo.FechaDeIngresoAlPosgrado)} - <b>{userInfo.Estatus}</b></>}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <List sx={{ width: '100%', bgcolor: '#ecf0f5' }}>
            <ListItem>
              <ListItemText primary={<b style={{fontSize:"23px"}}>DATOS GENERALES</b>}/>
            </ListItem>
            {datosGenerales.map((item, i) =>
              <ListItem key={i} secondaryAction={renderSwitch(item.key, userInfo)}>
                <ListItemText primary={<><b>{item.key}: </b>{item.value}</>}/>
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <TutoresSinodales dataTS={dataTS} />
      </Grid>
    </Grid>
  );
};

const TutoresSinodales = (props:any) => {
  const TS:TutoresSinodalesGql = props.dataTS.data;
  return (
    <Paper>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemText primary={<b style={{fontSize:"23px"}}>CONSEJO TUTELAR</b>}/>
        </ListItem>
        {(TS && TS.ConsejoTutelar && TS.ConsejoTutelar.length > 0)
          ?
          <>
            {TS.ConsejoTutelar.map((item, i) =>
              <ItemTS key={i}
                elemento={
                  item.Persona.nombre + " " +
                  item.Persona.ApellidoPaterno + " " +
                  item.Persona.ApellidoMaterno +
                  (item.Persona.Email && " (" +item.Persona.Email + ")") + " - " +
                  item.Nivel.Participacion
                }
              />
            )}
          </>
          :
          <ItemTS elemento="Sin integrantes registrados"/>
        }
        {(TS && TS.ConformacionCT && TS.ConformacionCT.length > 0)
          ?
          <ItemTS
            icono={<ErrorIcon style={{color:"red"}}/>}
            elemento={TS.ConformacionCT[0].Catalogo.Estatus}
            secondaryAction={
              <Button onClick={() => {window.location.href = "/consejo_tutelar"}} variant="contained">Ver</Button>
            }
          />
          :
          <ItemTS
            icono={<CheckCircleIcon style={{color:"green"}}/>}
            elemento="Consejo tutelar aprobado"
          />
        }
      </List>
    </Paper>
  );
}

const ItemTS = (props:any) => {
  const elemento = props.elemento;
  const icono = props.icono || <People />;
  return (
    <>
      <Divider />
      <ListItem secondaryAction={props.secondaryAction}>
        <ListItemIcon>
          {icono}
        </ListItemIcon>
        <ListItemText primary={elemento}/>
      </ListItem>
    </>
  );
}

const ActualizarCorreo = (props:any) => {
  const userInfo:EstudianteGql = props.userInfo;
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState(userInfo.Datos.Email);
  const {isError, isSuccess, refetch }: any = useUpdateEmail(userInfo.Datos.IdAlumno, newEmail);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (isError) {
      handleClose();
      return(
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'No se pudo guardar su nuevo correo electrónico.',
      }));
    }
    if (isSuccess) {
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'El correo electrónico se guardó exitosamente.',
        text: 'La página se recargará.',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false
      });
      const timer = setTimeout(() => {
        window.location.reload()
      }, 5000);
      return () => clearTimeout(timer);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, [isSuccess, isError])
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Actualizar correo personal
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
      >
        <DialogTitle>Edita tu correo electronico</DialogTitle>
        <DialogContent>
          <TextField fullWidth size='small' defaultValue={newEmail} 
            onChange={event => {
              const { value } = event.target;
              setNewEmail(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button disabled={!validarEmail(userInfo.Datos.Email, newEmail)} onClick={refetch}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function validarEmail(email: string, newEmail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail) && email !== newEmail) { 
    return true;
  }
}

function formatoFecha(date:string){
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciaembre"
  ];
  const fecha = new Date(Date.parse(date));
  return fecha.getDate() + " de " + meses[fecha.getMonth()] + " del " + fecha.getFullYear();
}

function renderSwitch(op:string, userInfo:EstudianteGql){
  let component = null;
  switch(op){
    case "Correo personal":
      component = <ActualizarCorreo userInfo={userInfo}/>;
      break;
    case "Tesis":
      component = <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=ueQ7jWW-mEWHw68xN_k1NX_jq7a_lFNEqZUSVzf_V9FUQ0FNME83SEFNMVpBUTVPRUZXSzEwMlIzVi4u">Solicitar cambio de título</Link>;
      break;
  }
  return component;
}

export default DatosGenerales;
