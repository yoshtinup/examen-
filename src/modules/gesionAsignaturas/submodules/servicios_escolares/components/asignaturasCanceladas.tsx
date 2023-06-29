import { Grid } from "@mui/material";
import { useGetListaAsignaturasCanceladas } from "@shared/queries/listaAsignaturas";
import TablaAsignaturas from "./tablaAsignaturas";

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
            <TablaAsignaturas asignaturas={data.Asignaturas} />
          )
        )}
      </Grid>
    </>
  );
}

export default AsignaturasCanceladas;
