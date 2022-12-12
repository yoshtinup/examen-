import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { EnProceso, Concluidos } from '../types';
import React from 'react';
import Page from './BtnAccionesSe';

const ButtonRedirect: React.FC<{ matricula: number }> = ({ matricula }) => {
  const router = useRouter();
  const handleClickRow = () => {
    router.push(`/consejo_tutelar/${matricula}`);
  };
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      // startIcon={<AccountBoxIcon />}
      onClick={handleClickRow}
    >
      Detalles
    </Button>
  );
};

const Table: React.FC<{
  rows: EnProceso[] | Concluidos[];
  list?: (id: number[]) => void;
  actionColumn?: boolean;
  customToolBar?: JSX.Element;
}> = ({ rows, list, actionColumn = false, customToolBar }) => {
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
        <>
          <Page
            info={params.row}
            otherButttons={<ButtonRedirect matricula={params.row.Matricula} />}
          />
        </>
      ),
      width: 500,
    });
  }

  const check = rows?.filter(data => data?.Num_ronda);

  if (check?.length === 0) {
    columns.forEach((data: GridColDef, index: number) => {
      if (data.field === 'Num_ronda') columns = columns.slice(0, index);
    });
  }

  const CustomToolbar = () => {
    return <GridToolbarContainer>{customToolBar}</GridToolbarContainer>;
  };

  return (
    <DataGrid
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick
      onSelectionModelChange={newSelectionModel => {
        setSelectionModel(newSelectionModel);
        const selected = newSelectionModel as number[];
        list(selected);
      }}
      selectionModel={selectionModel}
      className="datagrid"
      getRowId={row => row.IDConformacion}
      rows={rows}
      columns={columns}
      components={{
        Toolbar: CustomToolbar,
      }}
      autoHeight={true}
      pageSize={30}
    />
  );
};
export default Table;
