import { EcosurAuth } from "@modules/auth/definitions";
import { userStateAtom } from "@modules/auth/recoil";
import {
  Avatar,
  Button,
  CircularProgress,
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
  Snackbar,
  Stack,
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
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import apiRevisionCurp from "@shared/components/cards/apiRevisionCurp";
import { MessageSnackbar } from "@shared/components/layouts/messaAlert";
import { WithRolCheck} from '@shared/hooks';
import Roles from '@definitions/Roles';
import { CheckCircle } from '@mui/icons-material';

const DatosGenerales = (props:any) => {
  const matricula = props.matricula;
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  let registrationUser;
  if(matricula!=undefined){
    registrationUser= Number(matricula);
  }else{
    registrationUser=user.estudiante.matricula;
  }
  //checar si el rol es el adecuado
  const rol = WithRolCheck(Roles.Estudiante);
  const show = rol(null);

  const { data, isError, isLoading } = useGetEstudianteInfo(registrationUser);
  
  const dataTS = useGetTutoresSinodales(registrationUser);
  let userInfo:EstudianteGql = {} as EstudianteGql;
  if(isLoading){
    return <>Cargando</>
  }
  if(isError){
    return <>Error</>
  }
  userInfo = data[0];
  const generoBienv = new Array();
  generoBienv[1] = "Bienvenido, ";
  generoBienv[2] = "Bienvenida, ";
  const datosGenerales = [
    {key:"Matricula", value:userInfo.Matricula},
    {key:"CURP", value:userInfo.Datos.CURP},
    {key:"Programa", value:userInfo.Programa.NombreLargo},
    {key:"Orientación", value:userInfo.Orientacion.Nombre},
    {key:"Generación", value:userInfo.Generacion.Value},
    {key:"Unidad", value:userInfo.UnidadAdscripcion.value},
    {key:"Tesis", value:userInfo.Tesis},
    {
      key:"Estudio inmediato anterior",
      value:
        userInfo.Datos.InmediatoAnterior.CarreraOPrograma +
        " (Nivel: " + userInfo.Datos.InmediatoAnterior.Nivel +
        "), " + userInfo.Datos.InmediatoAnterior.Institucion +
        ". Examen de grado el " + formatoFecha(userInfo.Datos.InmediatoAnterior.FechaExamenProfesional) +
        ". Promedio: " +userInfo.Datos.InmediatoAnterior.PromedioWeb
    },
    {key:"Correo institucional", value:userInfo.Datos.CorreoElectronicoEcosur},
    {key:"Correo personal", value:userInfo.Datos.Email}
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{padding:"20px"}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem
            secondaryAction={
              <>
                {userInfo.Estatus == "Activo" &&
                  <Stack spacing={2} direction="row">
                    <Button onClick={() => {}} variant="contained">Descargar constancia de estudios.</Button>
                    <Button onClick={() => window.open("https://www.ecosur.mx/posgrado/posgrado/reglamentos-y-normas/")} variant="contained">Reglamento</Button>
                    <Button onClick={() => window.open("https://www.ecosur.mx/posgrado/posgrado/convocatorias/")} variant="contained">Convocatorias</Button>
                  </Stack>
                }
                {userInfo.Estatus == "Egresado" &&
                  <>
                  <Link href="https://">
                    <InsertLinkIcon style={{margin:"0 0 -7px"}}/> Descargar constancia de estudios.
                  </Link><br />
                  <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=ueQ7jWW-mEWHw68xN_k1NX_jq7a_lFNEqZUSVzf_V9FUOUlFV1kzQ0pVMUdNU05VRjBRUzVVNjlPMC4u">
                    <InsertLinkIcon style={{margin:"5px 0 -7px"}}/> Solicitar fecha de examen de grado
                  </Link><br />
                  <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=ueQ7jWW-mEWHw68xN_k1NX_jq7a_lFNEqZUSVzf_V9FUNkw1U0IzN04zTE9ISkg2SUNHNTk2UzVNUS4u">
                    <InsertLinkIcon style={{margin:"5px 0 -7px"}}/> Registrar revisores de examen de grado
                  </Link>
                  </>
                }
              </>
            }
          >
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
                  !matricula&&
                  generoBienv[userInfo.Datos.IdGenero]
                }
                  {
                     " " +userInfo.Datos.Nombre + " " +
                    userInfo.Datos.ApellidoPaterno + " " +
                    userInfo.Datos.ApellidoMaterno
                  }
                </Typography>
              }
              secondary={<>Ingresó al Posgrado: {formatoFecha(userInfo.FechaDeIngresoAlPosgrado)} - <b>{userInfo.Estatus}</b></>}
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
              <ListItem key={i} secondaryAction={show && renderSwitch(item.key, userInfo)}>
                <ListItemText
                  primary={
                    <span style={{width:"75%", display:"block"}}>
                      <b>{item.key}: </b>{item.value}
                    </span>
                  }
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <TutoresSinodales dataTS={dataTS} show={show} matricula={matricula}/>
      </Grid>
    </Grid>
  );
};

const TutoresSinodales = (props:any) => {
  const show=props.show;
  const matricula=props.matricula;
  const TS:TutoresSinodalesGql = props.dataTS.data;
  const generoNivelPart = new Array();
  const nivelesPart = new Array();
  generoNivelPart[1] = ["Director de tesis", "Directora de tesis"];
  generoNivelPart[2] = ["Asesor", "Asesora"];
  generoNivelPart[33] = ["Coodirector", "Coodirectora"];
  nivelesPart.push(1, 2, 33)
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
                  <>
                    {item.Persona.nombre}{' '}{item.Persona.ApellidoPaterno}{' '}{item.Persona.ApellidoMaterno}{item.Persona.Email && `(${item.Persona.Email})`} -{' '}
                    <span style={{color:'#666'}}>
                      {nivelesPart.includes(item.Nivel.IdParticipacion)
                        ? generoNivelPart[item.Nivel.IdParticipacion][item.Persona.IdGenero-1]
                        : item.Nivel.Participacion
                      }
                    </span>
                  </>
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
            icono={TS.ConformacionCT[0].Catalogo.Estatus!='Aprobado'?<ErrorIcon style={{color:"red"}}/>:<CheckCircle style={{color:"green"}}/>}
            elemento={TS.ConformacionCT[0].Catalogo.Estatus}
            secondaryAction={
              <Button onClick={() => {show?window.location.href = `/consejo_tutelar`:window.location.href = `/consejo_tutelar/${matricula}`}} variant="contained">Ver</Button>
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
      <Link href="https://" onClick={handleClickOpen}>
        Actualizar
      </Link>
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
    "Diciembre"
  ];
  const fecha = new Date(Date.parse(date));
  return fecha.getDate() + " de " + meses[fecha.getMonth()] + " del " + fecha.getFullYear();
}
//modal pasa solicitar correccion


const Modal = props => {

  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [review, setReview] = useState(false);
  const handleSubmit = (event) => {
    
    event.preventDefault();
    setOpenModal(true);
    setOpen(true);
    }
    const ClickClose =(event)=>{
      event.preventDefault();
      setOpen(false);
      setReview(false);
    }
    const ClickReview =(event)=>{
      event.preventDefault();
      setReview(true);
      
    }
    const handleDataFromChild = data => {
      setOpen(data);
      setReview(data);   
    };
  const btnAcept = props.btnTextAcept;
  const btnCancel = props.btnTextCancel;
  return (<>
    <Link aria-disabled={true}><a style={{cursor:"pointer"}} onClick={handleSubmit}> Solicitar corrección</a>
    {openModal && <Dialog
      open={open}
      fullWidth={false}
      maxWidth="md"
      onClose={ClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >{review && <ReviewCURP onData={handleDataFromChild}/>}
      <DialogTitle id="alert-dialog-title">¿Solicitar Corrección?</DialogTitle>
      
      <DialogActions>
        <Button onClick={ClickClose}>{btnCancel}</Button>
        <Button onClick={ClickReview} autoFocus>
          {btnAcept}
        </Button>
        
        
      </DialogActions>
      
    </Dialog>}
    
    </Link>
    
    </>
  );
};
//incripción al estudiante al curso
const ReviewCURP = ({onData}) => {
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    //retorno de valor True al padre
    onData(false);
  };
  const { data, error, isLoading,isSuccess} = useQuery(
    'solicitar-revision-curp_222222',
    async () => await apiRevisionCurp.getSolicitarRevisionCURP(),
    {
      staleTime: 10000,
    }
  );
  let setMessage = data?.message;

  if (isLoading)
    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircularProgress />
      </Snackbar>
    );
  if (error)
    return (
      <MessageSnackbar onOpen={open} autoDuration={2000} close={()=>setOpen(false)} message={"No se pudo generar la solicitud"} txtSeverity={"error"}/>
    );
  if (isSuccess) {
    return (
      <MessageSnackbar onOpen={open} autoDuration={2000} close={handleClickFalse} message={setMessage} txtSeverity={"success"}/>
    );
    
  } else {
    return (
      <MessageSnackbar onOpen={open} autoDuration={2000} close={()=>setOpen(false)} message={setMessage} txtSeverity={"warning"}/>
    );
    
  }
};


function renderSwitch(op:string, userInfo:EstudianteGql){
  
  let component = null;
  switch(op){
    case "Correo personal":
      component = <ActualizarCorreo userInfo={userInfo}/>;
      break;
    case "Tesis":
      component = <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=ueQ7jWW-mEWHw68xN_k1NX_jq7a_lFNEqZUSVzf_V9FUQ0FNME83SEFNMVpBUTVPRUZXSzEwMlIzVi4u">Solicitar cambio de título</Link>;
      break;
    case "CURP":
      component = <Modal
      btnTextCancel="No"
      btnTextAcept="Sí, Solicitar"
    />
      break;
  }
  
   return component;
}

export default DatosGenerales;
