import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { CursoGql, CursosAlumnoGql } from '@shared/types';
import {
  CardList,
  getDataCardCursoFinalizado,
  getDataCardCursoPendiente,
  getDataCardCursoEnProceso,
} from '@shared/components/cards';
import { useRecoilValue } from 'recoil';
import { rolStateAtom, userStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import { EcosurAuth } from '@modules/auth/definitions';
import { useState } from 'react';
import { CursoPorIniciarGql } from '@shared/types/cursosPorIniciarGql';
import { useGetCursosAlumno } from "@shared/queries";
import { crearJSON, getCursosEstudiante } from "@modules/tablero_plan_estudios/hooks";
import { format } from 'date-fns';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      maxWith: 250,
    },
  },
};

const CardsCursos = (props:any) => {
  const data = props.data;
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const [listaCursos, setListaCursos] = useState(data);
  const arrayCursos: CursosAlumnoGql = getCursosEstudiante(listaCursos);
  const arrayCursosAIniciar: CursoPorIniciarGql[] = crearJSON().data.sort(
    (a, b) => {
      if (a.FechaInicioCurso > b.FechaInicioCurso) return 1;
      if (a.FechaInicioCurso < b.FechaInicioCurso) return -1;
      return 0;
    }
  ); //useGetCursosAIniciar(false).data;
  const [openBM, setOpenBM] = useState(false);
  const [openCM, setOpenCM] = useState(false);

  const [asignatura, setAsignatura] = useState('');
  const [razonBajaAsignatura, setRazonBajaAsignatura] = useState('');
  const [razonCambioAsignatura, setRazonCambioAsignatura] = useState('');
  const [error, setError] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const handleChangeTextField = (event, numModal) => {
    if (numModal === 1) {
      setRazonBajaAsignatura(event.target.value);
      setError(false);
    } else {
      setRazonCambioAsignatura(event.target.value);
      setError(false);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAsignatura(event.target.value as string);
    setErrorSelect(false);
  };
  const handleSubmit = event => {
    console.log('submit');
    event.preventDefault();
    if (asignatura === '') {
      setErrorSelect(true);
      return;
    }
    if (
      razonBajaAsignatura.trim() === '' &&
      razonCambioAsignatura.trim() === ''
    ) {
      setError(true);
      return;
    }

   
    setOpenBM(false);
    setOpenCM(false);
    setRazonBajaAsignatura('');
    setRazonCambioAsignatura('');
    setAsignatura('');

    // Validar los campos del formulario aquí
  };
  return (
    <>
      <Grid container spacing={2} style={{ padding: '10px 50px 0' }}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: '50px' }}>
        {(arrayCursos?.EnProceso?.length > 0 ||
          arrayCursos?.Pendientes?.length > 0) && (
          <>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <b>EN PROCESO Y POR INICIAR</b>
              </Typography>
            </Grid>
            {arrayCursos?.EnProceso?.map((curso: CursoGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList data={getDataCardCursoEnProceso(curso, currentRol)} />
              </Grid>
            ))}
            {arrayCursos?.Pendientes?.map((curso: CursoGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList data={getDataCardCursoPendiente(curso, currentRol)} />
              </Grid>
            ))}
          </>
        )}
        {arrayCursos?.Finalizados?.length > 0 && (
          <>
            <Grid
              item
              xs={12}
              style={
                arrayCursos?.EnProceso?.length > 0 ||
                arrayCursos?.Pendientes?.length > 0
                  ? { marginTop: '50px' }
                  : {}
              }
            >
              <Typography variant="body1" gutterBottom>
                <b>FINALIZADOS</b>
              </Typography>
            </Grid>
            {arrayCursos?.Finalizados?.map((curso: CursoGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList
                  data={getDataCardCursoFinalizado(
                    curso,
                    currentRol,
                    setOpenBM,
                    setOpenCM
                  )}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Modal
        open={openBM}
        titulo="Baja de asignatura"
        elemento={
          <DialogContentText id="alert-dialog-description">
            Escriba la razón de baja para la asignatura y haga clic en el botón{' '}
            <strong>Dar de baja</strong>. Se notificará a su director/a de tesis
            para que revise y autorice el cambio.
            <br />
            <br />
            <TextField
              id="razon-baja-asignatura"
              label="Escriba la razón de baja de la asignatura"
              sx={{ width: '100%' }}
              multiline
              rows={4}
              value={razonBajaAsignatura}
              onChange={() => handleChangeTextField(event, 1)}
              error={error}
              helperText={error ? 'Este campo es requerido' : ''}
            />
          </DialogContentText>
        }
        clickClose={() => {
          setOpenBM(false);
          setError(false);
          setRazonBajaAsignatura('');
        }}
        clickFunction={handleSubmit} //;
        btnTextCancel="Salir"
        btnTextAcept="Dar de baja"
      />
      <Modal
        open={openCM}
        titulo="Cambiar asignatura"
        elemento={
          <DialogContentText id="alert-dialog-description">
            Seleccione la nueva asignatura y escriba la razón del cambio. Haga
            clic en el botón <strong>Cambiar</strong>. Se notificará a su
            director/a de tesis para revisión y autorización del cambio.
            <br />
            <br />
            
            <FormControl fullWidth error={errorSelect}>
              <InputLabel id="demo-simple-select-label">
                Asignaturas disponibles
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={asignatura}
                label="Asignaturas disponibles"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {arrayCursosAIniciar.map((curso, i) => (
                  <MenuItem key={i} value={curso.IdMateriasOfertaAnual} >
                     <ListItemText primary={curso.NombreMateria} secondary={'Credito: ' + curso.Creditos + ', Fecha de Inicio: ' + format(new Date(curso.FechaInicioCurso), 'dd/MM/yyyy')+ ', Sede:' + curso.SedeDeCurso} />
                    
                  </MenuItem>
                ))}
              </Select>
              {errorSelect && (
                <FormHelperText>Seleccione una asignatura</FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <TextField
              id="razon-cambio-asignatura"
              label="Escriba la razón de cambio de asignatura."
              sx={{ width: '100%', marginBottom: '30px' }}
              multiline
              rows={5}
              value={razonCambioAsignatura}
              onChange={() => handleChangeTextField(event, 2)}
              error={error}
              helperText={error ? 'Este campo es requerido' : ''}
            />
          </DialogContentText>
        }
        clickClose={() => {
          setOpenCM(false);
          setError(false);
          setRazonCambioAsignatura('');
          setAsignatura('');
        }}
        clickFunction={handleSubmit}
        btnTextCancel="Cerrar"
        btnTextAcept="Cambiar"
      />
    </>
  );
};

const Modal = props => {
  const open = props.open;
  const titulo = props.titulo;
  const elemento = props.elemento;
  const clickClose = props.clickClose;
  const clickFunction = props.clickFunction;
  const btnAcept = props.btnTextAcept;
  const btnCancel = props.btnTextCancel;
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="md"
      onClose={clickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>{elemento}</DialogContent>
      <DialogActions>
        <Button onClick={clickClose}>{btnCancel}</Button>
        <Button onClick={clickFunction} autoFocus>
          {btnAcept}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardsCursos;
