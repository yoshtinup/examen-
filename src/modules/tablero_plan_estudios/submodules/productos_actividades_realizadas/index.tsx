import Grid from '@mui/material/Grid';
import GraficaProductosActividadesRealizadas from './grafica-productos-actividades-realizadas';
import TabsProductosActividadesRealizadas from './tabs-productos-actividades-realizadas';
import { Alert, CircularProgress } from '@mui/material';
import { useGetProductosActividadesRealizadas } from './query';
import {
  IListProductosActividadesRealizadas,
  IProductoActividadRealizada,
} from './IProductosActividadRealizada';
import { HeaderSection } from '@shared/components';

const ProductosActividadesRealizadas = ({
  matricula,
}: {
  matricula: number;
}) => {
  const { data, error, isLoading } =
    useGetProductosActividadesRealizadas(matricula);

  if (error)
    return <Alert severity="error">No se pudo obtener los datos</Alert>;
  if (isLoading) return <CircularProgress />;

  const publicaciones: IProductoActividadRealizada[] = data
    .flatMap(item => item.db12_Seminarios_Evaluaciones_Array.publicaciones)
    .map((publicacion, index) => ({
      ...publicacion,
      id: index + 1,
    }));
  const cursos: IProductoActividadRealizada[] = data
    .flatMap(item => item.db12_Seminarios_Evaluaciones_Array.cursos)
    .map((publicacion, index) => ({
      ...publicacion,
      id: index + 1,
    }));
  const estancias: IProductoActividadRealizada[] = data
    .flatMap(item => item.db12_Seminarios_Evaluaciones_Array.estancias)
    .map((publicacion, index) => ({
      ...publicacion,
      id: index + 1,
    }));
  const congresos: IProductoActividadRealizada[] = data
    .flatMap(item => item.db12_Seminarios_Evaluaciones_Array.congresos)
    .map((publicacion, index) => ({
      ...publicacion,
      id: index + 1,
    }));

  const listData: IListProductosActividadesRealizadas = {
    publicaciones,
    cursos,
    estancias,
    congresos,
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <HeaderSection label="PRODUCTOS Y ACTIVIDADES REALIZADAS" shadow={false} />
      </Grid>
      <Grid item xs={5}>
        <GraficaProductosActividadesRealizadas data={listData} />
      </Grid>
      <Grid item xs={7}>
        <TabsProductosActividadesRealizadas data={listData} />
      </Grid>
    </Grid>
  );
};

export default ProductosActividadesRealizadas;
