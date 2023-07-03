import Roles from '@definitions/Roles';
import { rolStateAtom } from '@modules/auth/recoil';
import {
  Alert,
  Box,
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
// import TableStudents from './components/tableStuents';
import { TableEstudiantesProgramaWithoutFetch } from '@modules/gesionAsignaturas/submodules/asignaturaRegistroCompleto/components/tablaEstudiantePrograma';

import TableProfessors from './components/tableProfessors';
import MessageGenerarConstnaciasPersonal from './components/messageGenerarConstanciasPersonal';
import { TableEstudiantesProgramaBajasWithoutFetch } from './components/tablaEstudianteProgramaBajas';
import { TableEstudiantesProgramaDirectorWithoutFetch } from './components/tablaEstudianteProgramaDirector';

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

  if (isSuccess && data) {
    const infoBasicMateria = (
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <h2>{data.Asignatura.Datos.Nombre.Valor}</h2>
          {data.CursoCancelado ? (
            <>
              <Alert severity="error">
                Curso Cancelado - Fecha de cancelacion:{' '}
                {format(new Date(data.FechaCancelacionCurso), 'dd/MM/yyyy')}
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
                <h4>Datos del curso</h4>
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
                    <div>
                      <p>
                        <strong>Horas:</strong>{' '}
                        {data.Asignatura.Datos.Nombre.Horas}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Tipo:</strong>{' '}
                        {data.Asignatura.Datos.Nombre.ObligatoriaOptativa}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Periodo:</strong> {data.Datos.Periodo.Nombre}
                      </p>
                    </div>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <h4>Fechas importantes</h4>
                <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <div>
                      <p>
                        <strong>Fecha de inicio periodo:</strong>{' '}
                        {data.Datos.Fechas.FechaInicioPeriodo !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaInicioPeriodo),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Fecha de finalización periodo:</strong>{' '}
                        {data.Datos.Fechas.FechaFinPeriodo !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaFinPeriodo),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Fecha de inicio asignatura:</strong>{' '}
                        {data.Datos.Fechas.FechaInicioAsignatura !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaInicioAsignatura),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Fecha de finalización asignatura:</strong>{' '}
                        {data.Datos.Fechas.FechaFinAsignatura !== null
                          ? format(
                              new Date(data.Datos.Fechas.FechaFinAsignatura),
                              'dd/MM/yyyy'
                            )
                          : 'No definida'}
                      </p>
                    </div>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <h4>Estatus de los procesos</h4>
                <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Proceso</TableCell>
                        <TableCell>Estatus</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          Districución de porcentaje de participación
                        </TableCell>
                        <TableCell>
                          {data.EstatusRegistroDocentes == null
                            ? ''
                            : data.EstatusRegistroDocentes.Descripcion}
                        </TableCell>
                        <TableCell>
                          {data.EstatusRegistroDocentes != null &&
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
                        <TableCell>Evaluación de seminario</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Evaluación docente</TableCell>
                        <TableCell>
                          {data.EvaluacionDocente == null
                            ? 'No ha iniciado la evaluación'
                            : data.EvaluacionDocente.Estatus.Nombre}
                        </TableCell>
                        <TableCell>
                          {data.EvaluacionDocente != null &&
                          [1, 3].includes(data.EvaluacionDocente.Estatus.Id) ? (
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
                          {data.EstatusAsignacionCalificacion != null &&
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
              <Grid item xs={12}>
                <h4>Docentes de la asignatura</h4>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '5px',
                    minHeight: '200px',
                  }}
                >
                  {data.EstatusAsignacionCalificacion.Id === 3 ? (
                    <MessageGenerarConstnaciasPersonal idMOA={idMOA} />
                  ) : (
                    ''
                  )}
                  <TableProfessors professsors={data.Docentes} />
                </Box>
              </Grid>
              <Grid item>
                <h1>Estudiantes del curso</h1>
              </Grid>

              <Grid item xs={12}>
                <h4>Inscritos/Pendientes de inscribirse</h4>
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
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <h4>
                  En proceso de aprobación de Director/a de tesis de alta o baja
                </h4>

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
                <h4>Bajas</h4>
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
