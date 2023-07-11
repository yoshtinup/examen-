import Roles from '@definitions/Roles';
import { rolStateAtom } from '@modules/auth/recoil';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useGetInformacionCompletaAsignatura } from '../../queries/hasura';
import { format } from 'date-fns';
import { TableEstudiantesProgramaWithoutFetch } from '@modules/gesionAsignaturas/submodules/asignaturaRegistroCompleto/components/tablaEstudiantePrograma';
import { useState } from 'react';
import { differenceInDays, parse } from 'date-fns';
import TableProfessors from './components/tableProfessors';
import MessageGenerarConstanciasDocentes from './components/messageGenerarConstanciasDocentes';
import { TableEstudiantesProgramaBajasWithoutFetch } from './components/tablaEstudianteProgramaBajas';
import { TableEstudiantesProgramaDirectorWithoutFetch } from './components/tablaEstudianteProgramaDirector';
import { CoPresentOutlined } from '@mui/icons-material';
import { flexbox, margin } from '@mui/system';

const style = {
  padding: '30px',
  backgroundColor: '#fff',
};

const AsignaturaRegistroCompleto = ({ idMOA }: { idMOA: number }) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);

  if (currentRol != Roles.Servicios_Escolares) {
    return <>Sin permisos de acceso</>;
  }

  const { data, isError, isLoading, isSuccess } =
    useGetInformacionCompletaAsignatura(idMOA);
  if (isError) {
    return (
      <Alert severity="error">
        No se pudo cargar la información de los estudiantes.
      </Alert>
    );
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  const currentDate = new Date();
  const selectedDate = new Date(data.Datos.Fechas.FechaFinAsignatura);
  const daysDifference = differenceInDays(currentDate, selectedDate);
  const hasPassed40Days = daysDifference <= 40;

  if (isSuccess && data) {
    let EsSeminario =
      data.Asignatura.Datos.CategoriaMateria == 'Seminario' ||
      data.Asignatura.Datos.CategoriaMateria == 'Tutelar'
        ? true
        : false;
    const infoBasicMateria = (
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <h1 style={{ margin: '0px' }}>
            {data.Asignatura.Datos.Nombre.Valor}{' '}
            <Chip
              color="info"
              variant="outlined"
              label={data.Asignatura.Datos.CategoriaMateria}
            />
          </h1>
          <p className="asignaturaFecha">
            {' '}
            Del{' '}
            {data.Datos.Fechas.FechaInicioAsignatura !== null
              ? format(
                  new Date(data.Datos.Fechas.FechaInicioAsignatura),
                  'dd/MM/yyyy'
                )
              : 'No definida'}{' '}
            al{' '}
            {data.Datos.Fechas.FechaFinAsignatura !== null
              ? format(
                  new Date(data.Datos.Fechas.FechaFinAsignatura),
                  'dd/MM/yyyy'
                )
              : 'No definida'}
          </p>

          {data.CursoCancelado && data.FechaCancelacionCurso != null ? (
            <>
              <Alert severity="error">
                Asignatura cancelada - Fecha de cancelación:{' '}
                {format(new Date(data.FechaCancelacionCurso), 'dd/MM/yyyy')}
              </Alert>
            </>
          ) : data.CursoCancelado && data.FechaCancelacionCurso == null ? (
            <>
              <Alert severity="error">
                Asignatura cancelada - Sin Fecha de cancelación registrada
              </Alert>
            </>
          ) : (
            ''
          )}
        </Typography>
      </Grid>
    );
    return data.CursoCancelado ? (
      <Container maxWidth={false} style={{ ...style }}>
        <Grid container spacing={2}>
          {infoBasicMateria}
        </Grid>
      </Container>
    ) : (
      <Container maxWidth={false} style={{ ...style }}>
        <Grid container spacing={2}>
          {infoBasicMateria}
          <Grid item xs={12} spacing={3}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <div>
                      <p>
                        <strong>Programa:</strong>{' '}
                        {data.Asignatura.Datos.Programa.Nombre}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Clave:</strong> {data.Asignatura.Datos.Clave}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Créditos:</strong>{' '}
                        {data.Asignatura.Datos.Nombre.Creditos}
                      </p>
                    </div>
                    {data.Asignatura.Datos.Nombre.Horas && (
                      <div>
                        <p>
                          <strong>Horas:</strong>{' '}
                          {data.Asignatura.Datos.Nombre.Horas}
                        </p>
                      </div>
                    )}
                    <div>
                      <p>
                        <strong>Tipo:</strong>{' '}
                        {data.Asignatura.Datos.Nombre.ObligatoriaOptativa}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Periodo:</strong> {data.Datos.Periodo.Nombre} (
                        {''}
                        {data.Datos.Fechas.FechaInicioPeriodo !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaInicioPeriodo),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}{' '}
                        al{' '}
                        {data.Datos.Fechas.FechaFinPeriodo !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaFinPeriodo),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}
                        )
                      </p>
                    </div>
                  </Stack>
                </Box>
              </Grid>
              {data.Asignatura.Datos.CategoriaMateria === 'Curso' && (
                <Grid item md={6} xs={12}>
                  <h4 style={{ color: '#c56b16' }}>Fechas importantes</h4>
                  <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>Tipo</b>
                          </TableCell>
                          <TableCell>
                            <b>Fecha</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            Límite de <b></b>alta o baja de asignatura de plan
                            de estudios
                          </TableCell>
                          <TableCell>
                            {data.FechaLimiteAltaYBaja !== null
                              ? format(
                                  new Date(data.FechaLimiteAltaYBaja),
                                  'dd/MM/yyyy'
                                )
                              : 'No definida'}{' '}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Límite de registro de docentes </TableCell>
                          <TableCell>
                            {data.FechaLimiteRegistroDocente !== null
                              ? format(
                                  new Date(data.FechaLimiteRegistroDocente),
                                  'dd/MM/yyyy'
                                )
                              : 'No definida'}{' '}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            Inicio de entrega de calificaciones
                          </TableCell>
                          <TableCell>
                            {' '}
                            {data.FechaInicioEntregaCalificaciones !== null
                              ? format(
                                  new Date(
                                    data.FechaInicioEntregaCalificaciones
                                  ),
                                  'dd/MM/yyyy'
                                )
                              : 'No definida'}{' '}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Grid>
              )}
              {data.Asignatura.Datos.CategoriaMateria === 'Curso' && (
                <Grid item md={6} xs={12}>
                  <h4 style={{ color: '#c56b16' }}>Estatus de los procesos</h4>
                  <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>Proceso</b>
                          </TableCell>
                          <TableCell>
                            <b>Estatus</b>
                          </TableCell>
                          <TableCell>
                            <b>Acciones</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Registro de docentes</TableCell>
                          <TableCell>
                            {data.EstatusRegistroDocentes == null
                              ? ''
                              : data.EstatusRegistroDocentes.Descripcion}
                          </TableCell>
                          <TableCell>
                            {hasPassed40Days &&
                            data.EstatusRegistroDocentes != null &&
                            data.EstatusRegistroDocentes
                              .IdcatalogoEstatusRegistroDocentesPorcentajes ==
                              2 ? (
                              <a href="#">Enviar recordatorio</a>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Evaluación docente</TableCell>
                          <TableCell>
                            {data.EvaluacionDocente == null
                              ? 'No ha iniciado la evaluación'
                              : data.EvaluacionDocente.Estatus.Nombre}
                          </TableCell>
                          <TableCell>
                            {hasPassed40Days &&
                            data.EvaluacionDocente != null &&
                            [1, 3].includes(
                              data.EvaluacionDocente.Estatus.Id
                            ) ? (
                              <a href="#">Enviar notificación</a>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Asignación de calificaciones</TableCell>
                          <TableCell>
                            {data.EstatusAsignacionCalificacion == null
                              ? ''
                              : data.EstatusAsignacionCalificacion.Nombre}
                          </TableCell>
                          <TableCell>
                            {hasPassed40Days &&
                            data.EstatusAsignacionCalificacion != null &&
                            [1, 2].includes(
                              data.EstatusAsignacionCalificacion.Id
                            ) ? (
                              <a href="#">Enviar notificación</a>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Grid>
              )}
             {!hasPassed40Days && <Grid item xs={12} style={{textAlign: 'right',}}>
                <Box display={'flex'} justifyContent={'right'}>
                  <span style={{
                    textAlign: 'center',
                    color: 'rgb(220, 53, 69)',
                    fontWeight: 'bold',
                    // border: '1px solid rgb(220, 53, 69)',
                    padding:'23px 0px',
                    margin:'10px 10px',
                    
                  }}>
                  NOTA: Puede generar documentos (Acta de seminario, boletas de
                  calificaciones, etc.) hasta máximo 40 días después de la fecha
                  fin de la asignatura.
                  </span>
                </Box>
              </Grid>
              }
              {data.Asignatura.Datos.CategoriaMateria === 'Curso' && (
                <Grid item xs={12}>
                  <h4 style={{ color: '#c56b16' }}>
                    Docentes de la asignatura
                  </h4>
                  <Box
                    sx={{
                      backgroundColor: '#f5f5f5',
                      padding: '5px',
                      minHeight: '200px',
                    }}
                  >
                    {hasPassed40Days &&
                    data.EstatusAsignacionCalificacion.Id === 3 ? (
                      <MessageGenerarConstanciasDocentes idMOA={idMOA} />
                    ) : (
                      ''
                    )}
                    <TableProfessors
                      professsors={data.Docentes}
                      idMOA={idMOA}
                      IdcatalogoEstatusRegistroDocentesPorcentajes={
                        data.EstatusRegistroDocentes
                          .IdcatalogoEstatusRegistroDocentesPorcentajes
                      }
                      show={hasPassed40Days}
                    />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <h4 style={{ color: '#c56b16' }}>Estudiantes</h4>
                <h5>Inscritos/Pendientes de inscribirse</h5>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '5px',
                    minHeight: '200px',
                  }}
                >
                  <TableEstudiantesProgramaWithoutFetch
                    estudiantes={data.Alumnos.Listado}
                    urlboleta={data.ConcentradoCalificacionesAlumnos}
                    categoriaMateria={data.Asignatura.Datos.CategoriaMateria}
                    concentradoCalAlumno={data.ConcentradoCalificacionesAlumnos}
                    estatusAsignacionCalificacion={
                      data.EstatusAsignacionCalificacion.Id
                    }
                    show={hasPassed40Days}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <h5>
                  En proceso de aprobación de Director/a de tesis de alta o baja
                </h5>

                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '5px',
                    minHeight: '200px',
                  }}
                >
                  <TableEstudiantesProgramaDirectorWithoutFetch
                    estudiantes={data.Alumnos.Listado}
                    urlboleta={data.ConcentradoCalificacionesAlumnos}
                    categoriaMateria={data.Asignatura.Datos.CategoriaMateria}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <h5>Bajas</h5>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '5px',
                    minHeight: '200px',
                  }}
                >
                  <TableEstudiantesProgramaBajasWithoutFetch
                    estudiantes={data.Alumnos.Listado}
                    urlboleta={data.ConcentradoCalificacionesAlumnos}
                    categoriaMateria={data.Asignatura.Datos.CategoriaMateria}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box></Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
};
export default AsignaturaRegistroCompleto;
