import React, { useEffect, useState } from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.';
import {
  Alert,
  CircularProgress,
  Link,
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
  Modal,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetEstudiantes } from '../../queries';

import { Estudiante, FiltroEstudiante } from '../../types';
import moment from 'moment';
import { set } from 'react-hook-form';
import { useQuery } from 'react-query';
import apiInscripciones from '@shared/components/cards/apiInscripciones';
import { MessageSnackbar } from '@shared/components/layouts/messaAlert';
// import Link from 'next/link';
import LinkIcon from '@mui/icons-material/Link';
const SelectPrograma = (props: any) => {
  let programas = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPrograma(event.target.value as string);
  };
  props.programas.map((programa: FiltroEstudiante, index: number) => {
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
  props.unidades.map((unidad: FiltroEstudiante, index: number) => {
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

const SelectFecha = (props: any) => {
  let periodos = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPeriodo(event.target.value as string);
  };
  props.periodos.map((periodo: FiltroEstudiante, index: number) => {
    periodos.push(
      <MenuItem key={index + 1} value={`${periodo.value}`}>
        {periodo.label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="ecosur-select-periodo">Opciones</InputLabel>
        <Select
          labelId="select-periodo"
          id="select-periodo"
          value={props.periodo}
          label="Periodo"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value="Todos">
            Todos
          </MenuItem>
          {periodos}
        </Select>
      </FormControl>
    </Box>
  );
};

export const TableEstudiantesWithoutFetch: React.FC<{
  estudiantes: Estudiante[];
  programas: FiltroEstudiante[];
  unidades: FiltroEstudiante[];
  periodos: FiltroEstudiante[];
}> = ({ periodos, unidades, programas, estudiantes }) => {
  const [programa, setPrograma] = useState<string>('Todos');
  const [unidad, setUnidad] = useState<string>('Todos');
  const [periodo, setPeriodo] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickExpediente = matricula => {
    window.open(`/home?matricula=${matricula}`, '_blank');
  };
  const columns: GridColDef[] = [
    {
      field: 'estudiante',
      headerName: 'Nombre',
      width: 350,
      renderCell: params => {
        return (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">
              {`${params.row.estudiante}`}
            </Typography>
          </Grid>
        );
      },
    },
    { field: 'programa', headerName: 'Programa', width: 420 },
    { field: 'orientacion', headerName: 'Orientación', width: 260 },
    { field: 'unidad', headerName: 'Unidad', width: 260 },
    { field: 'generacion', headerName: 'Generación', width: 260 },
    { field: 'matricula', headerName: 'Matricula', width: 260 },
    {
      field: 'opcion',
      headerName: 'Opción',
      sortable: false,
      width: 200,
      renderCell: params => {
        const handleClick = () => {
          // FIX ME: Agregar enlace a endpoint para realizar notificaciones.
        };
        
        const handleOpenModal = () => {
          setIsModalOpen(true);
        };

        const handleCloseModal = () => {
          setIsModalOpen(false);
        };

        const modalStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link aria-disabled={true}>
                <a
                  onClick={() => handleClickExpediente(params.row.matricula)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                  Ver expediente
                </a>
              </Link>
              {/* <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div style={modalStyle}>
                  
                  <div
                    style={{
                      width: 700,
                      height: 600,
                      backgroundColor: '#fff',
                      padding: 20,
                      position: 'relative',
                    }}
                  >
                    <iframe
                      src={
                        'https://aplicaciones.ecosur.mx/app/funcionalidades-sip/archivos-ingreso-alumno-6490cd6ae8023e77eb94dee0?matricula=' +
                        params.row.matricula
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                    />
                    <Button
                      onClick={handleCloseModal}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                    >
                      {' '}
                      Cerrar
                    </Button>
                  </div>
                </div>
              </Modal>
              <Link onClick={handleOpenModal}>
                <a
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                  Expendiente de ingreso
                </a>
              </Link> */}
            </div>
          </>
        );
      },
    },
  ];
  let rows = [];
  let estudiantesList: Estudiante[] = estudiantes;

  estudiantesList = estudiantes.filter(
    estudiante =>
      (programa == 'Todos'
        ? estudiante.Programa?.Programa != programa
        : estudiante.Programa?.Programa == programa) &&
      (unidad == 'Todos'
        ? estudiante.Unidad?.Unidad != unidad
        : estudiante.Unidad?.Unidad == unidad) &&
      (periodo == 'Todos'
        ? estudiante.Generacion?.GeneracionLargo != periodo
        : estudiante.Generacion?.GeneracionLargo == periodo)
  );
  estudiantesList.map((estudiante, index) =>
    rows.push({
      id: index,
      estudiante:
        estudiante?.DatosAlumno?.Nombre_s_ +
        ' ' +
        estudiante.DatosAlumno?.ApellidoPaterno +
        ' ' +
        estudiante.DatosAlumno?.ApellidoMaterno,
      programa: estudiante.Programa?.Programa,
      orientacion: estudiante.Orientacion?.Nombre,
      unidad: estudiante.Unidad.Unidad,
      anio: estudiante.AnioDeEstudios.AnioActualtxt,
      matricula: estudiante.Matricula,
      estatus: estudiante.EstatusAlumno.IdEstatus,
      generacion: estudiante.Generacion.GeneracionLargo,
    })
  );

  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
      {/* {send && idBoleta==null && <SendReminderAll onData={handletSucces}/>}
        {send  && idBoleta!=null && <SendCancelInscription onData={handletSucces} IdBoletasIncripciones={idBoleta}/>}
        {sendReminder  && idBoleta!=null && <SendReminder onData={handletSucces} IdBoletasIncripciones={idBoleta}/>} */}

      <div style={{ height: 1200, width: '100%' }}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'white',
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
          <Grid item sx={{ mr: 2, ml: 2 }}>
            <b>Generación:</b>
          </Grid>
          <Grid item>
            <SelectFecha
              estudiantes={estudiantes}
              setPeriodo={setPeriodo}
              periodo={periodo}
              periodos={periodos}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            alignItems: 'center',
            bgcolor: 'white',
            pb: 1,
            pt: 1,
            pr: 5,
          }}
        ></Grid>
        <DataGrid
          sx={{ pb: 19 }}
          rows={rows}
          columns={columns}
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
      </div>
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch

const SendCancelInscription = ({ onData, IdBoletasIncripciones }) => {
  const [open, setOpen] = useState(true);
  const handleClickFalse = () => {
    onData(false);
    setOpen(false);
  };
  console.log(IdBoletasIncripciones);
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

function setProgramasList(estudiantes: Estudiante[]): FiltroEstudiante[] {
  let programas: FiltroEstudiante[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Programa?.Programa);
    if (!validar) {
      result.push(estudiante.Programa?.Programa);
      // programas.push({
      //   label: estudiante.Programa?.Programa,
      //   value: estudiante.Programa?.Programa,
      // });
    }
  });
  result.sort();
  result.forEach(anio => {
    programas.push({
      label: anio,
      value: anio,
    });
  });
  return programas;
}
function setUnidadList(estudiantes: Estudiante[]): FiltroEstudiante[] {
  let unidades: FiltroEstudiante[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Unidad?.Unidad);
    if (!validar) {
      result.push(estudiante.Unidad?.Unidad);
      // unidades.push({
      //   label: estudiante.Unidad?.Unidad,
      //   value: estudiante.Unidad?.Unidad,
      // });
    }
  });
  result.sort();
  result.forEach(anio => {
    unidades.push({
      label: anio,
      value: anio,
    });
  });
  return unidades;
}
function setAniosList(estudiantes: Estudiante[]): FiltroEstudiante[] {
  let anios: FiltroEstudiante[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Generacion?.GeneracionLargo);
    if (!validar) {
      result.push(estudiante.Generacion?.GeneracionLargo);
      // anios.push({
      //   label: estudiante.AnioDeEstudios?.AnioActualtxt,
      //   value: estudiante.AnioDeEstudios?.AnioActualtxt,
      // });
    }
  });
  result.sort();
  result.forEach(anio => {
    anios.push({
      label: anio,
      value: anio,
    });
  });
  return anios;
}

export const TableEstudiantes: React.FC<any> = props => {
  let programas: FiltroEstudiante[];
  let unidad: FiltroEstudiante[];
  let periodo: FiltroEstudiante[];

  const estatus = props.estatus;
  const bajas = props.bajas;
  const { data, isError, isLoading, isSuccess } = useGetEstudiantes(
    estatus,
    bajas
  );
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
  let estudiantesPendientes: Estudiante[];
  if (isSuccess) {
    estudiantesPendientes = data;
  }
  programas = setProgramasList(estudiantesPendientes);
  unidad = setUnidadList(estudiantesPendientes);
  periodo = setAniosList(estudiantesPendientes);
  return (
    <>
      <Card
        key={`ecosur-lista-estudiantes`}
        sx={{ border: 'none', boxShadow: 'none' }}
      >
        <TableEstudiantesWithoutFetch
          estudiantes={estudiantesPendientes}
          programas={programas}
          unidades={unidad}
          periodos={periodo}
        />
      </Card>
    </>
  );
}; // TableEstudiantesPendientes
