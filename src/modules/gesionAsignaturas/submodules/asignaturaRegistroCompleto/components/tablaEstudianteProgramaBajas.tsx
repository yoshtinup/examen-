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
import { FiltroEstudiante } from '../../../../estudiantes/types';
import { ListadoAlumnos } from '@shared/types/asignaturaRegistroTypes';
import { ListaEstudiantes } from '@modules/estudiantes';
import LinkIcon from '@mui/icons-material/Link';

export const TableEstudiantesProgramaBajasWithoutFetch: React.FC<{
  estudiantes: ListadoAlumnos[];
  urlboleta?: string;
  categoriaMateria?: string;
}> = ({ estudiantes, urlboleta, categoriaMateria }) => {
  let columns: GridColDef[];

  const columnsGrid: GridColDef[] = [
    {
      field: 'estudiante',
      headerName: 'Nombre',
      width: 300,
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

    { field: 'matricula', headerName: 'Matricula', width: 130 },
  ];
  let rows = [];
  let estudiantesList: ListadoAlumnos[] = estudiantes;

  estudiantesList.map((estudiante, index) => {
    
    if (
      estudiante.EnRevisionDeDT?.Id == 2 &&
      estudiante.AltaOBajaAsignatura == 4
    ) {
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
      });
    }
  });

  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }} id="tabla-gestion-estudiantes">
        <DataGrid
          sx={{ pb: 7 }}
          rows={rows}
          columns={columnsGrid}
          disableColumnMenu
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
      </Box>
      {/* {urlboleta != null ? (
        <a href={urlboleta}>
          <Badge>
            <strong>Boleta de calificaciones del curso</strong>
          </Badge>
        </a>
      ) : (
        ''
      )} */}
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch
