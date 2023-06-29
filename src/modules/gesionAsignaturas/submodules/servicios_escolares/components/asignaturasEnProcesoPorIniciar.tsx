import { Grid } from "@mui/material";
import { useGetListaAsignaturasProcesoIniciar } from "@shared/queries/listaAsignaturas";
import TablaAsignaturas from "./tablaAsignaturas";

const AsignaturasEnProcesoPorIniciar = () => {
  const { isLoading, isError, data } = useGetListaAsignaturasProcesoIniciar();
  return (
    <>
      <Grid container spacing={2} style={{padding:"50px"}}>
        { isLoading ? (
          <>Cargando</>
        ) : (
          isError ? (
            <>Error</>
          ) : (
            <TablaAsignaturas asignaturas={data.Asignaturas} />
          )
        )}
      </Grid>
    </>
  );
}

export default AsignaturasEnProcesoPorIniciar;
