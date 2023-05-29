import { DialogContentText, Grid, Link, TextField, Snackbar, CircularProgress} from "@mui/material";
import { CardList } from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { CursoPorIniciarGql } from "@shared/types/cursosPorIniciarGql";
import { getDataCardCursoAIniciar } from "@shared/components/cards/createDataCardCursoPorIniciar";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { crearJSON } from "@modules/tablero_plan_estudios/hooks";
import { useState } from "react";
import Modal from "@shared/components/layouts/modal";
import { MessageSnackbar } from "@shared/components/layouts/messaAlert";
import apiAsignatura from "@shared/components/cards/apiAsignatura";
import { useQuery } from "react-query";

const CardsCursosAIniciar = () => {
  const [open, setOpen] = useState(false);
  const [razonAgregarAsignatura, setRazonAgregarAsignatura] = useState('');
  const [error, setError] = useState(false);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const [sendAsignatura, setSendAsignatura] = useState(false);
  const [idMateria, setIdMateria] = useState('');
 
  const arrayCursos: CursoPorIniciarGql[] = crearJSON().data.sort(
    (a, b) => {
      if (a.FechaInicioCurso > b.FechaInicioCurso) return 1;
      if (a.FechaInicioCurso < b.FechaInicioCurso) return -1;
      return 0;
    }
  );
  //cualquier cambio dentro del textfield
  const handleChangeTextField = (event) => {
      setRazonAgregarAsignatura(event.target.value);
      setError(false);
  };  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      razonAgregarAsignatura.trim() === ''
    ) 
    {
      setError(true);
      return;
    }
    setSendAsignatura(true);
    // Validar los campos del formulario aquí
  };
  const handletSucces=(data)=>{
    setOpen(data);
    setRazonAgregarAsignatura('');
    setSendAsignatura(false);
  }
  //useGetCursosAIniciar(false).data;
  if(!arrayCursos){
    return <></>;
  }
  return (
    <>
    {sendAsignatura && <SendBajaAsignatura onData={handletSucces} idMateriasOfertaAnual={idMateria} justificacion={razonAgregarAsignatura} />}
      <Grid container spacing={2} style={{padding:"10px 50px 0"}}>
        <Grid item xs={8}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Grid>
        <Grid item xs={4} style={{textAlign:"center", margin:"auto"}}>
          <Link href="https://www.ecosur.mx/ecoconsulta/cursosposgrado">
            <LibraryBooksIcon style={{fontSize:"70px"}} />
            <h3>OFERTA DE CURSOS DEL AÑO VIGENTE</h3>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{padding:"50px"}}>
        {arrayCursos?.map((curso:CursoPorIniciarGql, i) =>
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
            <CardList data={getDataCardCursoAIniciar(curso, currentRol, setOpen,setIdMateria)} />
          </Grid>
        )}
      </Grid>
      <Modal
        open={open}
        titulo="Alta de asignatura"
        elemento={
          <DialogContentText id="alert-dialog-description">
            Escriba la razón de la alta asignatura y haga clic en el botón{' '}
            <strong>Dar de alta</strong>. Se notificará a su director/a de tesis
            para que revise y autorice el cambio de su plan de estudios.
            <br />
            <br />
            <TextField
              id="razon-alta-asignatura"
              label="Escriba la razón de alta de la asignatura"
              sx={{ width: '100%' }}
              multiline
              rows={4}
              value={razonAgregarAsignatura}
              onChange={handleChangeTextField}
              error={error}
              helperText={error ? 'Este campo es requerido' : ''}
            />
            
          </DialogContentText>
        }
        clickClose={() => {
          setOpen(false);
          setError(false);
          setRazonAgregarAsignatura('');
        }}
        clickFunction={()=>handleSubmit(event)} //;
        btnTextCancel="Salir"
        btnTextAcept="Dar de Alta"
      />
    </>
  );
};

const SendBajaAsignatura=({onData, idMateriasOfertaAnual, justificacion})=>{
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    // //retorno de valor True al padre
    onData(false);
    setOpen(false);
  };
  
  const {data, error, isLoading, isSuccess} = useQuery(
    'dar-baja-asignatura',
    async () => await apiAsignatura.getBajaAsignatura(idMateriasOfertaAnual,justificacion),
    {
      staleTime: Infinity,
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

export default CardsCursosAIniciar;
