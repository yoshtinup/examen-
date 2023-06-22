import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import { DatosActividad, DatosCongreso } from '@modules/seminarios_investigacion/submodules/estudiante/types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import Swal from 'sweetalert2';

const ButtonRedirect: React.FC<{ matricula: number, id: number }> = ({ matricula, id }) => {
  const router = useRouter();
  const [actividadesList, setActividadesList] = useRecoilState(actState)
  const setActividadState = useSetRecoilState(actState);
  const handleClickRow = () => {
    
    Swal.fire({
      title: '¿Deseas eliminar este congreso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(id!== 0){
        setActividadState( actividadState => ({
          ...actividadState,
          congresosEliminados: [
            ...actividadState.congresosEliminados, id
          ]
        }))
      }
      if (result.isConfirmed) {
        setActividadesList((prev) => ({
          ...prev,
          datosCongreso: prev.datosCongreso.filter(dato => dato.key !== matricula),
        }))
        Swal.fire(
          '¡Eliminado!',
          '',
          'success'
        )
      }
    })
    
  };
  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      startIcon={<AccountBoxIcon />}
      onClick={handleClickRow}
    >
      Eliminar
    </Button>
  );
};

const columnsDefault: GridColDef[] = [
  { field: 'actividad', headerName: 'Actividad', width: 250 },
  { field: 'meses[0]', headerName: 'Mes 1', width: 250 },
  { field: 'meses[1]', headerName: 'Mes 2', width: 92 },
  { field: 'meses[2]', headerName: 'Mes 3', width: 250 },
  { field: 'meses[3]', headerName: 'Mes 4', width: 250 },
  { field: 'meses[4]', headerName: 'Mes 5', width: 250 },
  { field: 'meses[5]', headerName: 'Mes 6', width: 250 },
];

const Table: React.FC<{ rows: DatosActividad[]; actionColumn?: boolean }> = ({
  rows,
  actionColumn = false,
}) => {
  const columns = [...columnsDefault];
  if (actionColumn) {
    columns.push({
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <ButtonRedirect matricula={params.row.key} id={params.row.id} />
      ),
      width: 150,
    });
  }
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        className="datagrid"
        getRowId={row => row.key}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight={true}
        pageSize={30}
      />
    </div>
  );
};
export default Table;
