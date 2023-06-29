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
      describe:'',
      componente: <TableEstudiantesActivos />,
    },
    {
      titulo: 'Egresados',
      description: '',
      componente: <TableEstudiantes estatus={2} bajas={false} />,
    },
    {
      titulo: 'Graduados',
      describe:'',
      componente: <TableEstudiantes estatus={3} bajas={false} />,
    },
    {
      titulo: 'Bajas',
      describe:'',
      componente: <TableEstudiantes estatus={null} bajas={true} />,
    },
    {
      titulo: 'Prorrogas',
      describe:'',
      componente: <TableEstudiantes estatus={8} bajas={false} />,
    },
  ];
  const style = {
    padding: '30px',
    backgroundColor: '#fff',
  };
  return (
    <>
        <Card key={`ecosur-lista-seminarios`} sx={{ border: 'none', boxShadow: 'none' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Grid container sx={{ display: 'flex', bgcolor: 'background.paper', mb: 2, p: 2 }}>
              <Box sx={{ width: 1 }}>
          <EcosurTabs
            data={tablasSeguimiento}
            align="left"
            key="ecosur-tabs-seguimiento"
            activeColor="#ecf0f5"
            color='#ecf0f5'
            activeTextColor="black"
          />
       </Box>   
            </Grid>                             
          </Grid>
        </Card>
      </>  
  );
}; // ListaInscripciones
const EstudaintesPage: React.FC<{ }> = ({ }) => {
  return (
    <>
      <Card key={`ecosur-lista-inscripciones`} sx={{ border: 'none', boxShadow: 'none' }}>
          <ListaEstudiantes />
      </Card> 
    </>       
  );
};
export default EstudaintesPage;
