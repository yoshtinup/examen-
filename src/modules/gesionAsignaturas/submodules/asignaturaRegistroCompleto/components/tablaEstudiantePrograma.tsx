import React, { useEffect, useState } from 'react';
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
  Badge,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {  FiltroEstudiante } from '../../../../estudiantes/types';
import {
  ListadoAlumnos,
} from '@shared/types/asignaturaRegistroTypes';
import { ListaEstudiantes } from '@modules/estudiantes';
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

export const TableEstudiantesProgramaWithoutFetch: React.FC<{
  estudiantes: ListadoAlumnos[];
  urlboleta?: string;
}> = ({ estudiantes, urlboleta }) => {
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

    { field: 'matricula', headerName: 'Matricula', width: 260 },
    {
      field: 'evaldocente',
      headerName: 'Evaluación docente realizada',
      width: 420,
    },
    {
      field: 'evalseminario',
      headerName: 'Evaluación de seminario',
      width: 260,
    },
    {
      field: 'calificacion',
      headerName: 'Calificación',
      sortable: false,
      width: 200,
      renderHeader: () => {
        return (
          <>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: 200 }}
            >
              <Typography
                variant="subtitle2"
                style={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                Calificación
              </Typography>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Grid container direction="column">
                  <Typography variant="caption">En número</Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography variant="caption">En letras</Typography>
                </Grid>
              </div>
            </div>
          </>
        );
      },
      renderCell: params => {
        return (
          <>
            <Grid container direction="column">
              <Typography variant="body2">{params.row.numero}</Typography>
            </Grid>
            <Grid container direction="column">
              <Typography variant="body2">{params.row.letra}</Typography>
            </Grid>
          </>
        );
      },
    },
    { field: 'boleta', headerName: 'Boleta', width: 260 },
  ];
  let rows = [];
  let estudiantesList: ListadoAlumnos[] = estudiantes;

  // estudiantesList = estudiantes.filter(
  //   estudiante =>
  //     (programa == 'Todos'
  //       ? estudiante.Programa?.Programa != programa
  //       : estudiante.Programa?.Programa == programa) &&
  //     (unidad == 'Todos'
  //       ? estudiante.Unidad?.Unidad != unidad
  //       : estudiante.Unidad?.Unidad == unidad) &&
  //     (periodo == 'Todos'
  //       ? estudiante.Generacion?.GeneracionLargo != periodo
  //       : estudiante.Generacion?.GeneracionLargo == periodo)
  // );
  estudiantesList.map((estudiante, index) =>
    rows.push({
      id: index,
      estudiante:
        estudiante.Estudiante?.Datos.Nombre_s_ +
        ' ' +
        estudiante.Estudiante?.Datos.ApellidoPaterno +
        ' ' +
        estudiante.Estudiante?.Datos.ApellidoMaterno,
      matricula: estudiante.Matricula,
      evaldocente:
        estudiante.Estudiante.EvaluacionDocente.Evaluo?.EstatusEvaluacion,
      evalseminario: estudiante.EvaluacionSeminario?.Estatus.Descripcion,
      numero: estudiante.Calificacion?.Numerica,
      letra: estudiante.Calificacion?.EnLetra,
      boleta: estudiante?.BoletaCalificaciones,
    })
  );

  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
      {/* {send && idBoleta==null && <SendReminderAll onData={handletSucces}/>}
        {send  && idBoleta!=null && <SendCancelInscription onData={handletSucces} IdBoletasIncripciones={idBoleta}/>}
        {sendReminder  && idBoleta!=null && <SendReminder onData={handletSucces} IdBoletasIncripciones={idBoleta}/>} */}

      <div style={{ height: 500, width: '100%' }}>
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
          sx={{ pb: 7 }}
          rows={rows}
          columns={columns}
          // components={{
          //   Toolbar: CustomToolbar,
          //   Footer: CustomFooter,
          //   NoRowsOverlay: CustomNoRowsOverlay,
          // }}
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
      {urlboleta != null ? (
        <a href={urlboleta}>
          <Badge>
            <strong>Boleta de calificaciones del curso</strong>
          </Badge>
        </a>
      ) : (
        ''
      )}
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch


