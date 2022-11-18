import { Container, Box } from '@mui/material';
import { EcosurSectionTitle } from 'ecosur-ui';

import { CardCT } from './components/evaluacion';
import { CardActividades } from './components/evaluacion';
import { CardPrograma } from './components/evaluacion/CardCronograma/index';

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
          <CardCT IdEvaluacionSeminario={110} />
          <CardActividades IdAlumnosMaterias={47404} />
          <CardActividades IdAlumnosMaterias={46248} />
          <br />
        </Box>
    </Container>
    </>
  );
};

export default EvaluacionSeminarioInvestigacion;
