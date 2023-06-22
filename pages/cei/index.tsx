import CEI from '@modules/cei';
import { Box, Container } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import { ReactElement } from 'react';

const PageCEI = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="COMITE DE EVALUACION ETICA DE LA INVESTIGACION (CEI)" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <CEI />
      </Box>
    </Container>
  );
};

PageCEI.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageCEI;
