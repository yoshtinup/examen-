import EcosurSelect from "@modules/seminarios_investigacion/submodules/servicios_escolares/components/Select";
import { TableEstudiantesPendientes } from "./components/tableSeminarios/estudiantesPendientes";
import { Box, Card, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { EcosurTabs } from "ecosur-ui";
import React from "react";
import { TableEstudiantesInscritos } from "./components/tableSeminarios/estudiantesInscritos";
import { TableEstudiantesCancelados } from "./components/tableSeminarios/estudiantesCancelados";

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
        description: 'Lista de todos los estudiantes que se estan en proceso de inscripción.',
        componente: <TableEstudiantesPendientes />,
      },
      {
        titulo: 'Inscritos',
        description: '',
        componente: <TableEstudiantesInscritos />,
      
      },
      {
        titulo: 'Inscripciones canceladas',
        description: 'Lista de estudiantes que tienen periodos de inscripción cancelados',
        componente: <TableEstudiantesCancelados />,
      }    
    ]
  
    return (
      <>
        <Card key={`ecosur-lista-seminarios`} sx={{ border: 'none', boxShadow: 'none' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Grid container sx={{ display: 'flex', bgcolor: 'background.paper', mb: 2, p: 2 }}>
              <Box sx={{ width: 1,backgroundColor: '#ECECEC' }}>
                <EcosurTabs data={tablasSeminarios} align='left' key='ecosur-tabs-seminarios' color="white" activeColor="white" activeTextColor="black"/>        
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