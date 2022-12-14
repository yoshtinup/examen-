import React, { useState } from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.'
import { Alert, CircularProgress, Button, Card, Grid, InputLabel, MenuItem, FormControl, Box, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetEstudiantesPendientes } from '../../queries';
import { Inscripcion } from '../../types';
import moment from 'moment';

const SelectPrograma = props => {
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    props.setPrograma(event.target.value as string);
  };
  
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
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value={1}>Academicos 1</MenuItem>
          <MenuItem value={2}>Academicos 2</MenuItem>
          <MenuItem value={3}>Academicos 3</MenuItem>
          <MenuItem value={4}>Academicos 4</MenuItem>
          <MenuItem value={5}>Academicos 5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export const TableEstudiantesPendientesWithoutFetch: React.FC<{ estudiantes: Inscripcion[] }> = ({
  estudiantes,
}) => {    
  const [programa, setPrograma] = useState<string>('Todos');
  const columns: GridColDef[] = [
    { field: 'estudiante', headerName: 'Estudiante', width: 350,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${params.row.estudiante} (${params.row.id} -`}
              </Typography>
              <Typography variant='body2' color='gray'>
                {`${params.row.email})`}
              </Typography>
            </Grid>
    )}},
    { field: 'programa', headerName: 'Programa', width: 420 },
    { field: 'unidad', headerName: 'Unidad', width: 120 },
    { field: 'curso', headerName: 'Curso', width: 280,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${params.row.estudiante} (${params.row.id} -`}
              </Typography>
              <Typography variant='body2'>
                {`Clave: ${params.row.clave} - Créditos: ${params.row.creditos}`}
              </Typography>
            </Grid>
    )}},
    { field: 'cuatrimestre', headerName: 'Cuatrimestre', width: 160 },
    { field: 'periodoInscripcion', headerName: 'Periodo de inscripción', width: 180,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoInicioInscripcion)).format('D/M/Y')} -`}
              </Typography>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoFinInscripcion)).format('D/M/Y')}`}
              </Typography>
            </Grid>
    )}},
    { field: 'periodoCurso', headerName: 'Periodo del curso', width: 160,
        renderCell: (params) => {
          return (
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoInicioCurso)).format('D/M/Y')} -`}
              </Typography>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoFinCurso)).format('D/M/Y')}`}
              </Typography>
            </Grid>
    )}},
    { field: 'periodo', headerName: 'Periodo del cuatrimestre/semestre', width: 260,
        renderCell: (params) => {
          return (
            <Grid>
              <Typography variant='body2'>
                {`${moment(new Date(params.row.periodoInicioCurso)).format('D/M/Y')} - ${moment(new Date(params.row.periodoFinCurso)).format('D/M/Y')}`}
              </Typography>
            </Grid>
    )}},
    { field: 'opcion', headerName: 'Opción', sortable: false, width: 160,
      renderCell: (params) => {
        const handleClick = () => {
        };        
        return (
          <>
            <Button size='small' variant='outlined'>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='body2'>
                  Enviar
                </Typography>
                <Typography variant='body2'>
                  Notificación
                </Typography>
              </Grid>
            </Button>
          </>
        )
      },
    }
  ];
  let rows = [];
  estudiantes.map((estudiante) => (
    rows.push({
      id: estudiante.Matricula,
      estudiante: estudiante.Estudiante,
      email: estudiante.emailEstudiante,
      programa: estudiante.Programa,
      unidad: estudiante.UnidadAdscripcion,
      seminario: estudiante.Programa,
      clave: estudiante.Clave,
      creditos: estudiante.Creditos,
      cuatrimestre: estudiante.Cuatrimestre,
      periodoInicioInscripcion: estudiante.FechaInicioInscripcion,
      periodoFinInscripcion: estudiante.FechaFinInscripcion,
      periodoInicioCurso: estudiante.Iniciocurso,
      periodoFinCurso: estudiante.Fincurso,
      periodo: 'fdas',
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
        <Grid item sx={{ pr: 2 }}>
          <b>Programa:</b>
        </Grid>
        <Grid item>
          <SelectPrograma estudiantes={estudiantes} setPrograma={setPrograma} programa={programa} />
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

export const TableEstudiantesPendientes: React.FC<{  }> = ({  }) => {
  // const { data, isError, isLoading, isSuccess } = useGetEstudiantesPendientes();
  // if (isError) {
  //   return (
  //     <Alert severity="error">
  //       No se pudo cargar la información de los estudiantes.
  //     </Alert>
  //   );
  // }
  // if (isLoading) { return <CircularProgress />; }
  // let estudiantesPendientes: Inscripcion[];
  // if (isSuccess) {
  //   estudiantesPendientes = data;
  // }

  let estudiantesPendientes: Inscripcion[] =  
  [
    {
      "Estudiante": "María Magdalena Alcázar Gómez",
      "Matricula": 202021001,
      "emailEstudiante": "maria.alcazar@estudianteposgrado.ecosur.mx",
      "Programa": "Doctorado en Ciencias en Ecología y Desarrollo Sustentable",
      "UnidadAdscripcion": "San Cristóbal",
      "Curso": "Sexto Semestre",
      "Clave": "SD7015",
      "Creditos": 25,
      "Cuatrimestre": "Sexto semestre",
      "FechaInicioInscripcion": "2022-12-09T00:00:00",
      "FechaFinInscripcion": "2022-12-16T23:59:00",
      "Iniciocurso": "2022-07-01T00:00:00",
      "Fincurso": "2022-12-16T00:00:00"
    },
    {
      "Estudiante": "Fernanda Magdalena Alcázar Gómez",
      "Matricula": 202021002,
      "emailEstudiante": "fernanda.alcazar@estudianteposgrado.ecosur.mx",
      "Programa": "Doctorado en Ciencias en Ecología y Desarrollo Sustentable",
      "UnidadAdscripcion": "San Cristóbal",
      "Curso": "Sexto Semestre",
      "Clave": "SD7015",
      "Creditos": 25,
      "Cuatrimestre": "Sexto semestre",
      "FechaInicioInscripcion": "2022-12-09T00:00:00",
      "FechaFinInscripcion": "2022-12-16T23:59:00",
      "Iniciocurso": "2022-07-01T00:00:00",
      "Fincurso": "2022-12-16T00:00:00"
    }
  ]

  return (
    <>
        <Card key={`ecosur-lista-estudiantes-pendientes`} sx={{ border: 'none', boxShadow: 'none' }}>             
            <TableEstudiantesPendientesWithoutFetch estudiantes={estudiantesPendientes} />
        </Card>
    </>       
  );
}; // TableEstudiantesPendientes
