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
  Alert,
  Snackbar,
  CircularProgress,
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
import { getCursosEstudiante } from '@modules/tablero_plan_estudios/hooks';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import apiAsignatura from '@shared/components/cards/apiAsignatura';
import Modal from '@shared/components/layouts/modal';
import { MessageSnackbar } from '@shared/components/layouts/messaAlert';
import { useGetCursosAIniciar } from '@shared/queries/cursosPorIniciarGql';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      maxWith: 250,
    },
  },
};

const CardsCursos = (props: any) => {
  const show = props.show;
  const data = props.data;
  const proceso = props.proceso;
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const [listaCursos, setListaCursos] = useState(data);
  const [procesoCambio, setPorcesoCambio] = useState(proceso);
  const arrayCursos: CursosAlumnoGql = getCursosEstudiante(listaCursos);
  const arrayCursosAIniciar: CursoPorIniciarGql[] = useGetCursosAIniciar(props.idPrograma)?.data?.sort(
    (a, b) => {
      if (a.FechaInicioCurso > b.FechaInicioCurso) return 1;
      if (a.FechaInicioCurso < b.FechaInicioCurso) return -1;
      return 0;
    }
  );
  const [openBM, setOpenBM] = useState(false);
  const [openCM, setOpenCM] = useState(false);
  const [sendAsignatura, setSendAsignatura] = useState(false);
  const [idMateria, setIdMateria] = useState('');
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
  //cualquier cambio dentro de los areas del modal
  const handleChange = (event: SelectChangeEvent) => {
    setAsignatura(event.target.value as string);
    setErrorSelect(false);
  };
  ///dar click en el boton true
  const handleSubmit = (event, type) => {
    event.preventDefault();
    if (type && asignatura === '') {
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
    setSendAsignatura(true);
    // Validar los campos del formulario aquí
  };
  const handletSucces = data => {
    setOpenBM(data);
    setOpenCM(data);
    setRazonBajaAsignatura('');
    setRazonCambioAsignatura('');
    setAsignatura('');
    setSendAsignatura(false);
  };

  return (
    <>
      {sendAsignatura && (
        <SendBajaAsignatura
          onData={handletSucces}
          idMateriasOfertaAnual={idMateria}
          justificacion={razonBajaAsignatura}
          idMateriasOfertaAnualAlta={asignatura}
        />
      )}

      <Grid container spacing={2} style={{ padding: '10px 2.5vw 0' }}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p style={{textAlign:'justify'}}>
            Se listan las asignaturas que conforman a la fecha su plan de
            estudios. De acuerdo al estatus podrá realizar la baja o canje de la
            asignatura, evaluación docente, descargar boleta de calificaciones,
            si es seminario realizar y dar seguimiento a la evaluación y
            descargar el acta correspondiente.
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: '2.5vw' }}>
        {(arrayCursos?.EnProceso?.length > 0 ||
          arrayCursos?.Pendientes?.length > 0) && (
          <>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <b>EN PROCESO Y POR INICIAR</b>
              </Typography>
            </Grid>
            {arrayCursos?.EnProceso?.map((curso: CursoGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} xl={3}>
                <CardList
                  data={getDataCardCursoEnProceso(
                    curso,
                    currentRol,
                    setOpenBM,
                    setOpenCM,
                    setIdMateria,
                    procesoCambio
                  )}
                />
              </Grid>
            ))}
            {arrayCursos?.Pendientes?.map((curso: CursoGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} xl={3}>
                <CardList
                  data={getDataCardCursoPendiente(
                    curso,
                    currentRol,
                    setOpenBM,
                    setOpenCM,
                    setIdMateria,
                    procesoCambio
                  )}
                />
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
              <Grid key={i} item xs={12} sm={6} md={4} xl={3}>
                <CardList data={getDataCardCursoFinalizado(curso, currentRol)} />
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
            Escriba la razón de baja de la asignatura y haga clic en el botón{' '}
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
        clickFunction={() => handleSubmit(event, false)} //;
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
                {arrayCursosAIniciar?.map((curso, i) => (
                  <MenuItem key={i} value={curso.IdMateriasOfertaAnual}>
                    <ListItemText
                      primary={curso.NombreMateria}
                      secondary={
                        'Créditos: ' +
                        curso.Creditos +
                        ', Fecha de Inicio: ' +
                        format(new Date(curso.FechaInicioCurso), 'dd/MM/yyyy') +
                        ', Sede:' +
                        curso.SedeDeCurso
                      }
                    />
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
        clickFunction={() => handleSubmit(event, true)}
        btnTextCancel="Cerrar"
        btnTextAcept="Cambiar"
      />
    </>
  );
};
const SendBajaAsignatura = ({
  onData,
  idMateriasOfertaAnual,
  justificacion,
  idMateriasOfertaAnualAlta,
}) => {
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    // //retorno de valor True al padre
    onData(false);
    setOpen(false);
  };
  let query;
  if (idMateriasOfertaAnualAlta != '') {
    query = useQuery(
      'cambiar-asignatura',
      async () =>
        await apiAsignatura.getCambioAsignatura(
          idMateriasOfertaAnual,
          idMateriasOfertaAnualAlta,
          justificacion
        ),
      {
        staleTime: Infinity,
      }
    );
  } else {
    query = useQuery(
      'dar-baja-asignatura',
      async () =>
        await apiAsignatura.getBajaAsignatura(
          idMateriasOfertaAnual,
          justificacion
        ),
      {
        staleTime: Infinity,
      }
    );
  }
  const { data, error, isLoading, isSuccess } = query;
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
      <MessageSnackbar
        onOpen={open}
        autoDuration={2000}
        close={() => setOpen(false)}
        message={'No se pudo generar la solicitud'}
        txtSeverity={'error'}
      />
    );
  if (isSuccess) {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={2000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'success'}
      />
    );
  } else {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={2000}
        close={() => setOpen(false)}
        message={setMessage}
        txtSeverity={'warning'}
      />
    );
  }
};

export default CardsCursos;
