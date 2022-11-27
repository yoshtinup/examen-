import { Grid, Container } from '@mui/material';

const PendienteDeEvaluar = () => {
  return (
    <>
      <h3>Instrucciones</h3>
      <p>
        A continuación, se presenta la información del consejo tutelar
        seleccionado por la persona estudiante, todos han aceptado, revise la
        información y si esta de acuerdo haga clic en el botón{' '}
        <b>Aprobar consejo tutelar </b>.
      </p>
    </>
  );
};

const YaEvaluo = () => {
  return (
    <p>
      La conformación del consejo tutelar de la persona estudiante ya fue
      aprobada por usted.
    </p>
  );
};

const enlacesImportantes = ({ estatusCT }) => {
  const Informacion = estatusCT == 3 ? PendienteDeEvaluar : YaEvaluo;
  return (
    <Container maxWidth="lg" style={{ padding: '25px 0px 0px 0px' }}>
      <Grid container>
        <Grid item xs={12}>
          <Informacion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default enlacesImportantes;
