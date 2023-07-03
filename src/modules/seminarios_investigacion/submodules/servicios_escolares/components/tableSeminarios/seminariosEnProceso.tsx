import React from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.'
import EcosurCommentDialog from '../DialogActa';
import { Alert, CircularProgress, Button, Card, Grid, InputLabel, MenuItem, FormControl, Box, Select, ButtonGroup } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetSeminariosEnProceso } from '../../queries';
import { EnProceso, Persona } from '../../types';
import moment from 'moment';

export const TableSeminariosEnProcesoWithoutFetch: React.FC<{ seminarios: EnProceso[] }> = ({
  seminarios,
}) => {    
  const personaInfo: Persona = {
    id: 0,
    nombre: '',
    programa: '',
    unidad: '',
    seminario: '',
    estatus: '',
    periodo: ''
  }
  const handleClick = (id: number, estatus: number, comentario: string) => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const [estatusDescription, setEstatusDescription] = React.useState<Persona>(personaInfo);
  const handleClose = () => {
    setOpen(false);
    setEstatusDescription(personaInfo);
  }
  const [selectedRows, setSelectedRows] = React.useState([]);
  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Estudiante', width: 180 },
    { field: 'programa', headerName: 'Programa', width: 280 },
    { field: 'unidad', headerName: 'Unidad', width: 120 },
    { field: 'seminario', headerName: 'Seminario', width: 200 },
    { field: 'periodo', headerName: 'Periodo', width: 120 },
    { field: 'estatus', headerName: 'Estatus', width: 180 },
    { field: 'opciones', headerName: 'Opciones', sortable: false, width: 160,
      renderCell: (params) => {
        const handleOpen = () => {
          setEstatusDescription(params.row);
          setOpen(true);
        };

        return (
          <ButtonGroup orientation="vertical">
            <Button
              onClick={handleOpen}
              variant="contained"
              size="small"
            >
              Cambiar estatus
            </Button><br/>
            <Button
              href={"/seminarios_investigacion/" + params.id}
              style={{marginTop:"7px"}}
              variant="contained"
              size="small"
            >
              Ver detalles
            </Button>
          </ButtonGroup>
        )
      },
    },
  ];
  let rows = [];
  seminarios.map((seminario) => (
    rows.push({
      id: seminario.IdEvaluacion,
      nombre: seminario.Alumno.Programa.datos.Nombre + ' ' + seminario.Alumno.Programa.datos.ApellidoPaterno + ' ' + seminario.Alumno.Programa.datos.ApellidoMaterno,
      programa: seminario.Alumno.Programa.Programa.Value,
      unidad: seminario.Alumno.Programa.UnidadAdscripcion.Nombre,
      seminario: seminario.Alumno.Materia.Data.Detalles.Nombre,
      periodo: moment(new Date(seminario.Alumno.Materia.Data.Periodo.Fecha.Inicio)).format('D/M/Y') + ' - ' + moment(new Date(seminario.Alumno.Materia.Data.Periodo.Fecha.Fin)).format('D/M/Y'),
      estatus: seminario.estatus.Descripcion,
    })
  ))

  return (
    <div style={{ height: 900, width: '100%' }} id="tabla-seminarios-en-proceso" >
      {
        (selectedRows.length !== 0) ?
          <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.default', pb: 2, pt: 1.8 }}>                
            <Grid item>
                {/* FIX ME: Agregar endpoint para las notificaciones específicas */}
              <Button variant='contained' size='small' onClick={() => {}}>Enviar recordatorio a seleccionados</Button>
            </Grid>     
          </Grid>  
        :
          <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.default', pb: 2, pt: 0.6 }}>
            <Grid item sx={{ pr: 2 }}>
              {/* FIX ME: Agregar endpoint para las notificaciones generales */}
              <Button variant='contained' size='small'>Enviar recordatorio general</Button>
            </Grid>
            <Grid item>
              <SelectUser />
            </Grid>                   
          </Grid>  
      }
      <DataGrid
        rowHeight={90}
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
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => 
            selectedIDs.has(row.id)
          );
          setSelectedRows(selectedRows);
        }}
      />
      <EcosurCommentDialog
        estatusDescription={estatusDescription}
        onClick={handleClick}
        open={open}
        handleClose={handleClose}
        titulo={`Cambio de estatus de evaluación`}
        label="Razón de cambio:" 
        selectTitle='Opciones' 
      />
    </div>
  );
}; // TableSeminariosEnProcesoWithoutFetch

const SelectUser = () => {
  const [user, setUser] = React.useState('Todos');
  const handleChangeNotificacion = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="ecosur-select-user">A</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Age"
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

export const TableSeminariosEnProceso: React.FC<{ anio: number }> = ({ anio }) => {
  const { data, isError, isLoading, isSuccess } = useGetSeminariosEnProceso(anio);
  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los seminarios.
      </Alert>
    );
  }
  if (isLoading) { return <CircularProgress />; }
  let seminariosEnProceso: EnProceso[];
  if (isSuccess) {
    seminariosEnProceso = data;
  }

  return (
    <>
        <Card key={`ecosur-lista-seminarios-en-proceso`} sx={{ border: 'none', boxShadow: 'none' }}>             
            <TableSeminariosEnProcesoWithoutFetch seminarios={seminariosEnProceso} />
        </Card>
    </>       
  );
}; // TableSeminariosEnProceso
