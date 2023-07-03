import {
  CustomFooter,
  CustomToolbar,
} from '@modules/estudiantes/components/tableSeminarios';
import ModalDatosParticipante from '@modules/gesionAsignaturas/submodules/asignaturaRegistroCompleto/components/modalDatosParticipante';
import { Professor } from '@modules/gesionAsignaturas/types/Professor';
import { ProfessorRow } from '@modules/gesionAsignaturas/types/ProfessorRow';

import { Badge, Button, ButtonGroup, Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const TableProfessors: React.FC<{
  professsors: [];
  idMOA: number;
}> = ({ professsors, idMOA }) => {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 250,
    },
    { field: 'email', headerName: 'Correo', width: 200 },
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
      minWidth: 400,
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
      TieneEvaluacionDocente,
    } = proffesor;

    const enlaces = (
      <>
        {TipoDeParticipacion.IdParticipacion === 13 ? (
          <ModalDatosParticipante idParticipante={IdProfesores} />
        ) : (
          ''
        )}
        {ConstanciaDeParticipacionDocente !== null ? (
          <Chip
            href={ConstanciaDeParticipacionDocente}
            target="_blank"
            label="Constancia"
            component="a"
            clickable
            size="small"
            variant="outlined"
            color="info"
          ></Chip>
        ) : (
          ''
        )}
        {TieneEvaluacionDocente !== null ? (
          <Chip
            href={
              'https://serviciosposgrado.ecosur.mx/Profesores/evaluaciondocente/profesor/descargarEvaluacionPDF?id=' +
              idMOA +
              '&idProfesor=' +
              IdProfesores
            }
            target="_blank"
            label="Acta de evaluación docente"
            component="a"
            clickable
            size="small"
            variant="outlined"
            color="info"
          ></Chip>
        ) : (
          ''
        )}
      </>
    );

    return {
      id: IdProfesores,
      nombre: `${Nombre.Nombre_s_} ${Nombre.ApellidoPaterno}`,
      email: Nombre.Email,
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
      <DataGrid
        sx={{ pb: 7 }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
        }}
        componentsProps={{
          footer: { counter: rows.length, label: 'Profesores:' },
        }}
        onSelectionModelChange={ids => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter(row => selectedIDs.has(row.email));
          setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
};

export default TableProfessors;
