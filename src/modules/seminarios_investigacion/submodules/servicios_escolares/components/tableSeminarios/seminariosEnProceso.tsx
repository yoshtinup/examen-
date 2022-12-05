import React from 'react';
import moment from 'moment';
import { Alert, CircularProgress, Button, Card, Grid, InputLabel, MenuItem, FormControl, Box, Select, Pagination, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, 
  GridToolbarDensitySelector, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { useGetSeminariosEnProceso } from '../../queries';
import { EnProceso } from '../../types';
import EcosurCommentDialog from '../DialogActa';
import { Alumno } from '../../types/index';

function CustomToolbar() {
  const  color = 'info';
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton /> */}
      {/* <GridToolbarDensitySelector color={color}  /> */}
      {/* <GridToolbarExport color={color} /> */}
      <GridToolbarFilterButton color={color}  />
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Box>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
}

function CustomFooter(props: {
  counter: number, label: string,
}) {
  return (
    <GridFooterContainer>
      <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2 }}>
        <Grid item sx={{ pr: 1 }}>
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            {props.label}
          </Typography>  
        </Grid>  
        <Grid item>
          {props.counter}
        </Grid>        
      </Grid>     
      <CustomPagination />
    </GridFooterContainer>
  );
}

export const TableSeminariosEnProcesoWithoutFetch: React.FC<{ seminarios: EnProceso[] }> = ({
  seminarios,
}) => {    
  const handleClick = () => {
    console.log('hola');
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const [estatusDescription, setEstatusDescription] = React.useState<string>('');
  const handleClose = () => setOpen(false);
  const user = {
    nombre: 'Eduardo',
  }
  if (seminarios.length == 0) {
      return (
        <Alert severity="error">
          No se encontraron seminarios en proceso.
        </Alert>
      );
  } else {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const columns: GridColDef[] = [
      { field: 'nombre', headerName: 'Estudiante', width: 260 },
      { field: 'programa', headerName: 'Programa', width: 420 },
      { field: 'unidad', headerName: 'Unidad', width: 120 },
      { field: 'seminario', headerName: 'Seminario', width: 280 },
      { field: 'periodo', headerName: 'Periodo', width: 160 },
      { field: 'estatus', headerName: 'Estatus', width: 380 },
      { field: 'opciones', headerName: 'Opciones', sortable: false, width: 160,
        renderCell: (params) => {
          const handleOpen = () => {
            setEstatusDescription(params.row.estatus);
            setOpen(true);
          };

          return (
            <>
              <Button
                onClick={handleOpen}
                variant="contained"
                size="small"
              >
                Cambiar estatus
              </Button>
            </>
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
      <div style={{ height: 480, width: '100%' }}>
        {
          (selectedRows.length !== 0) ?
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.default', pb: 2, pt: 1.8 }}>                
              <Grid item>
                <Button variant='contained' size='small' onClick={() => console.log(JSON.stringify(selectedRows))}>Enviar recordatorio a seleccionados</Button>
              </Grid>     
            </Grid>  
          :
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.default', pb: 2, pt: 0.6 }}>
              <Grid item sx={{ pr: 2 }}>
                <Button variant='contained' size='small'>Enviar recordatorio general</Button>
              </Grid>
              <Grid item>
                <SelectUser />
              </Grid>                   
            </Grid>  
        }     
        <DataGrid
          sx={{ pb: 7 }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnMenu
          components={{
            Toolbar: CustomToolbar,
            Footer: CustomFooter,
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
          estatusDescrption={estatusDescription}
          data={user}
          onClick={handleClick}
          open={open}
          handleClose={handleClose}
          titulo={`Cambio de estatus de evaluación`}
          label="Razón de cambio" 
          selectTitle='Estatus' 
        />
      </div>
    );
  }
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
