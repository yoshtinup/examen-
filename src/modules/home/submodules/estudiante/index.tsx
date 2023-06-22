import TableroPlanEstudios from "@modules/tablero_plan_estudios";
import DatosGenerales from "@modules/tablero_plan_estudios/submodules/datos-generales";
import { Container, Grid } from "@mui/material";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const Estudiante = props => {
  const matricula=props.matricula;
  return (
    <>
      <Container maxWidth={false} style={{...style}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatosGenerales matricula={matricula}/>
          </Grid>
        </Grid>
      </Container>
      <TableroPlanEstudios matricula={matricula} />
    </>
  );
};
export default Estudiante;
