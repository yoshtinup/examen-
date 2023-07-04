import React, { useState } from 'react';
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Select,
  Link,
  Typography,
  Badge,
  Chip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FiltroEstudiante } from '../../../../estudiantes/types';
import { ListadoAlumnos } from '@shared/types/asignaturaRegistroTypes';
import { ListaEstudiantes } from '@modules/estudiantes';
import LinkIcon from '@mui/icons-material/Link';
import { CustomFooter, CustomToolbar } from './programa/extraComponents';

export const TableEstudiantesProgramaWithoutFetch: React.FC<{
  estudiantes: ListadoAlumnos[];
  urlboleta?: string;
  categoriaMateria?: string;
  concentradoCalAlumno?: string;
  estatusAsignacionCalificacion?: number;
}> = ({
  estudiantes,
  urlboleta,
  categoriaMateria,
  concentradoCalAlumno,
  estatusAsignacionCalificacion,
}) => {
  let EsSeminario =
    categoriaMateria == 'Seminario' || categoriaMateria == 'Tutelar'
      ? true
      : false;
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
              {params.row.boletainscripcion != undefined ? (
                <Chip
                  href={
                    params.row.boletainscripcion.includes('sharepoint')
                      ? params.row.boletainscripcion
                      : 'https://serviciosposgrado.ecosur.mx/alumnos/Content/Cursos/BoletasInscripciones/' +
                        params.row.boletainscripcion
                  }
                  target="_blank"
                  label="Boleta de inscripción"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                <></>
              )}
              {/* //checar Sharepoint */}
              {EsSeminario && params.row.evalseminario == 4 ? (
                <Chip
                  href={
                    params.row.urlonedrive == null
                      ? params.row.urlonedrive?.includes('sharepoint')
                        ? params.row.urlonedrive
                        : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/EvaluacionSeminarios/' +
                          params.row.urlonedrive
                      : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/EvaluacionSeminarios/' +
                        params.row.NombreArchivo_Acta
                  }
                  target="_blank"
                  label="Acta de evaluación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                <></>
              )}

              {params.row.boletacalificaciones != null ? (
                <Chip
                  href={
                    params.row.boletacalificaciones.includes('sharepoint')
                      ? params.row.boletacalificaciones
                      : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/Calificaciones/BoletasEstudiantes/' +
                        params.row.boletacalificaciones
                  }
                  target="_blank"
                  label="Boleta de calificación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      },
    },
    ,
    {
      field: 'opciones',
      headerName: 'Opciones',
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
              {EsSeminario &&
              params.row.evalseminario != 1 &&
              params.row.evalseminario != 5 ? (
                <Chip
                  href={
                    'https://sip.ecosur.mx/seminarios_investigacion/' +
                    params.row.idseminariosevaluaciones
                  }
                  target="_blank"
                  label=" Detalles de evaluación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                <></>
              )}

              {EsSeminario &&
              params.row.evalseminario != 4 &&
              params.row.evalseminario != 5 ? (
                <Chip
                  href={'#'}
                  target="_blank"
                  label="Enviar recordatorio de evaluación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                // <Link aria-disabled={true} href={'#'}>
                //   <a
                //     style={{
                //       cursor: 'pointer',
                //       textDecoration: 'none',
                //       color: '#00BFA5',
                //     }}
                //   >
                //     <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                //     Enviar recordatorio de evaluación
                //   </a>
                // </Link>
                <></>
              )}
              {EsSeminario && params.row.evalseminario == 4 ? (
                <Chip
                  href={'#'}
                  target="_blank"
                  label="Generar acta de evaluación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                // <Link aria-disabled={true} href={'#'}>
                //   <a
                //     style={{
                //       cursor: 'pointer',
                //       textDecoration: 'none',
                //       color: '#00BFA5',
                //     }}
                //   >
                //     <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                //     Generar acta de evaluación
                //   </a>
                // </Link>
                <></>
              )}
              {params.row.numero > 0 && params.row.letra != undefined ? (
                <Chip
                  href={'#'}
                  target="_blank"
                  label="Generar boleta de calificación"
                  component="a"
                  clickable
                  size="small"
                  variant="outlined"
                  color="info"
                ></Chip>
              ) : (
                <></>
              )}
              {/* <Link aria-disabled={true} href={'#'}>
                <a
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#00BFA5',
                  }}
                >
                  <LinkIcon style={{ marginLeft: '5px', height: 15 }} />
                  Generar boleta de calificación
                </a>
              </Link> */}
            </div>
          </>
        );
      },
    },
  ];
  let opcionesFiltro;
  if (EsSeminario) {
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
    console.log(estudiante.EnRevisionDeDT?.Id);
    console.log(estudiante.AltaOBajaAsignatura);
    if (
      estudiante.EnRevisionDeDT?.Id != undefined ||
      (estudiante.EnRevisionDeDT?.Id != 2 &&
        estudiante.AltaOBajaAsignatura != 4) ||
      (estudiante.EnRevisionDeDT?.Id != 1 &&
        estudiante.AltaOBajaAsignatura != 3) ||
      (estudiante.EnRevisionDeDT?.Id != 1 &&
        estudiante.AltaOBajaAsignatura != 4)
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
        numero: estudiante.Calificacion?.Numerica.toFixed(1),
        letra: estudiante.Calificacion?.EnLetra,
        boleta: estudiante?.BoletaCalificaciones,
        boletainscripcion: estudiante.BoletaInscripcion?.NombreArchivo,
        boletacalificaciones: estudiante?.BoletaCalificaciones,
        enrevisionDT: estudiante.EnRevisionDeDT?.Id,
        urlonedrive: estudiante.EvaluacionSeminario?.url_one_drive,
      });
    }
  });
  rows.sort(function (a, b) {
    var nombreA = a.estudiante.toUpperCase();
    var nombreB = b.estudiante.toUpperCase();

    if (nombreA < nombreB) {
      return -1;
    }
    if (nombreA > nombreB) {
      return 1;
    }

    return 0;
  });
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {categoriaMateria == 'Curso' && concentradoCalAlumno != null ? (
        <a
          href={
            concentradoCalAlumno.includes('sharepoint')
              ? concentradoCalAlumno
              : 'https://serviciosposgrado.ecosur.mx/Profesores/Content/Cursos/Calificaciones/ConcentradoCursos/' +
                concentradoCalAlumno
          }
          target="_blank"
        >
          <Badge>
            <strong>Concentrado de calificaciones </strong>
          </Badge>
        </a>
      ) : (
        <></>
      )}
      {categoriaMateria == 'Curso' && estatusAsignacionCalificacion == 3 ? (
        <a href={'#'} target="_blank">
          <Badge>
            <strong>Generar concentrado </strong>
          </Badge>
        </a>
      ) : (
        <></>
      )}
      </div>
      <Box sx={{ height: 600, width: '100%' }} id="tabla-gestion-estudiantes">
        <DataGrid
          sx={{ pb: 7 }}
          rows={rows}
          columns={opcionesFiltro}
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
