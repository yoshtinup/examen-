import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { CursoGql, CursosAlumnoGql } from "@shared/types";
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso
} from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom, userStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { EcosurAuth } from "@modules/auth/definitions";
import { useState } from "react";
import { CursoPorIniciarGql } from "@shared/types/cursosPorIniciarGql";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      maxWith: 250,
    },
  },
};

const CardsCursos = (props:any) => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCursos:CursosAlumnoGql = props.data;
  const arrayCursosAIniciar:CursoPorIniciarGql[] = props.aIniciar;
  const [openBM, setOpenBM] = useState(false);
  const [openCM, setOpenCM] = useState(false);
  
  const [asignatura, setAsignatura] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAsignatura(event.target.value as string);
  };
  
  if(!arrayCursos){
    return <></>;
  }
  return (
    <>
      <Grid container spacing={2} style={{padding:"10px 50px 0"}}>
        <Grid item xs={12}>
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
      </Grid>
      <Grid container spacing={2} style={{padding:"50px"}}>
        {(arrayCursos?.EnProceso?.length > 0 || arrayCursos?.Pendientes?.length > 0) &&
          <>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <b>EN PROCESO Y POR INICIAR</b>
              </Typography>
            </Grid>
            {arrayCursos?.EnProceso?.map((curso:CursoGql, i) =>
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                <CardList data={getDataCardCursoEnProceso(curso, currentRol)} />
              </Grid>
            )}
            {arrayCursos?.Pendientes?.map((curso:CursoGql, i) =>
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                <CardList data={getDataCardCursoPendiente(curso, currentRol)} />
              </Grid>
            )}
          </>
        }
        {arrayCursos?.Finalizados?.length > 0 &&
          <>
            <Grid item xs={12} style={(arrayCursos?.EnProceso?.length > 0 || arrayCursos?.Pendientes?.length > 0) ? {marginTop:"50px"} : {}}>
              <Typography variant="body1" gutterBottom>
                <b>FINALIZADOS</b>
              </Typography>
            </Grid>
            {arrayCursos?.Finalizados?.map((curso:CursoGql, i) =>
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                <CardList data={getDataCardCursoFinalizado(curso, currentRol, setOpenBM, setOpenCM)} />
              </Grid>
            )}
          </>
        }
      </Grid>
      <Modal
        open={openBM}
        titulo="Dar de baja asignatura"
        elemento={
          <DialogContentText id="alert-dialog-description">
            Escriba la razón de baja de la asignatura
            <br /><br />
            <TextField
              id="razon-baja-asignatura"
              label="Razón de baja"
              sx={{width:"100%"}}
              multiline
              rows={5}
            />
          </DialogContentText>
        }
        clickClose={() => setOpenBM(false)}
        clickFunction={() => setOpenBM(false)}
      />
      <Modal
        open={openCM}
        titulo="Sustituir materia"
        elemento={
          <DialogContentText id="alert-dialog-description">
            Escriba la razón para sustituir una asignatura por otra
            <br /><br />
            <TextField
              id="razon-baja-asignatura"
              label="Razón de baja"
              sx={{width:"100%", marginBottom:"30px"}}
              multiline
              rows={5}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Asignaturas disponibles</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={asignatura}
                label="Asignaturas disponibles"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {arrayCursosAIniciar.map((curso, i) =>
                  <MenuItem key={i} value={curso.IdMateriasOfertaAnual}>{curso.NombreMateria + ", " + curso.Creditos}</MenuItem>
                )}
              </Select>
            </FormControl>
          </DialogContentText>
        }
        clickClose={() => setOpenCM(false)}
        clickFunction={() => setOpenCM(false)}
      />
    </>
  );
};

const Modal = (props) => {
  const open = props.open;
  const titulo = props.titulo;
  const elemento = props.elemento;
  const clickClose = props.clickClose;
  const clickFunction = props.clickFunction;
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="md"
      onClose={clickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {titulo}
      </DialogTitle>
      <DialogContent>
        {elemento}
      </DialogContent>
      <DialogActions>
        <Button onClick={clickClose}>Cancelar</Button>
        <Button onClick={clickFunction} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardsCursos;
