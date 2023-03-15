import React, { useEffect } from 'react';
import { EcosurTabs } from 'ecosur-ui';
import { EcosurSectionTitle } from 'ecosur-ui';
import EcosurSelect from './components/Select';
import { TableSeminariosEnProceso } from './components/tableSeminarios';
import { TableSeminariosConcluidos } from './components/tableSeminarios';
import { Box, Card, Typography, Grid, Container, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import HeaderSection from '../../../../shared/components/HeaderSection';

export const ListaSeminarios = ({  }) => {
  const currentYear = new Date().getFullYear();
  const [anio, setAnio] = React.useState(`${currentYear}`);
  const handleChangeFiltro = (event: SelectChangeEvent) => {
    setAnio(event.target.value as string);
  };
  const tablasSeminarios = [
    {
      titulo: 'En proceso',
      description: 'Lista de todos los seminarios que se encuentran en proceso de evaluación.',
      componente: <TableSeminariosEnProceso anio={Number(anio)} />,
    },
    {
      titulo: 'Calificados y firmados',
      description: 'Lista de todos los seminarios que se encuentran concluidos.',
      componente: <TableSeminariosConcluidos anio={Number(anio)} />,
    }    
  ]

  return (
    <>
      <Card key={`ecosur-lista-seminarios`} sx={{ border: 'none', boxShadow: 'none' }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
          <Grid container sx={{ display: 'flex', bgcolor: 'background.paper', mb: 2, p: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', pb: 3 }}>
              Instrucciones
            </Typography>
            <Typography variant='body2' sx={{ pb: 3 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus commodi reiciendis quae. Ab non, exercitationem officiis earum tempore placeat iure distinctio iste ipsum reprehenderit quae delectus, ea rerum nostrum atque?
            </Typography>  
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', pr: 2 }}>
              <Grid item sx={{ pr: 2 }}>
                Filtrar por: 
              </Grid>  
              <EcosurSelect label='Año' value={anio} handleChange={handleChangeFiltro} />
            </Grid>        
            <Box sx={{ width: 1 }}>
              <EcosurTabs data={tablasSeminarios} align='left' key='ecosur-tabs-seminarios' />        
            </Box>   
          </Grid>                             
        </Grid>
      </Card>
    </>       
  );
}; // ListaSeminarios

const SeminariosEvaluacion: React.FC<{ }> = ({ }) => {
  return (
    <>
      <Card key={`ecosur-lista-seminarios`} sx={{ border: 'none', boxShadow: 'none' }}>
        <ListaSeminarios /> 
      </Card> 
    </>       
  );
}; // SeminariosEvaluacion

export default SeminariosEvaluacion;