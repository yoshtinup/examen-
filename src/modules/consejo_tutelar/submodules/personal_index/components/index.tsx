import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Alumno } from '@modules/consejo_tutelar/types';

const ButtonRedirect: React.FC<{ matricula: number }> = ({ matricula }) => {
  const router = useRouter();
  const handleClickRow = () => {
    router.push(`/consejo_tutelar/${matricula}`);
  };
  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      startIcon={<AccountBoxIcon />}
      onClick={handleClickRow}
    >
      Ver
    </Button>
  );
};

const columns: GridColDef[] = [
  { field: 'nombre', headerName: 'Nombre', width: 250 },
  { field: 'matricula', headerName: 'Matricula', width: 92 },
  { field: 'programa', headerName: 'Programa', width: 250 },
  { field: 'orientacion', headerName: 'Orientación', width: 250 },
  { field: 'generacion', headerName: 'Generación' },
  { field: 'leyendaEstatusGeneral', headerName: 'Estatus', width: 250 },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <ButtonRedirect matricula={params.row.matricula} />
    ),
    width: 150,
  },
];

const Table: React.FC<{ rows: Alumno[] }> = ({ rows }) => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        className="datagrid"
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
