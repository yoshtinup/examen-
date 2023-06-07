import React, { useState } from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.'
import { Alert, CircularProgress, Button, Card, Grid, InputLabel, MenuItem, FormControl, Box, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetEstudiantesPendientes } from '../../queries';
import { Inscripcion, ProgramaUnidad } from '../../types';
import moment from 'moment';

const SelectPrograma = (props: any) => {
  let programas = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPrograma(event.target.value as string);
  };
  props.programas.map((programa: ProgramaUnidad, index: number) => {
    programas.push(<MenuItem key={index+1} value={`${programa.value}`}>{programa.label}</MenuItem>);
  })
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="ecosur-select-programa">Opciones</InputLabel>
        <Select
          labelId="select-programa"
          id="select-programa"
          value={props.programa}
          label="Programa"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value='Todos'>Todos</MenuItem>
          {programas}
        </Select>
      </FormControl>
    </Box>
  );
}

const SelectUnidad = (props: any) => {
  let unidades = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setUnidad(event.target.value as string);
  };
  props.unidades.map((unidad: ProgramaUnidad, index: number) => {
    unidades.push(<MenuItem key={index+1} value={`${unidad.value}`}>{unidad.label}</MenuItem>);
  })

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="ecosur-select-unidad">Opciones</InputLabel>
        <Select
          labelId="select-unidad"
          id="select-unidad"
          value={props.unidad}
          label="Unidad"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value='Todos'>Todos</MenuItem>
          {unidades}
        </Select>
      </FormControl>
    </Box>
  );
}

const SelectPeriodo = (props: any) => {
  let periodos = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPeriodo(event.target.value as string);
  };
  props.periodos.map((periodo: ProgramaUnidad, index: number) => {
    periodos.push(<MenuItem key={index+1} value={`${periodo.value}`}>{periodo.label}</MenuItem>);
  })

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="ecosur-select-periodo">Opciones</InputLabel>
        <Select
          labelId="select-periodo"
          id="select-periodo"
          value={props.periodo}
          label="Periodo"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value='Todos'>Todos</MenuItem>
          {periodos}
        </Select>
      </FormControl>
    </Box>
  );
}

export const TableEstudiantesPendientesWithoutFetch: React.FC<{ estudiantes: Inscripcion[], programas: ProgramaUnidad[], unidades: ProgramaUnidad[], periodos:ProgramaUnidad[] }> = ({
  periodos,
  unidades,
  programas,
  estudiantes,
}) => {    
  
  const [programa, setPrograma] = useState<string>('Todos');
  const [unidad, setUnidad] = useState<string>('Todos');
  const [periodo, setPeriodo] = useState<string>('Todos');

  const columns: GridColDef[] = [
    { field: 'estudiante', headerName: 'Estudiante', width: 350,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${params.row.estudiante}`}
              </Typography>
            </Grid>
    )}},
    { field: 'generacion', headerName: 'Generación', width: 120 },
    { field: 'programa', headerName: 'Programa', width: 420 }, 
    { field: 'unidad', headerName: 'Unidad', width: 260,},
    { field: 'periodo', headerName: 'Periodo', width: 260,},
    { field: 'periodoInscripcion', headerName: 'Periodo de inscripción', width: 180,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoInicioInscripcion)).format('DD/MM/YYYY')} -`}
              </Typography>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoFinInscripcion)).format('DD/MM/YYYY')}`}
              </Typography>
            </Grid>
    )}},    
    { field: 'opcion', headerName: 'Opción', sortable: false, width: 200,
      renderCell: (params) => {
        const handleClick = () => {
          // FIX ME: Agregar enlace a endpoint para realizar notificaciones.
        };        
        return (
          <>
            <Button size='small' variant='outlined' onClick={handleClick} sx={{ marginRight: 1 }}>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='body2' style={{fontSize:10}}>
                  Cancelar <br/> inscripción
                </Typography>
              </Grid>
            </Button>
            <Button size='small' variant='outlined' onClick={handleClick} sx={{ marginLeft: 1 }}>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='body2' style={{fontSize:10}}>
                  Enviar <br/> Recordatorio
                </Typography>
              </Grid>
            </Button>
          </>
        )
      },
    }
  ];
  let rows = [];
  let estudiantesList: Inscripcion[] = estudiantes;
  estudiantesList = estudiantes.filter((estudiante) => 
    ((programa == 'Todos') ? estudiante.Alumno.Programa.NombreLargo != programa : estudiante.Alumno.Programa.NombreLargo == programa) && 
    ((unidad == 'Todos') ? estudiante.Alumno.UnidadAdscripcion.value != unidad : estudiante.Alumno.UnidadAdscripcion.value == unidad) &&
    ((periodo == 'Todos') ? estudiante.FechasCuatri.CuatrimestreSemestre != periodo : estudiante.FechasCuatri.CuatrimestreSemestre == periodo));
  estudiantesList.map((estudiante,index) => (
    rows.push({
      id: index,
      estudiante: estudiante.Alumno.Datos.Nombre_s_ +' '+estudiante.Alumno.Datos.ApellidoPaterno+' '+estudiante.Alumno.Datos.ApellidoMaterno,
      generacion: estudiante.Alumno.Generacion.Value,
      programa: estudiante.Alumno.Programa.NombreLargo,
      unidad: estudiante.Alumno.UnidadAdscripcion.value,
      periodo: estudiante.FechasCuatri.CuatrimestreSemestre,
      periodoInicioInscripcion: estudiante.FechasCuatri.FechaInicioInscripcion,
      periodoFinInscripcion: estudiante.FechasCuatri.FechaFinInscripcion,
      //seminario: estudiante.Alumno.Datos.Nombre_s_,
      // clave: estudiante.Clave,
      // creditos: estudiante.Creditos,
      // periodoInicioCurso: estudiante.Iniciocurso,
      // periodoFinCurso: estudiante.Fincurso,
      // materia: estudiante.Materia
    })
  ))

  const handleClick = (id: number, estatus: number, comentario: string) => {
    setOpen(false);
    console.log(id);
    console.log(estatus);
    console.log(comentario);
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  }
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.default', pb: 2, pt: 0.6 }}>
        <Grid item sx={{ mr: 2 }}>
          <b>Programa:</b>
        </Grid>
        <Grid item>
          <SelectPrograma estudiantes={estudiantes} setPrograma={setPrograma} programa={programa} programas={programas} />
        </Grid>     
        <Grid item sx={{  mr: 2, ml: 2 }}>
          <b>Periodo:</b>
        </Grid>
        <Grid item>
          <SelectPeriodo estudiantes={estudiantes} setPeriodo={setPeriodo} periodo={periodo} periodos={periodos} />
        </Grid> 
        <Grid item sx={{ mr: 2, ml: 2 }}>
          <b>Unidad:</b>
        </Grid>
        <Grid item>
          <SelectUnidad estudiantes={estudiantes} setUnidad={setUnidad} unidad={unidad} unidades={unidades} />
        </Grid>                        
      </Grid>  
      <DataGrid
        sx={{ pb: 7 }}
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
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => 
            selectedIDs.has(row.id)
          );
          setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
}; // TableEstudiantesPendientesWithoutFetch

function setProgramasList(estudiantes: Inscripcion[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map((estudiante) => {
    validar = result.includes(estudiante.Alumno.Programa.NombreLargo)
    if (!validar) {
      result.push(estudiante.Alumno.Programa.NombreLargo);
      programas.push({
        label: estudiante.Alumno.Programa.NombreLargo,
        value: estudiante.Alumno.Programa.NombreLargo
      });
    }
  })

  return programas;
}

function setUnidadList(estudiantes: Inscripcion[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map((estudiante) => {
    validar = result.includes(estudiante.Alumno.UnidadAdscripcion.value)
    if (!validar) {
      result.push(estudiante.Alumno.UnidadAdscripcion.value);
      programas.push({
        label: estudiante.Alumno.UnidadAdscripcion.value,
        value: estudiante.Alumno.UnidadAdscripcion.value
      });
    }
  })

  return programas;
}
function setPeriodoList(estudiantes: Inscripcion[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  estudiantes.map((estudiante) => {
    validar = result.includes(estudiante.FechasCuatri.CuatrimestreSemestre)
    if (!validar) {
      result.push(estudiante.FechasCuatri.CuatrimestreSemestre);
      programas.push({
        label: estudiante.FechasCuatri.CuatrimestreSemestre,
        value: estudiante.FechasCuatri.CuatrimestreSemestre
      });
    }
  })

  return programas;
}

export const TableEstudiantesPendientes: React.FC<{  }> = ({  }) => {
  let programas: ProgramaUnidad[];
  let unidad: ProgramaUnidad[];
  let periodo: ProgramaUnidad[];
  const { data, isError, isLoading, isSuccess } = useGetEstudiantesPendientes();
  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los estudiantes.
      </Alert>
    );
  }
  if (isLoading) { return <CircularProgress />; }
  let estudiantesPendientes: Inscripcion[];
  if (isSuccess) {
    estudiantesPendientes = data;
  }
  programas = setProgramasList(estudiantesPendientes);  
  unidad = setUnidadList(estudiantesPendientes);  
  periodo = setPeriodoList(estudiantesPendientes);
  return (
    <>
        <Card key={`ecosur-lista-estudiantes-pendientes`} sx={{ border: 'none', boxShadow: 'none' }}>             
            <TableEstudiantesPendientesWithoutFetch estudiantes={estudiantesPendientes} programas={programas} unidades={unidad}  periodos = {periodo}/>
        </Card>
    </>       
  );
}; // TableEstudiantesPendientes
