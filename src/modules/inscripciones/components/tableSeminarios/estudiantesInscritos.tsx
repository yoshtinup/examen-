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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  useGetEstudiantesInscritosCancelados,
  useGetEstudiantesPendientes,
  useGetOpciones,
} from '../../queries';
import {
  Inscripcion,
  ProgramaUnidad,
  ProgramaOpciones,
  UnidadOpciones,
  FechaCuatriOpciones,
} from '../../types';
import moment from 'moment';
import { Search } from '@mui/icons-material';

function getRandomNumberFromDate() {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * timestamp);
  return randomNumber;
}
const SelectPrograma = (props: any) => {
  let programas = [];
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
  const selectedValue = event.target.value;
  const newValue = Number(selectedValue) === -1 ? undefined : selectedValue;
  props.setPrograma(newValue);
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
          value={props.programa!== undefined?props.programa:-1}
          label="Programa"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value={-1}>
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
    const selectedValue = event.target.value;
  const newValue = Number(selectedValue) === -1 ? undefined : selectedValue;
     props.setUnidad(newValue);
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
          value={props.unidad!== undefined?props.unidad:-1}
          label="Unidad"
          onChange={handleChangeNotificacion}
        >
          <MenuItem key={0} value={-1}>
            Todos
          </MenuItem>
          {unidades}
        </Select>
      </FormControl>
    </Box>
  );
};


export const TableEstudiantesInscritosWithoutFetch: React.FC<{
  programas: ProgramaUnidad[];
  unidades: ProgramaUnidad[];
}> = ({ unidades, programas}) => {
  const [programa, setPrograma] = useState<number>(undefined);
  const [unidad, setUnidad] = useState<number>(undefined);
  const [periodo, setPeriodo] = useState<number>(undefined);
const [estudiante, setEstudiante] = useState<Inscripcion[]>([]);
  const [search, setSearch] = useState(false);
  const [example,setExample] = useState(<></>);
  
  const { data, isError, isLoading, isSuccess, refetch } =
  useGetEstudiantesInscritosCancelados(2, programa, unidad);
  if (isError) {
    console.log('error');
    return <>error</>;
  }
  if (isLoading) {
    console.log('cargando');
    return <>cargando</>;
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('pasando');
      const nuevosEstudiantes = data; // Guardar los nuevos datos en una variable temporal
      setEstudiante(nuevosEstudiantes); // Actualizar el estado estudiante con los nuevos datos
      console.log(nuevosEstudiantes);
    }
  }, [isSuccess, data]);
  
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 350,
      renderCell: params => {
        return (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">
              {`${params.row.nombre}`}
            </Typography>
          </Grid>
        );
      },
    },
    { field: 'programa', headerName: 'Programa', width: 420 },
    { field: 'unidad', headerName: 'Unidad', width: 260 },
    { field: 'generacion', headerName: 'Generación', width: 120 },   
    { field: 'periodo', headerName: 'Periodo', width: 260 },
    {
      field: 'periodoInscripcion',
      headerName: 'Fecha del Periodo',
      width: 180,
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
   
  ];
  // const handleClick = (id: number, estatus: number, comentario: string) => {
  //   setOpen(false);
  //   console.log(id);
  //   console.log(estatus);
  //   console.log(comentario);
  // };
  // const [open, setOpen] = React.useState<boolean>(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  
 
  const [selectedRows, setSelectedRows] = React.useState([]);
  let rows = [];
  
  let estudiantesList: Inscripcion[] = estudiante;
  
  estudiantesList?.map((estudiante, index) =>
    rows.push({
      id: index,
      nombre:
        estudiante.Alumno?.Datos.Nombre_s_ +
        ' ' +
        estudiante.Alumno?.Datos.ApellidoPaterno +
        ' ' +
        estudiante.Alumno?.Datos.ApellidoMaterno,
      programa: estudiante.Alumno?.Programa.NombreLargo,
      unidad: estudiante.Alumno?.UnidadAdscripcion.value,
      generacion: estudiante.Alumno?.Generacion.Value,
      periodo: estudiante.FechasCuatri?.CuatrimestreSemestre,
      periodoInicioInscripcion: estudiante.FechasCuatri?.FechaInicioInscripcion,
      periodoFinInscripcion: estudiante.FechasCuatri?.FechaFinInscripcion,
    })
  );

  

  
  return (
    <>
      
      <div style={{ height: 1500, width: '100%' }}>
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
            bgcolor: 'white',
            pb: 1,
            pt: 1,
            pr: 5,
          }}
        >
          <Button onClick={() => refetch()} variant="contained">
          <Typography variant="body2" style={{ fontSize: 14, textTransform: 'none' }}>
          Recuperar
          </Typography> 
          </Button>
        </Grid>

        <DataGrid
          sx={{ pb: 18 }}
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
          // onSelectionModelChange={ids => {
          //   const selectedIDs = new Set(ids);
          //   const selectedRows = rows.filter(row => selectedIDs.has(row.id));
          //   setSelectedRows(selectedRows);
          // }}
        />
      </div>
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch

function setProgramasList(opciones: ProgramaOpciones[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: string[] = [];
  let validar: boolean;
  opciones?.map(opcion => {
    validar = result.includes(opcion?.NombreLargo);
    if (!validar) {
      result.push(opcion?.NombreLargo);
      programas.push({
        label: opcion?.NombreLargo,
        value: opcion?.IdPrograma,
      });
    }
  });
  return programas;
}

function setUnidadList(opciones: UnidadOpciones[]): ProgramaUnidad[] {
  let programas: ProgramaUnidad[] = [];
  let result: number[] = [];
  let validar: boolean;
  opciones?.map(opcion => {
    validar = result.includes(opcion?.IdUnidad);
    if (!validar) {
      result.push(opcion?.IdUnidad);
      programas.push({
        label: opcion?.value,
        value: opcion?.IdUnidad,
      });
    }
  });

  return programas;
}

export const TableEstudiantesInscritos = props => {
  let programas: ProgramaUnidad[];
  let unidad: ProgramaUnidad[];


  const { data, isError, isLoading, isSuccess }= useGetOpciones();
  const dataEstudiantes =
    useGetEstudiantesInscritosCancelados(2);
    
  if (dataEstudiantes.isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los estudiantes.
      </Alert>
    );
  }
  if (dataEstudiantes.isLoading) {
    return <CircularProgress />;
  }
  if (dataEstudiantes.isSuccess) {
    console.log('sepudo por siempre')
  }

  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de las opciones.
      </Alert>
    );
  }
  if (isLoading) {
  }
  let opcionesProgramas: ProgramaOpciones[];
  let opcionesUnidad: UnidadOpciones[];
  let opcionesFechaCuatri: FechaCuatriOpciones[];
  if (isSuccess) {
    opcionesProgramas = data?.Programas;
    opcionesUnidad = data?.Unidad;
    opcionesFechaCuatri = data?.FechaCuatri;
  }
  programas = setProgramasList(opcionesProgramas);
  unidad = setUnidadList(opcionesUnidad);
  ////

  return (
    <>
      <Card
        key={`ecosur-lista-estudiantes-inscritos`}
        sx={{ border: 'none', boxShadow: 'none' }}
      >
        <TableEstudiantesInscritosWithoutFetch
          programas={programas}
          unidades={unidad}
        />
      </Card>
    </>
  );
}; // TableEstudiantesinscritos
