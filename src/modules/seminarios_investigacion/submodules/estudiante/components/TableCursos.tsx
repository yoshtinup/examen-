import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import { DatosCursosExterno } from '@modules/seminarios_investigacion/submodules/estudiante/types';
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import Swal from 'sweetalert2';
import { useRecoilState, useSetRecoilState } from 'recoil';

const ButtonRedirect: React.FC<{ matricula: number, id: number }> = ({ matricula, id }) => {
  const [actividadesList, setActividadesList] = useRecoilState(actState)
  const setActividadState = useSetRecoilState(actState);

  const handleClickRow = () => {
    Swal.fire({
      title: '¿Deseas eliminar este curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(id!== 0){
        setActividadState( actividadState => ({
          ...actividadState,
          cursosExternosEliminados: [
            ...actividadState.cursosExternosEliminados, id
          ]
        }))
      }
      if (result.isConfirmed) {
        setActividadesList((prev) => ({
          ...prev,
          datosCursosExternos: prev.datosCursosExternos.filter(dato => dato.key !== matricula),
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
  { field: 'nombreCurso', headerName: 'Curso', width: 400 },
  { field: 'otraInstitucion', headerName: 'Institución', width: 400 },
  { field: 'fechaInicio', headerName: 'Fecha inicio', width: 150 },
  { field: 'fechaConclusion', headerName: 'Fecha fin', width: 150 },
];

const Table: React.FC<{
  rows: DatosCursosExterno[];
  actionColumn?: boolean;
}> = ({ rows, actionColumn = false }) => {
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
