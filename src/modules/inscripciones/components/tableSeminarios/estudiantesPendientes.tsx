import React, { useEffect, useState } from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.';
import {
  Alert,
  CircularProgress,
  Button,
  Card,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Select,
  Typography,
  Snackbar,
  Container,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetEstudiantesPendientes } from '../../queries';
import Modal from '../../../../shared/components/layouts/modal-inscripcion';
import { Inscripcion, ProgramaUnidad } from '../../types';
import moment from 'moment';
import { set } from 'react-hook-form';
import { useQuery } from 'react-query';
import apiInscripciones from '@shared/components/cards/apiInscripciones';
import { MessageSnackbar } from '@shared/components/layouts/messaAlert';

const SelectPrograma = (props: any) => {
  let programas = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPrograma(event.target.value as string);
  };
  props.programas.map((programa: ProgramaUnidad, index: number) => {
    programas.push(
      <MenuItem key={index + 1} value={`${programa.value}`}>
        {programa.label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ minWidth: 300, maxWidth: 400 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="ecosur-select-programa">Opciones</InputLabel>
        <Select
          labelId="select-programa"
          id="select-programa"
          value={props.programa}
          label="Programa"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value="Todos">
            Todos
          </MenuItem>
          {programas}
        </Select>
      </FormControl>
    </Box>
  );
};

const SelectUnidad = (props: any) => {
  let unidades = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setUnidad(event.target.value as string);
  };
  props.unidades.map((unidad: ProgramaUnidad, index: number) => {
    unidades.push(
      <MenuItem key={index + 1} value={`${unidad.value}`}>
        {unidad.label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="ecosur-select-unidad">Opciones</InputLabel>
        <Select
          labelId="select-unidad"
          id="select-unidad"
          value={props.unidad}
          label="Unidad"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value="Todos">
            Todos
          </MenuItem>
          {unidades}
        </Select>
      </FormControl>
    </Box>
  );
};

export const TableEstudiantesPendientesWithoutFetch: React.FC<{
  estudiantes: Inscripcion[];
  programas: ProgramaUnidad[];
  unidades: ProgramaUnidad[];
}> = ({ unidades, programas, estudiantes }) => {
  const [programa, setPrograma] = useState<string>('Todos');
  const [unidad, setUnidad] = useState<string>('Todos');
  const [isOpen, setIsOpen] = useState(false);
  const [idBoleta, setIdBoleta] = useState();
  const [textModal, setTextModal] = useState('');
  const [send, setSend] = useState(false);
  const [sendReminder, setSendReminder] = useState(false);

  const handleOpenModal = (idBoletaInscripcion, text) => {
    setIdBoleta(idBoletaInscripcion);
    setTextModal(text);
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);
  const handleDataFromChild = data => {
    setSend(data);
  };
  const handleSendReminder = idBoletaInscripcion => {
    setIdBoleta(idBoletaInscripcion);
    setSendReminder(true);
  };
  const handletSucces = data => {
    setSend(data);
    setSendReminder(data);
  };

  const columns: GridColDef[] = [
    {
      field: 'estudiante',
      headerName: 'Estudiante',
      width: 260,
    },
    { field: 'generacion', headerName: 'Generación', width: 100 },
    { field: 'programa', headerName: 'Programa', width: 190 },
    { field: 'unidad', headerName: 'Unidad', width: 100 },
    { field: 'periodo', headerName: 'Periodo', width: 90 },
    {
      field: 'periodoInscripcion',
      headerName: 'Periodo de inscripción',
      renderHeader: () => {
        return (
          <>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: 190 }}
            >
              <Typography
                variant="subtitle2"
                style={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                Periodo de
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                inscripción
              </Typography>
            </div>
          </>
        );
      },
      width: 100,
      renderCell: params => {
        return (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">
              {`${moment(new Date(params.row.periodoInicioInscripcion)).format(
                'DD/MM/YYYY'
              )} -`}
            </Typography>
            <Typography variant="body2">
              {`${moment(new Date(params.row.periodoFinInscripcion)).format(
                'DD/MM/YYYY'
              )}`}
            </Typography>
          </Grid>
        );
      },
    },
    {
      field: 'opcion',
      headerName: 'Opción',
      sortable: false,
      width: 200,
      renderCell: params => {
        const handleClick = () => {
          // FIX ME: Agregar enlace a endpoint para realizar notificaciones.
        };

        return (
          <>
            <Button
              size="small"
              // variant="outlined"
              variant='contained'
              onClick={() =>
                handleOpenModal(
                  params.row.idBoletaInscripcion,
                  '¿Está seguro/a de cancelar la inscripción?'
                )
              }
              sx={{ marginRight: 1 }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  style={{ fontSize: 11, textTransform: 'none' }}
                >
                  Cancelar <br /> inscripción
                </Typography>
              </Grid>
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() => handleSendReminder(params.row.idBoletaInscripcion)}
              sx={{ marginLeft: 1 }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  style={{ fontSize: 11, textTransform: 'none' }}
                >
                  Enviar <br /> recordatorio
                </Typography>
              </Grid>
            </Button>
          </>
        );
      },
    },
  ];
  let rows = [];
  let estudiantesList: Inscripcion[] = estudiantes;

  estudiantesList = estudiantes.filter(
    estudiante =>
      (programa == 'Todos'
        ? estudiante.Alumno?.Programa.NombreLargo != programa
        : estudiante.Alumno?.Programa.NombreLargo == programa) &&
      (unidad == 'Todos'
        ? estudiante.Alumno?.UnidadAdscripcion.value != unidad
        : estudiante.Alumno?.UnidadAdscripcion.value == unidad)
  );
  estudiantesList.map((estudiante, index) =>
    rows.push({
      id: index,
      estudiante:
        estudiante.Alumno?.Datos.Nombre_s_ +
        ' ' +
        estudiante.Alumno?.Datos.ApellidoPaterno +
        ' ' +
        estudiante.Alumno?.Datos.ApellidoMaterno,
      generacion: estudiante.Alumno?.Generacion.Value,
      programa: estudiante.Alumno?.Programa.NombreLargo,
      unidad: estudiante.Alumno?.UnidadAdscripcion.value,
      periodo: estudiante.FechasCuatri?.CuatrimestreSemestre,
      periodoInicioInscripcion: estudiante.FechasCuatri?.FechaInicioInscripcion,
      periodoFinInscripcion: estudiante.FechasCuatri?.FechaFinInscripcion,
      matricula: estudiante.Alumno?.Matricula,
      idBoletaInscripcion: estudiante.IdBoletasIncripciones,
    })
  );

  const handleClick = (id: number, estatus: number, comentario: string) => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
      {send && idBoleta == null && <SendReminderAll onData={handletSucces} />}
      {send && idBoleta != null && (
        <SendCancelInscription
          onData={handletSucces}
          IdBoletasIncripciones={idBoleta}
        />
      )}
      {sendReminder && idBoleta != null && (
        <SendReminder onData={handletSucces} IdBoletasIncripciones={idBoleta} />
      )}
      <Box style={{ height: 1200, width: '100%' }}>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onData={handleDataFromChild}
          mensaje={textModal}
        />

        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
            pt: 2,
          }}
        >
          <Grid item sx={{ mr: 2, fontSize: 14 }}>
            <b>Programa:</b>
          </Grid>
          <Grid item>
            <SelectPrograma
              estudiantes={estudiantes}
              setPrograma={setPrograma}
              programa={programa}
              programas={programas}
            />
          </Grid>

          <Grid item sx={{ mr: 2, ml: 2 }}>
            <b>Unidad:</b>
          </Grid>
          <Grid item>
            <SelectUnidad
              estudiantes={estudiantes}
              setUnidad={setUnidad}
              unidad={unidad}
              unidades={unidades}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            alignItems: 'center',
            backgroundColor: 'transparent',
            pb: 1,
            pt: 1,
            pr: 5,
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              handleOpenModal(
                null,
                '¿Esta seguro/a de enviar notificación a todas las personas estudiantes que tienen pendiente inscripción?'
              )
            }
            sx={{ marginRight: 1, marginLeft: 5 }}
          >
            <Typography
              variant="body2"
              style={{ fontSize: 14, textTransform: 'none' }}
            >
              Enviar recordatorio
              <br /> a todos
            </Typography>
          </Button>
        </Grid>
        <Box
          sx={{ height: 1000, width: '100%' }}
          id="tabla-gestion-asignaturas"
        >
          <DataGrid
            rowHeight={70}
            rows={rows}
            columns={columns}
            disableColumnMenu
            components={{
              Toolbar: CustomToolbar,
              Footer: CustomFooter,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={{
              footer: { counter: rows.length, label: 'Estudiantes:' },
            }}
            onSelectionModelChange={ids => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter(row => selectedIDs.has(row.id));
              setSelectedRows(selectedRows);
            }}
          />
        </Box>
      </Box>
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch

function setProgramasList(estudiantes: Inscripcion[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Alumno?.Programa.NombreLargo);
    if (!validar) {
      result.push(estudiante.Alumno?.Programa.NombreLargo);
      programas.push({
        label: estudiante.Alumno?.Programa.NombreLargo,
        value: estudiante.Alumno?.Programa.NombreLargo,
      });
    }
  });

  return programas;
}

const SendCancelInscription = ({ onData, IdBoletasIncripciones }) => {
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    onData(false);
    setOpen(false);
  };
  const { data, error, isLoading, isSuccess } = useQuery(
    'cancelar-inscripcion',
    async () =>
      await apiInscripciones.getCancelarInscricion(IdBoletasIncripciones),
    {
      staleTime: 10000,
    }
  );
  let setMessage = data?.message;

  if (isLoading)
    return (
      <Snackbar
        open={open}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircularProgress />
      </Snackbar>
    );
  if (error)
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={'No se pudo generar la solicitud'}
        txtSeverity={'error'}
      />
    );
  if (isSuccess) {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'success'}
      />
    );
  } else {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'warning'}
      />
    );
  }
};

const SendReminderAll = ({ onData }) => {
  const [open, setOpen] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const handleClickFalse = () => {
    onData(false);
    setOpen(false);
  };

  const { data, error, isLoading, isSuccess, isFetched } = useQuery(
    'enviar-revision_todos',
    async () => await apiInscripciones.getInscripcionesNotificacionAll(),
    {
      staleTime: 500000,
    }
  );

  useEffect(() => {
    // Actualizar la variable de estado para ocultar el CircularProgress cuando isLoading sea falso
    if (!isLoading) {
      setShowProgress(false);
    }
  }, [isLoading]);

  let setMessage = data?.message;

  if (showProgress)
    return (
      <Snackbar
        open={open}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircularProgress />
      </Snackbar>
    );

  if (error) {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={'No se pudo generar la solicitud'}
        txtSeverity={'error'}
      />
    );
  }
  if (isSuccess) {
    return (
      <>
        <>Hola</>
        <MessageSnackbar
          onOpen={open}
          autoDuration={3000}
          close={handleClickFalse}
          message={setMessage}
          txtSeverity={'success'}
        />
      </>
    );
  } else {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'warning'}
      />
    );
  }
};
const SendReminder = ({ onData, IdBoletasIncripciones }) => {
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    onData(false);
    setOpen(false);
  };

  const { data, error, isLoading, isSuccess } = useQuery(
    'enviar-revision',
    async () =>
      await apiInscripciones.getInscripcionesNotificacion(
        IdBoletasIncripciones
      ),
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
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={'No se pudo generar la solicitud'}
        txtSeverity={'error'}
      />
    );
  if (isSuccess) {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'success'}
      />
    );
  } else {
    return (
      <MessageSnackbar
        onOpen={open}
        autoDuration={3000}
        close={handleClickFalse}
        message={setMessage}
        txtSeverity={'warning'}
      />
    );
  }
};

function setUnidadList(estudiantes: Inscripcion[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Alumno?.UnidadAdscripcion.value);
    if (!validar) {
      result.push(estudiante.Alumno?.UnidadAdscripcion.value);
      programas.push({
        label: estudiante.Alumno?.UnidadAdscripcion.value,
        value: estudiante.Alumno?.UnidadAdscripcion.value,
      });
    }
  });

  return programas;
}

export const TableEstudiantesPendientes: React.FC<{}> = ({}) => {
  let programas: ProgramaUnidad[];
  let unidad: ProgramaUnidad[];

  const { data, isError, isLoading, isSuccess } = useGetEstudiantesPendientes();
  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los estudiantes.
      </Alert>
    );
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  let estudiantesPendientes: Inscripcion[];
  if (isSuccess) {
    estudiantesPendientes = data;
  }
  programas = setProgramasList(estudiantesPendientes);
  unidad = setUnidadList(estudiantesPendientes);

  return (
     
        <TableEstudiantesPendientesWithoutFetch
          estudiantes={estudiantesPendientes}
          programas={programas}
          unidades={unidad}
        />

  );
}; // TableEstudiantesPendientes
