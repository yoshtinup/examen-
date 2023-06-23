import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DataGrid,
  GridToolbar,
  GridCellParams,
  GridColDef,
} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CustomPagination from './CustomPagination';
import StatusIcon from '../EtatusIcon';
import {
  AlumnoItemProps,
  EvaluadorItemProps,
} from '../../__generated__/globalTypes';
import { useRecoilState } from 'recoil';
import { alumnosAtom } from '../../store/slices/alumnos';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { Cancel, CheckBoxOutlineBlankRounded, Task } from '@mui/icons-material';

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

/**
 * Genera los chips para cada evaluador con su icono de estatus
 * @param {EvaluadorItemProps} evaluadores
 */
const generateEvaluadores = (evaluadores: EvaluadorItemProps[]) =>
  evaluadores?.map((evaluador: EvaluadorItemProps) => (
    <Chip
      key={`${uuidv4()}`}
      icon={<StatusIcon status={evaluador.estatus} />}
      label={evaluador.nombre.slice(0, 10)}
    />
  ));

/**
 * Boton para redirigir a ptra paguina
 * @param
 * @returns
 */
const ButtonRedirect: React.FC<{ matricula: number }> = ({ matricula }) => {
  const router = useRouter();
  const handleClickRow = () => {
    router.push(`/cei/${matricula}`);
    //navigate(`/evaluacionprotocolos/comite/detalles/${matricula}`);
  };
  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      startIcon={<AccountBoxIcon />}
      onClick={handleClickRow}
    >
      Visualizar
    </Button>
  );
};

// Define rows and columns
const columns: GridColDef[] = [
  {
    field: 'matricula',
    headerName: 'Matricula',
    type: 'number',
    minWidth: 100,
  },
  { field: 'nombre', headerName: 'Nombre', type: 'string', minWidth: 200 },
  {
    field: 'fechaEnvio',
    headerName: 'Fecha de Envio',
    type: 'date',
    minWidth: 124,
  },
  { field: 'unidad', headerName: 'Unidad', type: 'string', minWidth: 110 },
  {
    field: 'orientacion',
    headerName: 'Orientación',
    type: 'string',
    minWidth: 110,
  },
  { field: 'estatus', headerName: 'Estatus', type: 'string', minWidth: 150 },
  {
    field: 'evaluadores',
    headerName: 'Evaluadores',
    width: 280,
    sortable: false,
    renderCell: (params: GridCellParams) => {
      return <>{generateEvaluadores(params.row.evaluadores)}</>;
    },
  },
  {
    field: 'carta',
    headerName: 'Carta aceptación',
    width: 140,
    sortable: true,
    minWidth: 110,
    align: 'center',
    renderCell: (params: GridCellParams) => {
      return params.row.carta ? (
        <IconButton
          color="success"
          aria-label="delete"
          href={params.row.carta}
          target="_blank"
        >
          <Task />
        </IconButton>
      ) : (
        <Cancel />
      );
    },
  },
  {
    field: 'Acciones',
    headerName: 'Acciones',
    width: 140,
    sortable: false,
    renderCell: (params: GridCellParams) => {
      return <ButtonRedirect matricula={params.row.matricula} />;
    },
  },
];

type Props = {
  history: boolean;
};

/**
 * Generar Tabla de todos los alumnos con propuestas actuales o historicas
 * @param
 * @returns
 */
const InformationTable: React.FC<Props> = ({ history }) => {
  // Obtener coleccion de propuestas actuales o historicas
  // const [items, setItems] = React.useState()
  // React.useEffect(())
  const [alumnosState] = useRecoilState(alumnosAtom);
  let items: AlumnoItemProps[];
  if (history) {
    items = alumnosState.history;
  } else {
    items = alumnosState.current;
  }

  // const CP: React.FC = () => ( <CustomPagination history={history} /> )
  if (items.length < 1) {
    return (
      <>
        <Alert severity="info">
          <AlertTitle>Comite de ética</AlertTitle>
          <h4>Usted no cuenta con propuestas en este apartado</h4>
        </Alert>
      </>
    );
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={items}
        autoHeight={true}
        paginationMode="server"
        hideFooter={true}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <CustomPagination history={history} />
      </Box>
    </>
  );
};

export default InformationTable;
