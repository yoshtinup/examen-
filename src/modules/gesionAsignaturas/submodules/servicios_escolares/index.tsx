import { Container, Grid } from "@mui/material";
import { HeaderSection } from "@shared/components";
import { EcosurTabs } from "ecosur-ui";
import AsignaturasEnProcesoPorIniciar from "./components/asignaturasEnProcesoPorIniciar";
import AsignaturasConcluidas from "./components/asignaturasConcluidas";
import AsignaturasCanceladas from "./components/asignaturasCanceladas";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const ServiciosEscolares = () => {
  const tablas = [
    {
      titulo: 'Por iniciar - En proceso',
      componente: <AsignaturasEnProcesoPorIniciar />,
    },
    {
      titulo: 'Concluidas',
      componente: <AsignaturasConcluidas />,
    },
    {
      titulo: 'Canceladas',
      componente: <AsignaturasCanceladas />,
    }    
  ]

  return (
    <Container maxWidth={false} style={{...style}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EcosurTabs
            data={tablas}
            align="left"
            activeColor="#ecf0f5"
            activeTextColor="black"
            key="ecosur-tabs-asig"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiciosEscolares;
