import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { DatosEstancia } from '@modules/seminarios_investigacion/submodules/estudiante/types';
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import Swal from 'sweetalert2';
import { useRecoilState, useSetRecoilState } from 'recoil';

const ButtonRedirect: React.FC<{ matricula: number, id: number }> = ({ matricula, id }) => {
  const router = useRouter();
  const [actividadesList, setActividadesList] = useRecoilState(actState)
  const setActividadState = useSetRecoilState(actState);

  const handleClickRow = () => {
    /* router.push(`/consejo_tutelar/${matricula}`); */
    Swal.fire({
      title: '¿Deseas eliminar esta publicación?',
      // text: "Confirmalo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(id!== 0){
        setActividadState( actividadState => ({
          ...actividadState,
          publicacionesEliminadas: [
            ...actividadState.publicacionesEliminadas, id
          ]
        }))
      }
      if (result.isConfirmed) {
        setActividadesList((prev) => ({
          ...prev,
          datosPublicaciones: prev.datosPublicaciones.filter(dato => dato.key !== matricula),
        }))
        Swal.fire(
          'Eliminado!',
          'Congreso Eliminado Localmente.',
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
  { field: 'titulo', headerName: 'Título', width: 350 },
  {
    field: 'tipoParticipacion',
    headerName: 'Tipo de participación',
    width: 250,
  },
  { field: 'publicacionEn', headerName: 'Publicado en', width: 200 },
  { field: 'tipoPublicacion', headerName: 'Tipo de publicación', width: 200 },
  { field: 'tipoArbitrado', headerName: 'Arbitrado', width: 100 },
];

const Table: React.FC<{ rows: DatosEstancia[]; actionColumn?: boolean }> = ({
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
        <ButtonRedirect matricula={params.row.key} id={params.row.id}/>
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
        /* hideFooter={true} */
        pageSize={30}
      />
    </div>
  );
};
export default Table;
