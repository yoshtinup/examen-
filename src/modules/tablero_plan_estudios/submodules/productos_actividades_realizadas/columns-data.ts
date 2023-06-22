import { GridColDef } from '@mui/x-data-grid';

const basicColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 500,
  },
];

export const columnsPublicaciones: GridColDef[] = [
  ...basicColumns,
  {
    field: 'annio',
    headerName: 'Año',
    width: 70,
  },
  {
    field: 'publicadoen',
    headerName: 'Publicado en',
    width: 250,
  },
  {
    field: 'tipoparticipacion',
    headerName: 'Tipo de participación',
    width: 90,
  },
  {
    field: 'tipoarbitrado',
    headerName: 'Tipo arbitraje',
    width: 140,
  },
];

export const columnCursos: GridColDef[] = [
  ...basicColumns,
  {
    field: 'fechainicio',
    headerName: 'Fecha inicio',
    width: 120,
  },
  {
    field: 'fechaconclusion',
    headerName: 'Fecha conclusión',
    width: 120,
  },
  {
    field: 'institucion',
    headerName: 'Institución',
    width: 350,
  },
];

export const columnEstancias: GridColDef[] = [
  ...basicColumns,
  {
    field: 'area',
    headerName: 'Área',
    width: 200,
  },
  {
    field: 'ambito',
    headerName: 'Ämbito',
    width: 140,
  },
  {
    field: 'fechainicio',
    headerName: 'Fecha inicio',
    width: 120,
  },
  {
    field: 'fechaconclusion',
    headerName: 'Fecha conclusión',
    width: 120,
  },
];

export const columnCongresos: GridColDef[] = [
  ...basicColumns,
  {
    field: 'tipoparticipacion',
    headerName: 'Tipo participación',
    width: 140,
  },
  {
    field: 'lugar',
    headerName: 'Modalidad',
    width: 150,
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 120,
  },
];
