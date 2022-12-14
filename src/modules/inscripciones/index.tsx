import EcosurSelect from "@modules/seminarios_investigacion/submodules/servicios_escolares/components/Select";
import { TableEstudiantesPendientes } from "./components/tableSeminarios/estudiantesPendientes";
import { Box, Card, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { EcosurTabs } from "ecosur-ui";
import React from "react";

export const ListaInscripciones = ({  }) => {
    const currentYear = new Date().getFullYear();
    const [anio, setAnio] = React.useState(`${currentYear}`);
    const [unidad, setUnidad] = React.useState<string>('');
    const [programa, setPrograma] = React.useState<string>('');
    const handleChangeFiltro = (event: SelectChangeEvent) => {
      setAnio(event.target.value as string);
    };
    const tablasSeminarios = [
      {
        titulo: 'Pendiente de inscribirse',
        description: 'Lista de todos los estudiantes que se estan en proeso de inscripción.',
        componente: <TableEstudiantesPendientes />,
      },
      {
        titulo: 'Inscritos',
        description: 'Lista de todos los seminarios que se encuentran concluidos.',
        componente: <p>Hola</p>,
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
}; // ListaInscripciones

const InscripcionesPage: React.FC<{ }> = ({ }) => {
    return (
      <>
        <Card key={`ecosur-lista-inscripciones`} sx={{ border: 'none', boxShadow: 'none' }}>
            <ListaInscripciones />
        </Card> 
      </>       
    );
  }; // SeminariosEvaluacion
  
  export default InscripcionesPage;