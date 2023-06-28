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
import { useGetInformacionCompletaAsignatura } from '../../queries/index';
import { format } from 'date-fns';
// import TableStudents from './components/tableStuents';
import {
  TableEstudiantesPrograma,
  TableEstudiantesProgramaWithoutFetch,
} from '@modules/estudiantes/components/tableSeminarios/programa/tablaEstudiantePrograma';

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

  if (isSuccess) {
    return (
      <Container maxWidth={false} style={{ ...style }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <h2>{data.Asignatura.Datos.Nombre.Valor}</h2>
            </Typography>
          </Grid>
          <Grid item xs={12} spacing={3}>
            <Grid container spacing={4}>
              <Grid item md={8} xs={12}>
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
                        <strong>Fecha de inicio:</strong>{' '}
                        {format(
                          new Date(data.Datos.Fechas.FechaInicioAsignatura),
                          'dd/MM/yyyy'
                        )}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Fecha de finalizacion:</strong>{' '}
                        {format(
                          new Date(data.Datos.Fechas.FechaFinAsignatura),
                          'dd/MM/yyyy'
                        )}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Cuatrimestre:</strong>{' '}
                        {data.Datos.Periodo.Nombre}
                      </p>
                    </div>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
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
                            .IdcatalogoEstatusRegistroDocentesPorcentajes == 2
                            ? 'Enviar recordatorio'
                            : ''}
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
                          [1, 3].includes(data.EvaluacionDocente.Estatus.Id)
                            ? 'Enviar notificación'
                            : ''}
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
                          [1, 2].includes(data.EstatusAsignacionCalificacion.Id)
                            ? 'Enviar notificación'
                            : ''}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
              <Grid item md={12}>
                <h4>Profesores del curso</h4>
                <Box sx={{ backgroundColor: '#f5f5f5', padding: '5px' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Tipo de participación</TableCell>
                        <TableCell>Institución</TableCell>
                        <TableCell>Porcentaje de participación</TableCell>
                        <TableCell>Acta de participación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
              <Grid item md={12}>
                <h4>Estudiantes del curso</h4>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '5px',
                    height: '400px',
                  }}
                >
                  <TableEstudiantesProgramaWithoutFetch
                    estudiantes={data.Alumnos.Listado}
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
