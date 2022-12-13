import type { ReactElement } from 'react';

import { Box, Container } from '@mui/material';
import Home from '@modules/home';
import { Layout } from '@shared/components/layouts';

const Page = () => {
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <Home />
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
