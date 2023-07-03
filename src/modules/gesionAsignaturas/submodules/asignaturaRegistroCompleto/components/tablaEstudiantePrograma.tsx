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

export const TableEstudiantesProgramaWithoutFetch: React.FC<{
  estudiantes: ListadoAlumnos[];
  urlboleta?: string;
  categoriaMateria?: string;
  concentradoCalAlumno?: string;
}> = ({ estudiantes, urlboleta, categoriaMateria, concentradoCalAlumno }) => {
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
    {
      field: 'evaldocente',
      headerName: 'Evaluación docente realizada',
      width: 220,
      renderCell: params => {
        return <>{params.row.evaldocente == undefined ? 'Sí' : 'No'}</>;
      },
    },
    {
      field: 'evalseminario',
      headerName: 'Evaluación de seminario',
      width: 260,
      renderCell: params => {
        return (
          <>
            {params.row.evalseminario == undefined
              ? 'No ha iniciado'
              : params.row.evalseminario == 1
              ? 'Pendiente de que estudiante registre información'
              : params.row.evalseminario != 1 && params.row.evalseminario != 5
              ? params.row.evalseminariodesc
              : 'No data'}
          </>
        );
      },
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
    {
      field: 'enlaces',
      headerName: 'Enlaces',
      width: 260,
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
              {params.row.evalseminario != 1 &&
              params.row.evalseminario != 5 ? (
                <Link
                  aria-disabled={true}
                  href={
                    'https://sip.ecosur.mx/seminarios_investigacion/' +
                    params.row.idseminariosevaluaciones
                  }
                >
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#00BFA5',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    Ver detalles
                  </a>
                </Link>
              ) : (
                <></>
              )}
              {/* //checar Sharepoint */}
              {params.row.evalseminario == 4 ? (
                <Link
                  aria-disabled={true}
                  href={
                    params.row.urlonedrive.includes('sharepoint')
                      ? params.row.urlonedrive
                      : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/EvaluacionSeminarios/' +
                        params.row.urlonedrive
                  }
                >
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#00BFA5',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    acta de evaluación
                  </a>
                </Link>
              ) : (
                <></>
              )}
              {params.row.evalseminario != 4 &&
              params.row.evalseminario != 5 ? (
                <Link aria-disabled={true} href={'#'}>
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#00BFA5',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    Enviar recordatorio
                  </a>
                </Link>
              ) : (
                <></>
              )}
              {params.row.boletainscripcion != undefined ? (
                <Link
                  aria-disabled={true}
                  href={
                    params.row.boletainscripcion.includes('sharepoint')
                      ? params.row.boletainscripcion
                      : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/BoletasInscripciones/' +
                        params.row.boletainscripcion
                  }
                >
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#00BFA5',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    Boleta de inscripción
                  </a>
                </Link>
              ) : (
                <></>
              )}
              {params.row.boletacalificaciones != null ? (
                <Link
                  aria-disabled={true}
                  href={
                    params.row.boletacalificaciones.includes('sharepoint')
                      ? params.row.boletacalificaciones
                      : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/Calificaciones/BoletasEstudiantes/' +
                        params.row.boletacalificaciones
                  }
                >
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#00BFA5',
                    }}
                  >
                    <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                    Boleta de calificaciones
                  </a>
                </Link>
              ) : (
                <></>
              )}
              <Link aria-disabled={true} href={'#'}>
                <a
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                  Generar acta
                </a>
              </Link>
              <Link aria-disabled={true} href={'#'}>
                <a
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                  Generar boleta de calificaciones
                </a>
              </Link>
            </div>
          </>
        );
      },
    },
  ];
  let opcionesFiltro;
  if (categoriaMateria == 'Seminario') {
    opcionesFiltro = columnsGrid.filter(
      column => column.field != 'evaldocente'
    );
  } else if (categoriaMateria == 'Curso') {
    opcionesFiltro = columnsGrid.filter(
      column => column.field != 'evalseminario'
    );
  } else {
    opcionesFiltro = columnsGrid.filter(
      column => column.field != 'evalseminario' && column.field != 'evaldocente'
    );
  }
  let rows = [];
  let estudiantesList: ListadoAlumnos[] = estudiantes;

  estudiantesList.map((estudiante, index) => {
    console.log(estudiante.EnRevisionDeDT?.Id)
    console.log(estudiante.AltaOBajaAsignatura)
    if (
      (estudiante.EnRevisionDeDT?.Id == 2 &&
        estudiante.AltaOBajaAsignatura == 4) ||
      (estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 3) ||
      (estudiante.EnRevisionDeDT?.Id == 1 &&
        estudiante.AltaOBajaAsignatura == 4)
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
        evalseminario:
          estudiante.EvaluacionSeminario?.Estatus.IdSeminarios_CatalogoEstatus,
        evalseminariodesc: estudiante.EvaluacionSeminario?.Estatus.Descripcion,
        idseminariosevaluaciones:
          estudiante.EvaluacionSeminario?.IdSeminarios_Evaluaciones,
        numero: estudiante.Calificacion?.Numerica,
        letra: estudiante.Calificacion?.EnLetra,
        boleta: estudiante?.BoletaCalificaciones,
        boletainscripcion: estudiante.BoletaInscripcion?.NombreArchivo,
        boletacalificaciones: estudiante?.BoletaCalificaciones,
        enrevisionDT: estudiante.EnRevisionDeDT?.Id,
        urlonedrive: estudiante.EvaluacionSeminario?.url_one_drive,
      });
    }
  });

  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
      <Box sx={{ height: 600, width: '100%' }} id="tabla-gestion-estudiantes">
        <DataGrid
          sx={{ pb: 7 }}
          rows={rows}
          columns={opcionesFiltro}
          disableColumnMenu
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
      {urlboleta != null ? (
        <a href={urlboleta}>
          <Badge>
            <strong>Boleta de calificaciones del curso</strong>
          </Badge>
        </a>
      ) : (
        ''
      )}
      {categoriaMateria == 'Cursos' && concentradoCalAlumno != null ? (
        <a
          href={
            concentradoCalAlumno.includes('sharepoint')
              ? concentradoCalAlumno
              : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/Calificaciones/ConcentradoCursos/' +
                concentradoCalAlumno
          }
        >
          <Badge>
            <strong>Concentrado de calificacione</strong>
          </Badge>
        </a>
      ) : (
        <></>
      )}
      {categoriaMateria == 'Cursos' ? (
        <Link aria-disabled={true} href={'#'}>
          <a
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#00BFA5',
            }}
          >
            <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
            Generar concentrado
          </a>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}; // TableEstudiantesPendientesWithoutFetch
