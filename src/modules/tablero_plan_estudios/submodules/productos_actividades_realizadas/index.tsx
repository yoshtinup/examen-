import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GraficaProductosActividadesRealizadas from './grafica-productos-actividades-realizadas';
import TabsProductosActividadesRealizadas from './tabs-productos-actividades-realizadas';

const ProductosActividadesRealizadas = () => {
  return (
    <>
      <Typography variant="h6" color="initial">
        PRODUCTOS Y ACTIVIDADES REALIZADAS
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <GraficaProductosActividadesRealizadas />
        </Grid>
        <Grid item xs={8}>
          <TabsProductosActividadesRealizadas />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductosActividadesRealizadas;
