import type { ReactElement } from 'react';

import { Box, Container } from '@mui/material';
import { HeaderSection } from '@shared/components';
import ConsejoTutelar from '@modules/consejo_tutelar';
import { Layout } from '@shared/components/layouts';

const Page = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="CONFORMACIÓN DE CONSEJO TUTELAR (CT)" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <ConsejoTutelar />
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
