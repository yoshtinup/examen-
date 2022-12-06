import React from 'react';
import { CustomToolbar, CustomFooter, CustomNoRowsOverlay } from '.'
import { Alert, CircularProgress, Button, Card, Box, Pagination, Typography, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetSeminariosConcluidos } from '../../queries';
import { Concluido } from '../../types';
import { useRouter } from 'next/router';
import moment from 'moment';

export const TableSeminariosConcluidosWithoutFetch: React.FC<{ seminarios: Concluido[] }> = ({
  seminarios
}) => {    
const router = useRouter();
  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Estudiante', width: 260 },
    { field: 'programa', headerName: 'Programa', width: 420 },
    { field: 'unidad', headerName: 'Unidad', width: 120 },
    { field: 'seminario', headerName: 'Seminario', width: 280 },
    { field: 'periodo', headerName: 'Periodo', width: 160 },
    { field: 'opciones', headerName: 'Opciones', sortable: false, width: 120,
      renderCell: (params) => {
        const handleClickRow = () => {
          console.log(params.id);
          
          router.push(`/seminarios_investigacion/${params.id}`);
        };
              
        return <Button variant='contained' onClick={handleClickRow} size='small'>Detalles</Button>
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
    })
  ))

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
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
      />
    </div>
  );
}; // TableSeminariosConcluidosWithoutFetch

export const TableSeminariosConcluidos: React.FC<{ anio: number }> = ({ anio }) => {
  const { data, isError, isLoading, isSuccess } = useGetSeminariosConcluidos(anio);
  if (isError)
    return (
      <Alert severity="error">
        No se pudo cargar la información de los seminarios.
      </Alert>
    );
  if (isLoading) return <CircularProgress />;
  let seminariosConcluidos: Concluido[];
  if (isSuccess) {
    seminariosConcluidos = data;
  }

  return (
    <>
        <Card key={`ecosur-lista-seminarios-en-proceso`} sx={{ border: 'none', boxShadow: 'none' }}>
            <TableSeminariosConcluidosWithoutFetch seminarios={seminariosConcluidos} />
        </Card>
    </>       
  );
}; // TableSeminariosConcluidos
