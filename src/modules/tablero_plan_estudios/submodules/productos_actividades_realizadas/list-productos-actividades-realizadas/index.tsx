import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IProductoActividadRealizada } from '../IProductosActividadRealizada';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';

const ListProductosActividadesRealizadas = ({
  productos,
  columns,
}: {
  productos: IProductoActividadRealizada[];
  columns: GridColDef[];
}) => {
  const component =
    productos.length == 0 ? (
      <Alert variant="outlined" severity="error">
        Usted no cuenta con elementos disponibles para este apartado
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
