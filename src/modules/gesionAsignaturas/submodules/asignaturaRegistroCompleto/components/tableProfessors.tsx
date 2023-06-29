import {
  CustomFooter,
  CustomNoRowsOverlay,
  CustomToolbar,
} from '@modules/estudiantes/components/tableSeminarios';
import ModalDatosParticipante from '@modules/estudiantes/components/tableSeminarios/programa/modalDatosParticipante';

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
  let rows: ProfessorRow[] = professsors.map((proffesor: Professor) => {
    const {
      Nombre,
      TipoDeParticipacion,
      PorcentajeParticipacion,
      ConstanciaDeParticipacionDocente,
      IdProfesores,
    } = proffesor;

    const enlaces = (
      <>
        {TipoDeParticipacion.IdParticipacion === 13 ? (
          <ModalDatosParticipante idParticipante={IdProfesores} />
        ) : (
          ''
        )}
        {ConstanciaDeParticipacionDocente != null ? (
          <Button
            href={ConstanciaDeParticipacionDocente}
            target="_blank"
            variant="outlined"
          >
            Constancia
          </Button>
        ) : (
          ''
        )}
      </>
    );

    return {
      nombre: `${Nombre.Nombre_s_} ${Nombre.ApellidoPaterno}`,
      id: Nombre.Email,
      tipo_participacion: TipoDeParticipacion.Value,
      unidad: Nombre.Unidad.Value,
      porcentaje_participacion:
        TipoDeParticipacion.IdParticipacion === 13
          ? 'N/A'
          : PorcentajeParticipacion,
      enlaces,
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
