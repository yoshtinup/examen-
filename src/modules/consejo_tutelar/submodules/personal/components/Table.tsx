import { Button, Container } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Alumno } from '@modules/consejo_tutelar/types';

const ButtonRedirect: React.FC<{ matricula: number }> = ({ matricula }) => {
  const handleClickRow = () => {
    console.log(matricula);
  };
  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      startIcon={<AccountBoxIcon />}
      onClick={handleClickRow}
    >
      Evaluar
    </Button>
  );
};

const columnsDefault: GridColDef[] = [
  { field: 'matricula', headerName: 'Matricula', width: 92 },
  { field: 'nombre', headerName: 'Nombre', width: 250 },
  { field: 'orientacion', headerName: 'Orientacion', width: 250 },
  { field: 'programa', headerName: 'Programa', width: 250 },
  { field: 'generacion', headerName: 'Generacion' },
  { field: 'leyendaEstatusGeneral', headerName: 'Estatus', width: 250 },
];

const Table: React.FC<{ rows: Alumno[]; actionColumn?: boolean }> = ({
  rows,
  actionColumn = false,
}) => {
  const columns = [...columnsDefault];
  if (actionColumn) {
    columns.push({
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <ButtonRedirect matricula={params.row.matricula} />
      ),
      width: 150,
    });
  }
  return (
      <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          /* checkboxSelection */
          getRowId={row => row.matricula}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          autoHeight={true}
          /* hideFooter={true} */
          pageSize={30}
        />
      </div>
  );
};
export default Table;
