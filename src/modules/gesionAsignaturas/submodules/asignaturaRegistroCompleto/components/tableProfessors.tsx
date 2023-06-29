import {
  CustomFooter,
  CustomNoRowsOverlay,
  CustomToolbar,
} from '@modules/estudiantes/components/tableSeminarios';
import ModalDatosParticipante from '@modules/gesionAsignaturas/submodules/asignaturaRegistroCompleto/components/programa/modalDatosParticipante';

import { Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const TableProfessors: React.FC<{
  professsors: [];
}> = ({ professsors }) => {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 350,
    },

    { field: 'id', headerName: 'Correo', width: 200 },
    {
      field: 'tipo_participacion',
      headerName: 'Tipo de participación',
      width: 200,
    },
    {
      field: 'unidad',
      headerName: 'Unidad',
      width: 150,
    },

    {
      field: 'porcentaje_participacion',
      headerName: 'Porcentaje de participación',
      width: 150,
    },
    {
      field: 'enlaces',
      headerName: 'Enlaces',
      width: 250,
      renderCell: params => {
        return params.row.enlaces;
      },
    },
  ];
  let rows = professsors.map(proffesor => {
    return {
      nombre:
        proffesor.Nombre.Nombre_s_ + ' ' + proffesor.Nombre.ApellidoPaterno,
      id: proffesor.Nombre.Email,
      tipo_participacion: proffesor.TipoDeParticipacion.Value,
      unidad: proffesor.Nombre.Unidad.Value,
      porcentaje_participacion:
        proffesor.TipoDeParticipacion.IdParticipacion == 13
          ? 'N/A'
          : proffesor.PorcentajeParticipacion,
      enlaces: (
        <>
          {proffesor.TipoDeParticipacion.IdParticipacion == 13 ? (
            <ModalDatosParticipante idParticipante={proffesor.IdProfesores} />
          ) : (
            ''
          )}
          {proffesor.ConstanciaDeParticipacionDocente != null ? (
            <Button
              href={proffesor.ConstanciaDeParticipacionDocente}
              target="_blank"
              variant="outlined"
            >
              Constancia
            </Button>
          ) : (
            ''
          )}
        </>
      ),
    };
  });

  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          alignItems: 'center',
          bgcolor: 'white',
          pb: 1,
          pt: 1,
          pr: 5,
        }}
      ></Grid>
      <DataGrid
        sx={{ pb: 7 }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{
          footer: { counter: rows.length, label: 'Profesores:' },
        }}
        onSelectionModelChange={ids => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter(row => selectedIDs.has(row.id));
          setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
};

export default TableProfessors;
