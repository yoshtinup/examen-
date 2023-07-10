import { Grid } from '@mui/material';
import { useGetListaAsignaturasProcesoIniciar } from '@shared/queries/listaAsignaturas';
import TablaAsignaturas from './tablaAsignaturas';
import { AsignaturaGql } from '@shared/types/listaAsignaturas';

const AsignaturasPorIniciar = () => {
  const { isLoading, isError, data } = useGetListaAsignaturasProcesoIniciar();
  return (
    <>
      <Grid container spacing={2} style={{ padding: '20px 50px' }}>
        {isLoading ? (
          <>Cargando</>
        ) : isError ? (
          <>Error</>
        ) : (
          <TablaAsignaturas
            asignaturas={data.Asignaturas.filter(
              (item: AsignaturaGql) => Date.parse(item.Datos.FechasAsignatura.FechaInicio) > Date.now()
            ).sort(
              (a: AsignaturaGql, b: AsignaturaGql) => {
                if (
                  Date.parse(a.Datos.FechasAsignatura.FechaInicio) >
                  Date.parse(b.Datos.FechasAsignatura.FechaInicio)
                )
                  return 1;
                if (
                  Date.parse(a.Datos.FechasAsignatura.FechaInicio) <
                  Date.parse(b.Datos.FechasAsignatura.FechaInicio)
                )
                  return -1;
                return 0;
              }
            )}
          />
        )}
      </Grid>
    </>
  );
};

export default AsignaturasPorIniciar;
