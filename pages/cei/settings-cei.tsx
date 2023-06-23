import { DashboardCEI } from '@modules/cei';
import { Box, Container } from '@mui/system';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import { ReactElement } from 'react';

const PageSettingCEI = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="COMITÉ DE EVALUACIÓN ÉTICA DE LA INVESTIGACIÓN (CEI)" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <DashboardCEI />
      </Box>
    </Container>
  );
};

PageSettingCEI.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageSettingCEI;
