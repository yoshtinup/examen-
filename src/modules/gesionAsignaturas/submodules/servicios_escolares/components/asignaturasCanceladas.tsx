import { Grid } from "@mui/material";
import { useGetListaAsignaturasCanceladas } from "@shared/queries/listaAsignaturas";
import TablaAsignaturas from "./tablaAsignaturas";
import { AsignaturaGql } from "@shared/types/listaAsignaturas";

const AsignaturasCanceladas = () => {
  const { isLoading, isError, data } = useGetListaAsignaturasCanceladas();
  return (
    <>
      <Grid container spacing={2} style={{padding:"50px"}}>
        { isLoading ? (
          <>Cargando</>
        ) : (
          isError ? (
            <>Error</>
          ) : (
            <TablaAsignaturas asignaturas={data.Asignaturas.sort((a: AsignaturaGql, b: AsignaturaGql) => {
              if (Date.parse(a.Datos.FechasAsignatura.FechaFin) > Date.parse(b.Datos.FechasAsignatura.FechaFin)) return -1;
              if (Date.parse(a.Datos.FechasAsignatura.FechaFin) < Date.parse(b.Datos.FechasAsignatura.FechaFin)) return 1;
              return 0;
            })} />
          )
        )}
      </Grid>
    </>
  );
}

export default AsignaturasCanceladas;
