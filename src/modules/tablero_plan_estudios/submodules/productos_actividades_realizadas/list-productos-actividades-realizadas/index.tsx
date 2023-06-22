import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IProductoActividadRealizada } from '../IProductosActividadRealizada';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';

const ListProductosActividadesRealizadas = ({
  productos,
  columns,
  alert
}: {
  productos: IProductoActividadRealizada[];
  columns: GridColDef[];
  alert: string;
}) => {
  const component =
    productos.length == 0 ? (
      <Alert variant="outlined" severity="error">
        Usted no cuenta con {alert}
      </Alert>
    ) : (
      <DataGrid
        rows={productos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{
          id: false,
        }}
      />
    );

  return <Box sx={{ background: '#ffffff', height: '400px' }}>{component}</Box>;
};

export default ListProductosActividadesRealizadas;
