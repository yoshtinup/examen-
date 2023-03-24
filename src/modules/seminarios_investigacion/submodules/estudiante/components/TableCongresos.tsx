import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { DatosCongreso } from '@modules/seminarios_investigacion/submodules/estudiante/types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import Swal from 'sweetalert2';



const ButtonRedirect: React.FC<{ matricula: number, id: number }> = ({ matricula, id }) => {
  const router = useRouter();
  const [actividadesList, setActividadesList] = useRecoilState(actState)
  const setActividadState = useSetRecoilState(actState);


  const handleClickRow = () => {
    /* router.push(`/consejo_tutelar/${matricula}`); */
    
    Swal.fire({
      title: '¿Deseas eliminar este congreso?',
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
          'Eliminado!',
          'Congreso Eliminado Localmente.',
          'success'
        )
      }
    })
    console.log("Eliminar congreso", matricula)
    console.log("El id es", id)
    // console.log("estadoTabla", actividadesList.datosCongreso)
    // let datosCongresoN = actividadesList.datosCongreso.filter(num => num.key !== matricula);
    // console.log(datosCongresoN); 
    
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
  { field: 'titulo', headerName: 'Título', width: 250 },
  {
    field: 'tipoParticipacion',
    headerName: 'Tipo de participación',
    width: 250,
  },
  { field: 'lugar', headerName: 'Lugar', width: 92 },
  { field: 'fecha', headerName: 'Fecha', width: 250 },
];

const Table: React.FC<{ rows: DatosCongreso[]; actionColumn?: boolean }> = ({
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
  // console.log("rows")
  // console.log(rows)
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        // key={row.}
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
