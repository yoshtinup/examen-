import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  Tooltip,
  Container,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetEstudiantes } from '../../queries';
import ModalEstudiantes from '../../../../shared/components/layouts/modal-inscripcion';
import { Estudiante, FiltroEstudiante } from '../../types';
import moment from 'moment';
import { set } from 'react-hook-form';
import { useQuery } from 'react-query';
import apiInscripciones from '@shared/components/cards/apiInscripciones';
import { MessageSnackbar } from '@shared/components/layouts/messaAlert';

// import Link from 'next/link';
import LinkIcon from '@mui/icons-material/Link';
import { useGetAsignaturaRegistroCompleto } from '@shared/queries/asignaturaRegistroCompleto';
import { Value } from '@modules/seminarios_investigacion/submodules/servicios_escolares/types';

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

export const TableEstudiantesActivosWithoutFetch: React.FC<{
  estudiantes: Estudiante[];
  programas: FiltroEstudiante[];
  unidades: FiltroEstudiante[];
  periodos: FiltroEstudiante[];
}> = ({ periodos, unidades, programas, estudiantes }) => {
  const [programa, setPrograma] = useState<string>('Todos');
  const [unidad, setUnidad] = useState<string>('Todos');
  const [periodo, setPeriodo] = useState<string>('Todos');
  const [matricula, setMatricula] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = matricula => {
    setIsModalOpen(true);
    setMatricula(matricula);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickExpediente = matricula => {
    window.open(`/home?matricula=${matricula}`, '_blank');
  };
  const columns: GridColDef[] = [
    {
      field: 'estudiante',
      headerName: 'Nombre',
      width: 280,
    },
    { field: 'programa', headerName: 'Programa', width: 240 },
    { field: 'unidad', headerName: 'Unidad', width: 110 },
    { field: 'anio', headerName: 'Año', minWidth: 110 },
    { field: 'matricula', headerName: 'Matricula', minWidth: 100 },
    {
      field: 'opcion',
      headerName: 'Opción',
      sortable: false,
      width: 150,
      
      renderCell: params => {
        const handleClick = () => {
          // FIX ME: Agregar enlace a endpoint para realizar notificaciones.
        };

        return (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'initial',
                paddingTop: 10,
              }}
            >
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

              <Link onClick={() => handleOpenModal(params.row.matricula)}>
                <a
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    <p>
                      Expendiente <br />
                      de ingreso
                    </p>
                  </div>
                </a>
              </Link>
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
        ? estudiante.AnioDeEstudios?.AnioActualtxt != periodo
        : estudiante.AnioDeEstudios.AnioActualtxt == periodo)
  );
  estudiantesList.map((estudiante, index) =>
    rows.push({
      id: index,
      estudiante:
        estudiante.DatosAlumno?.Nombre_s_ +
        ' ' +
        estudiante.DatosAlumno?.ApellidoPaterno +
        ' ' +
        estudiante.DatosAlumno?.ApellidoMaterno,
      programa: estudiante?.Programa.Programa,
      orientacion: estudiante.Orientacion?.Nombre,
      unidad: estudiante.Unidad?.Unidad,
      anio: estudiante.AnioDeEstudios?.AnioActualtxt,
      matricula: estudiante?.Matricula,
      // idAlumno: estudiante?.DatosAlumno.IdAlumno,
      estatus: estudiante.EstatusAlumno?.IdEstatus,
    })
  );

  const [selectedRows, setSelectedRows] = React.useState([]);
  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
     
      <Container maxWidth={false} style={{ height: 1200, width: '100%', marginTop:'-14px'}}>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
                matricula
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
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 4,
            pt: 5,
            
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
            <b>Año:</b>
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
        <Box sx={{ height: 1100, width: '100%' }} id="tabla-gestion-asignaturas">
          <DataGrid
          rowHeight={90}
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
      </Container>
  
  );
}; // TableEstudiantesPendientesWithoutFetch

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

function setProgramasList(estudiantes: Estudiante[]): FiltroEstudiante[] {
  let programas: FiltroEstudiante[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map(estudiante => {
    validar = result.includes(estudiante.Programa?.Programa);
    if (!validar) {
      result.push(estudiante.Programa?.Programa);
      // programas.push({
      //   label: estudiante.AlumnoPrograma?.Programa?.Programa,
      //   value: estudiante.AlumnoPrograma?.Programa?.Programa,
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
      //   label: estudiante.AlumnoPrograma?.Unidad?.Unidad,
      //   value: estudiante.AlumnoPrograma?.Unidad?.Unidad,
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
    validar = result.includes(estudiante.AnioDeEstudios?.AnioActualtxt);
    if (!validar) {
      result.push(estudiante.AnioDeEstudios?.AnioActualtxt);
      // anios.push({
      //   label: estudiante.AlumnoPrograma?.AnioDeEstudios?.AnioActualtxt,
      //   value: estudiante.AlumnoPrograma?.AnioDeEstudios?.AnioActualtxt,
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

export const TableEstudiantesActivos: React.FC<{}> = ({}) => {
  let programas: FiltroEstudiante[];
  let unidad: FiltroEstudiante[];
  let periodo: FiltroEstudiante[];
  // const datos=useGetAsignaturaRegistroCompleto(8527);
  const { data, isError, isLoading, isSuccess } = useGetEstudiantes(1);
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
   
        <TableEstudiantesActivosWithoutFetch
          estudiantes={estudiantesPendientes}
          programas={programas}
          unidades={unidad}
          periodos={periodo}
        />
    
  );
}; // TableEstudiantesPendientes
