import { Grid } from "@mui/material";
import { useGetListaAsignaturasConcluidas } from "@shared/queries/listaAsignaturas";
import TablaAsignaturas from "./tablaAsignaturas";

const AsignaturasConcluidas = () => {
  const { isLoading, isError, data } = useGetListaAsignaturasConcluidas();
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

export default AsignaturasConcluidas;
