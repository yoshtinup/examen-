import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  AsignaturaGql,
  FechasAsignaturaGql,
} from '@shared/types/listaAsignaturas';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id Materia' },
  { field: 'nombre', headerName: 'Nombre', width: 500 },
  { field: 'periodo', headerName: 'Periodo lectivo', width: 180 },
  { field: 'fechas', headerName: 'Fechas de impartición', width: 220 },
  { field: 'unidad', headerName: 'Unidad', width: 150 },
  { field: 'programa', headerName: 'Programa', width: 250 },
  {
    field: 'opciones',
    headerName: 'Opciones',
    sortable: false,
    width: 130,
    renderCell: params => {
      return (
        <Button
          href={'/gestionAsignaturas/' + params.id}
          target='_blank'
          variant="contained"
          size="small"
        >
          Ver
        </Button>
      );
    },
  },
];

const TablaAsignaturas = (props: any) => {
  const asignaturas: AsignaturaGql[] = props.asignaturas;
  const { Unidades, Programas, Periodos } = filtros(asignaturas);
  const [rows, setRows] = useState(getRows(asignaturas));
  const [unidad, setUnidad] = useState(0);
  const [programa, setPrograma] = useState(0);
  const [periodo, setPeriodo] = useState(0);
  const newPrograma = (newValue: number) => {
    setPeriodo(0);
    setPrograma(newValue);
  };
  useEffect(() => {
    setRows(getRows(asignaturas, unidad, programa, periodo));
  }, [unidad, programa, periodo]);

  return (
    <Grid item xs={12}>
      <h3>Filtros</h3>
      <Box style={{ marginBottom: '30px' }}>
        <CrearSelect
          nombre="unidades"
          data={unidad}
          setData={setUnidad}
          opciones={Unidades}
        />
        <CrearSelect
          nombre="programas"
          data={programa}
          setData={newPrograma}
          opciones={Programas}
        />
        {programa > 0 && (
          <CrearSelect
            nombre="periodos"
            data={periodo}
            setData={setPeriodo}
            opciones={Periodos[programa]}
          />
        )}
      </Box>

      <Box sx={{ height: 900, width: '100%' }} id="tabla-gestion-asignaturas">
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          componentsProps={{
            footer: { counter: rows.length, label: 'Asignaturas:' },
          }}
        />
      </Box>
    </Grid>
  );
};

function CrearSelect({
  nombre,
  data,
  setData,
  opciones,
}: {
  nombre: string;
  data: number;
  setData: any;
  opciones: any;
}) {
  const nameFirstUpper = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  return (
    <FormControl style={{ width: '25%', margin: '0 4%' }}>
      <InputLabel id={'asignaturas-' + nombre + '-select-label'}>
        {nameFirstUpper}
      </InputLabel>
      <Select
        labelId={'asignaturas-' + nombre + '-select-label'}
        id={'asignaturas-' + nombre + '-select'}
        value={data.toString()}
        label={nameFirstUpper}
        onChange={(event: SelectChangeEvent) => {
          setData(parseInt(event.target.value));
        }}
      >
        {opciones.items.map((unidad: any, i: number) => (
          <MenuItem key={i} value={unidad.value}>
            {unidad.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function getRows(
  listaAsignaturas: AsignaturaGql[],
  unidad = 0,
  programa = 0,
  periodo = 0
) {
  let rows = [];
  listaAsignaturas.forEach(asignatura => {
    const contieneUnidad: boolean =
      unidad > 0 ? asignatura.Unidad.Id == unidad : true;
    const contienePrograma: boolean =
      programa > 0 ? asignatura.Asignatura.Datos.Programa.Id == programa : true;
    const contienePeriodo: boolean =
      periodo > 0 ? asignatura.Datos.Periodo.Id == periodo : true;
    if (contieneUnidad && contienePrograma && contienePeriodo) {
      rows.push({
        id: asignatura.IdMateriasOfertaAnual,
        nombre: asignatura.Asignatura.Datos.Nombre.valor,
        fechas: formatoFecha(asignatura.Datos.FechasAsignatura),
        unidad: asignatura.Unidad.Nombre,
        programa: asignatura.Asignatura.Datos.Programa.Nombre,
        periodo: asignatura.Datos.Periodo.Nombre,
      });
    }
  });
  return rows;
}

function filtros(listaAsignaturas: AsignaturaGql[]) {
  let Unidades = {
    ids: [0],
    items: [{ value: 0, label: 'Todas las unidades' }],
  };
  let Programas = {
    ids: [0],
    items: [{ value: 0, label: 'Todos los programas' }],
  };
  let Periodos = [
    { ids: [0], items: [{ value: 0, label: 'Todos los periodos' }] },
  ];
  listaAsignaturas.forEach(asignatura => {
    if (!Unidades.ids.includes(asignatura.Unidad.Id)) {
      Unidades.ids.push(asignatura.Unidad.Id);
      Unidades.items.push({
        value: asignatura.Unidad.Id,
        label: asignatura.Unidad.Nombre,
      });
    }
    if (!Programas.ids.includes(asignatura.Asignatura.Datos.Programa.Id)) {
      Programas.ids.push(asignatura.Asignatura.Datos.Programa.Id);
      Programas.items.push({
        value: asignatura.Asignatura.Datos.Programa.Id,
        label: asignatura.Asignatura.Datos.Programa.Nombre,
      });
    }
    if (!Periodos[asignatura.Asignatura.Datos.Programa.Id]) {
      Periodos[asignatura.Asignatura.Datos.Programa.Id] = {
        ids: [0],
        items: [{ value: 0, label: 'Todos los periodos' }],
      };
    }
    if (
      !Periodos[asignatura.Asignatura.Datos.Programa.Id].ids.includes(
        asignatura.Datos.Periodo.Id
      )
    ) {
      Periodos[asignatura.Asignatura.Datos.Programa.Id].ids.push(
        asignatura.Datos.Periodo.Id
      );
      Periodos[asignatura.Asignatura.Datos.Programa.Id].items.push({
        value: asignatura.Datos.Periodo.Id,
        label: asignatura.Datos.Periodo.Nombre,
      });
    }
  });
  return { Unidades, Programas, Periodos };
}

function formatoFecha(fechas: FechasAsignaturaGql) {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const fechaIni = new Date(Date.parse(fechas.FechaInicio));
  const fechaFin = new Date(Date.parse(fechas.FechaFin));
  return (
    fechaIni.getDate() +
    ' de ' +
    meses[fechaIni.getMonth()] +
    ' del ' +
    fechaIni.getFullYear() +
    ' al ' +
    fechaFin.getDate() +
    ' de ' +
    meses[fechaFin.getMonth()] +
    ' del ' +
    fechaFin.getFullYear()
  );
}

export default TablaAsignaturas;
