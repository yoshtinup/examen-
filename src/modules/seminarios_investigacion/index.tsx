import { Container, Box } from '@mui/material';
import { EcosurSectionTitle } from 'ecosur-ui';

import { CardCT } from './components/evaluacion';
import { CardActividades } from './components/evaluacion';

const EvaluacionSeminarioInvestigacion = () => {
  
  return (
    <>
      <EcosurSectionTitle label="Evaluación Seminario Investigación" variant="h5" />
      <Container maxWidth="lg">
        <Box
          display="row"
          alignItems="center"
          justifyContent="center"
        >            
          <CardCT IdEvaluacionSeminario={120} />
          <CardActividades IdAlumnosMaterias={47404} />
          <CardActividades IdAlumnosMaterias={46248} />
          <br />
        </Box>
    </Container>
    </>
  );
};

export default EvaluacionSeminarioInvestigacion;
