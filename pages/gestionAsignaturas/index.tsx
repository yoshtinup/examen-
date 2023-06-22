import type { ReactElement } from 'react';

import { Box, Container } from '@mui/material';
import { Layout } from '@shared/components/layouts';
import GestionAsignaturas from '@modules/gesionAsignaturas';

const Page = () => {
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
      >
        <GestionAsignaturas />
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
