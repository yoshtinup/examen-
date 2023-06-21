import { Grid } from "@mui/material";
import { useGetListaAsignaturasProcesoIniciar } from "@shared/queries/listaAsignaturas";
import TablaAsignaturas from "./tablaAsignaturas";

const AsignaturasEnProcesoPorIniciar = () => {
  const { isLoading, isError, data } = useGetListaAsignaturasProcesoIniciar();
  return (
    <>
      <Grid container spacing={2} style={{padding:"10px 50px 0"}}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Grid>
      </Grid>
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
