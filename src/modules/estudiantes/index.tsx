import EcosurSelect from '@modules/seminarios_investigacion/submodules/servicios_escolares/components/Select';
import { TableEstudiantesActivos } from './components/tableSeminarios/estudiantesActivos';
import {
  Box,
  Card,
  Container,
  Grid,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { EcosurTabs } from 'ecosur-ui';
import React from 'react';
import { TableEstudiantes } from './components/tableSeminarios/estudiantes';

export const ListaEstudiantes = ({}) => {
  const currentYear = new Date().getFullYear();
  const [anio, setAnio] = React.useState(`${currentYear}`);
  const [unidad, setUnidad] = React.useState<string>('');
  const [programa, setPrograma] = React.useState<string>('');
  const handleChangeFiltro = (event: SelectChangeEvent) => {
    setAnio(event.target.value as string);
  };
  const tablasSeguimiento = [
    {
      titulo: 'Activos',

      componente: <TableEstudiantesActivos />,
    },
    {
      titulo: 'Egresados',
      description: '',
      componente: <TableEstudiantes estatus={2} bajas={false} />,
    },
    {
      titulo: 'Graduados',

      componente: <TableEstudiantes estatus={3} bajas={false} />,
    },
    {
      titulo: 'Bajas',

      componente: <TableEstudiantes estatus={null} bajas={true} />,
    },
    {
      titulo: 'Prorrogas',
    
      componente: <TableEstudiantes estatus={8} bajas={false} />,
    },
  ];
  const style = {
    padding: '30px',
    backgroundColor: '#fff',
  };
  return (
    <Container maxWidth={false} style={{ ...style }}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <EcosurTabs
            data={tablasSeguimiento}
            align="left"
            key="ecosur-tabs-seguimiento"
            activeColor="#ecf0f5"
            color='#ecf0f5'
            activeTextColor="black"
          />
        </Grid>
      </Grid>
    </Container>
  );
}; // ListaInscripciones

export default ListaEstudiantes;
