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
import { CustomFooter, CustomToolbar } from './programa/extraComponents';
export const TableEstudiantesProgramaDirectorWithoutFetch: React.FC<{
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
    { field: 'tipocambio', headerName: 'Tipo de cambio', width: 130 },
  ];
  let rows = [];
  let estudiantesList: ListadoAlumnos[] = estudiantes;

  estudiantesList.map((estudiante, index) => {
    if (
      (estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 3) ||
      (estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 4)
    ) {
      let tipo;
      if (
        estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 3
      ) {
        tipo = 'Alta de asignatura en proceso de autorización de DT';
      }
      if (
        estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 4
      ) {
        tipo = 'Baja de asignatura en proceso de autorización de DT';
      }
      rows.push({
        id: index,
        estudiante:
          estudiante.Estudiante?.Datos.Nombre_s_ +
          ' ' +
          estudiante.Estudiante?.Datos.ApellidoPaterno +
          ' ' +
          estudiante.Estudiante?.Datos.ApellidoMaterno,
        matricula: estudiante.Matricula,
        tipocambio: tipo,
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
          components={{
            Toolbar: CustomToolbar,
            Footer: CustomFooter,
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
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch
