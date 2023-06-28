import EcosurSelect from "@modules/seminarios_investigacion/submodules/servicios_escolares/components/Select";
import { TableEstudiantesActivos } from "./components/tableSeminarios/estudiantesActivos";
import { Box, Card, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { EcosurTabs } from "ecosur-ui";
import React from "react";
import { TableEstudiantes } from "./components/tableSeminarios/estudiantes";
import { TableEstudiantesPrograma } from "./components/tableSeminarios/programa/tablaEstudiantePrograma";

export const ListaEstudiantes = ({  }) => {
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
        description: 'Instrucciones: Lista de todos los estudiantes que se estan en proceso de inscripción.',
        componente: <TableEstudiantesActivos />,
      },
      {
        titulo: 'Egresados',
        description: '',
        componente: <TableEstudiantes estatus={2} bajas={false} />,
      
      },
      {
        titulo: 'Graduados',
        description: 'Lista de estudiantes que tienen periodos de inscripción cancelados',
        componente: <TableEstudiantes estatus={3} bajas={false} />,
      },
      {
        titulo: 'Bajas',
        description: 'Lista de estudiantes que tienen periodos de inscripción cancelados',
        componente: <TableEstudiantes estatus={null} bajas={true} />,
      },
      {
        titulo: 'Prorrogas',
        description: 'Lista de estudiantes que tienen periodos de inscripción cancelados',
        componente: <TableEstudiantes estatus={8} bajas={false} />,
      }
    ]
    const tablaNewPrograma=[
      {
        titulo: 'Estudiantes del curso',
        desccription: '',
        componente: <TableEstudiantesPrograma/>
      }
    ]
  
    return (
      <>
        <Card key={`ecosur-lista-seguimiento`} sx={{ border: 'none', boxShadow: 'none' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Grid container sx={{ display: 'flex', bgcolor: 'background.paper', mb: 2, p: 2 }}>
              <Box sx={{ width: 1,backgroundColor: '#ECECEC' }}>
                <EcosurTabs data={tablasSeguimiento} align='left' key='ecosur-tabs-seguimiento' color="white" activeColor="white" activeTextColor="black"/>        
              </Box>   
            </Grid>                             
          </Grid>
        </Card>
        {/* ///pruebas  */}
        <Card key={`ecosur-lista-estudiantes-programa`} sx={{ border: 'none', boxShadow: 'none' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Grid container sx={{ display: 'flex', bgcolor: 'background.paper', mb: 2, p: 2 }}>
              <Box sx={{ width: 1,backgroundColor: 'white' }}>
                <EcosurTabs data={tablaNewPrograma} align='left' key='ecosur-tabs-estudiantes-pro' color="white" activeColor="white" activeTextColor="black"/>        
              </Box>   
            </Grid>                             
          </Grid>
        </Card>
      </>       
    );
}; // ListaInscripciones

const EstudiantesPage: React.FC<{ }> = ({ }) => {
    return (
      <>
        <Card key={`ecosur-lista-estudiantes`} sx={{ border: 'none', boxShadow: 'none' }}>
            <ListaEstudiantes />
        </Card> 
      </>       
    );
  }; 
  
  export default EstudiantesPage;