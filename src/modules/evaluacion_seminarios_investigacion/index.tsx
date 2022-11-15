import { Container, Box } from '@mui/material';
import { EcosurSectionTitle } from 'ecosur-ui';

import { CardCT } from '../../shared/components/cardCT/CardCT';


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
          <CardCT IdEvaluacionSeminario={91} />
        </Box>
    </Container>
    </>
  );
};

export default EvaluacionSeminarioInvestigacion;
