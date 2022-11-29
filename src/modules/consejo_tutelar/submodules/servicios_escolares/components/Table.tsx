import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { EnProceso, Concluidos } from '../types';
import React from 'react';

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
      Detalles
    </Button>
  );
};

const Table: React.FC<{
  rows: EnProceso[] | Concluidos[];
  list?: any;
  actionColumn?: boolean;
}> = ({ rows, list, actionColumn = false }) => {
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  let columns: GridColDef[] = [
    {
      field: 'Alumno.Datos.Nombre',
      headerName: 'Nombre',
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.Alumno.Datos.Nombre}{' '}
          {params.row.Alumno.Datos.ApellidoPaterno}{' '}
          {params.row.Alumno.Datos.ApellidoMaterno} - {params.row.Matricula}
        </>
      ),
      width: 250,
    },
    {
      field: 'Alumno.Programa.Value',
      headerName: 'Programa',
      renderCell: (params: GridCellParams) => (
        <>{params.row.Alumno.Programa.Value}</>
      ),
      width: 450,
    },
    {
      field: 'Alumno.Unidad.Value',
      headerName: 'Unidad',
      renderCell: (params: GridCellParams) => (
        <>{params.row.Alumno.Unidad.Value}</>
      ),
      width: 150,
    },
    {
      field: 'Alumno.AnioDeEstudios.Value',
      headerName: 'Años de estudio',
      renderCell: (params: GridCellParams) => (
        <>{params.row.Alumno.AnioDeEstudios.Value}</>
      ),
      width: 150,
    },
    {
      field: 'Estatus.Value',
      headerName: 'Estatus',
      renderCell: (params: GridCellParams) => <>{params.row.Estatus.Value}</>,
      width: 300,
    },
    {
      field: 'Num_ronda',
      headerName: 'Número de ronda',
      width: 150,
    },
  ];  

  if (actionColumn) {
    columns.push({
      field: 'action',
      headerName: 'Opciones',
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <ButtonRedirect matricula={params.row.Matricula} />
      ),
      width: 150,
    });
  }

  const check = rows?.filter(data => data?.Num_ronda);

  if (check?.length === 0) {
    columns.forEach((data: GridColDef, index: number) => {
      if (data.field === 'Num_ronda') columns = columns.slice(0, index);
    });
  }

  return (
    <div style={{ width: '100%' }}>
      <Button
        sx={{ mb: 2 }}
        onClick={() => setCheckboxSelection(!checkboxSelection)}
      >
        Toggle checkbox selection
      </Button>
      <div style={{ height: 400 }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick
          onSelectionModelChange={newSelectionModel => {
            setSelectionModel(newSelectionModel);
            list(newSelectionModel);
          }}
          selectionModel={selectionModel}
          className="datagrid"
          getRowId={row => row.IDConformacion}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          autoHeight={true}
          pageSize={30}
        />
      </div>
    </div>
  );
};
export default Table;
